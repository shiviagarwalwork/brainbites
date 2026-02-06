import React from 'react';
import type { FeedCard } from '@/types';
import { InsightCard } from '../cards/InsightCard';
import { FactCard } from '../cards/FactCard';
import { QuoteCard } from '../cards/QuoteCard';
import { VisionaryCard } from '../cards/VisionaryCard';
import { BookSummaryCard } from '../cards/BookSummaryCard';
import { ConceptCard } from '../cards/ConceptCard';
import { ChallengeCard } from '../cards/ChallengeCard';
import { FlashcardCard } from '../cards/FlashcardCard';

interface CardRendererProps {
  card: FeedCard;
  isActive: boolean;
}

const CARD_COMPONENTS: Record<string, React.ComponentType<{ card: any; isActive: boolean }>> = {
  insight: InsightCard,
  fact: FactCard,
  quote: QuoteCard,
  visionary: VisionaryCard,
  book_summary: BookSummaryCard,
  concept: ConceptCard,
  challenge: ChallengeCard,
  flashcard: FlashcardCard,
};

export function CardRenderer({ card, isActive }: CardRendererProps) {
  const Component = CARD_COMPONENTS[card.type];

  if (!Component) {
    if (__DEV__) console.warn(`Unknown card type: ${card.type}`);
    return null;
  }

  return <Component card={card} isActive={isActive} />;
}

export default CardRenderer;
