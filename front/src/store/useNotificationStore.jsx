import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notification: {
    visibility: false,
    type: "",
    text: "",
  },
  setNotification: (notification) => set({ notification }),
  resetNotification: () => set({ notification: { visibility: false, type: "", text: "" } }),
}));

export default useNotificationStore;