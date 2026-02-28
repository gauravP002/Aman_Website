import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Send, MessageCircle, ArrowRight, BookOpen, Brain, Globe, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';

import SEO from '../components/SEO';

export default function Home() {
  const categories = [
    { name: 'Maths', icon: <BookOpen className="w-6 h-6" />, color: 'bg-blue-500', path: '/study-materials/maths' },
    { name: 'Reasoning', icon: <Brain className="w-6 h-6" />, color: 'bg-purple-500', path: '/study-materials/reasoning' },
    { name: 'GK', icon: <Globe className="w-6 h-6" />, color: 'bg-emerald-500', path: '/study-materials/gk' },
    { name: 'Computer', icon: <Monitor className="w-6 h-6" />, color: 'bg-orange-500', path: '/study-materials/computer' },
  ];

  return (
    <div className="space-y-20 pb-20">
      <SEO 
        title="Home" 
        description="Master SSC Exams with Sagacious CGL. Expert guidance in Maths, Reasoning, GK, and Computer for SSC aspirants." 
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary mb-6">
                SSC Job Holder & Educator
              </span>
              <h1 className="text-4xl tracking-tight font-display font-extrabold text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                Master SSC Exams with <br />
                <span className="text-primary">Sagacious CGL</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Empowering aspirants with structured learning in Maths, Reasoning, GK, and Computer. 
                Join thousands of students in their journey to success.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <a href="https://t.me/example" target="_blank" rel="noreferrer" className="btn-primary flex items-center justify-center gap-2">
                  <Send size={20} /> Join Telegram Community
                </a>
                <a href="https://www.youtube.com/@sagaciouscgl" target="_blank" rel="noreferrer" className="btn-secondary flex items-center justify-center gap-2">
                  <Youtube size={20} /> Subscribe on YouTube
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden border-8 border-white dark:border-slate-900">
                <img
                  className="w-full h-full object-cover aspect-square"
                  src="https://picsum.photos/seed/aman/800/800"
                  alt="Aman Aks Sagacious"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold">Featured Study Categories</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Comprehensive resources for every subject</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.path}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="card flex flex-col items-center text-center group"
              >
                <div className={`${cat.color} p-4 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-lg">{cat.name}</h3>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Content Preview */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold">Latest Blog Posts</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Tips, tricks, and updates for SSC aspirants</p>
            </div>
            <Link to="/blog" className="text-primary font-medium flex items-center gap-1 hover:underline">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <img src={`https://picsum.photos/seed/blog${i}/600/400`} alt="Blog" className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                <div className="p-6">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Maths</span>
                  <h3 className="mt-2 text-xl font-bold line-clamp-2">How to solve Percentage questions in 10 seconds</h3>
                  <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
                    In this post, we will discuss the shortcuts and tricks to solve percentage problems quickly...
                  </p>
                  <Link to="/blog/1" className="mt-4 inline-block text-primary font-medium text-sm">Read More →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://wa.me/example"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        >
          <MessageCircle size={28} />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="https://t.me/example"
          className="w-14 h-14 bg-blue-400 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors"
        >
          <Send size={28} />
        </motion.a>
      </div>
    </div>
  );
}
