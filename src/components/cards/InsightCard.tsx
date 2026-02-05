import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseCard } from './BaseCard';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { InsightCard as InsightCardType } from '@/types';

interface InsightCardProps {
  card: InsightCardType;
  isActive: boolean;
}

export function InsightCard({ card, isActive }: InsightCardProps) {
  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{card.title}</Text>

        {/* Main Insight */}
        <Text style={styles.insight}>{card.insight}</Text>

        {/* Explanation */}
        <View style={styles.explanationContainer}>
          <Text style={styles.explanation}>{card.explanation}</Text>
        </View>

        {/* Key Takeaway */}
        <View style={styles.takeawayContainer}>
          <View style={styles.takeawayHeader}>
            <Text style={styles.takeawayIcon}>💎</Text>
            <Text style={styles.takeawayLabel}>KEY TAKEAWAY</Text>
          </View>
          <Text style={styles.takeaway}>{card.keyTakeaway}</Text>
        </View>

        {/* Source Book */}
        {card.sourceBook && (
          <View style={styles.bookSource}>
            <Text style={styles.bookIcon}>📖</Text>
            <View>
              <Text style={styles.bookTitle}>{card.sourceBook.title}</Text>
              <Text style={styles.bookAuthor}>by {card.sourceBook.author}</Text>
            </View>
          </View>
        )}
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.lg,
  },
  title: {
    color: Colors.primary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  insight: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.xxl * 1.3,
  },
  explanationContainer: {
    paddingVertical: Spacing.md,
  },
  explanation: {
    color: Colors.textSecondary,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * 1.6,
  },
  takeawayContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  takeawayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  takeawayIcon: {
    fontSize: FontSizes.md,
  },
  takeawayLabel: {
    color: Colors.primary,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    letterSpacing: 1,
  },
  takeaway: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.lg * 1.4,
  },
  bookSource: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  bookIcon: {
    fontSize: FontSizes.xxl,
  },
  bookTitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  bookAuthor: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
});

export default InsightCard;
