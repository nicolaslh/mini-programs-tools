<template>
  <view class="app-navigation" aria-label="主导航">
    <button
      class="app-navigation__item"
      :class="{ 'app-navigation__item--active': active === 'tools' }"
      :aria-current="active === 'tools' ? 'page' : undefined"
      @tap="navigate('tools')"
    >
      工具
    </button>
    <button
      class="app-navigation__item"
      :class="{ 'app-navigation__item--active': active === 'social' }"
      :aria-current="active === 'social' ? 'page' : undefined"
      @tap="navigate('social')"
    >
      社交界面
    </button>
  </view>
</template>

<script setup lang="ts">
type NavigationKey = 'tools' | 'social'

const props = defineProps<{
  active: NavigationKey
}>()

const routes: Record<NavigationKey, string> = {
  tools: '/pages/index/index',
  social: '/pages/social/index',
}

function navigate(target: NavigationKey) {
  if (target === props.active) return

  uni.reLaunch({ url: routes[target] })
}
</script>

<style scoped>
.app-navigation {
  display: flex;
  height: 72rpx;
  margin-bottom: 28rpx;
  border-bottom: 2rpx solid #dce2df;
}

.app-navigation__item {
  position: relative;
  height: 72rpx;
  margin: 0 40rpx 0 0;
  padding: 0 2rpx;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #78837e;
  font-size: 27rpx;
  font-weight: 600;
  line-height: 72rpx;
}

.app-navigation__item::after {
  border: 0;
}

.app-navigation__item--active {
  color: #18201d;
}

.app-navigation__item--active::before {
  position: absolute;
  right: 0;
  bottom: -2rpx;
  left: 0;
  height: 6rpx;
  background: #13795b;
  content: '';
}
</style>
