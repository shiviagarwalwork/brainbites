import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useGamificationStore } from '@/stores/gamificationStore';
import { useFeedStore } from '@/stores/feedStore';
import { useStashStore } from '@/stores/stashStore';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';

const DAILY_GOAL_OPTIONS = [5, 10, 15, 20, 30, 50];

export default function SettingsScreen() {
  const gamification = useGamificationStore();
  const feedStore = useFeedStore();
  const stashStore = useStashStore();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(false);

  const handleSetDailyGoal = (goal: number) => {
    gamification.setDailyGoal(goal);
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will reset your progress, stashes, and all saved data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear Everything',
          style: 'destructive',
          onPress: () => {
            gamification.reset();
            feedStore.reset();
            stashStore.reset();
            Alert.alert('Done', 'All data has been cleared.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backButton}>{'\u2039'} Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goal</Text>
          <Text style={styles.sectionSubtitle}>
            Cards to view per day (currently {gamification.dailyGoal})
          </Text>
          <View style={styles.goalGrid}>
            {DAILY_GOAL_OPTIONS.map((goal) => (
              <Pressable
                key={goal}
                style={[
                  styles.goalOption,
                  gamification.dailyGoal === goal && styles.goalOptionActive,
                ]}
                onPress={() => handleSetDailyGoal(goal)}
              >
                <Text
                  style={[
                    styles.goalText,
                    gamification.dailyGoal === goal && styles.goalTextActive,
                  ]}
                >
                  {goal}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Push Notifications</Text>
              <Text style={styles.toggleDescription}>Get notified about new content</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
              thumbColor={Colors.textPrimary}
            />
          </View>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Streak Reminders</Text>
              <Text style={styles.toggleDescription}>Don't lose your streak!</Text>
            </View>
            <Switch
              value={streakReminders}
              onValueChange={setStreakReminders}
              trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
              thumbColor={Colors.textPrimary}
            />
          </View>
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Daily Digest</Text>
              <Text style={styles.toggleDescription}>Morning summary of top cards</Text>
            </View>
            <Switch
              value={dailyDigest}
              onValueChange={setDailyDigest}
              trackColor={{ false: Colors.surfaceBorder, true: Colors.primary }}
              thumbColor={Colors.textPrimary}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>Build</Text>
            <Text style={styles.aboutValue}>1</Text>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors.error }]}>Danger Zone</Text>
          <Pressable
            style={({ pressed }) => [styles.dangerButton, pressed && { opacity: 0.7 }]}
            onPress={handleClearData}
          >
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  backButton: {
    color: Colors.primary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.medium,
  },
  headerTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.xxl,
    paddingBottom: Spacing.xxxl,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
  sectionSubtitle: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
  goalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  goalOption: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    minWidth: 64,
    alignItems: 'center',
  },
  goalOptionActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  goalText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  goalTextActive: {
    color: Colors.textPrimary,
    fontWeight: FontWeights.bold,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  toggleInfo: {
    flex: 1,
    gap: Spacing.xxs,
    marginRight: Spacing.md,
  },
  toggleLabel: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  toggleDescription: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  aboutLabel: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
  },
  aboutValue: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
  },
  dangerButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  dangerButtonText: {
    color: Colors.error,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
});
