<template>
    <div id="app">
        <div class="room-list">
            <div class="room-item" :class="{emphasis:item.donate}" v-for="item in liveList" :key="item.rid"
                 @click="play(item)">
                <live-room v-if="true" :room="item" @click="play(item)"></live-room>
            </div>
        </div>
        <live-player v-show="isPlaying" :room="room" :isPlaying="isPlaying" @close="onPlayerClose"></live-player>
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
            onPlayerClose(){
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
        max-width: 750px;
    }

    #app {
    }

    .room-list {
        padding-left: 4%;
        display: flex;
        flex-wrap: wrap;
    }

    .room-item {
        width: 28%;
        margin-right: 4%;
        margin-bottom: 10px;
        background: #fff;
        word-break: break-all;
        border: 3px solid white;
        box-sizing: border-box;
    }

    .emphasis {
        border: 3px solid yellow;
    }
</style>
