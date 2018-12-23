<template>
    <el-dialog
            v-loading="isLoading"
            :title="nickName"
            :visible.sync="isPlaying"
            :before-close="onClose"
            width="100%">
        <div id="playerContainer">
            {{rtmpUrl}}
            <!--<img :src="`https://szroot.youxuanmeijia.cn/video_rest/video/img/get_cover?uid=${room.rid}`"/>-->
        </div>
    </el-dialog>
</template>

<script>
    import getRtmp from '../util/getRtmpUrl';

    export default {
        name: "live-player",
        props: {
            room: Object,
            isPlaying: Boolean,
        },
        data() {
            return {
                rtmpUrl: '',
                isLoading: true,
                player: null
            }
        },
        created() {
        },
        watch: {
            isPlaying(newValue) {
                if (!newValue) return;
                this.rtmpUrl = '';
                this.isLoading = true;
                getRtmp(this.room.rid)
                    .then(rtmpUrl => {
                        this.rtmpUrl = rtmpUrl;
                        this.isLoading = false;
                    })
                    .catch(err => {
                        this.$message(err);
                        this.isLoading = false;
                        this.isPlaying = false;
                    });
            },
            rtmpUrl(newValue) {
                let source = newValue;
                source = "http://cyberplayerplay.kaywang.cn/cyberplayer/demo201711-L1.m3u8";
                // source = "rtmp://cyberplayerplay.kaywang.cn/cyberplayer/demo201711-L1"
                //香港卫视直播源
                // source = 'http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8';
                // source = 'rtmp://live.hkstv.hk.lxdns.com/live/hks';

                const cyberplayer = window.cyberplayer;
                if (source.endsWith('m3u8')) {
                    this.player = cyberplayer("playerContainer").setup({
                        width: 680, // 宽度，也可以支持百分比(不过父元素宽度要有)
                        height: 448, // 高度，也可以支持百分比
                        file: source, // <—hls直播地址
                        autostart: true,
                        stretching: "uniform",
                        volume: 100,
                        controls: true,
                        // ak: "41707430fa52422f83b8efdc797f90c1", // 公有云平台注册即可获得accessKey
                        ak: '515d61b893134f40bd4297b75a03494b',
                        isLive: true, // 必须设置，表明是直播视频
                        hls: {
                            reconnecttime: 5 // hls直播重连间隔秒数
                        },
                    });
                }
                if (source.startsWith('rtmp')) {
                    this.player = cyberplayer("playerContainer").setup({
                        width: 680,
                        height: 448,
                        file: source, // <—rtmp直播地址
                        autostart: true,
                        stretching: "uniform",
                        volume: 100,
                        controls: true,
                        rtmp: {
                            reconnecttime: 5, // rtmp直播的重连次数
                            bufferlength: 1 // 缓冲多少秒之后开始播放 默认1秒
                        },
                        // ak: "41707430fa52422f83b8efdc797f90c1", // 公有云平台注册即可获得accessKey
                        ak: '515d61b893134f40bd4297b75a03494b'
                    });
                }
            }
        },
        methods: {
            onClose() {
                this.$emit('close');
                this.player.remove();
            }
        },
        computed: {
            nickName() {
                if (this.room && typeof this.room === "object") {
                    return this.room.nickname;
                } else {
                    return '未知';
                }
            }
        }
    }
</script>

<style scoped>

</style>
