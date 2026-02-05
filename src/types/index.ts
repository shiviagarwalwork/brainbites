// ============================================
// CARD TYPES
// ============================================

export type CardType =
  | 'insight'
  | 'fact'
  | 'quote'
  | 'visionary'
  | 'book_summary'
  | 'concept'
  | 'challenge'
  | 'flashcard';

export type ContentCategory =
  | 'neuroscience'
  | 'psychology'
  | 'human_body'
  | 'health'
  | 'ai_tech'
  | 'visionary_thinkers'
  | 'science'
  | 'facts'
  | 'book_summaries';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface BaseCard {
  id: string;
  type: CardType;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  updatedAt: string;
  category: ContentCategory;
  topics: string[];
  tags: string[];
  difficulty: Difficulty;
  stats: CardStats;
  aiGenerated: boolean;
  sponsored?: boolean;
  sponsorName?: string;
}

export interface CardStats {
  views: number;
  likes: number;
  saves: number;
  shares: number;
  comments: number;
}

// Specific card types
export interface InsightCard extends BaseCard {
  type: 'insight';
  title: string;
  insight: string;
  explanation: string;
  keyTakeaway: string;
  sourceBook?: BookSource;
}

export interface FactCard extends BaseCard {
  type: 'fact';
  fact: string;
  explanation?: string;
  source: string;
  sourceUrl?: string;
  mindBlowingScore: number; // 1-10
}

export interface QuoteCard extends BaseCard {
  type: 'quote';
  quote: string;
  attribution: string;
  attributionTitle?: string;
  context?: string;
  attributionImage?: string;
}

export interface VisionaryCard extends BaseCard {
  type: 'visionary';
  visionaryName: string;
  visionaryTitle: string;
  visionaryImage?: string;
  prediction: string;
  context: string;
  year?: string;
  source?: string;
}

export interface BookSummaryCard extends BaseCard {
  type: 'book_summary';
  bookTitle: string;
  bookAuthor: string;
  bookCover?: string;
  keyInsight: string;
  whyItMatters: string;
  affiliateUrl?: string;
  affiliateProvider?: 'amazon' | 'bookshop' | 'audible';
}

export interface ConceptCard extends BaseCard {
  type: 'concept';
  concept: string;
  definition: string;
  simpleExplanation: string;
  examples: string[];
  relatedConcepts: string[];
}

export interface ChallengeCard extends BaseCard {
  type: 'challenge';
  question: string;
  options: ChallengeOption[];
  correctOptionId: string;
  explanation: string;
  xpReward: number;
  timeLimit?: number; // seconds
}

export interface ChallengeOption {
  id: string;
  text: string;
}

export interface FlashcardCard extends BaseCard {
  type: 'flashcard';
  front: string;
  back: string;
  hint?: string;
}

export interface BookSource {
  title: string;
  author: string;
  isbn?: string;
  coverUrl?: string;
  affiliateUrl?: string;
}

export type FeedCard =
  | InsightCard
  | FactCard
  | QuoteCard
  | VisionaryCard
  | BookSummaryCard
  | ConceptCard
  | ChallengeCard
  | FlashcardCard;

// ============================================
// USER TYPES
// ============================================

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;

  // Preferences
  interests: ContentCategory[];
  preferredDifficulty: Difficulty | 'mixed';
  dailyGoal: number;
  notificationsEnabled: boolean;

  // Stats
  stats: UserStats;

  // Gamification
  level: number;
  xp: number;
  currentStreak: number;
  longestStreak: number;
  achievements: string[];

  // Creator
  isCreator: boolean;
  creatorTier?: CreatorTier;
  followerCount: number;
  followingCount: number;

  createdAt: string;
  updatedAt: string;
}

export type CreatorTier = 'starter' | 'rising' | 'verified' | 'partner';

export interface UserStats {
  totalCardsViewed: number;
  totalCardsLiked: number;
  totalCardsSaved: number;
  totalCardsCreated: number;
  totalCardsShared: number;
  totalTimeSpent: number; // milliseconds
  cardsViewedToday: number;
  averageDwellTime: number;
}

export interface UserPreferences {
  userId: string;
  topicWeights: Record<string, number>;
  categoryWeights: Record<ContentCategory, number>;
  difficultyWeights: Record<Difficulty, number>;
  cardTypeWeights: Record<CardType, number>;
  noveltyRatio: number; // 0-1
  lastUpdated: string;
}

// ============================================
// INTERACTION TYPES
// ============================================

export type InteractionType = 'view' | 'like' | 'unlike' | 'save' | 'unsave' | 'share' | 'skip';

export type SwipeDirection = 'up' | 'down' | 'left' | 'right';

export interface CardInteraction {
  cardId: string;
  userId: string;
  type: InteractionType;
  dwellTime: number;
  timestamp: string;
  swipeDirection?: SwipeDirection;
}

// ============================================
// GAMIFICATION TYPES
// ============================================

export type XPEventType =
  | 'card_view'
  | 'card_like'
  | 'card_save'
  | 'card_share'
  | 'card_create'
  | 'challenge_complete'
  | 'streak_maintain'
  | 'achievement_unlock'
  | 'daily_goal_met'
  | 'first_of_day';

export interface XPEvent {
  id: string;
  userId: string;
  type: XPEventType;
  amount: number;
  cardId?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  requirement: AchievementRequirement;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
}

export type AchievementCategory =
  | 'learning'
  | 'streak'
  | 'social'
  | 'creation'
  | 'explorer'
  | 'master';

export interface AchievementRequirement {
  type: 'count' | 'streak' | 'time' | 'unique';
  metric: string;
  threshold: number;
}

export interface Level {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
  badge: string;
  perks: string[];
}

// ============================================
// SOCIAL TYPES
// ============================================

export interface Stash {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  coverImageUrl?: string;
  cardCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  cardId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  parentId?: string;
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  replies?: Comment[];
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

// ============================================
// CREATOR / MONETIZATION TYPES
// ============================================

export interface CreatorEarnings {
  userId: string;
  totalEarnings: number;
  affiliateEarnings: number;
  creatorFundEarnings: number;
  brandDealEarnings: number;
  pendingPayout: number;
  lastPayoutDate?: string;
  payoutHistory: PayoutRecord[];
}

export interface PayoutRecord {
  id: string;
  amount: number;
  date: string;
  method: 'paypal' | 'bank' | 'stripe';
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export interface AffiliateClick {
  id: string;
  cardId: string;
  userId: string;
  creatorId: string;
  provider: 'amazon' | 'bookshop' | 'audible' | 'coursera' | 'udemy';
  productId: string;
  clickedAt: string;
  converted: boolean;
  commission?: number;
}

// ============================================
// SPACED REPETITION
// ============================================

export interface ReviewRecord {
  cardId: string;
  userId: string;
  easeFactor: number; // Default 2.5
  interval: number; // Days until next review
  repetitions: number; // Consecutive correct reviews
  nextReviewDate: string;
  lastReviewDate?: string;
}

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0: Complete blackout
// 1: Incorrect, but recognized
// 2: Incorrect, easy to recall
// 3: Correct with difficulty
// 4: Correct with hesitation
// 5: Perfect response
