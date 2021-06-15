<template>
  <view class="page">
    <view class="block">
      <view class="block__title">应用权限设置</view>
      <view class="block__body">
        <button class="small-btn" @tap="requestIgnoreBattery">
          检查电池优化
        </button>
        <button @tap="whiteListSetting">打开自启动设置页面</button>
        <button @tap="setPowerKeeper">打开设置省电策略</button>
        <button @tap="gotoBackstageWhiteListAutStart">
          一键配置后台运行,白名单,自启动
        </button>
        <button @tap="requestLocationPermissions">申请后台定位权限</button>
      </view>
    </view>
    <view class="block">
      <view class="block__title">
        <text>定位（后台任务）</text>
        <text
          :style="{
            backgroundColor: serviceRunning ? '#00ff00' : '#FF0000',
            color: '#FFFFFF',
            padding: '2px 4px',
            borderRadius: '10px',
            marginLeft: '10px',
            fontWeight: 'normal',
            fontSize: '0.8em',
          }"
        >
          {{ serviceRunning ? "已开启" : "未开启" }}
        </text>
      </view>
      <view class="block__body">
        <button v-if="!serviceRunning" type="primary" @tap="goStartService">
          开启后台服务
        </button>
        <button v-else type="warn" @tap="stopService">停止后台服务</button>
      </view>
    </view>
    <view class="block" style="display: none">
      <view class="block__title">
        <text>定位（定时任务）</text>
        <text
          :style="{
            backgroundColor: locating ? '#00ff00' : '#FF0000',
            color: '#FFFFFF',
            padding: '2px 4px',
            borderRadius: '10px',
            marginLeft: '10px',
            fontWeight: 'normal',
            fontSize: '0.8em',
          }"
        >
          {{ locating ? "已开启" : "未开启" }}
        </text>
      </view>
      <view class="block__body">
        <button v-if="!locating" type="primary" @tap="startTimer">
          开启定时任务
        </button>
        <button v-else type="warn" @tap="stopTimer">停止定时任务</button>
      </view>
    </view>
    <!-- <view style="margin: 10px; color: #007aff">
      <navigator url="gpsLocation">定位权限</navigator>
      <navigator url="floatMenus/floatMenus">悬浮球</navigator>
    </view> -->
    <view class="logs">
      <view v-for="l in logs" :key="l[0]">{{ l[1] }} {{ l[2] }}</view>
    </view>
  </view>
</template>

<script>
import { decodeLocation, reportPosition } from "../../api";

