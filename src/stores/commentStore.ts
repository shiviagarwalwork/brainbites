import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Comment } from '@/types';

interface CommentState {
  comments: Record<string, Comment[]>;
  addComment: (cardId: string, content: string) => void;
  getComments: (cardId: string) => Comment[];
  getCommentCount: (cardId: string) => number;
  reset: () => void;
}

export const useCommentStore = create<CommentState>()(
  devtools(
    persist(
      (set, get) => ({
        comments: {},

        addComment: (cardId, content) =>
          set((state) => {
            const comment: Comment = {
              id: `comment_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
              cardId,
              userId: 'local_user',
              userName: 'Brain Explorer',
              content,
              likes: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            const existing = state.comments[cardId] || [];
            return { comments: { ...state.comments, [cardId]: [comment, ...existing] } };
          }),

        getComments: (cardId) => get().comments[cardId] || [],
        getCommentCount: (cardId) => (get().comments[cardId] || []).length,
        reset: () => set({ comments: {} }),
      }),
      { name: 'brainbites-comments', storage: createJSONStorage(() => AsyncStorage) }
    ),
    { name: 'CommentStore' }
  )
);
