
import { create } from "zustand"

export const useStore = create((set: any) => {
    return {
        count: { l: 0, r: 0 },

        increment: () => set((state: any) => ({
            count: ({ ...state.count, l: state.count.l + 1 })
        })),
        decrement: () => set((state: any) => ({
            count: ({ ...state.count, r: state.count.r + 1 })
        })),
    }
})