import json
import boto3
import hashlib
import os
from datetime import datetime, timedelta
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('TABLE_NAME', 'portfolio-visitors')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    Visitor counter with unique IP tracking and 24-hour deduplication.
    Only counts unique visitors once per day based on IP address.
    """
    
    # Get visitor IP address
    source_ip = event.get('requestContext', {}).get('identity', {}).get('sourceIp', 'unknown')
    user_agent = event.get('requestContext', {}).get('identity', {}).get('userAgent', '')
    
    # Filter out common bots
    bot_keywords = ['bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python-requests']
    is_bot = any(keyword in user_agent.lower() for keyword in bot_keywords)
    
    # Create a hash of the IP for privacy
    ip_hash = hashlib.sha256(source_ip.encode()).hexdigest()[:16]
    
    current_time = datetime.utcnow()
    current_timestamp = int(current_time.timestamp())
    visitor_key = f"visitor_{ip_hash}"
    
    try:
        # Get current total count
        count_response = table.get_item(Key={'id': 'visitor-count'})
        current_count = int(count_response.get('Item', {}).get('count', 0))
        
        # Check if this IP has visited recently (within 24 hours)
        visitor_response = table.get_item(Key={'id': visitor_key})
        
        should_increment = False
        
        if 'Item' not in visitor_response:
            # New visitor - never seen before
            should_increment = True
            visit_type = 'new_visitor'
        else:
            # Check last visit timestamp
            last_visit = int(visitor_response['Item'].get('last_visit', 0))
            hours_since_visit = (current_timestamp - last_visit) / 3600
            
            if hours_since_visit >= 24:
                # More than 24 hours since last visit
                should_increment = True
                visit_type = 'returning_visitor'
            else:
                # Within 24 hours - don't count
                should_increment = False
                visit_type = 'duplicate_within_24h'
        
        # Don't count bots
        if is_bot:
            should_increment = False
            visit_type = 'bot_filtered'
        
        # Increment count if this is a unique visit
        if should_increment:
            # Update total count
            table.update_item(
                Key={'id': 'visitor-count'},
                UpdateExpression='SET #count = #count + :inc, last_updated = :timestamp',
                ExpressionAttributeNames={'#count': 'count'},
                ExpressionAttributeValues={
                    ':inc': 1,
                    ':timestamp': current_timestamp
                }
            )
            
            # Record this visitor's timestamp
            table.put_item(
                Item={
                    'id': visitor_key,
                    'last_visit': current_timestamp,
                    'ip_hash': ip_hash,
                    'user_agent': user_agent[:200],  # Truncate for storage
                    'visit_count': visitor_response.get('Item', {}).get('visit_count', 0) + 1
                }
            )
            
            current_count += 1
        
        # Return response with CORS headers
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            'body': json.dumps({
                'count': current_count,
                'message': 'Visitor count retrieved successfully',
                'visit_type': visit_type,
                'is_bot': is_bot
            })
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Failed to update visitor count',
                'message': str(e)
            })
        }
