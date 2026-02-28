import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, FileText, Download, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { materialService } from '../services/api';
import { Material } from '../types';

export default function StudyMaterials() {
  const { category } = useParams();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(category || 'All');

  const categories = ['All', 'Maths', 'Reasoning', 'GK', 'Computer'];

  useEffect(() => {
    materialService.getAll().then(setMaterials);
  }, []);

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold mb-4">Study Materials</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Access high-quality PDFs, notes, and resources curated specifically for SSC aspirants.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-primary outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((m) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              key={m.id}
              className="card flex items-start gap-4"
            >
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <FileText size={24} />
              </div>
              <div className="flex-grow">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">{m.category}</span>
                <h3 className="font-bold text-lg mt-1 mb-4">{m.title}</h3>
                <a
                  href={m.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  <Download size={16} /> Download PDF
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-slate-500">No materials found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
