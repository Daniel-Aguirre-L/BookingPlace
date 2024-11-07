import { create } from 'zustand'

export const useUserStore = create(() => ({
  isLoggedIn: false,
  isAdmin: false,
  userName: '',
  userEmail: '',
}));