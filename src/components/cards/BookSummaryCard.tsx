import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { BaseCard } from './BaseCard';
import { haptics } from '@/services/haptics';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { BookSummaryCard as BookSummaryCardType } from '@/types';

interface BookSummaryCardProps {
  card: BookSummaryCardType;
  isActive: boolean;
}

export function BookSummaryCard({ card, isActive }: BookSummaryCardProps) {
  const handleGetBook = async () => {
    if (card.affiliateUrl) {
      haptics.medium();
      try {
        await Linking.openURL(card.affiliateUrl);
      } catch (error) {
        console.error('Failed to open URL:', error);
      }
    }
  };

  const affiliateLabel = {
    amazon: 'Get on Amazon',
    bookshop: 'Get on Bookshop',
    audible: 'Listen on Audible',
  };

  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        {/* Book Info */}
        <View style={styles.bookHeader}>
          <View style={styles.bookCover}>
            <Text style={styles.bookCoverIcon}>📚</Text>
          </View>
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{card.bookTitle}</Text>
            <Text style={styles.bookAuthor}>by {card.bookAuthor}</Text>
          </View>
        </View>

        {/* Key Insight Label */}
        <View style={styles.insightLabel}>
          <Text style={styles.insightIcon}>💡</Text>
          <Text style={styles.insightText}>KEY INSIGHT</Text>
        </View>

        {/* Main Insight */}
        <Text style={styles.keyInsight}>{card.keyInsight}</Text>

        {/* Why It Matters */}
        <View style={styles.whyContainer}>
          <Text style={styles.whyLabel}>Why it matters:</Text>
          <Text style={styles.whyText}>{card.whyItMatters}</Text>
        </View>

        {/* Affiliate CTA */}
        {card.affiliateUrl && (
          <Pressable
            style={({ pressed }) => [
              styles.affiliateButton,
              pressed && styles.affiliateButtonPressed,
            ]}
            onPress={handleGetBook}
          >
            <Text style={styles.affiliateIcon}>
              {card.affiliateProvider === 'audible' ? '🎧' : '🛒'}
            </Text>
            <Text style={styles.affiliateText}>
              {affiliateLabel[card.affiliateProvider || 'amazon']}
            </Text>
            <Text style={styles.affiliateArrow}>→</Text>
          </Pressable>
        )}

        {/* Affiliate Disclosure */}
        <Text style={styles.disclosure}>
          We may earn a small commission if you purchase through this link.
        </Text>
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.lg,
  },
  bookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.lg,
  },
  bookCover: {
    width: 60,
    height: 80,
    backgroundColor: Colors.cardBook,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookCoverIcon: {
    fontSize: 32,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  bookAuthor: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    marginTop: Spacing.xxs,
  },
  insightLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  insightIcon: {
    fontSize: FontSizes.lg,
  },
  insightText: {
    color: Colors.cardBook,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    letterSpacing: 1,
  },
  keyInsight: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.xxl * 1.3,
  },
  whyContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.cardBook,
  },
  whyLabel: {
    color: Colors.cardBook,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  whyText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
  },
  affiliateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.cardBook,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.md,
  },
  affiliateButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  affiliateIcon: {
    fontSize: FontSizes.xl,
  },
  affiliateText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  affiliateArrow: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  disclosure: {
    color: Colors.textMuted,
    fontSize: FontSizes.xs,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default BookSummaryCard;
