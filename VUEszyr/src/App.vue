<template>
    <div>
        <live-list></live-list>
    </div>
</template>

<script>
    import LiveList from "./liveList";

    export default {
        name: 'app',
        components: {
            LiveList,
        },
    }
</script>

<style>
    body {
        background: #F5F5EE;
        margin: 0 auto;
        max-width: 1200px;
    }
</style>
