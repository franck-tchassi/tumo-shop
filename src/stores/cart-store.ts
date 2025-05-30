import { create } from "zustand";
import {persist} from "zustand/middleware"
export type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

type CartStore = {
    items: CartItem[];
    isLoaded: boolean;
    isOpen: boolean;
    cartId: string | null;
    setStore: (store: Partial<CartStore>) => void;
    addItem: (item: CartItem) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
    updateItem: (id: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    open: () => void;
    close: () => void;
    setLoaded: (loaded: boolean) => void;
    syncWithUser: () => Promise<void>;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items:[],
            isOpen: false,
            isLoaded: false,
            cartId: null,

            setStore: (store) => set(store),

            addItem: async (item) => {},

            removeItem: async (id) => {},

            updateItem: async (id, quantity) => {},

            clearCart: () => {
                set((state) => ({...state, items: []}));
            },

            open: () => {
                set((state) => ({...state, isOpen: true}));
            },

            close: () => {
                set((state) => ({...state, isOpen: false}));
            },

            setLoaded: (loaded) => {
                set((state) => ({...state, isLoaded: loaded}))
            },

            syncWithUser: async () =>{},

            getTotalItems: () =>{
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0)
            },

            getTotalPrice: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0)
            },
        }),
        {
            name: 'cart-storage',
            skipHydration: true,
        }
    )
)