'use client';

import { useEffect } from 'react';
import { useToast } from './toast';

interface ToastMessage {
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export function GlobalToastListener() {
  const { showToast } = useToast();

  useEffect(() => {
    const handleToastEvent = (event: CustomEvent<ToastMessage>) => {
      showToast(event.detail);
    };

    window.addEventListener('show-toast', handleToastEvent as EventListener);

    return () => {
      window.removeEventListener(
        'show-toast',
        handleToastEvent as EventListener
      );
    };
  }, [showToast]);

  return null;
}
