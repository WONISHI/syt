<template>
    <div v-if="$route.query.orderId">
        <detail />
    </div>
    <div v-else>
        <alldetail />
    </div>
</template>
<script lang="ts" setup>
import {useRoute} from 'vue-router';
import detail from '@/view/user/components/detail/index.vue'
import alldetail from '@/view/user/components/alldetail/index.vue'
let $route=useRoute()
</script>
<style></style>