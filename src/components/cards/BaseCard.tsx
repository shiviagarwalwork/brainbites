import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFeedStore } from '@/stores/feedStore';
import { haptics } from '@/services/haptics';
import { Colors, Spacing, BorderRadius, FontSizes, FontWeights } from '@/constants/theme';
import type { FeedCard, CardType } from '@/types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BaseCardProps {
  card: FeedCard;
  isActive: boolean;
  children: React.ReactNode;
  gradientColors?: readonly [string, string, ...string[]];
  categoryLabel?: string;
  categoryIcon?: string;
}

// Card type colors and icons
const CARD_STYLES: Record<CardType, { gradient: readonly [string, string]; icon: string; label: string }> = {
  insight: { gradient: ['#8B5CF6', '#6366F1'] as const, icon: '💡', label: 'INSIGHT' },
  fact: { gradient: ['#06B6D4', '#0EA5E9'] as const, icon: '🤯', label: 'MIND-BLOWING FACT' },
  quote: { gradient: ['#F59E0B', '#EF4444'] as const, icon: '💬', label: 'QUOTE' },
  visionary: { gradient: ['#EC4899', '#8B5CF6'] as const, icon: '🔮', label: 'VISIONARY' },
  book_summary: { gradient: ['#10B981', '#059669'] as const, icon: '📚', label: 'BOOK INSIGHT' },
  concept: { gradient: ['#3B82F6', '#6366F1'] as const, icon: '🧩', label: 'CONCEPT' },
  challenge: { gradient: ['#EF4444', '#F97316'] as const, icon: '🎯', label: 'CHALLENGE' },
  flashcard: { gradient: ['#8B5CF6', '#EC4899'] as const, icon: '🃏', label: 'FLASHCARD' },
};

export function BaseCard({
  card,
  isActive,
  children,
  gradientColors,
  categoryLabel,
  categoryIcon,
}: BaseCardProps) {
  const { isCardLiked, isCardSaved, likeCard, unlikeCard, saveCard, unsaveCard, shareCard } =
    useFeedStore();

  const cardStyle = CARD_STYLES[card.type];
  const colors = gradientColors || cardStyle.gradient;
  const icon = categoryIcon || cardStyle.icon;
  const label = categoryLabel || cardStyle.label;

  const liked = isCardLiked(card.id);
  const saved = isCardSaved(card.id);

  const handleLike = () => {
    haptics.like();
    if (liked) {
      unlikeCard(card.id);
    } else {
      likeCard(card.id);
    }
  };

  const handleSave = () => {
    haptics.save();
    if (saved) {
      unsaveCard(card.id);
    } else {
      saveCard(card.id);
    }
  };

  const handleShare = () => {
    haptics.share();
    shareCard(card.id);
    // TODO: Implement native share
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors[0], colors[1], Colors.background]}
        locations={[0, 0.3, 0.7]}
        style={styles.gradient}
      >
        {/* Category Badge */}
        <View style={styles.header}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={styles.categoryLabel}>{label}</Text>
          </View>
          {card.sponsored && (
            <View style={styles.sponsoredBadge}>
              <Text style={styles.sponsoredText}>Sponsored</Text>
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.content}>{children}</View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <ActionButton
            icon={liked ? '❤️' : '🤍'}
            count={card.stats.likes + (liked ? 1 : 0)}
            onPress={handleLike}
            active={liked}
          />
          <ActionButton
            icon={saved ? '🔖' : '📑'}
            count={card.stats.saves + (saved ? 1 : 0)}
            onPress={handleSave}
            active={saved}
          />
          <ActionButton icon="💬" count={card.stats.comments} onPress={() => {}} />
          <ActionButton icon="📤" count={card.stats.shares} onPress={handleShare} />
        </View>

        {/* Swipe Hint */}
        <View style={styles.swipeHint}>
          <Text style={styles.swipeHintText}>↑ Swipe up to like • Swipe down to skip ↓</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

interface ActionButtonProps {
  icon: string;
  count: number;
  onPress: () => void;
  active?: boolean;
}

function ActionButton({ icon, count, onPress, active }: ActionButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
      onPress={onPress}
    >
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={[styles.actionCount, active && styles.actionCountActive]}>
        {formatCount(count)}
      </Text>
    </Pressable>
  );
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  categoryIcon: {
    fontSize: FontSizes.md,
  },
  categoryLabel: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    letterSpacing: 1,
  },
  sponsoredBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.sm,
  },
  sponsoredText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.xs,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  actionButton: {
    alignItems: 'center',
    padding: Spacing.sm,
  },
  actionButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  actionIcon: {
    fontSize: FontSizes.xxl,
    marginBottom: Spacing.xxs,
  },
  actionCount: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
  },
  actionCountActive: {
    color: Colors.primary,
    fontWeight: FontWeights.bold,
  },
  swipeHint: {
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
  swipeHintText: {
    color: Colors.textTertiary,
    fontSize: FontSizes.xs,
  },
});

export default BaseCard;
