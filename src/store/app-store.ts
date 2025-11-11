import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;

  // User authentication
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;

  // UI state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Notifications
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: Date;
  }>;
  addNotification: (
    notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: false,
      toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }),

      // User authentication
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates: Partial<User>) =>
        set(state => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      // UI state
      isSidebarOpen: false,
      toggleSidebar: () =>
        set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),

      // Loading states
      isLoading: false,
      setIsLoading: (loading: boolean) => set({ isLoading: loading }),

      // Notifications
      notifications: [],
      addNotification: notification =>
        set(state => ({
          notifications: [
            ...state.notifications,
            {
              ...notification,
              id: Math.random().toString(36).substring(2),
              timestamp: new Date(),
            },
          ],
        })),
      removeNotification: (id: string) =>
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'cafpatronatoaz-app-storage',
      partialize: state => ({
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
