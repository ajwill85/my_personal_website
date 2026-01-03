import { useEffect, useRef, useState } from 'react';
import { formatDate } from '../../lib/utils';
import '../Blog.css';

const BlogList = ({ posts }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  
  return (
    <section className={`blog ${isVisible ? 'visible' : ''}`} id="blog" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Blog</h2>
        <div className="blog-grid">
          {posts.map((post, index) => (
            <article 
              key={post.slug} 
              className="blog-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="blog-content">
                <div className="blog-meta">
                  <time className="blog-date">{formatDate(post.date)}</time>
                  {post.category && (
                    <span className="blog-category">{post.category}</span>
                  )}
                </div>
                <h3 className="blog-title">
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-tags">
                  {post.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
