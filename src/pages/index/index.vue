<template>
  <view class="page-shell home-page">
    <AppNavigation active="tools" />

    <view class="hero">
      <view>
        <text class="eyebrow">UTILITY COLLECTION</text>
        <text class="hero-title">随手工具</text>
        <text class="hero-description">常用功能，打开即用</text>
      </view>
      <view class="tool-count">
        <text class="tool-count__value">{{ tools.length }}</text>
        <text class="tool-count__label">个工具</text>
      </view>
    </view>

    <view class="search-box">
      <text class="search-box__symbol">⌕</text>
      <input
        v-model="keyword"
        class="search-box__input"
        confirm-type="search"
        placeholder="搜索名称或用途"
        placeholder-class="search-box__placeholder"
      />
      <text v-if="keyword" class="search-box__clear" @tap="keyword = ''">清除</text>
    </view>

    <scroll-view class="category-scroll" scroll-x :show-scrollbar="false">
      <view class="category-list">
        <button
          v-for="category in TOOL_CATEGORIES"
          :key="category"
          class="category-button"
          :class="{ 'category-button--active': activeCategory === category }"
          @tap="activeCategory = category"
        >
          {{ category }}
        </button>
      </view>
    </scroll-view>

    <view class="list-heading">
      <text class="section-title">{{ listTitle }}</text>
      <button
        class="favorites-toggle"
        :class="{ 'favorites-toggle--active': favoritesOnly }"
        @tap="favoritesOnly = !favoritesOnly"
      >
        {{ favoritesOnly ? '查看全部' : '只看收藏' }}
      </button>
    </view>

    <view v-if="filteredTools.length" class="tool-list">
      <view
        v-for="tool in filteredTools"
        :key="tool.id"
        class="tool-card"
        hover-class="tool-card--pressed"
        @tap="openTool(tool.route)"
      >
        <view class="tool-icon" :style="{ backgroundColor: tool.accent }">
          {{ tool.icon }}
        </view>
        <view class="tool-content">
          <view class="tool-title-row">
            <text class="tool-name">{{ tool.name }}</text>
            <text class="tool-category">{{ tool.category }}</text>
          </view>
          <text class="tool-description">{{ tool.description }}</text>
        </view>
        <button
          class="favorite-button"
          :class="{ 'favorite-button--active': preferences.isFavorite(tool.id) }"
          :aria-label="preferences.isFavorite(tool.id) ? '取消收藏' : '收藏'"
          @tap.stop="preferences.toggleFavorite(tool.id)"
        >
          {{ preferences.isFavorite(tool.id) ? '★' : '☆' }}
        </button>
      </view>
    </view>

    <view v-else class="empty-state">
      <text class="empty-state__title">没有匹配的工具</text>
      <text class="empty-state__description">换个关键词或分类试试</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppNavigation from '@/components/AppNavigation.vue'
import { usePreferencesStore } from '@/stores/preferences'
import { tools } from '@/tools/generated'
import { TOOL_CATEGORIES, type ToolCategory } from '@/types/tool'

const preferences = usePreferencesStore()
const keyword = ref('')
const activeCategory = ref<(typeof TOOL_CATEGORIES)[number]>('全部')
const favoritesOnly = ref(false)

const normalizedKeyword = computed(() => keyword.value.trim().toLocaleLowerCase())

const filteredTools = computed(() => {
  return tools.filter((tool) => {
    const matchesCategory =
      activeCategory.value === '全部' || tool.category === (activeCategory.value as ToolCategory)
    const matchesFavorite = !favoritesOnly.value || preferences.isFavorite(tool.id)
    const searchableText = [tool.name, tool.description, tool.category, ...tool.keywords]
      .join(' ')
      .toLocaleLowerCase()
    const matchesKeyword = !normalizedKeyword.value || searchableText.includes(normalizedKeyword.value)

    return matchesCategory && matchesFavorite && matchesKeyword
  })
})

const listTitle = computed(() => {
  if (favoritesOnly.value) return '我的收藏'
  if (activeCategory.value !== '全部') return `${activeCategory.value}工具`
  return '全部工具'
})

function openTool(route: string) {
  uni.navigateTo({
    url: route,
    fail: () => {
      uni.showToast({ title: '暂时无法打开', icon: 'none' })
    },
  })
}
</script>

<style scoped>
.home-page {
  padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
}

