<template>
  <view class="page-shell social-page">
    <AppNavigation active="social" />

    <view class="page-intro">
      <text class="page-intro__label">SOCIAL UI LAB</text>
      <text class="page-intro__title">社交界面</text>
      <text class="page-intro__description">即时通讯风格的动态与聊天界面演示</text>
    </view>

    <view class="safety-notice">
      <text class="safety-notice__title">仅限演示</text>
      <text class="safety-notice__text">所有预览固定带有演示标识，不能作为真实记录或凭证。</text>
    </view>

    <scroll-view class="demo-menu-scroll" scroll-x :show-scrollbar="false">
      <view class="demo-menu">
        <button
          v-for="item in demoMenus"
          :key="item.id"
          class="demo-menu__item"
          :class="{ 'demo-menu__item--active': activeDemo === item.id }"
          @tap="activeDemo = item.id"
        >
          {{ item.name }}
        </button>
      </view>
    </scroll-view>

    <view v-if="activeDemo === 'feed'" class="demo-section">
      <view class="section-heading">
        <text class="section-heading__title">动态界面</text>
        <text class="section-heading__meta">虚构动态流</text>
      </view>

      <view class="preview-frame feed-preview">
        <view class="preview-watermark">演示数据</view>
        <view class="moments-cover">
          <text class="moments-cover__placeholder">DESIGN PREVIEW</text>
          <view class="moments-profile">
            <text class="moments-profile__name">林间工作室</text>
            <view class="demo-avatar demo-avatar--cover">林</view>
          </view>
        </view>
        <view class="feed-item">
          <view class="profile-row">
            <view class="demo-avatar demo-avatar--green">岚</view>
            <view class="feed-body">
              <text class="profile-name">阿岚</text>
              <text class="feed-content">{{ feedText || '这是用于产品原型测试的示例动态。' }}</text>
              <view class="feed-media">
                <view class="feed-media__tile">原型</view>
                <view class="feed-media__tile">界面</view>
              </view>
              <view class="feed-meta-row">
                <text class="profile-meta">2 分钟前 · 虚构账号</text>
                <button class="feed-more">••</button>
              </view>
              <view class="feed-reactions">
                <text class="reaction-likes">赞 · 阿岚、小桥等 {{ likeCount }} 人</text>
                <view class="reaction-comment">
                  <text class="reaction-comment__name">小桥：</text>
                  <text>这个演示布局很清晰。</text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <text class="preview-caption">虚构内容 · 仅供界面测试</text>
      </view>

      <label class="control-group">
        <text class="field-label">演示文案</text>
        <textarea
          v-model="feedText"
          class="demo-textarea"
          :maxlength="120"
          placeholder="输入用于原型展示的内容"
        />
      </label>
      <view class="counter-control">
        <button class="counter-button" @tap="likeCount = clampDemoValue(likeCount - 1)">−</button>
        <text class="counter-value">{{ likeCount }} 个赞</text>
        <button class="counter-button" @tap="likeCount = clampDemoValue(likeCount + 1)">+</button>
      </view>
    </view>

    <view v-else class="demo-section">
      <view class="section-heading">
        <text class="section-heading__title">虚构聊天</text>
        <text class="section-heading__meta">即时通讯布局</text>
      </view>

      <view class="preview-frame chat-preview">
        <view class="preview-watermark">演示数据</view>
        <view class="chat-header">
          <text class="chat-header__title">原型讨论组（2）</text>
          <text class="chat-header__meta">2 位虚构成员</text>
        </view>
        <view class="message-list">
          <view
            v-for="message in messages"
            :key="message.id"
            class="message-row"
            :class="{ 'message-row--self': message.speaker === 'qiao' }"
          >
            <view
              class="demo-avatar demo-avatar--small"
              :class="message.speaker === 'qiao' ? 'demo-avatar--blue' : 'demo-avatar--green'"
            >
              {{ message.speaker === 'qiao' ? '桥' : '岚' }}
            </view>
            <view class="message-bubble">{{ message.text }}</view>
          </view>
        </view>
        <text class="preview-caption">虚构内容 · 仅供界面测试</text>
        <view class="chat-input-bar">
          <text class="chat-input-bar__voice">○</text>
          <input
            v-model="messageInput"
            class="chat-input-bar__field"
            type="text"
            :maxlength="80"
            confirm-type="send"
            placeholder="输入虚构对话内容"
            @confirm="addMessage"
          />
          <button v-if="messageInput" class="chat-send" @tap="addMessage">发送</button>
          <text v-else class="chat-input-bar__add">＋</text>
        </view>
      </view>

      <view class="chat-control-heading">
        <text class="field-label">发送身份</text>
        <button class="reset-link" @tap="resetMessages">重置对话</button>
      </view>
      <view class="speaker-switch">
        <button
          class="speaker-switch__item"
          :class="{ 'speaker-switch__item--active': speaker === 'lan' }"
          @tap="speaker = 'lan'"
        >
          阿岚
        </button>
        <button
          class="speaker-switch__item"
          :class="{ 'speaker-switch__item--active': speaker === 'qiao' }"
          @tap="speaker = 'qiao'"
        >
          小桥
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppNavigation from '@/components/AppNavigation.vue'
import {
  clampDemoValue,
  createInitialMessages,
  type ChatSpeaker,
  type DemoMessage,
} from './demo'

