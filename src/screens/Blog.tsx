import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { blogService } from '../services/api';
import { Blog } from '../types';
import { motion } from 'motion/react';

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Maths', 'Reasoning', 'GK', 'Computer', 'Strategy'];

  useEffect(() => {
    blogService.getAll().then(setBlogs);
  }, []);

  const filteredBlogs = blogs.filter(b => activeCategory === 'All' || b.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-display font-bold mb-4">Educational Blog</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Deep dives into subjects, exam strategies, and the latest updates from the world of SSC.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={blog.id}
            className="card p-0 overflow-hidden flex flex-col"
          >
            <div className="relative h-56">
              <img 
                src={blog.image_url || `https://picsum.photos/seed/${blog.id}/600/400`} 
                alt={blog.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary uppercase">
                  {blog.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><User size={14} /> Sagacious CGL</span>
              </div>
              <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6">
                {blog.content.substring(0, 150)}...
              </p>
              <div className="mt-auto">
                <Link to={`/blog/${blog.id}`} className="text-primary font-bold text-sm flex items-center gap-1 group">
                  Read Full Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
