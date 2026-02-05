import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Spacing, FontSizes, BorderRadius } from '@/constants/theme';
import { useGamificationStore } from '@/stores/gamificationStore';

export default function TabLayout() {
  const { currentStreak, level, levelBadge } = useGamificationStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🧠" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🔍" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused }) => (
            <View style={styles.createButton}>
              <Text style={styles.createIcon}>+</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="stashes"
        options={{
          title: 'Stashes',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📚" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={styles.profileIcon}>
              <Text style={styles.profileBadge}>{levelBadge}</Text>
              {currentStreak > 0 && (
                <View style={styles.streakBadge}>
                  <Text style={styles.streakText}>🔥{currentStreak}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconFocused]}>
      <Text style={[styles.tabIconText, focused && styles.tabIconTextFocused]}>
        {icon}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(10, 10, 15, 0.95)',
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
    height: 85,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xl,
  },
  tabBarLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    marginTop: Spacing.xxs,
  },
  tabIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconFocused: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  tabIconText: {
    fontSize: 22,
    opacity: 0.6,
  },
  tabIconTextFocused: {
    opacity: 1,
  },
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  createIcon: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  profileIcon: {
    position: 'relative',
  },
  profileBadge: {
    fontSize: 24,
  },
  streakBadge: {
    position: 'absolute',
    top: -4,
    right: -12,
    backgroundColor: Colors.accent,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: BorderRadius.sm,
  },
  streakText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.background,
  },
});
