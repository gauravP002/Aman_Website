import React from 'react';
import { motion } from 'motion/react';
import { Target, Compass, Award, BookOpen } from 'lucide-react';

export default function About() {
  const journey = [
    { year: '2022', event: 'Completed graduation from BSC Mathematics and cleared Airforce exam in the same year.' },
    { year: '2023', event: 'Cleared multiple exams: MP Police, SSC GD, SSC CPO, and SSC MTS.' },
    { year: '2024', event: 'Successfully cleared SSC CGL Pre and Mains exams.' },
    { year: '2025', event: 'Cleared SSC CGL, SSC CHSL, IB (Intelligence Bureau), and UP Police exams.' },
    { year: '2026', event: 'Continuing the journey of excellence and helping others achieve their dreams.' },
  ];

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="bg-primary text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">About Sagacious CGL</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            From an aspirant to an educator, my journey has been dedicated to simplifying the complex path of SSC exams.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <section className="card">
              <h2 className="text-2xl font-bold mb-6">My Journey</h2>
              <div className="space-y-8">
                {journey.map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">
                        {item.year}
                      </div>
                      {i !== journey.length - 1 && <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-800 mt-2" />}
                    </div>
                    <div className="pt-2">
                      <p className="text-lg text-slate-700 dark:text-slate-300">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-8">
              <div className="card">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Mission</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  To provide accessible, high-quality education that empowers every SSC aspirant to achieve their dream job.
                </p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Compass size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Vision</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  To become the most trusted platform for SSC preparation, known for clarity, strategy, and success.
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="card text-center">
              <img src="https://picsum.photos/seed/aman2/400/400" alt="Aman" className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/10" referrerPolicy="no-referrer" />
              <h3 className="text-xl font-bold">Sagacious CGL</h3>
              <p className="text-primary font-medium mb-4">SSC Educator</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                "Teaching is not just about sharing knowledge, it's about building confidence and providing the right direction."
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Award className="text-primary" size={20} /> Achievements
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex gap-2">• Cleared CGL 2020 with All India Rank</li>
                <li className="flex gap-2">• 100k+ Subscribers on YouTube</li>
                <li className="flex gap-2">• Helped 5000+ students clear Tier 1</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
