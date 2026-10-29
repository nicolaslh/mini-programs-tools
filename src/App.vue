<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'

onLaunch(() => {
  console.info('Utility collection started')
})
</script>

<style>
page {
  min-height: 100%;
  background: #f5f7f6;
  color: #18201d;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', sans-serif;
  font-size: 28rpx;
}

button {
  letter-spacing: 0;
}

button::after {
  border: 0;
}

.page-shell {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 32rpx;
}

.section-title {
  color: #26302c;
  font-size: 28rpx;
  font-weight: 650;
}

.field-label {
  display: block;
  margin-bottom: 12rpx;
  color: #5c6863;
  font-size: 24rpx;
}

.text-field {
  box-sizing: border-box;
  width: 100%;
  height: 88rpx;
  padding: 0 24rpx;
  border: 0;
  border-radius: 4rpx;
  background: #e9eeec;
  color: #18201d;
  font-size: 30rpx;
}

.primary-button,
.secondary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 84rpx;
  border-radius: 4rpx;
  font-size: 28rpx;
  font-weight: 650;
  line-height: 84rpx;
}

.primary-button {
  background: #13795b;
  color: #ffffff;
}

.secondary-button {
  border: 0;
  background: #e9eeec;
  color: #26302c;
}
</style>
