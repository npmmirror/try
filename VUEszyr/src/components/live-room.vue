<template>
    <div class="container" :style="backgroundSource">

        <!-- <image mode='widthFix' style='width:100%;' src = 'https://www.ufa.hk/uploads/ufa/gds/GoodsVO/2018/03/15/05kRp6ivQLGuuFX2QXJjYA.jpg' ></image>  -->
        <div class="name">
            {{room.rid}}
            <!--{{ room.nickname}}-->
        </div>
    </div>
</template>

<script>
    export default {
        name: 'live-room',
        props: {
            room: Object,
        },
        data() {
            return {};
        },
        computed: {
            backgroundSource() {
                return {
                    'background-image': 'url(https://www.ufa.hk/uploads/ufa/gds/GoodsVO/2018/03/15/05kRp6ivQLGuuFX2QXJjYA.jpg)',
                    // 'background-image':`url(https://szroot.youxuanmeijia.cn/video_rest/video/img/get_cover?uid=${this.room.rid})`
                };
            },
        },
    };
</script>

<style scoped>
    .container {
        background: no-repeat center;
        background-size: contain;
        text-align: center;
        min-height: 100px;
        position: relative;
    }

    .name {
        position: absolute;
        width: 100%;
        bottom: 0;
    }
</style>
