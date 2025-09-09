'use client';

import React, { useState, useEffect } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = {
      id,
      duration: 5000,
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, newToast.duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider swipeDirection="right">
        {children}
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
        <Toast.Viewport className="fixed top-0 right-0 z-[2147483647] m-0 flex w-96 max-w-[100vw] list-none flex-col gap-2 p-6 outline-none" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!open) {
      onRemove();
    }
  }, [open, onRemove]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <Toast.Root
      className={cn(
        'data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-4 rounded-lg border-l-4 bg-white p-4 shadow-lg data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
        getBorderColor()
      )}
      open={open}
      onOpenChange={setOpen}
      duration={toast.duration}
    >
      <div className="flex items-start gap-3">
        {getIcon()}
        <div className="flex-1">
          <Toast.Title className="text-sm font-semibold text-gray-900">
            {toast.title}
          </Toast.Title>
          {toast.description && (
            <Toast.Description className="mt-1 text-sm text-gray-600">
              {toast.description}
            </Toast.Description>
          )}
        </div>
      </div>
      <Toast.Close
        className="text-gray-400 transition-colors hover:text-gray-600"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </Toast.Close>
    </Toast.Root>
  );
}

// Utility function to show toasts without context (for one-off usage)
export function showToast(toast: Omit<ToastMessage, 'id'>) {
  // This is a simple implementation that works without context
  // For more complex usage, use the ToastProvider and useToast hook

  const event = new CustomEvent('show-toast', { detail: toast });
  window.dispatchEvent(event);
}
