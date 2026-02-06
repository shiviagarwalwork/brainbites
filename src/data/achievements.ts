import type { Achievement } from '@/types';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_like', name: 'First Like', description: 'Like your first card', icon: '❤️', category: 'learning', requirement: { type: 'count', metric: 'likes', threshold: 1 }, xpReward: 10, rarity: 'common' },
  { id: 'like_10', name: 'Appreciator', description: 'Like 10 cards', icon: '💕', category: 'learning', requirement: { type: 'count', metric: 'likes', threshold: 10 }, xpReward: 25, rarity: 'common' },
  { id: 'like_50', name: 'Love Machine', description: 'Like 50 cards', icon: '💖', category: 'learning', requirement: { type: 'count', metric: 'likes', threshold: 50 }, xpReward: 50, rarity: 'rare' },
  { id: 'like_100', name: 'Heart of Gold', description: 'Like 100 cards', icon: '💛', category: 'learning', requirement: { type: 'count', metric: 'likes', threshold: 100 }, xpReward: 100, rarity: 'epic' },
  { id: 'first_save', name: 'Collector', description: 'Save your first card', icon: '🔖', category: 'learning', requirement: { type: 'count', metric: 'saves', threshold: 1 }, xpReward: 10, rarity: 'common' },
  { id: 'save_25', name: 'Hoarder', description: 'Save 25 cards', icon: '📦', category: 'learning', requirement: { type: 'count', metric: 'saves', threshold: 25 }, xpReward: 50, rarity: 'rare' },
  { id: 'view_10', name: 'Curious Cat', description: 'View 10 cards', icon: '🐱', category: 'explorer', requirement: { type: 'count', metric: 'views', threshold: 10 }, xpReward: 15, rarity: 'common' },
  { id: 'view_50', name: 'Explorer', description: 'View 50 cards', icon: '🧭', category: 'explorer', requirement: { type: 'count', metric: 'views', threshold: 50 }, xpReward: 50, rarity: 'rare' },
  { id: 'view_100', name: 'Knowledge Seeker', description: 'View 100 cards', icon: '📖', category: 'explorer', requirement: { type: 'count', metric: 'views', threshold: 100 }, xpReward: 100, rarity: 'epic' },
  { id: 'view_500', name: 'Brain Devourer', description: 'View 500 cards', icon: '🧠', category: 'master', requirement: { type: 'count', metric: 'views', threshold: 500 }, xpReward: 250, rarity: 'legendary' },
  { id: 'streak_3', name: 'Getting Hooked', description: 'Maintain a 3-day streak', icon: '🔥', category: 'streak', requirement: { type: 'streak', metric: 'streak', threshold: 3 }, xpReward: 25, rarity: 'common' },
  { id: 'streak_7', name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '💪', category: 'streak', requirement: { type: 'streak', metric: 'streak', threshold: 7 }, xpReward: 75, rarity: 'rare' },
  { id: 'streak_30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '👑', category: 'streak', requirement: { type: 'streak', metric: 'streak', threshold: 30 }, xpReward: 300, rarity: 'legendary' },
  { id: 'daily_goal', name: 'Goal Getter', description: 'Complete your daily goal', icon: '🎯', category: 'learning', requirement: { type: 'count', metric: 'daily_goals', threshold: 1 }, xpReward: 25, rarity: 'common' },
  { id: 'daily_goal_7', name: 'Consistent', description: 'Complete daily goal 7 times', icon: '📅', category: 'learning', requirement: { type: 'count', metric: 'daily_goals', threshold: 7 }, xpReward: 100, rarity: 'rare' },
  { id: 'first_share', name: 'Sharing is Caring', description: 'Share your first card', icon: '📤', category: 'social', requirement: { type: 'count', metric: 'shares', threshold: 1 }, xpReward: 15, rarity: 'common' },
  { id: 'first_create', name: 'Creator', description: 'Create your first card', icon: '✏️', category: 'creation', requirement: { type: 'count', metric: 'creates', threshold: 1 }, xpReward: 20, rarity: 'common' },
  { id: 'level_5', name: 'Rising Star', description: 'Reach Level 5', icon: '⭐', category: 'master', requirement: { type: 'count', metric: 'level', threshold: 5 }, xpReward: 100, rarity: 'rare' },
  { id: 'level_10', name: 'Transcendent', description: 'Reach Level 10', icon: '✨', category: 'master', requirement: { type: 'count', metric: 'level', threshold: 10 }, xpReward: 500, rarity: 'legendary' },
];

export const RARITY_COLORS: Record<string, string> = {
  common: '#A1A1AA',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B',
};
