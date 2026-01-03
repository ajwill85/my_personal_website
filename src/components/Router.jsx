import { useState, useEffect } from 'react';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import Blog from './Blog';
import BlogPost from './Blog/BlogPost';
import Certifications from './Certifications';
import Experience from './Experience';
import Contact from './Contact';
import './Router.css';

const Router = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [blogPostSlug, setBlogPostSlug] = useState(null);
  const [blogFilter, setBlogFilter] = useState({ type: null, value: null });
  const [projectsFilter, setProjectsFilter] = useState({ type: null, value: null });

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      
      // Check if it's a blog post route (format: blog/post-slug)
      if (hash.startsWith('blog/')) {
        const parts = hash.split('/');
        if (parts.length === 3) {
          // Format: blog/category/value or blog/tag/value
          const filterType = parts[1];
          const filterValue = decodeURIComponent(parts[2]);
          setCurrentRoute('blog');
          setBlogPostSlug(null);
          setBlogFilter({ type: filterType, value: filterValue });
        } else {
          // Format: blog/post-slug
          const slug = parts[1];
          setCurrentRoute('blog');
          setBlogPostSlug(slug);
          setBlogFilter({ type: null, value: null });
        }
      } else if (hash.startsWith('projects/')) {
        const parts = hash.split('/');
        if (parts.length === 3) {
          // Format: projects/category/value or projects/tag/value
          const filterType = parts[1];
          const filterValue = decodeURIComponent(parts[2]);
          setCurrentRoute('projects');
          setProjectsFilter({ type: filterType, value: filterValue });
        }
      } else {
        setCurrentRoute(hash);
        setBlogPostSlug(null);
        setBlogFilter({ type: null, value: null });
        setProjectsFilter({ type: null, value: null });
      }
    };

    // Set initial route from hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    setBlogPostSlug(null);
    setBlogFilter({ type: null, value: null });
    setProjectsFilter({ type: null, value: null });
  };

  const navigateToBlogFilter = (type, value) => {
    if (!type || !value) {
      window.location.hash = 'blog';
      setCurrentRoute('blog');
      setBlogPostSlug(null);
      setBlogFilter({ type: null, value: null });
    } else {
      window.location.hash = `blog/${type}/${encodeURIComponent(value)}`;
      setCurrentRoute('blog');
      setBlogPostSlug(null);
      setBlogFilter({ type, value });
    }
  };

  const navigateToProjectsFilter = (type, value) => {
    if (!type || !value) {
      window.location.hash = 'projects';
      setCurrentRoute('projects');
      setProjectsFilter({ type: null, value: null });
    } else {
      window.location.hash = `projects/${type}/${encodeURIComponent(value)}`;
      setCurrentRoute('projects');
      setProjectsFilter({ type, value });
    }
  };

  const renderContent = () => {
    // If viewing a specific blog post
    if (currentRoute === 'blog' && blogPostSlug) {
      return <BlogPost slug={blogPostSlug} />;
    }

    switch (currentRoute) {
      case 'home':
        return <Hero />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects filter={projectsFilter} onFilterClick={navigateToProjectsFilter} />;
      case 'blog':
        return <Blog onPostClick={(slug) => navigateTo(`blog/${slug}`)} onFilterClick={navigateToBlogFilter} filter={blogFilter} />;
      case 'certifications':
        return <Certifications />;
      case 'experience':
        return <Experience />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="router-content">
      {renderContent()}
    </div>
  );
};

export default Router;
