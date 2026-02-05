import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { Colors, FontSizes, Spacing, BorderRadius } from '@/constants/theme';

interface SwipeIndicatorProps {
  direction: 'up' | 'down';
  opacity: SharedValue<number>;
  isActive: SharedValue<boolean>;
}

export function SwipeIndicator({ direction, opacity, isActive }: SwipeIndicatorProps) {
  const isUp = direction === 'up';

  const animatedStyle = useAnimatedStyle(() => {
    // Only show the relevant indicator based on swipe direction
    const shouldShow = isUp ? isActive.value : !isActive.value;

    return {
      opacity: shouldShow ? opacity.value : 0,
      transform: [
        {
          scale: interpolate(
            opacity.value,
            [0, 1],
            [0.8, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        isUp ? styles.top : styles.bottom,
        animatedStyle,
      ]}
      pointerEvents="none"
    >
      <View
        style={[
          styles.indicator,
          { backgroundColor: isUp ? Colors.success : Colors.textTertiary },
        ]}
      >
        <Text style={styles.icon}>{isUp ? '💚' : '👋'}</Text>
        <Text style={styles.text}>{isUp ? 'LIKE' : 'SKIP'}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  top: {
    top: 100,
  },
  bottom: {
    bottom: 150,
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
  },
  icon: {
    fontSize: FontSizes.xl,
  },
  text: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default SwipeIndicator;
