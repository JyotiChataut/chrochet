'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      router.push('/admin/login');
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/feedbacks', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        });

        if (!res.ok) {
          setError('Unauthorized or failed to fetch feedbacks');
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log('Fetched feedbacks:', data);

        // Handle response whether it's { feedbacks: [] } or just []
        setFeedbacks(data.feedbacks || data);
        setLoading(false);
      } catch (err) {
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [router]);

  return (
    <div className="min-h-screen bg-cyan-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-cyan-900">📬 Admin Dashboard - Feedback</h1>

      {loading ? (
        <p className="text-cyan-600">Loading feedbacks...</p>
      ) : error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-cyan-700">No feedback yet.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((fb: any) => (
            <li
              key={fb._id}
              className="bg-white p-4 rounded-xl shadow border border-cyan-200"
            >
              <p className="text-cyan-900 mb-1">{fb.message}</p>
              {fb.fileName && (
                <p className="text-xs text-gray-500 italic">📎 {fb.fileName}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                🕓 {new Date(fb.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
