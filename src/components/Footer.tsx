import React from 'react';
import { GraduationCap, Youtube, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Sagacious <span className="text-primary">CGL</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
              Dedicated to providing high-quality education and resources for SSC aspirants. 
              Join our community to stay updated with the latest study materials and exam strategies.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/@sagaciouscgl" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <Send size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Me</Link></li>
              <li><Link to="/study-materials" className="hover:text-primary transition-colors">Study Materials</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Latest Blogs</Link></li>
              <li><Link to="/youtube" className="hover:text-primary transition-colors">YouTube Videos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Subscribe to get the latest exam updates and study materials.
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button type="submit" className="btn-primary py-2 px-4 text-sm">Join</button>
            </form>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Sagacious CGL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
