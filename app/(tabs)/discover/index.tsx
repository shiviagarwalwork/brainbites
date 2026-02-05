import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { ContentCategory } from '@/types';

const CATEGORIES: { id: ContentCategory; name: string; icon: string; description: string }[] = [
  {
    id: 'neuroscience',
    name: 'Neuroscience',
    icon: '🧠',
    description: 'How your brain works',
  },
  {
    id: 'psychology',
    name: 'Psychology',
    icon: '🧩',
    description: 'Mind and behavior',
  },
  {
    id: 'human_body',
    name: 'Human Body',
    icon: '❤️',
    description: 'Your amazing body',
  },
  {
    id: 'health',
    name: 'Health & Longevity',
    icon: '🏃',
    description: 'Live better, longer',
  },
  {
    id: 'ai_tech',
    name: 'AI & Technology',
    icon: '🤖',
    description: 'The future is now',
  },
  {
    id: 'visionary_thinkers',
    name: 'Visionary Thinkers',
    icon: '🔮',
    description: 'Ideas that shape tomorrow',
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Discover the universe',
  },
  {
    id: 'facts',
    name: 'Mind-Blowing Facts',
    icon: '🤯',
    description: 'Prepare to be amazed',
  },
  {
    id: 'book_summaries',
    name: 'Book Summaries',
    icon: '📚',
    description: 'Key insights from bestsellers',
  },
];

export default function DiscoverScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover</Text>
        <Text style={styles.subtitle}>Explore topics that fascinate you</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar Placeholder */}
        <Pressable style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search topics, creators, cards...</Text>
        </Pressable>

        {/* Trending Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Trending Today</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.trendingRow}>
              {['Dopamine', 'AGI', 'Atomic Habits', 'Naval Ravikant'].map((topic) => (
                <Pressable key={topic} style={styles.trendingChip}>
                  <Text style={styles.trendingText}>{topic}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Categories Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((category) => (
              <Pressable key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </Pressable>
            ))}
          </View>
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
    gap: Spacing.xxl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  searchIcon: {
    fontSize: FontSizes.xl,
  },
  searchPlaceholder: {
    color: Colors.textTertiary,
    fontSize: FontSizes.md,
  },
  section: {
    gap: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  trendingRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  trendingChip: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  trendingText: {
    color: Colors.primary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  categoryDescription: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
});
