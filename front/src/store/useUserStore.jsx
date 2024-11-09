import { create } from 'zustand'

export const useUserStore = create(() => ({
  userLoaded: false,
  isLoggedIn: false,
  isAdmin: false,
  userName: '',
  userEmail: '',
}));