type DemoId = 'feed' | 'chat'

const demoMenus: Array<{ id: DemoId; name: string }> = [
  { id: 'feed', name: '动态界面' },
  { id: 'chat', name: '虚构聊天' },
]

const activeDemo = ref<DemoId>('feed')
const feedText = ref('今天完成了新的界面原型，准备进入体验测试。')
const likeCount = ref(12)
const speaker = ref<ChatSpeaker>('lan')
const messageInput = ref('')
const messages = ref<DemoMessage[]>(createInitialMessages())
let nextMessageId = 3

function addMessage() {
  const text = messageInput.value.trim()
  if (!text) {
    uni.showToast({ title: '请输入虚构消息', icon: 'none' })
    return
  }

  messages.value.push({
    id: nextMessageId,
    speaker: speaker.value,
    text,
  })
  nextMessageId += 1
  messageInput.value = ''
}

function resetMessages() {
  messages.value = createInitialMessages()
  nextMessageId = 3
}
</script>

<style scoped>
.social-page {
  padding-bottom: calc(56rpx + env(safe-area-inset-bottom));
}

.page-intro {
  padding: 2rpx 0 28rpx;
}

.page-intro__label,
.page-intro__title,
.page-intro__description,
.safety-notice__title,
.safety-notice__text,
.section-heading__title,
.section-heading__meta,
.profile-name,
.profile-meta,
.feed-content,
.preview-caption,
.chat-header__title,
.chat-header__meta {
  display: block;
}

.page-intro__label {
  margin-bottom: 10rpx;
  color: #13795b;
  font-size: 20rpx;
  font-weight: 700;
}

.page-intro__title {
  color: #18201d;
  font-size: 44rpx;
  font-weight: 720;
}

.page-intro__description {
  margin-top: 10rpx;
  color: #69756f;
  font-size: 25rpx;
}

.safety-notice {
  padding: 22rpx 24rpx;
  background: #f3e8ce;
  color: #624917;
}

.safety-notice__title {
  margin-bottom: 6rpx;
  font-size: 25rpx;
  font-weight: 700;
}

.safety-notice__text {
  font-size: 22rpx;
  line-height: 1.5;
}

.demo-menu-scroll {
  width: 100%;
  margin: 24rpx 0 30rpx;
  white-space: nowrap;
}

.demo-menu {
  display: inline-flex;
}

