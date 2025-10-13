#!/bin/bash

###############################################################################
# Quick Deploy Script for Portfolio Site
# 
# This script builds and deploys your portfolio site in one command
# It reads configuration from .env file or uses command line arguments
#
# Usage:
#   ./deploy-site.sh                    # Uses .env file
#   ./deploy-site.sh <bucket> <dist-id> # Uses arguments
#
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Load .env file if it exists
if [ -f .env ]; then
    info "Loading configuration from .env file..."
    export $(cat .env | grep -v '^#' | xargs)
fi

# Get bucket and distribution from args or env
BUCKET_NAME=${1:-$VITE_S3_BUCKET_NAME}
DISTRIBUTION_ID=${2:-$VITE_CLOUDFRONT_DISTRIBUTION_ID}
AWS_PROFILE=${3:-${AWS_PROFILE:-default}}

# Check if we have the required values
if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo "Error: Missing bucket name or distribution ID"
    echo ""
    echo "Usage:"
    echo "  ./deploy-site.sh <bucket-name> <distribution-id> [aws-profile]"
    echo ""
    echo "Or create a .env file with:"
    echo "  VITE_S3_BUCKET_NAME=your-bucket-name"
    echo "  VITE_CLOUDFRONT_DISTRIBUTION_ID=your-distribution-id"
    echo ""
    exit 1
fi

echo ""
echo "=========================================="
echo "  Portfolio Site Deployment"
echo "=========================================="
echo "Bucket:        $BUCKET_NAME"
echo "Distribution:  $DISTRIBUTION_ID"
echo "Profile:       $AWS_PROFILE"
echo "=========================================="
echo ""

# Step 1: Install dependencies if needed
if [ ! -d "node_modules" ]; then
    info "Installing dependencies..."
    npm install
    success "Dependencies installed"
fi

# Step 2: Build the site
info "Building site..."
npm run build
success "Build complete"

# Step 3: Deploy to AWS
info "Deploying to AWS..."
./scripts/deploy.sh "$BUCKET_NAME" "$DISTRIBUTION_ID" "$AWS_PROFILE"

echo ""
success "Deployment complete! Your site will be live in 1-2 minutes."
echo ""
