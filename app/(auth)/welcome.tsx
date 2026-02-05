import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useUserStore } from '@/stores/userStore';
import { haptics } from '@/services/haptics';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';
import type { ContentCategory } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const INTEREST_OPTIONS: { id: ContentCategory; label: string; icon: string }[] = [
  { id: 'neuroscience', label: 'Neuroscience', icon: '🧠' },
  { id: 'psychology', label: 'Psychology', icon: '🧩' },
  { id: 'human_body', label: 'Human Body', icon: '❤️' },
  { id: 'health', label: 'Health & Longevity', icon: '🏃' },
  { id: 'ai_tech', label: 'AI & Technology', icon: '🤖' },
  { id: 'visionary_thinkers', label: 'Visionary Thinkers', icon: '🔮' },
  { id: 'science', label: 'Science', icon: '🔬' },
  { id: 'facts', label: 'Mind-Blowing Facts', icon: '🤯' },
  { id: 'book_summaries', label: 'Book Summaries', icon: '📚' },
];

export default function WelcomeScreen() {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<ContentCategory[]>([]);
  const { setInterests, setOnboarded } = useUserStore();

  const toggleInterest = (id: ContentCategory) => {
    haptics.selection();
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    haptics.medium();
    if (step === 0) {
      setStep(1);
    } else {
      // Save interests and complete onboarding
      setInterests(selectedInterests.length > 0 ? selectedInterests : ['facts', 'neuroscience', 'ai_tech']);
      setOnboarded(true);
      router.replace('/(tabs)/feed');
    }
  };

  const handleSkip = () => {
    haptics.light();
    setInterests(['facts', 'neuroscience', 'ai_tech', 'psychology', 'visionary_thinkers']);
    setOnboarded(true);
    router.replace('/(tabs)/feed');
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.background, Colors.background]}
      locations={[0, 0.4, 1]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {step === 0 ? (
          // Welcome Step
          <View style={styles.content}>
            <Animated.View entering={FadeInDown.delay(200)} style={styles.logoContainer}>
              <Text style={styles.logo}>🧠</Text>
              <Text style={styles.appName}>BrainBites</Text>
              <Text style={styles.tagline}>Get smarter in 5 minutes a day</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400)} style={styles.features}>
              <FeatureItem
                icon="⚡"
                title="Bite-sized knowledge"
                description="Learn fascinating facts in seconds"
              />
              <FeatureItem
                icon="🎯"
                title="Personalized feed"
                description="Content that matches your interests"
              />
              <FeatureItem
                icon="🏆"
                title="Gamified learning"
                description="Earn XP, maintain streaks, level up"
              />
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(600)} style={styles.actions}>
              <Pressable
                style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
                onPress={handleContinue}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
              </Pressable>
              <Pressable style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </Pressable>
            </Animated.View>
          </View>
        ) : (
          // Interest Selection Step
          <View style={styles.content}>
            <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
              <Text style={styles.stepTitle}>What interests you?</Text>
              <Text style={styles.stepSubtitle}>
                Select topics to personalize your feed (pick at least 3)
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(200)} style={styles.interestsGrid}>
              {INTEREST_OPTIONS.map((option, index) => (
                <Pressable
                  key={option.id}
                  style={[
                    styles.interestChip,
                    selectedInterests.includes(option.id) && styles.interestChipSelected,
                  ]}
                  onPress={() => toggleInterest(option.id)}
                >
                  <Text style={styles.interestIcon}>{option.icon}</Text>
                  <Text
                    style={[
                      styles.interestLabel,
                      selectedInterests.includes(option.id) && styles.interestLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400)} style={styles.actions}>
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                  selectedInterests.length < 3 && styles.buttonDisabled,
                ]}
                onPress={handleContinue}
                disabled={selectedInterests.length < 3}
              >
                <Text style={styles.primaryButtonText}>
                  Continue ({selectedInterests.length}/3+)
                </Text>
              </Pressable>
              <Pressable style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Skip personalization</Text>
              </Pressable>
            </Animated.View>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureItem}>
      <Text style={styles.featureIcon}>{icon}</Text>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xxl,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: Spacing.xxxl,
    gap: Spacing.sm,
  },
  logo: {
    fontSize: 80,
  },
  appName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.hero,
    fontWeight: FontWeights.extrabold,
  },
  tagline: {
    color: Colors.textSecondary,
    fontSize: FontSizes.lg,
  },
  features: {
    gap: Spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureText: {
    flex: 1,
    gap: Spacing.xxs,
  },
  featureTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  featureDescription: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
  },
  actions: {
    gap: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  skipButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  skipButtonText: {
    color: Colors.textTertiary,
    fontSize: FontSizes.md,
  },
  header: {
    paddingTop: Spacing.xl,
    gap: Spacing.sm,
  },
  stepTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  stepSubtitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    textAlign: 'center',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'center',
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  interestChipSelected: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: Colors.primary,
  },
  interestIcon: {
    fontSize: FontSizes.xl,
  },
  interestLabel: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  interestLabelSelected: {
    color: Colors.textPrimary,
  },
});
