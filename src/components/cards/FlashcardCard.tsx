import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { BaseCard } from './BaseCard';
import { haptics } from '@/services/haptics';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius, Animation } from '@/constants/theme';
import type { FlashcardCard as FlashcardCardType } from '@/types';

interface FlashcardCardProps {
  card: FlashcardCardType;
  isActive: boolean;
}

export function FlashcardCard({ card, isActive }: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipProgress = useSharedValue(0);

  const handleFlip = () => {
    haptics.medium();
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    flipProgress.value = withTiming(newFlipped ? 1 : 0, { duration: Animation.slow });
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [0, 180], Extrapolation.CLAMP);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity: interpolate(flipProgress.value, [0, 0.5, 0.5, 1], [1, 1, 0, 0]),
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [180, 360], Extrapolation.CLAMP);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity: interpolate(flipProgress.value, [0, 0.5, 0.5, 1], [0, 0, 1, 1]),
    };
  });

  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>{'🃏'}</Text>
          <Text style={styles.headerText}>FLASHCARD</Text>
          <Text style={styles.flipHint}>
            {isFlipped ? 'Tap to see question' : 'Tap to reveal answer'}
          </Text>
        </View>

        <Pressable onPress={handleFlip} style={({ pressed }) => [styles.cardBody, pressed && styles.cardBodyPressed]}>
          <Animated.View style={[styles.cardFace, frontAnimatedStyle]}>
            <View style={styles.sideLabel}>
              <Text style={styles.sideLabelText}>QUESTION</Text>
            </View>
            <Text style={styles.frontText}>{card.front}</Text>
            {card.hint && (
              <View style={styles.hintContainer}>
                <Text style={styles.hintLabel}>Hint:</Text>
                <Text style={styles.hintText}>{card.hint}</Text>
              </View>
            )}
          </Animated.View>

          <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
            <View style={[styles.sideLabel, styles.sideLabelAnswer]}>
              <Text style={[styles.sideLabelText, styles.sideLabelTextAnswer]}>ANSWER</Text>
            </View>
            <Text style={styles.backText}>{card.back}</Text>
          </Animated.View>
        </Pressable>

        <View style={styles.instruction}>
          <Text style={styles.instructionText}>
            {isFlipped ? 'Tap the card to flip back' : 'Tap the card to reveal the answer'}
          </Text>
        </View>
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.xl },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  headerIcon: { fontSize: FontSizes.xl },
  headerText: { color: Colors.cardFlashcard, fontSize: FontSizes.sm, fontWeight: FontWeights.bold, letterSpacing: 1, flex: 1 },
  flipHint: { color: Colors.textTertiary, fontSize: FontSizes.sm },
  cardBody: { minHeight: 250, borderRadius: BorderRadius.xl, overflow: 'hidden' },
  cardBodyPressed: { opacity: 0.9 },
  cardFace: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: BorderRadius.xl,
    padding: Spacing.xxl,
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 250,
    gap: Spacing.lg,
  },
  cardBack: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  sideLabel: { backgroundColor: 'rgba(59, 130, 246, 0.2)', paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs, borderRadius: BorderRadius.full, alignSelf: 'center' },
  sideLabelAnswer: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  sideLabelText: { color: Colors.cardFlashcard, fontSize: FontSizes.xs, fontWeight: FontWeights.bold, letterSpacing: 1 },
  sideLabelTextAnswer: { color: Colors.success },
  frontText: { color: Colors.textPrimary, fontSize: FontSizes.xxl, fontWeight: FontWeights.bold, lineHeight: FontSizes.xxl * 1.3, textAlign: 'center' },
  backText: { color: Colors.textPrimary, fontSize: FontSizes.xl, fontWeight: FontWeights.semibold, lineHeight: FontSizes.xl * 1.4, textAlign: 'center' },
  hintContainer: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.lg },
  hintLabel: { color: Colors.accent, fontSize: FontSizes.sm, fontWeight: FontWeights.semibold },
  hintText: { color: Colors.textSecondary, fontSize: FontSizes.sm, flex: 1 },
  instruction: { alignItems: 'center' },
  instructionText: { color: Colors.textTertiary, fontSize: FontSizes.sm },
});

export default FlashcardCard;