.demo-menu__item {
  height: 64rpx;
  margin: 0 14rpx 0 0;
  padding: 0 24rpx;
  border: 0;
  border-radius: 4rpx;
  background: #e6ebe9;
  color: #5f6b65;
  font-size: 24rpx;
  line-height: 64rpx;
}

.demo-menu__item::after,
.feed-more::after,
.counter-button::after,
.speaker-switch__item::after,
.chat-send::after,
.reset-link::after {
  border: 0;
}

.demo-menu__item--active {
  background: #13795b;
  color: #ffffff;
}

.demo-section {
  padding-top: 2rpx;
}

.section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 18rpx;
}

.section-heading__title {
  color: #202925;
  font-size: 30rpx;
  font-weight: 700;
}

.section-heading__meta {
  color: #87918c;
  font-size: 21rpx;
}

.preview-frame {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0 -32rpx 28rpx;
  padding: 30rpx 32rpx 24rpx;
  border-top: 2rpx solid #dce2df;
  border-bottom: 2rpx solid #dce2df;
  background: #ffffff;
}

.feed-preview {
  padding: 0 0 24rpx;
}

.moments-cover {
  position: relative;
  height: 280rpx;
  margin-bottom: 72rpx;
  background: #59666d;
}

.moments-cover__placeholder {
  position: absolute;
  top: 104rpx;
  left: 32rpx;
  color: rgba(255, 255, 255, 0.42);
  font-size: 25rpx;
  font-weight: 700;
}

.moments-profile {
  position: absolute;
  right: 32rpx;
  bottom: -54rpx;
  display: flex;
  align-items: center;
}

.moments-profile__name {
  margin: 0 18rpx 38rpx 0;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 700;
}

.demo-avatar.demo-avatar--cover {
  width: 108rpx;
  height: 108rpx;
  margin: 0;
  border: 4rpx solid #ffffff;
  background: #326f5d;
  font-size: 36rpx;
}

.feed-item {
  padding: 0 32rpx;
}

.feed-preview > .preview-caption {
  margin-right: 32rpx;
  margin-left: 32rpx;
}

.preview-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  border: 4rpx solid rgba(170, 82, 65, 0.2);
  color: rgba(170, 82, 65, 0.24);
  font-size: 56rpx;
  font-weight: 800;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(-16deg);
  white-space: nowrap;
}

.profile-row {
  display: flex;
  align-items: flex-start;
}

.demo-avatar {
  display: flex;
  flex: 0 0 72rpx;
  align-items: center;
  justify-content: center;
  width: 72rpx;
  height: 72rpx;
  margin-right: 18rpx;
  border-radius: 4rpx;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 700;
}

.demo-avatar--green {
  background: #28735a;
}

.demo-avatar--blue {
  background: #426c94;
}

.demo-avatar--small {
  flex-basis: 58rpx;
  width: 58rpx;
  height: 58rpx;
  margin-right: 14rpx;
  font-size: 23rpx;
}

.profile-name {
  color: #576b95;
  font-size: 27rpx;
  font-weight: 700;
}

.feed-body {
  min-width: 0;
  flex: 1;
}

.profile-meta {
  color: #999999;
  font-size: 20rpx;
}

.feed-content {
  margin-top: 12rpx;
  color: #1f1f1f;
  font-size: 27rpx;
  line-height: 1.55;
}

.feed-media {
  display: flex;
  margin: 18rpx 0;
}

.feed-media__tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150rpx;
  height: 112rpx;
  margin-right: 8rpx;
  background: #d8e0dc;
  color: #65716b;
  font-size: 23rpx;
}

.feed-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.feed-more {
  width: 64rpx;
  height: 42rpx;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 3rpx;
  background: #f0f0f2;
  color: #576b95;
  font-size: 25rpx;
  font-weight: 700;
  line-height: 42rpx;
}

.feed-reactions {
  margin-top: 14rpx;
  padding: 14rpx 16rpx;
  background: #f3f3f5;
  color: #262626;
  font-size: 23rpx;
  line-height: 1.5;
}

