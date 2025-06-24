'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

const blockedPatterns = [
  /fuck+/,
  /f+u+c+k+/,
  /shit+/,
  /bitch+/,
  /dumb/,
  /stupid/,
  /asshole/,
  /nude/,
  /kill/,
  /rape/,
  /xxx/,
  /hate/,
  /slut/,
  /retard/,
];

export default function PopupCard({ visible, setVisible }: Props) {
  const [feedback, setFeedback] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'error' | 'success' | ''>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: 'error' | 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastType(''), 2000);
  };

  const handleFeedbackSubmit = () => {
    const normalized = feedback
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, ' ');

    const isBlocked = blockedPatterns.some((pattern) => pattern.test(normalized));

    if (isBlocked) {
      showToast('That message includes words not allowed 🙅‍♀️', 'error');
      return;
    }

    showToast('Thanks for your kind input! 🌼', 'success');

    // Clear text input and file input
    setFeedback('');
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'text/plain', 'application/msword'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      showToast('Unsupported file type ❌', 'error');
      return;
    }

    if (file.size > maxSize) {
      showToast('File too large (max 5MB)', 'error');
      return;
    }

    setFileName(file.name);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center px-4 backdrop-blur-sm">
          {/* Toast Notification */}
          <AnimatePresence>
            {toastType && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`fixed top-6 z-40 px-4 py-2 rounded-full text-sm shadow-md ${
                  toastType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
              >
                {toastMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Popup Card */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-pink-100 via-rose-200 to-yellow-100 border border-rose-300 rounded-3xl shadow-xl p-6 max-w-md w-full text-center text-cyan-900"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-3 text-cyan-700 text-xl hover:text-rose-500 transition"
              aria-label="Close popup card"
            >
              ❌
            </button>

            <h2 className="text-2xl font-bold mb-3">💬 Want to Support My Learning?</h2>

            <p className="text-sm text-cyan-800 mb-3">
              I’m learning coding, crocheting, and other creative or useful skills — if you’ve got helpful ideas, links, or materials, I’d love to hear.
            </p>

            <textarea
              className="w-full p-2 rounded-md bg-white/80 text-cyan-900 text-sm mb-2 focus:outline-none focus:ring"
              rows={4}
              placeholder="Got tips, tutorials, or kind words?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="mb-2">
              <label className="block text-sm text-cyan-800 font-medium mb-1">📎 Upload a helpful file</label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.txt,.doc"
                onChange={handleFileChange}
                className="text-sm text-cyan-700 bg-white/80 p-1 rounded-md w-full"
              />
              {fileName && <p className="text-xs text-cyan-600 mt-1">Selected: {fileName}</p>}
            </div>

            <button
              onClick={handleFeedbackSubmit}
              className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-sm font-semibold shadow-sm transition"
            >
              Send
            </button>

            <p className="text-xs italic text-rose-600 mt-4">
              Learning’s more fun with people who care 🌱
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
