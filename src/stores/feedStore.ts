import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FeedCard, InteractionType, SwipeDirection } from '@/types';

interface CardInteraction {
  cardId: string;
  liked: boolean;
  saved: boolean;
  shared: boolean;
  dwellTime: number;
  viewedAt: string;
}

interface FeedState {
  // Feed data
  cards: FeedCard[];
  currentIndex: number;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;

  // Interactions tracking
  interactions: Record<string, CardInteraction>;
  likedCardIds: Set<string>;
  savedCardIds: Set<string>;

  // Session tracking
  cardsViewedThisSession: number;
  sessionStartTime: number;

  // Actions
  setCards: (cards: FeedCard[]) => void;
  appendCards: (cards: FeedCard[]) => void;
  setCurrentIndex: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Interaction actions
  recordSwipe: (cardId: string, direction: SwipeDirection, dwellTime: number) => void;
  likeCard: (cardId: string) => void;
  unlikeCard: (cardId: string) => void;
  saveCard: (cardId: string) => void;
  unsaveCard: (cardId: string) => void;
  shareCard: (cardId: string) => void;
  trackDwellTime: (cardId: string, duration: number) => void;

  // Getters
  isCardLiked: (cardId: string) => boolean;
  isCardSaved: (cardId: string) => boolean;
  getInteraction: (cardId: string) => CardInteraction | undefined;

  // Reset
  reset: () => void;
}

const initialState = {
  cards: [],
  currentIndex: 0,
  isLoading: false,
  hasMore: true,
  error: null,
  interactions: {},
  likedCardIds: new Set<string>(),
  savedCardIds: new Set<string>(),
  cardsViewedThisSession: 0,
  sessionStartTime: Date.now(),
};

export const useFeedStore = create<FeedState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setCards: (cards) =>
          set({
            cards,
            currentIndex: 0,
            hasMore: cards.length > 0,
            error: null,
          }),

        appendCards: (newCards) =>
          set((state) => ({
            cards: [...state.cards, ...newCards],
            hasMore: newCards.length > 0,
          })),

        setCurrentIndex: (index) =>
          set((state) => ({
            currentIndex: index,
            cardsViewedThisSession: state.cardsViewedThisSession + 1,
          })),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error, isLoading: false }),

        recordSwipe: (cardId, direction, dwellTime) =>
          set((state) => {
            const interaction = state.interactions[cardId] || {
              cardId,
              liked: false,
              saved: false,
              shared: false,
              dwellTime: 0,
              viewedAt: new Date().toISOString(),
            };

            // Swipe up = like
            if (direction === 'up') {
              interaction.liked = true;
              state.likedCardIds.add(cardId);
            }

            interaction.dwellTime += dwellTime;

            return {
              interactions: {
                ...state.interactions,
                [cardId]: interaction,
              },
              likedCardIds: new Set(state.likedCardIds),
            };
          }),

        likeCard: (cardId) =>
          set((state) => {
            const interaction = state.interactions[cardId] || {
              cardId,
              liked: false,
              saved: false,
              shared: false,
              dwellTime: 0,
              viewedAt: new Date().toISOString(),
            };

            interaction.liked = true;
            state.likedCardIds.add(cardId);

            return {
              interactions: {
                ...state.interactions,
                [cardId]: interaction,
              },
              likedCardIds: new Set(state.likedCardIds),
            };
          }),

        unlikeCard: (cardId) =>
          set((state) => {
            const interaction = state.interactions[cardId];
            if (interaction) {
              interaction.liked = false;
            }
            state.likedCardIds.delete(cardId);

            return {
              interactions: {
                ...state.interactions,
                [cardId]: interaction,
              },
              likedCardIds: new Set(state.likedCardIds),
            };
          }),

        saveCard: (cardId) =>
          set((state) => {
            const interaction = state.interactions[cardId] || {
              cardId,
              liked: false,
              saved: false,
              shared: false,
              dwellTime: 0,
              viewedAt: new Date().toISOString(),
            };

            interaction.saved = true;
            state.savedCardIds.add(cardId);

            return {
              interactions: {
                ...state.interactions,
                [cardId]: interaction,
              },
              savedCardIds: new Set(state.savedCardIds),
            };
          }),

        unsaveCard: (cardId) =>
          set((state) => {
            const interaction = state.interactions[cardId];
            if (interaction) {
              interaction.saved = false;
            }
            state.savedCardIds.delete(cardId);

            return {
              interactions: {
                ...state.interactions,
                [cardId]: interaction,
              },
              savedCardIds: new Set(state.savedCardIds),
            };
          }),

        shareCard: (cardId) =>
          set((state) => {
            const interaction = state.interactions[cardId] || {
              cardId,
              liked: false,
              saved: false,
              shared: false,
              dwellTime: 0,
              viewedAt: new Date().toISOString(),
            };

            interaction.shared = true;

            return {
              interactions: {
                ...state.interactions,
                [cardId]: interaction,
              },
            };
          }),

        trackDwellTime: (cardId, duration) =>
          set((state) => {
            const interaction = state.interactions[cardId] || {
              cardId,
              liked: false,
              saved: false,
              shared: false,
              dwellTime: 0,
              viewedAt: new Date().toISOString(),
            };

            interaction.dwellTime += duration;

            return {
              interactions: {
                ...state.interactions,
                [cardId]: interaction,
              },
            };
          }),

        isCardLiked: (cardId) => get().likedCardIds.has(cardId),

        isCardSaved: (cardId) => get().savedCardIds.has(cardId),

        getInteraction: (cardId) => get().interactions[cardId],

        reset: () => set(initialState),
      }),
      {
        name: 'brainbites-feed',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          interactions: state.interactions,
          likedCardIds: Array.from(state.likedCardIds),
          savedCardIds: Array.from(state.savedCardIds),
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            // Convert arrays back to Sets after rehydration
            state.likedCardIds = new Set(state.likedCardIds as unknown as string[]);
            state.savedCardIds = new Set(state.savedCardIds as unknown as string[]);
          }
        },
      }
    ),
    { name: 'FeedStore' }
  )
);
