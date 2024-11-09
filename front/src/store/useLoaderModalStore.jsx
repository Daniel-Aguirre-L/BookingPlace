import { create } from 'zustand';

const useLoaderModalStore = create((set) => ({
    loaderVisibility: false,
    showLoaderModal: () => set({loaderVisibility: true}),
    hideLoaderModal: () => set({loaderVisibility: false}),
  }));
  
  export default useLoaderModalStore;