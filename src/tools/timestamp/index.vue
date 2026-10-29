<template>
  <view class="page-shell tool-page">
    <view class="tool-intro">
      <text class="tool-intro__label">TIME CONVERTER</text>
      <text class="tool-intro__title">时间戳转换</text>
      <text class="tool-intro__description">本地时间与 Unix 时间戳互转</text>
    </view>

    <view class="current-time">
      <view>
        <text class="current-time__label">当前时间戳（秒）</text>
        <text class="current-time__value">{{ currentTimestamp }}</text>
      </view>
      <button class="refresh-button" @tap="refreshCurrentTimestamp">刷新</button>
    </view>

    <view class="converter-section">
      <text class="section-title">时间戳转日期</text>
      <text class="field-hint">支持 10 位秒或 13 位毫秒</text>
      <input v-model="timestampInput" class="text-field" type="number" placeholder="例如 1792564508" />
      <button class="primary-button action-button" @tap="convertTimestamp">转换</button>
      <view v-if="timestampResult || timestampError" class="inline-result">
        <text :class="{ 'inline-result__error': timestampError }">
          {{ timestampError || timestampResult }}
        </text>
        <button v-if="timestampResult" class="inline-copy" @tap="copy(timestampResult)">复制</button>
      </view>
    </view>

    <view class="divider" />

    <view class="converter-section">
      <text class="section-title">日期转时间戳</text>
      <text class="field-hint">格式：YYYY-MM-DD HH:mm:ss</text>
      <input
        v-model="dateTimeInput"
        class="text-field"
        type="text"
        placeholder="例如 2026-10-21 14:35:08"
      />
      <button class="primary-button action-button" @tap="convertDateTime">转换</button>
      <view v-if="dateTimeResult || dateTimeError" class="inline-result">
        <text :class="{ 'inline-result__error': dateTimeError }">
          {{ dateTimeError || dateTimeResult }}
        </text>
        <button v-if="dateTimeResult" class="inline-copy" @tap="copy(dateTimeResult)">复制</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { copyText } from '@/platform/clipboard'
import { dateTimeToTimestamp, formatDateTime, timestampToDateTime } from './logic'

const currentTimestamp = ref('')
const timestampInput = ref('')
const timestampResult = ref('')
const timestampError = ref('')
const dateTimeInput = ref('')
const dateTimeResult = ref('')
const dateTimeError = ref('')

function refreshCurrentTimestamp() {
  const now = new Date()
  currentTimestamp.value = String(Math.floor(now.getTime() / 1000))
  if (!dateTimeInput.value) dateTimeInput.value = formatDateTime(now)
}

function convertTimestamp() {
  timestampResult.value = ''
  timestampError.value = ''
  try {
    timestampResult.value = timestampToDateTime(timestampInput.value)
  } catch (error) {
    timestampError.value = error instanceof Error ? error.message : '转换失败'
  }
}

function convertDateTime() {
  dateTimeResult.value = ''
  dateTimeError.value = ''
  try {
    dateTimeResult.value = dateTimeToTimestamp(dateTimeInput.value)
  } catch (error) {
    dateTimeError.value = error instanceof Error ? error.message : '转换失败'
  }
}

async function copy(value: string) {
  try {
    await copyText(value)
  } catch {
    uni.showToast({ title: '复制失败', icon: 'none' })
  }
}

onMounted(refreshCurrentTimestamp)
</script>

<style scoped>
.tool-page {
  padding-bottom: calc(48rpx + env(safe-area-inset-bottom));
}

.tool-intro {
  padding: 18rpx 2rpx 34rpx;
}

.tool-intro__label,
.tool-intro__title,
.tool-intro__description,
.current-time__label,
.current-time__value,
.field-hint {
  display: block;
}

.tool-intro__label {
  margin-bottom: 10rpx;
  color: #3f648c;
  font-size: 20rpx;
  font-weight: 700;
}

.tool-intro__title {
  color: #18201d;
  font-size: 42rpx;
  font-weight: 720;
}

.tool-intro__description {
  margin-top: 10rpx;
  color: #69756f;
  font-size: 25rpx;
}

.current-time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
  padding: 24rpx 26rpx;
  background: #dfe8f0;
}

.current-time__label {
  margin-bottom: 6rpx;
  color: #637281;
  font-size: 21rpx;
}

.current-time__value {
  color: #24384c;
  font-size: 34rpx;
  font-weight: 700;
}

.refresh-button,
.inline-copy {
  height: 58rpx;
  margin: 0;
  padding: 0 18rpx;
  border: 0;
  border-radius: 4rpx;
  background: #cbd8e3;
  color: #3f648c;
  font-size: 23rpx;
  line-height: 58rpx;
}

.converter-section {
  padding: 30rpx 0;
  background: transparent;
}

.field-hint {
  margin: 8rpx 0 18rpx;
  color: #7b8580;
  font-size: 22rpx;
}

.action-button {
  margin-top: 22rpx;
  background: #3f648c;
}

.inline-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60rpx;
  margin-top: 22rpx;
  padding-top: 20rpx;
  border-top: 2rpx solid #e7ebe9;
  color: #23352d;
  font-size: 28rpx;
  font-weight: 600;
}

.inline-result__error {
  color: #b43737;
  font-size: 24rpx;
  font-weight: 500;
}

.inline-copy {
  flex: 0 0 auto;
  margin-left: 20rpx;
}

.divider {
  height: 2rpx;
  background: #dde3e0;
}
</style>
