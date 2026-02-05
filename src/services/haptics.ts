import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const isHapticsSupported = Platform.OS !== 'web';

/**
 * Haptic feedback service for BrainBites
 * Creates satisfying tactile responses that enhance the dopamine experience
 */
export const haptics = {
  // ==========================================
  // SWIPE INTERACTIONS
  // ==========================================

  /** Swipe up = Like - Medium satisfying bump */
  swipeUp: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  /** Swipe down = Skip - Light dismissive tap */
  swipeDown: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  /** Card appears in view - Subtle notification */
  cardAppear: () => {
    if (isHapticsSupported) {
      Haptics.selectionAsync();
    }
  },

  // ==========================================
  // BUTTON INTERACTIONS
  // ==========================================

  /** Light tap for most buttons */
  light: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  /** Medium tap for important actions */
  medium: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  /** Heavy tap for major actions */
  heavy: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  },

  /** Selection change (toggle, picker) */
  selection: () => {
    if (isHapticsSupported) {
      Haptics.selectionAsync();
    }
  },

  // ==========================================
  // GAMIFICATION FEEDBACK
  // ==========================================

  /** Success - Achievement unlocked, correct answer */
  success: () => {
    if (isHapticsSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },

  /** Level up - Exciting celebration pattern */
  levelUp: async () => {
    if (isHapticsSupported) {
      // Triple pulse celebration
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await delay(80);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await delay(80);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await delay(150);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },

  /** XP earned - Quick satisfying bump */
  xpEarned: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  /** Streak maintained - Celebration pattern */
  streakMaintained: async () => {
    if (isHapticsSupported) {
      // Ascending intensity
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await delay(100);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      await delay(100);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  },

  /** Achievement unlocked - Big celebration */
  achievementUnlocked: async () => {
    if (isHapticsSupported) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await delay(200);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      await delay(100);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  /** Daily goal completed */
  dailyGoalComplete: async () => {
    if (isHapticsSupported) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await delay(150);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  },

  // ==========================================
  // CHALLENGE / QUIZ FEEDBACK
  // ==========================================

  /** Correct answer */
  correctAnswer: () => {
    if (isHapticsSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },

  /** Wrong answer */
  wrongAnswer: () => {
    if (isHapticsSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  },

  /** Time running out warning */
  timeWarning: () => {
    if (isHapticsSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  },

  // ==========================================
  // SOCIAL INTERACTIONS
  // ==========================================

  /** Save to stash */
  save: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  /** Like/heart */
  like: async () => {
    if (isHapticsSupported) {
      // Double tap feel
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await delay(50);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  /** Share */
  share: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },

  /** Follow someone */
  follow: () => {
    if (isHapticsSupported) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },

  // ==========================================
  // ERROR / WARNING
  // ==========================================

  /** Error occurred */
  error: () => {
    if (isHapticsSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  },

  /** Warning */
  warning: () => {
    if (isHapticsSupported) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }
  },
};

// Helper function for delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default haptics;
