<template>
  <div class="container">
    <HostpitalTop></HostpitalTop>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="bottom">
      <HostpitalBottom></HostpitalBottom>
    </div>
    <Login></Login>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    margin-bottom:50px;
    width: 1200px;
  }

  .bottom {
    width: 100%;
  }
}
</style>