.hero {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 12rpx 0 30rpx;
}

.eyebrow,
.hero-title,
.hero-description,
.tool-count__value,
.tool-count__label {
  display: block;
}

.eyebrow {
  margin-bottom: 12rpx;
  color: #13795b;
  font-size: 20rpx;
  font-weight: 700;
}

.hero-title {
  color: #18201d;
  font-size: 46rpx;
  font-weight: 750;
  line-height: 1.2;
}

.hero-description {
  margin-top: 12rpx;
  color: #69756f;
  font-size: 26rpx;
}

.tool-count {
  min-width: 104rpx;
  padding-bottom: 4rpx;
  text-align: right;
}

.tool-count__value {
  color: #18201d;
  font-size: 42rpx;
  font-weight: 700;
}

.tool-count__label {
  color: #7a857f;
  font-size: 21rpx;
}

.search-box {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 24rpx;
  border: 0;
  border-radius: 4rpx;
  background: #e7ecea;
}

.search-box__symbol {
  margin-right: 16rpx;
  color: #65716b;
  font-size: 34rpx;
}

.search-box__input {
  flex: 1;
  height: 88rpx;
  color: #18201d;
  font-size: 28rpx;
}

.search-box__placeholder {
  color: #98a09c;
}

.search-box__clear {
  padding: 18rpx 0 18rpx 20rpx;
  color: #13795b;
  font-size: 24rpx;
}

.category-scroll {
  width: 100%;
  margin: 24rpx 0 32rpx;
  white-space: nowrap;
}

.category-list {
  display: inline-flex;
  padding-right: 4rpx;
}

.category-button {
  box-sizing: border-box;
  min-width: 104rpx;
  height: 62rpx;
  margin: 0 14rpx 0 0;
  padding: 0 24rpx;
  border: 0;
  border-radius: 4rpx;
  background: #e7ecea;
  color: #5b6761;
  font-size: 25rpx;
  line-height: 62rpx;
}

.category-button--active {
  background: #13795b;
  color: #ffffff;
}

.list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14rpx;
}

.favorites-toggle {
  height: 56rpx;
  margin: 0;
  padding: 0 18rpx;
  border: 0;
  border-radius: 4rpx;
  background: #e7ecea;
  color: #65716b;
  font-size: 23rpx;
  line-height: 56rpx;
}

.favorites-toggle--active {
  background: #f2e7cf;
  color: #8a5b0b;
}

.tool-list {
  display: flex;
  flex-direction: column;
  margin: 0 -32rpx;
  border-top: 2rpx solid #e0e5e2;
  border-bottom: 2rpx solid #e0e5e2;
  background: #ffffff;
}

.tool-card {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: 144rpx;
  margin: 0 32rpx;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #e7ebe9;
  border-radius: 0;
  background: transparent;
  transition: background-color 120ms ease;
}

.tool-card:last-child {
  border-bottom: 0;
}

.tool-card--pressed {
  background: #f0f3f2;
}

.tool-icon {
  display: flex;
  flex: 0 0 72rpx;
  align-items: center;
  justify-content: center;
  width: 72rpx;
  height: 72rpx;
  margin-right: 22rpx;
  border-radius: 4rpx;
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 750;
}

.tool-content {
  min-width: 0;
  flex: 1;
}

.tool-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.tool-name {
  overflow: hidden;
  color: #202925;
  font-size: 29rpx;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tool-category {
  flex: 0 0 auto;
  margin-left: 14rpx;
  color: #83908a;
  font-size: 19rpx;
}

.tool-description {
  display: block;
  overflow: hidden;
  color: #69756f;
  font-size: 24rpx;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.favorite-button {
  flex: 0 0 64rpx;
  width: 64rpx;
  height: 64rpx;
  margin: 0 0 0 16rpx;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #9aa39f;
  font-size: 38rpx;
  line-height: 64rpx;
}

.favorite-button--active {
  color: #d48b13;
}

.favorite-button::after {
  border: 0;
}

.empty-state {
  padding: 96rpx 32rpx;
  border-top: 2rpx solid #dfe4e1;
  text-align: center;
}

.empty-state__title,
.empty-state__description {
  display: block;
}

.empty-state__title {
  color: #38433e;
  font-size: 28rpx;
  font-weight: 650;
}

.empty-state__description {
  margin-top: 10rpx;
  color: #87918c;
  font-size: 24rpx;
}
</style>
