<template>
    <div>
        <div class="room-list">
            <div class="room-item" :class="{emphasis:item.donate}" v-for="item in liveList" :key="item.rid"
                 @click="play(item)">
                <live-room :room="item"></live-room>
            </div>
        </div>
        <live-player :room="room" :isPlaying="isPlaying" @close="onPlayerClose"></live-player>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import liveRoom from './components/live-room.vue'
    import LivePlayer from "./components/live-player";

    export default {
        name: 'app',
        data() {
            return {
                listData: [],
                sortByDonate: true,//是否根据价格排序
                isPlaying: false,
                room: null,
            }
        },
        created() {
            this.jsonp({
                url: 'https://szroot.xue998.com/video_rest/index/anchor',
                callbackName: 'cb_anchor',
                callback: data => {
                    this.listData = data.anchors;
                }
            })
        },
        computed: {
            liveList() {
                let list = this.listData.filter(roomItem => {
                    return roomItem.status === 1 && roomItem.mode === 0;
                });
                if (this.sortByDonate) {
                    list.sort((a, b) => b.donate - a.donate)
                }
                return list;
            }
        },
        components: {
            LivePlayer,
            liveRoom
        },
        methods: {
            play(roomData) {
                this.isPlaying = true;
                this.room = roomData;
            },
            onPlayerClose() {
                this.isPlaying = false;
                this.room = null;
            }
        }
    }
</script>

<style>
    body {
        background: #F5F5EE;
        margin: 0 auto;
        max-width: 1200px;
    }

    #app {
    }

    .room-list {
        margin-top: 20px;
        /*padding-left: 4%;*/
        display: flex;
        flex-wrap: wrap;
        /*justify-content: space-around;*/
        align-items: stretch;
    }

    .room-item {
        width: 18%;
        min-width: 170px;
        margin-right: 15px;
        margin-bottom: 15px;
        word-break: break-all;
        box-sizing: border-box;
        background: #333;
    }

    .room-item:last-child {
        margin-right: auto;
    }

    .emphasis {
        position: relative;
    }

    .emphasis:before {
        content: '有料';
        position: absolute;
        /*width: 20px;*/
        height: 25px;
        text-align: center;
        line-height: 25px;
        padding: 0 5px;
        top: 5px;
        right: 5px;
        font-size: 15px;
        background: red;
        color: #fff;
        z-index: 1;
        border-radius: 7px;
    }
</style>
