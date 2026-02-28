import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, GraduationCap } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Study Materials', path: '/study-materials' },
    { name: 'Blog', path: '/blog' },
    { name: 'YouTube', path: '/youtube' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
              Sagacious <span className="text-primary">CGL</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/admin" className="btn-primary py-2 px-4 text-sm">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 dark:text-slate-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-primary"
              >
                Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
