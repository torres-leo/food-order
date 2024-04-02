import { create } from 'zustand';

type StatesStore = {
	orderSideBar: boolean;
	handleOrderSideBar: () => void;
	loading: boolean;
	setLoading: (loading: boolean) => void;
};

export const useStatesStore = create<StatesStore>((set) => ({
	orderSideBar: false,
	handleOrderSideBar: () => set((state) => ({ orderSideBar: !state.orderSideBar })),
	loading: false,
	setLoading: (loading: boolean) => set({ loading }),
}));
