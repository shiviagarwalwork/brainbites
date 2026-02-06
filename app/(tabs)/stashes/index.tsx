import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFeedStore } from '@/stores/feedStore';
import { useStashStore } from '@/stores/stashStore';
import { Colors, Spacing, FontSizes, FontWeights, BorderRadius } from '@/constants/theme';

const STASH_ICONS = ['📂', '🧠', '💡', '🔬', '📖', '🎯', '⚡', '🌟', '🎨', '🏗️', '💻', '🌍'];

export default function StashesScreen() {
  const { likedCardIds, savedCardIds } = useFeedStore();
  const { stashes, createStash, deleteStash } = useStashStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newStashName, setNewStashName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📂');

  const systemStashes = [
    { id: 'liked', name: 'Liked Cards', icon: '❤️', count: likedCardIds.size, isSystem: true },
    { id: 'saved', name: 'Saved for Later', icon: '🔖', count: savedCardIds.size, isSystem: true },
  ];

  const customStashes = stashes.filter((s) => !s.isSystem);

  const handleCreateStash = () => {
    if (!newStashName.trim()) return;
    createStash(newStashName.trim(), undefined, selectedIcon);
    setNewStashName('');
    setSelectedIcon('📂');
    setShowCreateModal(false);
  };

  const handleDeleteStash = (id: string, name: string) => {
    Alert.alert('Delete Stash', `Are you sure you want to delete "${name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteStash(id) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Stashes</Text>
        <Text style={styles.subtitle}>Your saved knowledge</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* System Stashes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Library</Text>
          {systemStashes.map((stash) => (
            <Pressable
              key={stash.id}
              style={({ pressed }) => [styles.stashCard, pressed && styles.stashCardPressed]}
            >
              <View style={styles.stashIcon}>
                <Text style={styles.stashIconText}>{stash.icon}</Text>
              </View>
              <View style={styles.stashInfo}>
                <Text style={styles.stashName}>{stash.name}</Text>
                <Text style={styles.stashCount}>{stash.count} cards</Text>
              </View>
              <Text style={styles.stashArrow}>{'\u203A'}</Text>
            </Pressable>
          ))}
        </View>

        {/* Custom Stashes */}
        {customStashes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Stashes</Text>
            {customStashes.map((stash) => (
              <Pressable
                key={stash.id}
                style={({ pressed }) => [styles.stashCard, pressed && styles.stashCardPressed]}
              >
                <View style={styles.stashIcon}>
                  <Text style={styles.stashIconText}>{stash.icon}</Text>
                </View>
                <View style={styles.stashInfo}>
                  <Text style={styles.stashName}>{stash.name}</Text>
                  <Text style={styles.stashCount}>{stash.cardIds.length} cards</Text>
                </View>
                <Pressable
                  onPress={() => handleDeleteStash(stash.id, stash.name)}
                  hitSlop={12}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteIcon}>{'✕'}</Text>
                </Pressable>
              </Pressable>
            ))}
          </View>
        )}

        {/* Create Stash Button */}
        <Pressable style={styles.createButton} onPress={() => setShowCreateModal(true)}>
          <Text style={styles.createIcon}>+</Text>
          <Text style={styles.createText}>Create New Stash</Text>
        </Pressable>

        {/* Empty State */}
        {customStashes.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyTitle}>Organize your learning</Text>
            <Text style={styles.emptyDescription}>
              Create custom stashes to organize cards by topic, project, or any way you like
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Create Stash Modal */}
      <Modal visible={showCreateModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Stash</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Stash name..."
              placeholderTextColor={Colors.textTertiary}
              value={newStashName}
              onChangeText={setNewStashName}
              autoFocus
              maxLength={30}
            />

            <Text style={styles.iconPickerLabel}>Choose an icon</Text>
            <View style={styles.iconGrid}>
              {STASH_ICONS.map((icon) => (
                <Pressable
                  key={icon}
                  style={[styles.iconOption, selectedIcon === icon && styles.iconOptionSelected]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <Text style={styles.iconOptionText}>{icon}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalCancel}
                onPress={() => {
                  setShowCreateModal(false);
                  setNewStashName('');
                }}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalCreate, !newStashName.trim() && styles.modalCreateDisabled]}
                onPress={handleCreateStash}
                disabled={!newStashName.trim()}
              >
                <Text style={styles.modalCreateText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSizes.display,
    fontWeight: FontWeights.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.md,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.xl,
    gap: Spacing.xl,
  },
  section: {
    gap: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  stashCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  stashCardPressed: {
    backgroundColor: Colors.surfaceHover,
  },
  stashIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stashIconText: {
    fontSize: 24,
  },
  stashInfo: {
    flex: 1,
    gap: Spacing.xxs,
  },
  stashName: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  stashCount: {
    color: Colors.textTertiary,
    fontSize: FontSizes.sm,
  },
  stashArrow: {
    color: Colors.textTertiary,
    fontSize: FontSizes.xxl,
  },
  deleteButton: {
    padding: Spacing.xs,
  },
  deleteIcon: {
    color: Colors.textTertiary,
    fontSize: FontSizes.md,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  createIcon: {
    color: Colors.primary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
  },
  createText: {
    color: Colors.primary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    gap: Spacing.md,
  },
  emptyIcon: {
    fontSize: 48,
    opacity: 0.5,
  },
  emptyTitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
  },
  emptyDescription: {
    color: Colors.textTertiary,
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: FontSizes.md * 1.5,
    paddingHorizontal: Spacing.xl,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    gap: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  modalTitle: {
    color: Colors.textPrimary,
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  iconPickerLabel: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconOptionSelected: {
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  iconOptionText: {
    fontSize: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  modalCancel: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  modalCancelText: {
    color: Colors.textSecondary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
  },
  modalCreate: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  modalCreateDisabled: {
    opacity: 0.4,
  },
  modalCreateText: {
    color: Colors.textPrimary,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
  },
});
