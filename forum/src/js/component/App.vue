<template>
  <div id="app">
    <canvas id="bg"></canvas>
    <transition name="changepage" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import bg from "../common/bg";
export default {
  name: "app",
  mounted() {
    bg("bg", 80);
  }
};
</script>

<style lang='scss' scoped>
#bg {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.changepage-enter-active {
  animation: showpage 0.5s ease;
}
.changepage-leave-active {
  animation: hidepage 0.5s ease;
}
@keyframes showpage {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
@keyframes hidepage {
  0% {
    transform: translateX(0px);
    opacity: 1;
  }
  100% {
    transform: translateX(-100px);
    opacity: 0;
  }
}
</style>