.reaction-likes {
  display: block;
  padding-bottom: 8rpx;
  border-bottom: 2rpx solid #e4e4e6;
  color: #576b95;
}

.reaction-comment {
  padding-top: 8rpx;
}

.reaction-comment__name {
  color: #576b95;
  font-weight: 600;
}

.preview-caption {
  margin-top: 18rpx;
  color: #a64f3e;
  font-size: 20rpx;
  font-weight: 700;
}

.control-group {
  display: block;
  margin-top: 24rpx;
}

.demo-textarea {
  box-sizing: border-box;
  width: 100%;
  height: 150rpx;
  padding: 20rpx 24rpx;
  border: 0;
  border-radius: 4rpx;
  background: #e9eeec;
  color: #18201d;
  font-size: 27rpx;
  line-height: 1.5;
}

.counter-control {
  display: flex;
  align-items: center;
  margin-top: 20rpx;
}

.counter-button {
  width: 72rpx;
  height: 64rpx;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 4rpx;
  background: #dfe6e3;
  color: #334039;
  font-size: 30rpx;
  line-height: 64rpx;
}

.counter-value {
  min-width: 180rpx;
  color: #334039;
  font-size: 25rpx;
  text-align: center;
}

.chat-preview {
  min-height: 430rpx;
  padding-bottom: 0;
  background: #ededed;
}

.chat-header {
  margin: -30rpx -32rpx 26rpx;
  padding: 20rpx 32rpx;
  border-bottom: 2rpx solid #d9d9d9;
  background: #ededed;
  text-align: center;
}

.chat-header__title {
  color: #27312c;
  font-size: 26rpx;
  font-weight: 700;
}

.chat-header__meta {
  margin-top: 4rpx;
  color: #89938e;
  font-size: 19rpx;
}

.message-list {
  display: flex;
  flex-direction: column;
}

.message-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 22rpx;
}

.message-row--self {
  flex-direction: row-reverse;
}

.message-row--self .demo-avatar {
  margin-right: 0;
  margin-left: 14rpx;
}

.message-bubble {
  max-width: 70%;
  padding: 16rpx 20rpx;
  border-radius: 4rpx;
  background: #ffffff;
  color: #26302c;
  font-size: 24rpx;
  line-height: 1.45;
}

.message-row--self .message-bubble {
  background: #95ec69;
}

.chat-input-bar {
  display: flex;
  align-items: center;
  margin: 26rpx -32rpx -24rpx;
  padding: 14rpx 20rpx;
  border-top: 2rpx solid #d6d6d6;
  background: #f7f7f7;
}

.chat-input-bar__voice,
.chat-input-bar__add {
  display: flex;
  flex: 0 0 56rpx;
  align-items: center;
  justify-content: center;
  width: 56rpx;
  height: 56rpx;
  color: #222222;
  font-size: 35rpx;
}

.chat-input-bar__field {
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  height: 68rpx;
  margin: 0 12rpx;
  padding: 0 18rpx;
  border-radius: 6rpx;
  background: #ffffff;
  color: #222222;
  font-size: 25rpx;
}

.chat-send {
  flex: 0 0 92rpx;
  height: 60rpx;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 5rpx;
  background: #07c160;
  color: #ffffff;
  font-size: 23rpx;
  line-height: 60rpx;
}

.chat-control-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.chat-control-heading .field-label {
  margin-bottom: 0;
}

.reset-link {
  height: 54rpx;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: #576b95;
  font-size: 22rpx;
  line-height: 54rpx;
}

.speaker-switch {
  display: flex;
  margin-bottom: 18rpx;
}

.speaker-switch__item {
  flex: 1;
  height: 66rpx;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: #e4e9e7;
  color: #647069;
  font-size: 24rpx;
  line-height: 66rpx;
}

.speaker-switch__item--active {
  background: #07c160;
  color: #ffffff;
}
</style>
