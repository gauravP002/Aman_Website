import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, MessageCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { blogService } from '../services/api';
import { Blog } from '../types';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      blogService.getAll().then(blogs => {
        const found = blogs.find((b: Blog) => b.id === parseInt(id));
        setBlog(found || null);
      });
    }
  }, [id]);

  if (!blog) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-primary font-bold uppercase tracking-widest mb-4">
            {blog.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold mb-6 leading-tight">
            {blog.title}
          </h1>
          <div className="flex items-center gap-6 text-slate-500 border-y border-slate-200 dark:border-slate-800 py-4">
            <div className="flex items-center gap-2">
              <img src="https://picsum.photos/seed/aman/100/100" className="w-10 h-10 rounded-full" alt="Author" referrerPolicy="no-referrer" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Sagacious CGL</p>
                <p className="text-xs">SSC Educator</p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="flex items-center gap-1 text-sm">
              <Calendar size={16} /> {new Date(blog.created_at).toLocaleDateString()}
            </div>
          </div>
        </header>

        {blog.image_url && (
          <img 
            src={blog.image_url} 
            alt={blog.title} 
            className="w-full h-[400px] object-cover rounded-3xl mb-12 shadow-xl"
            referrerPolicy="no-referrer"
          />
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Markdown>{blog.content}</Markdown>
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="font-bold">Share this post:</span>
              <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-primary transition-colors"><Share2 size={20} /></button>
              <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-primary transition-colors"><MessageCircle size={20} /></button>
            </div>
            <div className="flex gap-2">
              {['SSC', 'ExamPrep', blog.category].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">#{tag}</span>
              ))}
            </div>
          </div>
        </footer>
      </article>

      {/* Simple Comment Section */}
      <section className="mt-20">
        <h3 className="text-2xl font-bold mb-8">Comments</h3>
        <div className="card">
          <textarea 
            placeholder="Write a comment..." 
            className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary mb-4"
          />
          <button className="btn-primary">Post Comment</button>
        </div>
      </section>
    </div>
  );
}
