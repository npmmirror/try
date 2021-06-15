<template>
	<view>
		<button @tap="showFloat">显示全局悬浮球</button>
		<button @tap="hideFloat">隐藏显示全局悬浮球</button>

	</view>
</template>

<script>
	const floatingBall = uni.requireNativePlugin('service-keep-live')
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			if (floatingBall) {
				floatingBall.configFloatBall({
						debug: true,
						backToMainPage: true,
						appid:"__UNI__9EDEB7D",
						//图标请放到static/floatBallIcon目录下
					},
					(ret) => {
						console.log(ret)
					}
				);
			} else {
				if (!floatingBall) {
					uni.showToast({
						title: "插件未加载",
						icon:'none',
						duration: 2000
					})
				}
			}
			//测试自动打开app界面
			setTimeout(function(){
				floatingBall.openAppView((res) => {
						console.log(res)
					});
			},1000*60)
		},
		methods: {
			showFloat: function() {
				if (floatingBall) {
					floatingBall.showFloatBallIcon();
				} else {
					if (!floatingBall) {
						uni.showToast({
							title: "插件未加载",
							duration: 3000
						})
					}
				}
			},
			hideFloat: function() {
				if (floatingBall) {
					floatingBall.hideFloatBallIcon();
				} else {
					if (!floatingBall) {
						uni.showToast({
							title: "插件未加载",
							duration: 3000
						})
					}
				}
			}
		}
	}
</script>

<style>

</style>
