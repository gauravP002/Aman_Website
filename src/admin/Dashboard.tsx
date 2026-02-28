import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { blogService, materialService } from '../services/api';
import { Blog, Material } from '../types';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'blogs' | 'materials'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  
  const [newBlog, setNewBlog] = useState({ title: '', content: '', category: 'Maths', image_url: '' });
  const [newMaterial, setNewMaterial] = useState({ title: '', category: 'Maths', file_url: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [b, m] = await Promise.all([blogService.getAll(), materialService.getAll()]);
    setBlogs(b);
    setMaterials(m);
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    await blogService.create(newBlog);
    setNewBlog({ title: '', content: '', category: 'Maths', image_url: '' });
    loadData();
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    await materialService.create(newMaterial);
    setNewMaterial({ title: '', category: 'Maths', file_url: '' });
    loadData();
  };

  const handleDeleteBlog = async (id: number) => {
    if (confirm('Are you sure?')) {
      await blogService.delete(id);
      loadData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'blogs' ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText size={20} /> Manage Blogs
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              activeTab === 'materials' ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard size={20} /> Study Materials
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
          {activeTab === 'blogs' ? (
            <>
              <div className="card">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Plus size={20} className="text-primary" /> Create New Blog
                </h2>
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Blog Title"
                    value={newBlog.title}
                    onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <select
                    value={newBlog.category}
                    onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Maths</option>
                    <option>Reasoning</option>
                    <option>GK</option>
                    <option>Computer</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newBlog.image_url}
                    onChange={e => setNewBlog({ ...newBlog, image_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary"
                  />
                  <textarea
                    placeholder="Blog Content (Markdown supported)"
                    value={newBlog.content}
                    onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="w-full h-40 px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <button type="submit" className="btn-primary w-full">Publish Blog</button>
                </form>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Existing Blogs</h3>
                {blogs.map(blog => (
                  <div key={blog.id} className="card flex justify-between items-center py-4">
                    <div>
                      <h4 className="font-bold">{blog.title}</h4>
                      <p className="text-sm text-slate-500">{blog.category} • {new Date(blog.created_at).toLocaleDateString()}</p>
                    </div>
                    <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="card">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Plus size={20} className="text-primary" /> Upload Material
                </h2>
                <form onSubmit={handleAddMaterial} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Material Title"
                    value={newMaterial.title}
                    onChange={e => setNewMaterial({ ...newMaterial, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <select
                    value={newMaterial.category}
                    onChange={e => setNewMaterial({ ...newMaterial, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Maths</option>
                    <option>Reasoning</option>
                    <option>GK</option>
                    <option>Computer</option>
                  </select>
                  <input
                    type="text"
                    placeholder="File URL (PDF Link)"
                    value={newMaterial.file_url}
                    onChange={e => setNewMaterial({ ...newMaterial, file_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <button type="submit" className="btn-primary w-full">Add Material</button>
                </form>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Uploaded Materials</h3>
                {materials.map(m => (
                  <div key={m.id} className="card flex justify-between items-center py-4">
                    <div>
                      <h4 className="font-bold">{m.title}</h4>
                      <p className="text-sm text-slate-500">{m.category}</p>
                    </div>
                    <a href={m.file_url} target="_blank" rel="noreferrer" className="p-2 text-primary hover:bg-primary/5 rounded-lg">
                      <FileText size={20} />
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
