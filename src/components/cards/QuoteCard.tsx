import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseCard } from './BaseCard';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { QuoteCard as QuoteCardType } from '@/types';

interface QuoteCardProps {
  card: QuoteCardType;
  isActive: boolean;
}

export function QuoteCard({ card, isActive }: QuoteCardProps) {
  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        {/* Large Quote Mark */}
        <Text style={styles.quoteMarkOpen}>"</Text>

        {/* Quote Text */}
        <Text style={styles.quote}>{card.quote}</Text>

        {/* Close Quote Mark */}
        <Text style={styles.quoteMarkClose}>"</Text>

        {/* Attribution */}
        <View style={styles.attributionContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {card.attribution.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.attributionInfo}>
            <Text style={styles.attributionName}>{card.attribution}</Text>
            {card.attributionTitle && (
              <Text style={styles.attributionTitle}>{card.attributionTitle}</Text>
            )}
          </View>
        </View>

        {/* Context */}
        {card.context && (
          <View style={styles.contextContainer}>
            <Text style={styles.contextLabel}>Context:</Text>
            <Text style={styles.context}>{card.context}</Text>
          </View>
        )}
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  quoteMarkOpen: {
    color: Colors.accent,
    fontSize: 80,
    fontWeight: FontWeights.bold,
    lineHeight: 80,
    marginBottom: -Spacing.xxl,
    opacity: 0.5,
  },
  quote: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.xxl * 1.4,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: Spacing.md,
  },
  quoteMarkClose: {
    color: Colors.accent,
    fontSize: 80,
    fontWeight: FontWeights.bold,
    lineHeight: 80,
    marginTop: -Spacing.xxl,
    opacity: 0.5,
    alignSelf: 'flex-end',
  },
  attributionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.background,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  attributionInfo: {
    alignItems: 'flex-start',
  },
  attributionName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  attributionTitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
  },
  contextContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignSelf: 'stretch',
    marginTop: Spacing.lg,
  },
  contextLabel: {
    color: Colors.accent,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  context: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
  },
});

export default QuoteCard;
