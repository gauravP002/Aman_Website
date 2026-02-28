import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const blogService = {
  async getAll() {
    const res = await fetch("/api/blogs");
    return res.json();
  },
  async create(blog: any) {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });
    return res.json();
  },
  async delete(id: number) {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
  }
};

export const materialService = {
  async getAll() {
    const res = await fetch("/api/materials");
    return res.json();
  },
  async create(material: any) {
    const res = await fetch("/api/materials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(material),
    });
    return res.json();
  }
};

// Mock YouTube Service (Real integration would require YOUTUBE_API_KEY)
export const youtubeService = {
  async getLatestVideos() {
    // In a real app, you'd fetch from YouTube API
    return [
      {
        id: "1",
        title: "SSC CGL Maths Strategy 2024",
        thumbnail: "https://picsum.photos/seed/maths/400/225",
        url: "https://youtube.com/watch?v=example1"
      },
      {
        id: "2",
        title: "Reasoning Masterclass: Syllogism",
        thumbnail: "https://picsum.photos/seed/reasoning/400/225",
        url: "https://youtube.com/watch?v=example2"
      }
    ];
  }
};
