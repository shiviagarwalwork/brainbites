import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { BaseCard } from './BaseCard';
import { haptics } from '@/services/haptics';
import { useGamificationStore } from '@/stores/gamificationStore';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius, Animation } from '@/constants/theme';
import type { ChallengeCard as ChallengeCardType } from '@/types';

interface ChallengeCardProps {
  card: ChallengeCardType;
  isActive: boolean;
}

export function ChallengeCard({ card, isActive }: ChallengeCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const { addXP } = useGamificationStore();

  const isCorrect = selectedOption === card.correctOptionId;
  const shake = useSharedValue(0);
  const bounce = useSharedValue(1);

  const handleOptionSelect = (optionId: string) => {
    if (revealed) return;

    setSelectedOption(optionId);
    setRevealed(true);

    if (optionId === card.correctOptionId) {
      // Correct answer
      haptics.correctAnswer();
      addXP(card.xpReward, 'challenge_complete');
      bounce.value = withSequence(
        withTiming(1.1, { duration: 100 }),
        withSpring(1, Animation.spring.bouncy)
      );
    } else {
      // Wrong answer
      haptics.wrongAnswer();
      shake.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  };

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value }],
  }));

  return (
    <BaseCard card={card} isActive={isActive}>
      <View style={styles.content}>
        {/* Challenge Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🎯</Text>
          <Text style={styles.headerText}>CHALLENGE</Text>
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>+{card.xpReward} XP</Text>
          </View>
        </View>

        {/* Question */}
        <Animated.View style={[shakeStyle]}>
          <Text style={styles.question}>{card.question}</Text>
        </Animated.View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {card.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === card.correctOptionId;
            const showCorrect = revealed && isCorrectOption;
            const showIncorrect = revealed && isSelected && !isCorrectOption;

            return (
              <Pressable
                key={option.id}
                style={({ pressed }) => [
                  styles.option,
                  pressed && !revealed && styles.optionPressed,
                  showCorrect && styles.optionCorrect,
                  showIncorrect && styles.optionIncorrect,
                ]}
                onPress={() => handleOptionSelect(option.id)}
                disabled={revealed}
              >
                <Animated.View
                  style={[
                    styles.optionContent,
                    showCorrect && bounceStyle,
                  ]}
                >
                  <View
                    style={[
                      styles.optionIndicator,
                      showCorrect && styles.optionIndicatorCorrect,
                      showIncorrect && styles.optionIndicatorIncorrect,
                    ]}
                  >
                    {showCorrect && <Text style={styles.indicatorText}>✓</Text>}
                    {showIncorrect && <Text style={styles.indicatorText}>✗</Text>}
                    {!revealed && (
                      <Text style={styles.indicatorLetter}>
                        {String.fromCharCode(65 + card.options.indexOf(option))}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      showCorrect && styles.optionTextCorrect,
                      showIncorrect && styles.optionTextIncorrect,
                    ]}
                  >
                    {option.text}
                  </Text>
                </Animated.View>
              </Pressable>
            );
          })}
        </View>

        {/* Result & Explanation */}
        {revealed && (
          <View style={styles.resultContainer}>
            <View style={[styles.resultBadge, isCorrect ? styles.resultCorrect : styles.resultIncorrect]}>
              <Text style={styles.resultIcon}>{isCorrect ? '🎉' : '💡'}</Text>
              <Text style={styles.resultText}>
                {isCorrect ? `Correct! +${card.xpReward} XP` : 'Not quite!'}
              </Text>
            </View>
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationLabel}>Explanation:</Text>
              <Text style={styles.explanation}>{card.explanation}</Text>
            </View>
          </View>
        )}
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerIcon: {
    fontSize: FontSizes.xl,
  },
  headerText: {
    color: Colors.cardChallenge,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    letterSpacing: 1,
    flex: 1,
  },
  xpBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  xpText: {
    color: Colors.background,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
  },
  question: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes.xxl * 1.3,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: Colors.success,
  },
  optionIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: Colors.error,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  optionIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionIndicatorCorrect: {
    backgroundColor: Colors.success,
  },
  optionIndicatorIncorrect: {
    backgroundColor: Colors.error,
  },
  indicatorLetter: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
  },
  indicatorText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  optionText: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    lineHeight: FontSizes.lg * 1.4,
  },
  optionTextCorrect: {
    color: Colors.success,
    fontWeight: FontWeights.semibold,
  },
  optionTextIncorrect: {
    color: Colors.error,
  },
  resultContainer: {
    gap: Spacing.lg,
  },
  resultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  resultCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  resultIncorrect: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  resultIcon: {
    fontSize: FontSizes.xl,
  },
  resultText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  explanationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  explanationLabel: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    marginBottom: Spacing.sm,
  },
  explanation: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    lineHeight: FontSizes.md * 1.5,
  },
});

export default ChallengeCard;
