import React, { useState, useEffect } from 'react';
import { Youtube as YoutubeIcon, Play, ExternalLink, Search } from 'lucide-react';
import { youtubeService } from '../services/api';
import { motion } from 'motion/react';

export default function YouTube() {
  const [videos, setVideos] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    youtubeService.getLatestVideos().then(setVideos);
  }, []);

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-display font-bold mb-4 flex items-center gap-3 justify-center md:justify-start">
            <YoutubeIcon className="text-red-600" size={40} /> YouTube Lectures
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl">
            Watch free high-quality video lectures on Maths, Reasoning, and more. 
            Subscribe to stay updated with new content.
          </p>
        </div>
        <a 
          href="https://www.youtube.com/@sagaciouscgl" 
          target="_blank" 
          rel="noreferrer" 
          className="btn-primary bg-red-600 hover:bg-red-700 flex items-center gap-2"
        >
          <YoutubeIcon size={20} /> Subscribe Now
        </a>
      </div>

      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-red-500 outline-none shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <motion.div
            whileHover={{ y: -8 }}
            key={video.id}
            className="card p-0 overflow-hidden group"
          >
            <div className="relative aspect-video">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4 line-clamp-2 group-hover:text-red-600 transition-colors">
                {video.title}
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">1.2k views • 2 days ago</span>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-red-600 font-bold text-sm flex items-center gap-1"
                >
                  Watch on YouTube <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
