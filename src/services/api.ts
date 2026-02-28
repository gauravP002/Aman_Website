// Lazy initialization for Gemini to avoid "API Key must be set" error on load
let genAI: any = null;
export async function getGemini() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. AI features will be disabled.");
      return null;
    }
    const { GoogleGenAI } = await import("@google/genai");
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

// Helper for LocalStorage fallback (for Static Site deployment)
const getStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setStorageData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const blogService = {
  async getAll() {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Backend not available");
      return await res.json();
    } catch (err) {
      // Fallback to localStorage for Static Site deployment
      return getStorageData("blogs") || [];
    }
  },
  async create(blog: any) {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });
      if (!res.ok) throw new Error("Backend not available");
      return await res.json();
    } catch (err) {
      const blogs = getStorageData("blogs") || [];
      const newBlog = { ...blog, id: Date.now(), created_at: new Date().toISOString() };
      setStorageData("blogs", [...blogs, newBlog]);
      return newBlog;
    }
  },
  async delete(id: number) {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Backend not available");
    } catch (err) {
      const blogs = getStorageData("blogs") || [];
      setStorageData("blogs", blogs.filter((b: any) => b.id !== id));
    }
  }
};

export const materialService = {
  async getAll() {
    try {
      const res = await fetch("/api/materials");
      if (!res.ok) throw new Error("Backend not available");
      return await res.json();
    } catch (err) {
      return getStorageData("materials") || [];
    }
  },
  async create(material: any) {
    try {
      const res = await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(material),
      });
      if (!res.ok) throw new Error("Backend not available");
      return await res.json();
    } catch (err) {
      const materials = getStorageData("materials") || [];
      const newMaterial = { ...material, id: Date.now(), created_at: new Date().toISOString() };
      setStorageData("materials", [...materials, newMaterial]);
      return newMaterial;
    }
  }
};

export const youtubeService = {
  async getLatestVideos() {
    return [
      {
        id: "1",
        title: "SSC CGL 2024 Maths Strategy | How to Score 50/50",
        thumbnail: "https://picsum.photos/seed/maths1/400/225",
        url: "https://www.youtube.com/watch?v=example1"
      },
      {
        id: "2",
        title: "Reasoning Masterclass: Syllogism & Logical Venn Diagrams",
        thumbnail: "https://picsum.photos/seed/reasoning1/400/225",
        url: "https://www.youtube.com/watch?v=example2"
      },
      {
        id: "3",
        title: "SSC CGL 2025: Complete Roadmap for Beginners",
        thumbnail: "https://picsum.photos/seed/roadmap/400/225",
        url: "https://www.youtube.com/watch?v=example3"
      }
    ];
  }
};
