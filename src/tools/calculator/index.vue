<template>
  <view class="page-shell tool-page">
    <view class="tool-intro">
      <text class="tool-intro__label">CALCULATOR</text>
      <text class="tool-intro__title">基础计算器</text>
      <text class="tool-intro__description">输入两个数字并选择运算方式</text>
    </view>

    <view class="workbench">
      <label class="field-group">
        <text class="field-label">第一个数字</text>
        <input v-model="leftInput" class="text-field" type="digit" placeholder="例如 24" />
      </label>

      <view class="operation-list">
        <button
          v-for="item in operations"
          :key="item.value"
          class="operation-button"
          :class="{ 'operation-button--active': operation === item.value }"
          @tap="operation = item.value"
        >
          {{ item.label }}
        </button>
      </view>

      <label class="field-group">
        <text class="field-label">第二个数字</text>
        <input v-model="rightInput" class="text-field" type="digit" placeholder="例如 6" />
      </label>

      <button class="primary-button calculate-button" @tap="runCalculation">计算结果</button>
    </view>

    <view class="result-panel" :class="{ 'result-panel--error': errorMessage }">
      <text class="result-panel__label">结果</text>
      <text class="result-panel__value">{{ errorMessage || result || '—' }}</text>
      <button v-if="result && !errorMessage" class="copy-button" @tap="copyResult">复制</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { copyText } from '@/platform/clipboard'
import { calculate, formatResult, type Operation } from './logic'

const operations: Array<{ label: string; value: Operation }> = [
  { label: '+', value: 'add' },
  { label: '−', value: 'subtract' },
  { label: '×', value: 'multiply' },
  { label: '÷', value: 'divide' },
]

const leftInput = ref('')
const rightInput = ref('')
const operation = ref<Operation>('add')
const result = ref('')
const errorMessage = ref('')

function runCalculation() {
  errorMessage.value = ''
  result.value = ''

  try {
    if (!leftInput.value.trim() || !rightInput.value.trim()) {
      throw new Error('请填写两个数字')
    }
    result.value = formatResult(
      calculate(Number(leftInput.value), Number(rightInput.value), operation.value),
    )
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '计算失败'
  }
}

async function copyResult() {
  try {
    await copyText(result.value)
  } catch {
    uni.showToast({ title: '复制失败', icon: 'none' })
  }
}
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
.tool-intro__description {
  display: block;
}

.tool-intro__label {
  margin-bottom: 10rpx;
  color: #13795b;
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

.workbench {
  padding: 30rpx 0 36rpx;
  border-top: 2rpx solid #dde3e0;
  border-bottom: 2rpx solid #dde3e0;
  background: transparent;
}

.field-group {
  display: block;
}

.operation-list {
  display: flex;
  margin: 24rpx 0;
}

.operation-button {
  width: calc(25% - 12rpx);
  height: 72rpx;
  margin: 0 16rpx 0 0;
  padding: 0;
  border: 0;
  border-radius: 4rpx;
  background: #e7ecea;
  color: #48534e;
  font-size: 32rpx;
  line-height: 72rpx;
}

.operation-button:last-child {
  margin-right: 0;
}

.operation-button--active {
  background: #13795b;
  color: #ffffff;
}

.calculate-button {
  margin-top: 30rpx;
}

.result-panel {
  position: relative;
  margin-top: 24rpx;
  padding: 28rpx 110rpx 30rpx 30rpx;
  background: #dfeee7;
}

.result-panel--error {
  background: #f5dddd;
}

.result-panel__label,
.result-panel__value {
  display: block;
}

.result-panel__label {
  margin-bottom: 10rpx;
  color: #617069;
  font-size: 22rpx;
}

.result-panel__value {
  overflow-wrap: anywhere;
  color: #18201d;
  font-size: 40rpx;
  font-weight: 700;
}

.copy-button {
  position: absolute;
  top: 32rpx;
  right: 24rpx;
  height: 58rpx;
  margin: 0;
  padding: 0 18rpx;
  border: 0;
  border-radius: 4rpx;
  background: #c9ddd3;
  color: #13795b;
  font-size: 23rpx;
  line-height: 58rpx;
}
</style>
