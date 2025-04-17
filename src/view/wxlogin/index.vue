<template>
    <div></div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import userStore from '@/store/modules/User.ts';
import { onMounted, reactive, watch } from 'vue';
import { saveCookie } from '@/utils/index.ts';
let userstore = userStore()
let $route = useRoute()
let custUserinfo=reactive({})
custUserinfo = userstore.getUserinfo
watch(
    () => custUserinfo,
    () => {
        console.log(11111,custUserinfo)
    },{
        immediate:true
    }
)
console.log(custUserinfo)
onMounted(() => {
    userstore.setUserinfo($route.query)
    //@ts-ignore
    saveCookie('name', $route.query.name, 2)
    //@ts-ignore
    saveCookie('token', $route.query.token, 2)
    let html:any =document.querySelector('html')
    html.style.display='none'
})
</script>
<style></style> 