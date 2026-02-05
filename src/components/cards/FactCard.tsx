import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseCard } from './BaseCard';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { FactCard as FactCardType } from '@/types';

interface FactCardProps {
  card: FactCardType;
  isActive: boolean;
}

export function FactCard({ card, isActive }: FactCardProps) {
  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        {/* Mind-blowing score indicator */}
        <View style={styles.scoreContainer}>
          {Array.from({ length: 10 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.scoreDot,
                i < card.mindBlowingScore && styles.scoreDotActive,
              ]}
            />
          ))}
          <Text style={styles.scoreText}>Mind-Blowing Score</Text>
        </View>

        {/* Main Fact */}
        <Text style={styles.fact}>{card.fact}</Text>

        {/* Explanation */}
        {card.explanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationLabel}>Why it matters:</Text>
            <Text style={styles.explanation}>{card.explanation}</Text>
          </View>
        )}

        {/* Source */}
        <View style={styles.sourceContainer}>
          <Text style={styles.sourceIcon}>📖</Text>
          <Text style={styles.sourceText}>Source: {card.source}</Text>
        </View>
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.xl,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  scoreDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreDotActive: {
    backgroundColor: Colors.secondary,
  },
  scoreText: {
    color: Colors.textTertiary,
    fontSize: FontSizes.xs,
    marginLeft: Spacing.sm,
  },
  fact: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.xxxl * 1.3,
  },
  explanationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.secondary,
  },
  explanationLabel: {
    color: Colors.secondary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  explanation: {
    color: Colors.textSecondary,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * 1.5,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sourceIcon: {
    fontSize: FontSizes.md,
  },
  sourceText: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
});

export default FactCard;
