import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseCard } from './BaseCard';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { VisionaryCard as VisionaryCardType } from '@/types';

interface VisionaryCardProps {
  card: VisionaryCardType;
  isActive: boolean;
}

export function VisionaryCard({ card, isActive }: VisionaryCardProps) {
  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        {/* Visionary Profile */}
        <View style={styles.profileContainer}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {card.visionaryName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.visionaryName}>{card.visionaryName}</Text>
            <Text style={styles.visionaryTitle}>{card.visionaryTitle}</Text>
          </View>
        </View>

        {/* Prediction Label */}
        <View style={styles.predictionLabel}>
          <Text style={styles.predictionIcon}>🔮</Text>
          <Text style={styles.predictionText}>PREDICTION</Text>
          {card.year && <Text style={styles.predictionYear}>({card.year})</Text>}
        </View>

        {/* Main Prediction */}
        <Text style={styles.prediction}>{card.prediction}</Text>

        {/* Context */}
        <View style={styles.contextContainer}>
          <Text style={styles.contextLabel}>Context & Background:</Text>
          <Text style={styles.context}>{card.context}</Text>
        </View>

        {/* Source */}
        {card.source && (
          <View style={styles.sourceContainer}>
            <Text style={styles.sourceIcon}>📝</Text>
            <Text style={styles.sourceText}>{card.source}</Text>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.lg,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.cardVisionary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  profileInfo: {
    flex: 1,
  },
  visionaryName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  visionaryTitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
  },
  predictionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  predictionIcon: {
    fontSize: FontSizes.lg,
  },
  predictionText: {
    color: Colors.cardVisionary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    letterSpacing: 1,
  },
  predictionYear: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
  prediction: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.xxl * 1.3,
  },
  contextContainer: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.cardVisionary,
  },
  contextLabel: {
    color: Colors.cardVisionary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  context: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
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
    fontStyle: 'italic',
  },
});

export default VisionaryCard;