const pushLive = uni.requireNativePlugin("service-keep-live");
export default {
  data() {
    return {
      logs: [],
      locating: false,
      locateTimer: null,
      serviceRunning: false,
    };
  },
  onLoad() {
    //获取安卓版本号
    pushLive.checkAndroidVersion((res) => {
      this.addLog("安卓版本信息", res);
    });
    // //注意：开启服务之后，配置后台运行,白名单,自启动，即可实现长时间保活，黑屏传数据
    // this.goStartService();
    // // ！！！如果在设置后台运行的情况下，黑屏不发送数据，请使用setInterval代替 定时任务回调
    var globalEvent = uni.requireNativePlugin("globalEvent");
    globalEvent.addEventListener("doJobEvent", () => {
      this.addLog("插件定时任务执行");
      this.locate();
    });
    setInterval(() => {
      this.addLog("定时打点");
    }, 10000);
  },
  methods: {
    addLog(title, ...arr) {
      let str = "";
      try {
        arr.forEach((item) => {
          str += JSON.stringify(item);
        });
      } catch (e) {}
      const time = new Date();
      const timeStr = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      this.logs.unshift([
        time.getTime() + Math.random(),
        timeStr,
        `[${title}] ${str}`,
      ]);
      this.logs = this.logs.slice(0, 50);
      console.log(timeStr, title, ...arr);
    },
    goStartService() {
      this.startTimer();
      Promise.all([
        new Promise((resolve) => {
          pushLive.setJobTime(15, (res) => {
            this.addLog("设置后台服务运行间隔", res);
            resolve();
          });
        }),
        new Promise((resolve) => {
          //设置黑屏唤醒屏幕 单位分钟 10分钟
          pushLive.setWakeScreen(1, (res) => {
            this.addLog("设置黑屏点亮间隔", res);
            resolve();
          });
        }),
      ]).then(() => {
        let obj = {
          title: "禁毒管家APP",
          content: "正在后台运行",
          mode: 1, //0是省电模式 1流氓模式
          isShow: true, //true显示通知栏,false隐藏通知栏
        };
        pushLive.startService(obj, (res) => {
          this.addLog("开启后台服务", res);
          this.serviceRunning = true;
        });
      });
      // //判断是否加入白名单
      // pushLive.isIgnoringBatteryOptimizations((res) => {
      //   this.addLog("启动服务-检查电量优化设置", res);
      //   let flag = res.flag;
      //   if (flag == false) {
      //     //提示 如果为了提高黑屏传点效果可以使用第二种申请加入白名单方式
      //     //第一种申请加入白名单 只设置电量优化
      //     /*pushLive.requestIgnoreBatteryOptimizations((res) =>  {
      // 			        console.log(res)
      // 			    });*/
      //     //第二种 申请加入白名单，设置后台无限制，自启动（无需设置），设置电量优化
      //     pushLive.gotoBackstage_WhiteList_autStart();
      //   }
      // });
      //设置定时任务触发时间 单位秒 60秒
      //如果在设置后台运行的情况下，黑屏不发送数据，请使用setInterval代替
    },
    stopService() {
      this.stopTimer();
      pushLive.closeService((res) => {
        this.addLog("关闭后台服务", res);
        this.serviceRunning = false;
      });
    },
    //申请加入白名单
    requestIgnoreBattery() {
      pushLive.isIgnoringBatteryOptimizations((res) => {
        let flag = res.flag;
        if (flag) {
          this.addLog("省电策略已经正确设置");
        } else {
          this.addLog("打开省电策略设置页面");
          pushLive.requestIgnoreBatteryOptimizations((res) => {
            this.addLog("申请加入白名单结果", res);
          });
        }
      });
    },
    setPowerKeeper() {
      this.addLog("打开省电策略设置页面");
      pushLive.SetPowerKeeper((res) => {
        this.addLog("设置省电策略结果", res);
      });
    },
    //设置app自启动
    whiteListSetting() {
      // 打开自启动管理页面
      pushLive.gotoWhiteListSetting();
    },
    gotoBackstageWhiteListAutStart() {
      pushLive.gotoBackstage_WhiteList_autStart();
    },
    requestLocationPermissions() {
      pushLive.isLocationPermissions((res) => {
        let flag = res.flag;
        if (flag) {
          this.addLog("定位权限已经正确设置");
        } else {
          this.addLog("申请定位权限");
          pushLive.requestLocationPermissions();
        }
      });
    },
    startTimer() {
      if (this.locating) {
        this.addLog("定时任务已经开启");
        return;
      }
      this.addLog("开启定时任务");
      this.locating = true;
      this.locateTimer = setInterval(() => {
        this.locate();
      }, 10000);
    },
    stopTimer() {
      clearInterval(this.locateTimer);
      this.locating = false;
    },
    // 执行定位操作
    locate() {
      this.addLog("开始获取定位");
      uni.getLocation({
        type: "gcj02",
        success: (res) => {
          const { latitude, longitude } = res;

          decodeLocation(latitude, longitude)
            .then((res) => {
              const formatted_address = res.data.regeocode.formatted_address;
              const location = {
                position: formatted_address,
                lat: latitude,
                lng: longitude,
              };
              this.addLog("逆地址结果", location);
              const acl_user = "test_wxid";
              reportPosition(acl_user, location)
                .then((res) => {
                  this.addLog("定位上报成功", res.statusCode);
                })
                .catch((err) => {
                  this.addLog("定位上报失败", err);
                });
            })
            .catch((err) => {
              this.addLog("逆地址失败", err);
            });

          return;
          // this.addLog("获取定位成功", {
          //   latitude,
          //   longitude,
          // });
          // this.addLog("开始上报定位");

          uni.request({
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            url: "https://gateway-jd.d2.yilisafe.com/passport",
            data: {
              longitude: longitude,
              latitude: latitude,
              user_id: 1802,
            },
            method: "POST",
            success: (res) => {
              this.addLog("定位上报成功");
            },
          });
        },
        fail: (err) => {
          this.addLog("获取定位失败", err);
        },
      });
    },
  },
};
</script>

<style lang="scss">
.text-area {
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
}

.page {
  // background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

button {
  margin: 2px 0;
}
.small-btn {
  padding-top: 0;
  padding-bottom: 0;
}

.block {
  margin: 0 8px 4px;
  background: #ffffff;
  padding: 6px;
  border-radius: 4px;
  &__title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 6px;
  }
}

.logs {
  // height: 0;
  flex: 1;
  margin: 10px;
  background-color: #eeeeee;
}
</style>
