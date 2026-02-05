import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGamificationStore } from '@/stores/gamificationStore';
import { useFeedStore } from '@/stores/feedStore';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius, Gamification } from '@/constants/theme';

export default function ProfileScreen() {
  const {
    xp,
    level,
    levelName,
    levelBadge,
    levelProgress,
    xpToNextLevel,
    currentStreak,
    longestStreak,
    cardsViewedToday,
    dailyGoal,
    achievements,
  } = useGamificationStore();

  const { likedCardIds, savedCardIds, cardsViewedThisSession } = useFeedStore();

  const currentLevel = Gamification.levels[level - 1];
  const nextLevel = Gamification.levels[level] || currentLevel;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{levelBadge}</Text>
          </View>
          <Text style={styles.displayName}>Brain Explorer</Text>
          <Text style={styles.levelName}>{levelName}</Text>
        </View>

        {/* Level Progress */}
        <View style={styles.levelSection}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelLabel}>Level {level}</Text>
            <Text style={styles.xpLabel}>{xp} XP</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${levelProgress * 100}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {xpToNextLevel} XP to Level {level + 1} ({nextLevel.name})
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statValue}>{longestStreak}</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>❤️</Text>
            <Text style={styles.statValue}>{likedCardIds.size}</Text>
            <Text style={styles.statLabel}>Liked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔖</Text>
            <Text style={styles.statValue}>{savedCardIds.size}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>

        {/* Daily Progress */}
        <View style={styles.dailySection}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.dailyProgress}>
            <View style={styles.dailyInfo}>
              <Text style={styles.dailyCount}>
                {cardsViewedToday} / {dailyGoal}
              </Text>
              <Text style={styles.dailyLabel}>cards viewed</Text>
            </View>
            <View style={styles.dailyBar}>
              <View
                style={[
                  styles.dailyBarFill,
                  { width: `${Math.min((cardsViewedToday / dailyGoal) * 100, 100)}%` },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Achievements Preview */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <Pressable>
              <Text style={styles.seeAll}>See All →</Text>
            </Pressable>
          </View>
          <View style={styles.achievementsRow}>
            <View style={styles.achievementBadge}>
              <Text style={styles.achievementIcon}>🌱</Text>
              <Text style={styles.achievementName}>First Steps</Text>
            </View>
            <View style={styles.achievementBadge}>
              <Text style={styles.achievementIcon}>📖</Text>
              <Text style={styles.achievementName}>Bookworm</Text>
            </View>
            <View style={[styles.achievementBadge, styles.achievementLocked]}>
              <Text style={styles.achievementIcon}>🔒</Text>
              <Text style={styles.achievementName}>Locked</Text>
            </View>
          </View>
        </View>

        {/* Settings Links */}
        <View style={styles.settingsSection}>
          <Pressable style={styles.settingsLink}>
            <Text style={styles.settingsIcon}>⚙️</Text>
            <Text style={styles.settingsText}>Settings</Text>
            <Text style={styles.settingsArrow}>→</Text>
          </Pressable>
          <Pressable style={styles.settingsLink}>
            <Text style={styles.settingsIcon}>🎯</Text>
            <Text style={styles.settingsText}>Edit Daily Goal</Text>
            <Text style={styles.settingsArrow}>→</Text>
          </Pressable>
          <Pressable style={styles.settingsLink}>
            <Text style={styles.settingsIcon}>🔔</Text>
            <Text style={styles.settingsText}>Notifications</Text>
            <Text style={styles.settingsArrow}>→</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  avatar: {
    fontSize: 40,
  },
  displayName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  levelName: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  levelSection: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelLabel: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  xpLabel: {
    color: Colors.primary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  statCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  statLabel: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
  dailySection: {
    gap: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  dailyProgress: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  dailyInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  dailyCount: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  dailyLabel: {
    color: Colors.textTertiary,
    fontSize: FontSizes.md,
  },
  dailyBar: {
    height: 8,
    backgroundColor: Colors.surfaceBorder,
    borderRadius: 4,
    overflow: 'hidden',
  },
  dailyBarFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 4,
  },
  achievementsSection: {
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeAll: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  achievementsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  achievementBadge: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 24,
  },
  achievementName: {
    color: Colors.textSecondary,
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
  settingsSection: {
    gap: Spacing.sm,
  },
  settingsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  settingsIcon: {
    fontSize: FontSizes.xl,
  },
  settingsText: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
  },
  settingsArrow: {
    color: Colors.textTertiary,
    fontSize: FontSizes.lg,
  },
});
