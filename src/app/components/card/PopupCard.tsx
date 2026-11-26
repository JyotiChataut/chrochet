'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'error' | 'success' | ''>('');
  const panelRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string, type: 'error' | 'success') => {
    setToastMsg(msg);
    setToastType(type);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastType(''), 2500);
  };

  // Dialog behaviour: focus, Escape, focus trap, scroll lock, restore focus.
  useEffect(() => {
    if (!visible) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const getFocusable = () => {
      if (!panelRef.current) return [];
      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, textarea, input, [href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setVisible(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() => textareaRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [visible, setVisible]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const handleFeedbackSubmit = async () => {
    const normalized = feedback
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, ' ');

    const isBlocked = blockedPatterns.some((pattern) => pattern.test(normalized));

    if (isBlocked) {
      showToast('That message includes words that are not allowed.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: feedback }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg || 'Failed');
      }

      showToast('Thanks for your kind note.', 'success');
      setFeedback('');
    } catch (err) {
      console.error('Feedback POST error:', err);
      showToast('Server error. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="fixed top-0 left-0 w-full h-full z-30 flex items-center justify-center px-4 backdrop-blur-sm bg-cyan-950/30"
          onClick={() => setVisible(false)}
        >
          {/* Toast */}
          <AnimatePresence>
            {toastType && (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                role="status"
                className={`fixed top-6 z-40 px-4 py-2 rounded-full text-sm shadow-md ${
                  toastType === 'success'
                    ? 'bg-rose-200 text-cyan-950'
                    : 'bg-rose-700 text-white'
                }`}
              >
                {toastMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dialog panel */}
          <motion.div
            key="popup"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-gradient-to-br from-rose-100 to-rose-200 rounded-3xl shadow-xl p-6 max-w-md w-full text-center text-cyan-950"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-3 text-cyan-800 hover:text-rose-600 transition"
              aria-label="Close feedback form"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>

            <h2 id="popup-title" className="font-caveat text-3xl font-bold mt-4 mb-3 text-cyan-950">
              Want to help me learn?
            </h2>

            <p className="text-sm text-cyan-900 mb-3">
              I&apos;m learning coding, crocheting, and other creative and useful skills. If
              you&apos;ve got helpful ideas, links, or materials, I&apos;d love to hear.
            </p>

            <textarea
              ref={textareaRef}
              className="w-full p-3 rounded-md bg-white/90 text-cyan-950 text-sm mb-3 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              rows={4}
              placeholder="Got tips, tutorials, or kind words?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <button
              onClick={handleFeedbackSubmit}
              disabled={submitting}
              className="mt-2 px-5 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full text-sm font-semibold shadow-sm transition"
            >
              {submitting ? 'Sending…' : 'Send'}
            </button>

            <p className="text-xs italic text-rose-700 mt-4">
              Learning is more fun with people who care.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
