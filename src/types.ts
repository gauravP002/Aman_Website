export interface Blog {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
}

export interface Material {
  id: number;
  title: string;
  category: string;
  file_url: string;
  created_at: string;
}

export type Subject = 'Maths' | 'Reasoning' | 'GK' | 'Computer';
