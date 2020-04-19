<template>
	<view class="container">
		<view class="item" v-for="(item, index) in list" :key="item.sid">
			<!-- <image class="item__thumbnail" :src="item.thumbnail" mode="aspectFit" /> -->
			<video class="item__video" :id="'video_'+item.sid" @play="onVideoPlay(item.sid)" :src="item.video" :poster="item.thumbnail"
			 mode="aspectFit" objectFit="contain" />
			<view class="item__bottom">
				<image class="item__avatar" :src="item.header" mode="aspectFill" />
				<view class="item__title">
					<text class="item__name">{{item.name}}</text>
				</view>
			</view>
			<text class="item__text">{{item.text}}</text>
		</view>
		<uni-load-more :status="loading?'loading':'more'" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				loading: false,
				pageNo: 1,
				pageSize: 3,
				currentVideoId: null,
			}
		},
		mounted() {
			this.reset();
		},
		onReachBottom() {
			this.getData({
				pageNo: this.pageNo + 1,
				pageSize: this.pageSize,
			});
		},
		onPullDownRefresh() {
			console.log('onPullDownRefresh');
			this.reset().then(() => {
				uni.stopPullDownRefresh();
			})
		},
		methods: {
			onVideoPlay(videoId) {
				if (this.currentVideoId) {
					const videoContext = uni.createVideoContext(this.currentVideoId)
					videoContext.seek(0);
					videoContext.pause();
					this.currentVideoId = null;
				}
				this.currentVideoId = `video_${videoId}`;
				console.log(this.currentVideoId);
			},
			reset() {
				return this.getData({
					pageNo: 1,
					pageSize: this.pageSize,
				});
			},
			async getData({
				pageNo,
				pageSize
			}) {
				if (this.loading) {
					return;
				}
				console.log({
					pageNo,
					pageSize
				});
				this.loading = true;
				try {
					const [error, res] = await uni.request({
						url: 'https://api.apiopen.top/getJoke',
						method: 'GET',
						data: {
							page: pageNo,
							count: pageSize,
							type: 'video'
						}
					})
					console.log({
						error,
						res,
						data: res.data.result,
					});
					const list = pageNo === 1 ? res.data.result : this.list.concat(res.data.result);
					this.list = list;
					this.loading = false;
					this.pageNo = pageNo;
					this.pageSize = pageSize;
					return res;
				} catch (e) {
					this.loading = false;
					throw e;
				}
			}
		}
	}
</script>

<style>
	.container {
		/* padding: 20px; */
		font-size: 14px;
		line-height: 24px;
	}

	.item {
		margin-bottom: 15px;
	}

	.item__bottom {
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.item__avatar {
		width: 50rpx;
		height: 50rpx;
		border-radius: 25rpx;
		margin-right: 20rpx;
	}

	.item__name {}

	.item__video {
		width: 100%;
	}
	.item__text {
		padding: 0 20rpx;
	}
</style>
