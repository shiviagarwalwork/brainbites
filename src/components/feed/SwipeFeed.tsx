import React, { useCallback, useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ViewToken,
  FlatList,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { haptics } from '@/services/haptics';
import { useFeedStore } from '@/stores/feedStore';
import { useGamificationStore } from '@/stores/gamificationStore';
import { CardRenderer } from './CardRenderer';
import { SwipeIndicator } from './SwipeIndicator';
import type { FeedCard, SwipeDirection } from '@/types';
import { Colors, Animation } from '@/constants/theme';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_HEIGHT * 0.15;

interface SwipeFeedProps {
  cards: FeedCard[];
  onLoadMore?: () => void;
  onSwipeUp?: (cardId: string) => void;
  onSwipeDown?: (cardId: string) => void;
}

export function SwipeFeed({
  cards,
  onLoadMore,
  onSwipeUp,
  onSwipeDown,
}: SwipeFeedProps) {
  const listRef = useRef<FlatList<FeedCard>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dwellStartTime = useRef<number>(Date.now());

  // Stores
  const { recordSwipe, trackDwellTime, likeCard } = useFeedStore();
  const { addXP, incrementCardsViewed } = useGamificationStore();

  // Animation values
  const translateY = useSharedValue(0);
  const swipeIndicatorOpacity = useSharedValue(0);
  const isSwipingUp = useSharedValue(false);

  // Track dwell time when card changes
  useEffect(() => {
    const currentCardId = cards[activeIndex]?.id;
    if (currentCardId) {
      // Record dwell time for previous card
      const elapsed = Date.now() - dwellStartTime.current;
      if (activeIndex > 0 && cards[activeIndex - 1]) {
        trackDwellTime(cards[activeIndex - 1].id, elapsed);
      }
      dwellStartTime.current = Date.now();

      // Track card view
      incrementCardsViewed();
      addXP(1, 'card_view');
    }
  }, [activeIndex]);

  const handleSwipeComplete = useCallback(
    (direction: SwipeDirection, cardId: string, dwellTime: number) => {
      haptics.medium();
      recordSwipe(cardId, direction, dwellTime);

      if (direction === 'up') {
        likeCard(cardId);
        addXP(2, 'card_like');
        onSwipeUp?.(cardId);
      } else {
        onSwipeDown?.(cardId);
      }
    },
    [recordSwipe, likeCard, addXP, onSwipeUp, onSwipeDown]
  );

  const scrollToNext = useCallback(() => {
    if (activeIndex < cards.length - 1) {
      listRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  }, [activeIndex, cards.length]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
      isSwipingUp.value = event.translationY < 0;

      // Show indicator based on swipe direction
      const progress = Math.abs(event.translationY) / SWIPE_THRESHOLD;
      swipeIndicatorOpacity.value = Math.min(progress, 1);
    })
    .onEnd((event) => {
      const cardId = cards[activeIndex]?.id;
      if (!cardId) return;

      const dwellTime = Date.now() - dwellStartTime.current;

      if (event.translationY < -SWIPE_THRESHOLD && event.velocityY < 0) {
        // Swipe up = Like
        translateY.value = withTiming(
          -SCREEN_HEIGHT,
          { duration: Animation.normal },
          () => {
            runOnJS(handleSwipeComplete)('up', cardId, dwellTime);
            runOnJS(scrollToNext)();
            translateY.value = 0;
          }
        );
      } else if (event.translationY > SWIPE_THRESHOLD && event.velocityY > 0) {
        // Swipe down = Skip
        translateY.value = withTiming(
          SCREEN_HEIGHT,
          { duration: Animation.normal },
          () => {
            runOnJS(handleSwipeComplete)('down', cardId, dwellTime);
            runOnJS(scrollToNext)();
            translateY.value = 0;
          }
        );
      } else {
        // Snap back
        translateY.value = withSpring(0, Animation.spring.snappy);
      }

      swipeIndicatorOpacity.value = withTiming(0, { duration: Animation.fast });
    });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    []
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = useCallback(
    ({ item, index }: { item: FeedCard; index: number }) => {
      const isActive = index === activeIndex;

      return (
        <CardWrapper
          card={item}
          isActive={isActive}
          translateY={translateY}
          gesture={gesture}
        />
      );
    },
    [activeIndex, translateY, gesture]
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Swipe Indicators */}
      <SwipeIndicator
        direction="up"
        opacity={swipeIndicatorOpacity}
        isActive={isSwipingUp}
      />
      <SwipeIndicator
        direction="down"
        opacity={swipeIndicatorOpacity}
        isActive={isSwipingUp}
      />

      {/* Card Feed */}
      <FlatList
        ref={listRef}
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </GestureHandlerRootView>
  );
}

// Separate component for animated card wrapper
interface CardWrapperProps {
  card: FeedCard;
  isActive: boolean;
  translateY: SharedValue<number>;
  gesture: ReturnType<typeof Gesture.Pan>;
}

function CardWrapper({ card, isActive, translateY, gesture }: CardWrapperProps) {
  const animatedStyle = useAnimatedStyle(() => {
    if (!isActive) {
      return {
        transform: [{ translateY: 0 }, { scale: 1 }],
        opacity: 1,
      };
    }

    const scale = interpolate(
      Math.abs(translateY.value),
      [0, SCREEN_HEIGHT],
      [1, 0.9],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      Math.abs(translateY.value),
      [0, SCREEN_HEIGHT],
      [1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }, { scale }],
      opacity,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <CardRenderer card={card} isActive={isActive} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  cardContainer: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});

export default SwipeFeed;
