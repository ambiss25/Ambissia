import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) console.error(error);
      else setCourses(data || []);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      <header className="border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-emerald-400">AMBISSIA</h1>
        <p className="text-xs text-gray-400">200L Medical Laboratory Science Suite</p>
      </header>

      <main>
        <h2 className="text-lg font-semibold mb-3">Enrolled Courses</h2>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading course data...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500 text-sm">No courses found in database.</p>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="p-4 rounded-xl bg-gray-800 border border-gray-700">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-emerald-400">{course.code}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-300">
                    {course.units} Units
                  </span>
                </div>
                <h3 className="font-medium text-sm text-gray-200">{course.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{course.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
                  }
