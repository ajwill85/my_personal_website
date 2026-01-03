import { useState, useEffect } from 'react';
import { getBlogPosts } from '../lib/blog';
import { formatDate } from '../lib/utils';
import './Blog.css';

const Blog = ({ onPostClick, onFilterClick, filter }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const getFilteredPosts = () => {
    if (!filter.type || !filter.value) {
      return posts;
    }

    return posts.filter(post => {
      if (filter.type === 'category') {
        return post.category === filter.value;
      } else if (filter.type === 'tag') {
        return post.tags.includes(filter.value);
      }
      return true;
    });
  };

  const filteredPosts = getFilteredPosts();

  if (loading) {
    return (
      <section className="blog visible" id="blog">
        <div className="container">
          <h2 className="section-title">Blog</h2>
          <p>Loading posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="blog visible" id="blog">
      <div className="container">
        <h2 className="section-title">Blog</h2>
        
        {/* Filter Indicator */}
        {filter.type && filter.value && (
          <div className="blog-filter-indicator">
            <span className="filter-text">
              Filtering by {filter.type}: <strong>{filter.value}</strong>
            </span>
            <button 
              className="btn btn-secondary clear-filter-btn"
              onClick={() => onFilterClick(null, null)}
            >
              Clear Filter
            </button>
          </div>
        )}
        
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article 
              key={post.slug} 
              className="blog-card"
              onClick={() => onPostClick(post.slug)}
            >
              <div className="blog-content">
                <div className="blog-meta">
                  <time className="blog-date">{formatDate(post.date)}</time>
                  {post.category && (
                    <span 
                      className="blog-category clickable"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onFilterClick('category', post.category); 
                      }}
                    >
                      {post.category}
                    </span>
                  )}
                </div>
                <h3 className="blog-title">
                  <a href={`#blog/${post.slug}`} onClick={(e) => { e.preventDefault(); onPostClick(post.slug); }}>{post.title}</a>
                </h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-tags">
                  {post.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="blog-tag clickable"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        onFilterClick('tag', tag); 
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredPosts.length === 0 && posts.length > 0 && (
          <div className="blog-no-results">
            <p>No posts found for {filter.type}: <strong>{filter.value}</strong></p>
            <button 
              className="btn btn-secondary"
              onClick={() => onFilterClick(null, null)}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
