// BrainBites Design System
// Dark theme with vibrant accents for dopamine-inducing experience

export const Colors = {
  // Primary - Electric Purple (knowledge/wisdom)
  primary: '#8B5CF6',
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',

  // Secondary - Cyan (discovery/curiosity)
  secondary: '#06B6D4',
  secondaryLight: '#22D3EE',
  secondaryDark: '#0891B2',

  // Accent - Amber (achievements/rewards)
  accent: '#F59E0B',
  accentLight: '#FBBF24',
  accentDark: '#D97706',

  // Success - Emerald
  success: '#10B981',
  successLight: '#34D399',
  successDark: '#059669',

  // Error - Rose
  error: '#F43F5E',
  errorLight: '#FB7185',
  errorDark: '#E11D48',

  // Background - Deep dark
  background: '#0A0A0F',
  backgroundSecondary: '#12121A',
  backgroundTertiary: '#1A1A24',

  // Surface - Cards and elevated elements
  surface: '#1E1E2A',
  surfaceHover: '#252532',
  surfaceBorder: '#2A2A3A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textTertiary: '#71717A',
  textMuted: '#52525B',

  // Card type colors
  cardInsight: '#8B5CF6',
  cardFact: '#06B6D4',
  cardQuote: '#F59E0B',
  cardVisionary: '#EC4899',
  cardBook: '#10B981',
  cardChallenge: '#EF4444',
  cardFlashcard: '#3B82F6',
  cardConcept: '#3B82F6',

  // Gradient stops
  gradientPurple: ['#8B5CF6', '#6366F1'],
  gradientCyan: ['#06B6D4', '#0EA5E9'],
  gradientSunset: ['#F59E0B', '#EF4444'],
  gradientNeon: ['#8B5CF6', '#EC4899'],
} as const;

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  massive: 64,
} as const;

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  display: 32,
  hero: 40,
} as const;

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  }),
} as const;

export const Animation = {
  // Durations
  fast: 150,
  normal: 250,
  slow: 400,
  verySlow: 600,

  // Spring configs for Reanimated
  spring: {
    gentle: { damping: 20, stiffness: 200 },
    bouncy: { damping: 10, stiffness: 180 },
    snappy: { damping: 15, stiffness: 400 },
    stiff: { damping: 20, stiffness: 500 },
  },
} as const;

// XP and Level thresholds
export const Gamification = {
  levels: [
    { level: 1, name: 'Curious Mind', minXP: 0, maxXP: 100, badge: '🌱' },
    { level: 2, name: 'Knowledge Seeker', minXP: 100, maxXP: 300, badge: '📖' },
    { level: 3, name: 'Quick Learner', minXP: 300, maxXP: 600, badge: '⚡' },
    { level: 4, name: 'Brain Builder', minXP: 600, maxXP: 1000, badge: '🧠' },
    { level: 5, name: 'Wisdom Collector', minXP: 1000, maxXP: 1500, badge: '💎' },
    { level: 6, name: 'Knowledge Master', minXP: 1500, maxXP: 2200, badge: '🏆' },
    { level: 7, name: 'Sage', minXP: 2200, maxXP: 3000, badge: '🔮' },
    { level: 8, name: 'Enlightened', minXP: 3000, maxXP: 4000, badge: '✨' },
    { level: 9, name: 'Guru', minXP: 4000, maxXP: 5500, badge: '🌟' },
    { level: 10, name: 'Transcendent', minXP: 5500, maxXP: Infinity, badge: '👑' },
  ],
  xpRewards: {
    cardView: 1,
    cardLike: 2,
    cardSave: 3,
    cardShare: 5,
    cardCreate: 20,
    challengeComplete: 15,
    streakMaintain: 5, // multiplied by streak days
    dailyGoalMet: 25,
    firstOfDay: 10,
  },
} as const;
