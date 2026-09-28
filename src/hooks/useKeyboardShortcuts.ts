import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../stores/useUIStore';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const toggleSearch = useUIStore((state) => state.toggleSearch);
  const pendingKeyRef = useRef<string | null>(null);
  const pendingKeyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is typing in an input, textarea, or contentEditable element
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        toggleSearch(true);
        return;
      }

      if (e.key === 'Escape') {
        useUIStore.getState().toggleSearch(false);
        useUIStore.getState().toggleNotifications(false);
        return;
      }

      if (isInput) return;

      // Check for two-key sequence (e.g. 'g' then 'd')
      if (e.key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        pendingKeyRef.current = 'g';
        if (pendingKeyTimeoutRef.current) clearTimeout(pendingKeyTimeoutRef.current);
        pendingKeyTimeoutRef.current = setTimeout(() => {
          pendingKeyRef.current = null;
        }, 1000);
        return;
      }

      if (pendingKeyRef.current === 'g') {
        const nextKey = e.key.toLowerCase();
        pendingKeyRef.current = null;
        if (pendingKeyTimeoutRef.current) clearTimeout(pendingKeyTimeoutRef.current);

        if (nextKey === 'd') {
          e.preventDefault();
          navigate('/dashboard');
        } else if (nextKey === 'j') {
          e.preventDefault();
          navigate('/discover');
        } else if (nextKey === 'a') {
          e.preventDefault();
          navigate('/applications');
        } else if (nextKey === 'r') {
          e.preventDefault();
          navigate('/resume');
        } else if (nextKey === 'p') {
          e.preventDefault();
          navigate('/preferences');
        } else if (nextKey === 's') {
          e.preventDefault();
          navigate('/settings');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (pendingKeyTimeoutRef.current) clearTimeout(pendingKeyTimeoutRef.current);
    };
  }, [navigate, toggleSearch]);
};
