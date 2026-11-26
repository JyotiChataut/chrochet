'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';

type Feedback = {
  _id: string;
  message: string;
  fileName: string | null;
  createdAt: string;
};

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
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
        const res = await fetch(`${API_URL}/api/admin/feedbacks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setError('Unauthorized or failed to fetch feedbacks');
          setLoading(false);
          return;
        }

        const data = await res.json();
        setFeedbacks(data.feedbacks);
        setLoading(false);
      } catch {
        setError('Something went wrong');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [router]);

  return (
    <main className="min-h-screen bg-cyan-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-cyan-950">Feedback inbox</h1>
            <p className="text-sm text-gray-600">Notes visitors have sent.</p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-cyan-700 hover:text-cyan-900 underline underline-offset-4"
          >
            Back to site
          </Link>
        </div>

        {loading ? (
          <p className="text-cyan-700">Loading feedbacks…</p>
        ) : error ? (
          <p className="text-rose-700 mb-4" role="alert">
            {error}
          </p>
        ) : feedbacks.length === 0 ? (
          <p className="text-cyan-800">No feedback yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((fb: Feedback) => (
              <li key={fb._id} className="bg-white p-4 rounded-xl shadow-sm border border-cyan-200">
                <p className="text-cyan-950 mb-1">{fb.message}</p>
                {fb.fileName && (
                  <p className="text-xs text-gray-600 italic">Attached: {fb.fileName}</p>
                )}
                <p className="text-xs text-gray-600 mt-2">
                  {new Date(fb.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
