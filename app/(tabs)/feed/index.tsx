import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { SwipeFeed } from '@/components/feed';
import { useFeedStore } from '@/stores/feedStore';
import { useGamificationStore } from '@/stores/gamificationStore';
import { allSeedCards, shuffleCards } from '@/data/seedCards';
import { Colors, Spacing, FontSizes, FontWeights } from '@/constants/theme';
import type { FeedCard } from '@/types';

export default function FeedScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { cards, setCards, appendCards } = useFeedStore();
  const { checkStreak, claimDailyReward, currentStreak, levelBadge, levelName, xp } =
    useGamificationStore();

  // Initialize feed on mount
  useEffect(() => {
    // Check and update streak
    const streakResult = checkStreak();
    if (streakResult.maintained && streakResult.newStreak > 0) {
      // Claim daily reward on first visit
      claimDailyReward();
    }

    // Load initial cards
    loadInitialCards();
  }, []);

  const loadInitialCards = async () => {
    setIsLoading(true);
    try {
      // Shuffle and load seed cards
      const shuffled = shuffleCards(allSeedCards);
      setCards(shuffled);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    // In a real app, this would fetch more cards from the API
    // For now, shuffle and append more seed cards
    const moreCards = shuffleCards(allSeedCards).map((card) => ({
      ...card,
      id: `${card.id}-${Date.now()}-${Math.random()}`,
    }));
    appendCards(moreCards);
  };

  const handleSwipeUp = (cardId: string) => {
    console.log('Liked card:', cardId);
  };

  const handleSwipeDown = (cardId: string) => {
    console.log('Skipped card:', cardId);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading your brain food...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.header}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>🔥</Text>
          <Text style={styles.statValue}>{currentStreak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.levelBadge}>{levelBadge}</Text>
          <Text style={styles.levelName}>{levelName}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>⚡</Text>
          <Text style={styles.statValue}>{xp}</Text>
          <Text style={styles.statLabel}>XP</Text>
        </View>
      </View>

      {/* Swipe Feed */}
      <SwipeFeed
        cards={cards}
        onLoadMore={handleLoadMore}
        onSwipeUp={handleSwipeUp}
        onSwipeDown={handleSwipeDown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  loadingText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.lg,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    backgroundColor: 'transparent',
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  statIcon: {
    fontSize: FontSizes.lg,
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  statLabel: {
    color: Colors.textTertiary,
    fontSize: FontSizes.xs,
  },
  levelContainer: {
    alignItems: 'center',
    gap: Spacing.xxs,
  },
  levelBadge: {
    fontSize: 32,
  },
  levelName: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
});
