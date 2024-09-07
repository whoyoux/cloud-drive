import { create } from "zustand";

type StoreState = {
	currentPath: string;
	changePath: (newPath: string) => void;
};

export const useStore = create<StoreState>()((set) => ({
	currentPath: "",
	changePath: (newPath) =>
		set(() => {
			const serialized = newPath.trim().toLowerCase();
			// console.log(`SETTING PATH IN STORE: ${serialized}`);
			return { currentPath: `${serialized}` };
		}),
}));
