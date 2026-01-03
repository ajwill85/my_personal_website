import { useEffect, useState } from 'react';
import { getBlogPost, getBlogPostContent } from '../../lib/blog';
import { formatDate } from '../../lib/utils';
import '../Blog.css';

const BlogPost = ({ slug, onFilterClick }) => {
  const [post, setPost] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getBlogPost(slug);
        const postContent = await getBlogPostContent(slug);
        setPost(postData);
        setContent(postContent);
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleBackToBlog = () => {
    window.location.hash = 'blog';
  };

  const handleFilterClick = (type, value) => {
    onFilterClick(type, value);
  };

  if (loading) {
    return (
      <article className="blog-post visible">
        <div className="container">
          {/* Top Navigation */}
          <div className="blog-post-nav-top">
            <button onClick={handleBackToBlog} className="btn btn-secondary">← Back to Blog</button>
          </div>
          
          <div className="blog-post-header">
            <div className="blog-post-meta">
              <time className="blog-post-date">Loading...</time>
            </div>
            <h1 className="blog-post-title">Loading...</h1>
          </div>
        </div>
      </article>
    );
  }

  if (!post) {
    return (
      <article className="blog-post visible">
        <div className="container">
          {/* Top Navigation */}
          <div className="blog-post-nav-top">
            <button onClick={handleBackToBlog} className="btn btn-secondary">← Back to Blog</button>
          </div>
          
          <div className="blog-post-header">
            <div className="blog-post-meta">
              <time className="blog-post-date">Post not found</time>
            </div>
            <h1 className="blog-post-title">Post Not Found</h1>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-post visible">
      <div className="container">
        {/* Top Navigation */}
        <div className="blog-post-nav-top">
          <button onClick={handleBackToBlog} className="btn btn-secondary">← Back to Blog</button>
        </div>
        
        <div className="blog-post-header">
          <div className="blog-post-meta">
            <time className="blog-post-date">{formatDate(post.date)}</time>
            {post.category && (
              <span 
                className="blog-post-category clickable"
                onClick={() => handleFilterClick('category', post.category)}
              >
                {post.category}
              </span>
            )}
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-excerpt">{post.excerpt}</p>
          <div className="blog-post-tags">
            {post.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex} 
                className="blog-post-tag clickable"
                onClick={() => handleFilterClick('tag', tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div 
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        <div className="blog-post-footer">
          <button onClick={handleBackToBlog} className="btn btn-secondary">← Back to Blog</button>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
