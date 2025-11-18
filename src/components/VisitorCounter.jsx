import { useState, useEffect } from 'react';
import './VisitorCounter.css';

const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using AWS Lambda + DynamoDB visitor counter
    const fetchCount = async () => {
      try {
        const apiUrl = import.meta.env.VITE_VISITOR_COUNTER_API;
        
        if (!apiUrl) {
          setCount('1000+');
          setLoading(false);
          return;
        }
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.count) {
          setCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch visitor count:', error);
        // Fallback to a simulated count if API fails
        setCount('1000+');
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  if (loading) {
    return (
      <div className="visitor-counter loading">
        <div className="counter-icon">👁️</div>
        <div className="counter-text">
          <span className="counter-label">Loading visitors...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="visitor-counter">
      <div className="counter-icon">👁️</div>
      <div className="counter-text">
        <span className="counter-value">{count?.toLocaleString()}</span>
        <span className="counter-label">Total Visitors</span>
      </div>
    </div>
  );
};

export default VisitorCounter;
