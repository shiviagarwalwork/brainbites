import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseCard } from './BaseCard';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { ConceptCard as ConceptCardType } from '@/types';

interface ConceptCardProps {
  card: ConceptCardType;
  isActive: boolean;
}

export function ConceptCard({ card, isActive }: ConceptCardProps) {
  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        {/* Concept Name */}
        <View style={styles.conceptHeader}>
          <Text style={styles.conceptIcon}>🧩</Text>
          <Text style={styles.conceptName}>{card.concept}</Text>
        </View>

        {/* Definition */}
        <View style={styles.definitionContainer}>
          <Text style={styles.definitionLabel}>Definition:</Text>
          <Text style={styles.definition}>{card.definition}</Text>
        </View>

        {/* Simple Explanation */}
        <View style={styles.simpleContainer}>
          <Text style={styles.simpleLabel}>🎯 In Simple Terms:</Text>
          <Text style={styles.simpleExplanation}>{card.simpleExplanation}</Text>
        </View>

        {/* Examples */}
        <View style={styles.examplesContainer}>
          <Text style={styles.examplesLabel}>Examples:</Text>
          {card.examples.map((example, index) => (
            <View key={index} style={styles.exampleItem}>
              <Text style={styles.exampleBullet}>•</Text>
              <Text style={styles.exampleText}>{example}</Text>
            </View>
          ))}
        </View>

        {/* Related Concepts */}
        {card.relatedConcepts.length > 0 && (
          <View style={styles.relatedContainer}>
            <Text style={styles.relatedLabel}>Related:</Text>
            <View style={styles.relatedTags}>
              {card.relatedConcepts.map((concept, index) => (
                <View key={index} style={styles.relatedTag}>
                  <Text style={styles.relatedTagText}>{concept}</Text>
                </View>
              ))}
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
  conceptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  conceptIcon: {
    fontSize: FontSizes.display,
  },
  conceptName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.display,
    fontWeight: FontWeights.bold,
  },
  definitionContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.cardConcept,
  },
  definitionLabel: {
    color: Colors.cardConcept,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    marginBottom: Spacing.sm,
  },
  definition: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.lg * 1.4,
  },
  simpleContainer: {
    padding: Spacing.md,
  },
  simpleLabel: {
    color: Colors.accent,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  simpleExplanation: {
    color: Colors.textSecondary,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * 1.5,
  },
  examplesContainer: {
    gap: Spacing.sm,
  },
  examplesLabel: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.xs,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    paddingLeft: Spacing.sm,
  },
  exampleBullet: {
    color: Colors.secondary,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.md * 1.5,
  },
  exampleText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
  },
  relatedContainer: {
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  relatedLabel: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm,
  },
  relatedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  relatedTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  relatedTagText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
  },
});

export default ConceptCard;
