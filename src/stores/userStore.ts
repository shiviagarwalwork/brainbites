import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User, ContentCategory, Difficulty, UserPreferences } from '@/types';

interface UserState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboarded: boolean;

  // Preferences
  preferences: UserPreferences | null;

  // Session
  sessionId: string;

  // Actions
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  setPreferences: (preferences: UserPreferences) => void;
  updatePreference: (category: ContentCategory, weight: number) => void;
  setOnboarded: (onboarded: boolean) => void;
  login: (user: User) => void;
  logout: () => void;

  // Onboarding
  setInterests: (interests: ContentCategory[]) => void;
  setDifficulty: (difficulty: Difficulty | 'mixed') => void;
  setDailyGoal: (goal: number) => void;

  // Stats
  incrementStat: (stat: keyof User['stats']) => void;

  // Reset
  reset: () => void;
}

const generateSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

const initialPreferences: UserPreferences = {
  userId: '',
  topicWeights: {},
  categoryWeights: {
    neuroscience: 0.5,
    psychology: 0.5,
    human_body: 0.5,
    health: 0.5,
    ai_tech: 0.5,
    visionary_thinkers: 0.5,
    science: 0.5,
    facts: 0.5,
    book_summaries: 0.5,
  },
  difficultyWeights: {
    beginner: 0.33,
    intermediate: 0.34,
    advanced: 0.33,
  },
  cardTypeWeights: {
    insight: 0.15,
    fact: 0.15,
    quote: 0.15,
    visionary: 0.15,
    book_summary: 0.15,
    concept: 0.1,
    challenge: 0.1,
    flashcard: 0.05,
  },
  noveltyRatio: 0.3,
  lastUpdated: new Date().toISOString(),
};

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isOnboarded: false,
  preferences: initialPreferences,
  sessionId: generateSessionId(),
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        setUser: (user) =>
          set({
            user,
            isAuthenticated: true,
            preferences: {
              ...initialPreferences,
              userId: user.id,
            },
          }),

        updateUser: (updates) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          })),

        setPreferences: (preferences) => set({ preferences }),

        updatePreference: (category, weight) =>
          set((state) => {
            if (!state.preferences) return state;
            return {
              preferences: {
                ...state.preferences,
                categoryWeights: {
                  ...state.preferences.categoryWeights,
                  [category]: Math.max(0, Math.min(1, weight)),
                },
                lastUpdated: new Date().toISOString(),
              },
            };
          }),

        setOnboarded: (isOnboarded) => set({ isOnboarded }),

        login: (user) =>
          set({
            user,
            isAuthenticated: true,
            sessionId: generateSessionId(),
          }),

        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
            sessionId: generateSessionId(),
          }),

        setInterests: (interests) =>
          set((state) => {
            const categoryWeights = { ...initialPreferences.categoryWeights };

            // Reset all to low
            Object.keys(categoryWeights).forEach((key) => {
              categoryWeights[key as ContentCategory] = 0.2;
            });

            // Boost selected interests
            interests.forEach((interest) => {
              categoryWeights[interest] = 0.8;
            });

            return {
              user: state.user
                ? { ...state.user, interests }
                : null,
              preferences: state.preferences
                ? {
                    ...state.preferences,
                    categoryWeights,
                    lastUpdated: new Date().toISOString(),
                  }
                : null,
            };
          }),

        setDifficulty: (difficulty) =>
          set((state) => {
            const difficultyWeights = { ...initialPreferences.difficultyWeights };

            if (difficulty === 'mixed') {
              difficultyWeights.beginner = 0.33;
              difficultyWeights.intermediate = 0.34;
              difficultyWeights.advanced = 0.33;
            } else {
              difficultyWeights.beginner = difficulty === 'beginner' ? 0.7 : 0.15;
              difficultyWeights.intermediate = difficulty === 'intermediate' ? 0.7 : 0.15;
              difficultyWeights.advanced = difficulty === 'advanced' ? 0.7 : 0.15;
            }

            return {
              user: state.user
                ? { ...state.user, preferredDifficulty: difficulty }
                : null,
              preferences: state.preferences
                ? {
                    ...state.preferences,
                    difficultyWeights,
                    lastUpdated: new Date().toISOString(),
                  }
                : null,
            };
          }),

        setDailyGoal: (dailyGoal) =>
          set((state) => ({
            user: state.user ? { ...state.user, dailyGoal } : null,
          })),

        incrementStat: (stat) =>
          set((state) => {
            if (!state.user) return state;
            return {
              user: {
                ...state.user,
                stats: {
                  ...state.user.stats,
                  [stat]: (state.user.stats[stat] || 0) + 1,
                },
              },
            };
          }),

        reset: () => set({ ...initialState, sessionId: generateSessionId() }),
      }),
      {
        name: 'brainbites-user',
        storage: createJSONStorage(() => AsyncStorage),
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          isOnboarded: state.isOnboarded,
          preferences: state.preferences,
        }),
      }
    ),
    { name: 'UserStore' }
  )
);
