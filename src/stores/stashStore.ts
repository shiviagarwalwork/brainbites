import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StashItem {
  id: string;
  name: string;
  description?: string;
  icon: string;
  cardIds: string[];
  isSystem: boolean;
  createdAt: string;
}

interface StashState {
  stashes: StashItem[];
  createStash: (name: string, description?: string, icon?: string) => string;
  deleteStash: (id: string) => void;
  addCardToStash: (stashId: string, cardId: string) => void;
  removeCardFromStash: (stashId: string, cardId: string) => void;
  getStash: (id: string) => StashItem | undefined;
  reset: () => void;
}

const initialState = {
  stashes: [] as StashItem[],
};

export const useStashStore = create<StashState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        createStash: (name, description, icon) => {
          const id = `stash_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          const newStash: StashItem = {
            id,
            name,
            description,
            icon: icon || '📁',
            cardIds: [],
            isSystem: false,
            createdAt: new Date().toISOString(),
          };
          set((state) => ({ stashes: [...state.stashes, newStash] }));
          return id;
        },

        deleteStash: (id) =>
          set((state) => ({
            stashes: state.stashes.filter((s) => s.id !== id && !s.isSystem),
          })),

        addCardToStash: (stashId, cardId) =>
          set((state) => ({
            stashes: state.stashes.map((s) =>
              s.id === stashId && !s.cardIds.includes(cardId)
                ? { ...s, cardIds: [...s.cardIds, cardId] }
                : s
            ),
          })),

        removeCardFromStash: (stashId, cardId) =>
          set((state) => ({
            stashes: state.stashes.map((s) =>
              s.id === stashId
                ? { ...s, cardIds: s.cardIds.filter((cid) => cid !== cardId) }
                : s
            ),
          })),

        getStash: (id) => get().stashes.find((s) => s.id === id),

        reset: () => set(initialState),
      }),
      {
        name: 'brainbites-stashes',
        storage: createJSONStorage(() => AsyncStorage),
      }
    ),
    { name: 'StashStore' }
  )
);
