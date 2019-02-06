<template>
    <div class="container" :style="backgroundSource">

        <img style='width:100%;' :src='backgroundUrl' alt=""/>
        <div class="name">
            <!--{{room.rid}}-->
            {{ room.nickname}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'live-room',
        props: {
            room: Object,
        },
        computed: {
            backgroundSource() {
                return {
                    // 'background-image': `url(https://szroot.xue998.com/video_rest/video/img/get_cover?uid=${this.room.rid})`
                };
            },
            backgroundUrl() {
                return `https://szroot.xue998.com/video_rest/video/img/get_cover?uid=${this.room.rid}`
            }
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
        width: 100%;
        height: 50px;
        position: absolute;
        bottom: 0;
        background: linear-gradient(to bottom, #eee0 10%, #333);
        color: #fff;
        line-height: 50px;
    }
</style>
