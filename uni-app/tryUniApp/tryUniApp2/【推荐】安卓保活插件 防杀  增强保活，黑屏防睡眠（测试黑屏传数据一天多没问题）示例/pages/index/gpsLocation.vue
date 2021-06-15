<template>
	<view>
		<view class="text-area">
			<button @tap="isLocationPermissions">判断是否有定位权限</button>
			<button @tap="requestLocationPermissions">申请后台定位权限</button>
		</view>
	</view>
</template>

<script>
	const gpsListener = uni.requireNativePlugin('service-keep-live');
	export default {
		data() {
			return {
				gpsObj: {
					longitude: 0,
					latitude: 0,
					count: 0,
					status: ""
				}

			}
		},
		onLoad() {
			uni.getLocation({
				success(res) {
					console.log(res)
				}
			})
		},
		methods: {
			isLocationPermissions() {
				gpsListener.isLocationPermissions(function(res) {
					console.log(res)
				})
			},
			requestLocationPermissions() {
				gpsListener.requestLocationPermissions();
			},
			//检测是否开启定位
			openGPS() {
				let system = uni.getSystemInfoSync(); // 获取系统信息
				if (system.platform === 'android') { // 判断平台
					var context = plus.android.importClass("android.content.Context");
					var locationManager = plus.android.importClass("android.location.LocationManager");
					var main = plus.android.runtimeMainActivity();
					var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
					if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
						uni.showModal({
							title: '提示',
							content: '请打开定位服务功能',
							showCancel: false, // 不显示取消按钮
							success() {
								if (!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
									var Intent = plus.android.importClass('android.content.Intent');
									var Settings = plus.android.importClass('android.provider.Settings');
									var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
									main.startActivity(intent); // 打开系统设置GPS服务页面
								} else {
									console.log('GPS功能已开启');
								}
							}
						});
					}
				}
			}
		}
	}
</script>

<style>
	.text-area {
		display: flex;
		justify-content: center;
		flex-direction: column;
		justify-content: center;
	}

	button {
		margin: 5px;
	}
</style>
