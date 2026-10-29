import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'utility-collection:favorites'

function readFavorites(): string[] {
  const value = uni.getStorageSync(STORAGE_KEY)
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

export const usePreferencesStore = defineStore('preferences', () => {
  const favoriteIds = ref<string[]>(readFavorites())

  function isFavorite(id: string) {
    return favoriteIds.value.includes(id)
  }

  function toggleFavorite(id: string) {
    favoriteIds.value = isFavorite(id)
      ? favoriteIds.value.filter((favoriteId) => favoriteId !== id)
      : [...favoriteIds.value, id]

    uni.setStorageSync(STORAGE_KEY, favoriteIds.value)
  }

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  }
})

