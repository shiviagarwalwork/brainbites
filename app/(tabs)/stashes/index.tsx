import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFeedStore } from '@/stores/feedStore';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';

const DEFAULT_STASHES = [
  { id: 'liked', name: 'Liked Cards', icon: '❤️', count: 0, isSystem: true },
  { id: 'saved', name: 'Saved for Later', icon: '🔖', count: 0, isSystem: true },
];

export default function StashesScreen() {
  const { likedCardIds, savedCardIds } = useFeedStore();

  const stashes = [
    { ...DEFAULT_STASHES[0], count: likedCardIds.size },
    { ...DEFAULT_STASHES[1], count: savedCardIds.size },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stashes</Text>
        <Text style={styles.subtitle}>Your saved knowledge</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* System Stashes */}
        <View style={styles.section}>
          {stashes.map((stash) => (
            <Pressable
              key={stash.id}
              style={({ pressed }) => [
                styles.stashCard,
                pressed && styles.stashCardPressed,
              ]}
            >
              <View style={styles.stashIcon}>
                <Text style={styles.stashIconText}>{stash.icon}</Text>
              </View>
              <View style={styles.stashInfo}>
                <Text style={styles.stashName}>{stash.name}</Text>
                <Text style={styles.stashCount}>{stash.count} cards</Text>
              </View>
              <Text style={styles.stashArrow}>→</Text>
            </Pressable>
          ))}
        </View>

        {/* Create Stash Button */}
        <Pressable style={styles.createButton}>
          <Text style={styles.createIcon}>+</Text>
          <Text style={styles.createText}>Create New Stash</Text>
        </Pressable>

        {/* Empty State for Custom Stashes */}
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📚</Text>
          <Text style={styles.emptyTitle}>Organize your learning</Text>
          <Text style={styles.emptyDescription}>
            Create custom stashes to organize cards by topic, project, or any way you like
          </Text>
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
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSizes.display,
    fontWeight: FontWeights.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.xl,
  },
  section: {
    gap: Spacing.md,
  },
  stashCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  stashCardPressed: {
    backgroundColor: Colors.surfaceHover,
  },
  stashIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stashIconText: {
    fontSize: 24,
  },
  stashInfo: {
    flex: 1,
    gap: Spacing.xxs,
  },
  stashName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  stashCount: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
  stashArrow: {
    color: Colors.textTertiary,
    fontSize: FontSizes.xl,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  createIcon: {
    color: Colors.primary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  createText: {
    color: Colors.primary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  emptyIcon: {
    fontSize: 48,
    opacity: 0.5,
  },
  emptyTitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  emptyDescription: {
    color: Colors.textTertiary,
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: FontSizes.md * 1.5,
    paddingHorizontal: Spacing.xl,
  },
});
