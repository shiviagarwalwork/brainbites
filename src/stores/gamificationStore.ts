import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gamification } from '@/constants/theme';
import type { XPEventType, Achievement } from '@/types';

interface GamificationState {
  // XP & Level
  xp: number;
  level: number;
  levelName: string;
  levelBadge: string;
  xpToNextLevel: number;
  levelProgress: number; // 0-1

  // Streak
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  streakProtected: boolean; // Used a streak freeze

  // Daily
  cardsViewedToday: number;
  dailyGoal: number;
  dailyGoalMet: boolean;
  lastDailyRewardClaim: string | null;

  // Achievements
  achievements: string[]; // Achievement IDs
  recentAchievements: Achievement[]; // For showing notifications

  // Actions
  addXP: (amount: number, eventType: XPEventType) => { leveledUp: boolean; newLevel?: number };
  checkStreak: () => { maintained: boolean; lost: boolean; newStreak: number };
  incrementCardsViewed: () => { goalMet: boolean };
  setDailyGoal: (goal: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  clearRecentAchievements: () => void;
  claimDailyReward: () => number;
  useStreakFreeze: () => boolean;

  // Getters
  getLevelInfo: () => { level: number; name: string; badge: string; minXP: number; maxXP: number };
  getXPForEvent: (eventType: XPEventType) => number;

  // Reset
  reset: () => void;
}

const getToday = () => new Date().toISOString().split('T')[0];

const calculateLevel = (xp: number) => {
  const levels = Gamification.levels;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXP) {
      return levels[i];
    }
  }
  return levels[0];
};

const initialState = {
  xp: 0,
  level: 1,
  levelName: 'Curious Mind',
  levelBadge: '🌱',
  xpToNextLevel: 100,
  levelProgress: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  streakProtected: false,
  cardsViewedToday: 0,
  dailyGoal: 20,
  dailyGoalMet: false,
  lastDailyRewardClaim: null,
  achievements: [],
  recentAchievements: [],
};

export const useGamificationStore = create<GamificationState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        addXP: (amount, eventType) => {
          const state = get();
          const newXP = state.xp + amount;
          const currentLevelInfo = calculateLevel(state.xp);
          const newLevelInfo = calculateLevel(newXP);

          const leveledUp = newLevelInfo.level > currentLevelInfo.level;

          // Calculate progress to next level
          const xpInCurrentLevel = newXP - newLevelInfo.minXP;
          const xpNeededForLevel = newLevelInfo.maxXP - newLevelInfo.minXP;
          const progress = Math.min(xpInCurrentLevel / xpNeededForLevel, 1);

          set({
            xp: newXP,
            level: newLevelInfo.level,
            levelName: newLevelInfo.name,
            levelBadge: newLevelInfo.badge,
            xpToNextLevel: newLevelInfo.maxXP - newXP,
            levelProgress: progress,
          });

          return {
            leveledUp,
            newLevel: leveledUp ? newLevelInfo.level : undefined,
          };
        },

        checkStreak: () => {
          const state = get();
          const today = getToday();
          const lastActive = state.lastActiveDate;

          if (!lastActive) {
            // First time user
            set({
              currentStreak: 1,
              lastActiveDate: today,
              longestStreak: Math.max(1, state.longestStreak),
            });
            return { maintained: true, lost: false, newStreak: 1 };
          }

          const lastDate = new Date(lastActive);
          const todayDate = new Date(today);
          const diffDays = Math.floor(
            (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (diffDays === 0) {
            // Same day, no change
            return { maintained: true, lost: false, newStreak: state.currentStreak };
          } else if (diffDays === 1) {
            // Consecutive day - streak continues!
            const newStreak = state.currentStreak + 1;
            set({
              currentStreak: newStreak,
              lastActiveDate: today,
              longestStreak: Math.max(newStreak, state.longestStreak),
            });
            return { maintained: true, lost: false, newStreak };
          } else if (diffDays === 2 && state.streakProtected) {
            // Missed one day but had streak protection
            const newStreak = state.currentStreak + 1;
            set({
              currentStreak: newStreak,
              lastActiveDate: today,
              longestStreak: Math.max(newStreak, state.longestStreak),
              streakProtected: false, // Used the protection
            });
            return { maintained: true, lost: false, newStreak };
          } else {
            // Streak lost
            set({
              currentStreak: 1,
              lastActiveDate: today,
            });
            return { maintained: false, lost: true, newStreak: 1 };
          }
        },

        incrementCardsViewed: () => {
          const state = get();
          const today = getToday();

          // Reset if new day
          const isNewDay = state.lastActiveDate !== today;
          const newCount = isNewDay ? 1 : state.cardsViewedToday + 1;
          const goalMet = newCount >= state.dailyGoal && !state.dailyGoalMet;

          set({
            cardsViewedToday: newCount,
            dailyGoalMet: newCount >= state.dailyGoal,
            lastActiveDate: today,
          });

          return { goalMet };
        },

        setDailyGoal: (goal) => set({ dailyGoal: goal }),

        unlockAchievement: (achievement) =>
          set((state) => {
            if (state.achievements.includes(achievement.id)) {
              return state; // Already unlocked
            }
            return {
              achievements: [...state.achievements, achievement.id],
              recentAchievements: [...state.recentAchievements, achievement],
            };
          }),

        clearRecentAchievements: () => set({ recentAchievements: [] }),

        claimDailyReward: () => {
          const state = get();
          const today = getToday();

          if (state.lastDailyRewardClaim === today) {
            return 0; // Already claimed today
          }

          // Reward based on streak
          const baseReward = 10;
          const streakBonus = Math.min(state.currentStreak, 7) * 5;
          const totalReward = baseReward + streakBonus;

          set({ lastDailyRewardClaim: today });

          // Add XP
          get().addXP(totalReward, 'first_of_day');

          return totalReward;
        },

        useStreakFreeze: () => {
          const state = get();
          if (state.streakProtected) {
            return false; // Already have protection
          }
          set({ streakProtected: true });
          return true;
        },

        getLevelInfo: () => {
          const state = get();
          const levelInfo = Gamification.levels.find((l) => l.level === state.level);
          return (
            levelInfo || {
              level: 1,
              name: 'Curious Mind',
              badge: '🌱',
              minXP: 0,
              maxXP: 100,
            }
          );
        },

        getXPForEvent: (eventType) => {
          const rewards = Gamification.xpRewards;
          const mapping: Record<XPEventType, number> = {
            card_view: rewards.cardView,
            card_like: rewards.cardLike,
            card_save: rewards.cardSave,
            card_share: rewards.cardShare,
            card_create: rewards.cardCreate,
            challenge_complete: rewards.challengeComplete,
            streak_maintain: rewards.streakMaintain,
            achievement_unlock: 50,
            daily_goal_met: rewards.dailyGoalMet,
            first_of_day: rewards.firstOfDay,
          };
          return mapping[eventType] || 0;
        },

        reset: () => set(initialState),
      }),
      {
        name: 'brainbites-gamification',
        storage: createJSONStorage(() => AsyncStorage),
      }
    ),
    { name: 'GamificationStore' }
  )
);
