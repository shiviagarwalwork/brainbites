import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';

const CARD_TYPES = [
  { type: 'insight', icon: '💡', label: 'Insight', description: 'Share a key learning from a book or article' },
  { type: 'fact', icon: '🤯', label: 'Mind-Blowing Fact', description: 'Share an amazing fact with a source' },
  { type: 'quote', icon: '💬', label: 'Quote', description: 'Share an inspiring or thought-provoking quote' },
  { type: 'concept', icon: '🧩', label: 'Concept', description: 'Explain a concept in simple terms' },
  { type: 'challenge', icon: '🎯', label: 'Quiz Challenge', description: 'Create a quiz question for others' },
];

export default function CreateScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create</Text>
        <Text style={styles.subtitle}>Share knowledge with the world</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>What do you want to create?</Text>

        <View style={styles.cardTypes}>
          {CARD_TYPES.map((cardType) => (
            <Pressable
              key={cardType.type}
              style={({ pressed }) => [
                styles.cardTypeButton,
                pressed && styles.cardTypeButtonPressed,
              ]}
            >
              <Text style={styles.cardTypeIcon}>{cardType.icon}</Text>
              <View style={styles.cardTypeInfo}>
                <Text style={styles.cardTypeLabel}>{cardType.label}</Text>
                <Text style={styles.cardTypeDescription}>{cardType.description}</Text>
              </View>
              <Text style={styles.cardTypeArrow}>→</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.aiSection}>
          <View style={styles.aiHeader}>
            <Text style={styles.aiIcon}>✨</Text>
            <Text style={styles.aiTitle}>AI Assistant</Text>
          </View>
          <Text style={styles.aiDescription}>
            Paste an article URL or book passage and let AI help you create engaging cards
          </Text>
          <Pressable style={styles.aiButton}>
            <Text style={styles.aiButtonText}>Create with AI</Text>
          </Pressable>
        </View>
      </View>
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
  content: {
    flex: 1,
    padding: Spacing.xl,
    gap: Spacing.xxl,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  cardTypes: {
    gap: Spacing.md,
  },
  cardTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  cardTypeButtonPressed: {
    backgroundColor: Colors.surfaceHover,
  },
  cardTypeIcon: {
    fontSize: 28,
  },
  cardTypeInfo: {
    flex: 1,
    gap: Spacing.xxs,
  },
  cardTypeLabel: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  cardTypeDescription: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
  cardTypeArrow: {
    color: Colors.textTertiary,
    fontSize: FontSizes.xl,
  },
  aiSection: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  aiIcon: {
    fontSize: FontSizes.xxl,
  },
  aiTitle: {
    color: Colors.primary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  aiDescription: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
  },
  aiButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  aiButtonText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
});
