

<template>
  <div class="interface-container">
      <div class="custom-corner-topleft custom-corner"></div>
      <div class="custom-corner-topright custom-corner"></div>
      <div class="custom-corner-bottomleft custom-corner"></div>
      <div class="custom-corner-bottomright custom-corner"></div>
      <ResetSheet/>
      <SaveJson/>
      <NavigationBar class="navbar" />
      <router-view class="content" />
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import NavigationBar from './components/NavigationBar.vue'
import SaveJson from './components/SaveJson.vue'
import ResetSheet from './components/ResetSheet.vue'


export default {
  name: 'App',
  components: {
    NavigationBar,
    SaveJson,
    ResetSheet
  }
}
</script>

<style>
@font-face {
    font-family: 'recharge';
    src: url('./assets/fonts/rechargebd.otf');
} 

@font-face {
    font-family: 'aurora';
    src: url('./assets/fonts/aurora.ttf');
}

html,
body {
  margin: 0;
  padding: 0;
  background-color: #4b4b4b;
  color: #cfcfcf;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none; 
  cursor: url('./assets/cursors/set115_skyrim/SR-normal.cur'), auto;
  background-image: url('./assets/images/background.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

a {
  cursor: url('./assets/cursors/set115_skyrim/SR-hand.cur'), auto;
}

input[type="text"], textarea {
  cursor: url('./assets/cursors/set115_skyrim/SR-text.cur'), auto;
}

svg {
  width:100%;
  height:100%;
}

#app {
  font-family: recharge !important;
  text-shadow: 2px 2px 2px #0a0a0a !important;
  font-weight: 700;
  font-size: 1.1em;
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.interface-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
  width: calc(100vw - 160px);
  margin: 40px 80px;
  position: relative;
    background:
        -moz-linear-gradient(45deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -moz-linear-gradient(135deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -moz-linear-gradient(225deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -moz-linear-gradient(315deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px);
    background:
        -o-linear-gradient(45deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -o-linear-gradient(135deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -o-linear-gradient(225deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -o-linear-gradient(315deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px);
    background:
        -webkit-linear-gradient(45deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -webkit-linear-gradient(135deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -webkit-linear-gradient(225deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px),
        -webkit-linear-gradient(315deg, transparent 35px, rgba(0, 0, 0, 0.3) 10px);
    background-position: bottom left, bottom right, top right, top left;
    -moz-background-size: 50% 50%;
    -webkit-background-size: 50% 50%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
  height: 50px;
  padding: 0 20px;
  background-color: #111;
  color: #cfcfcf;
  background: #111;
  /* fallback */
  background:
    -moz-linear-gradient(45deg, transparent 10px, #111 10px),
    -moz-linear-gradient(135deg, transparent 10px, #111 10px),
    -moz-linear-gradient(225deg, transparent 10px, #111 10px),
    -moz-linear-gradient(315deg, transparent 10px, #111 10px);
  background:
    -o-linear-gradient(45deg, transparent 10px, #111 10px),
    -o-linear-gradient(135deg, transparent 10px, #111 10px),
    -o-linear-gradient(225deg, transparent 10px, #111 10px),
    -o-linear-gradient(315deg, transparent 10px, #111 10px);
  background:
    -webkit-linear-gradient(45deg, transparent 10px, #111 10px),
    -webkit-linear-gradient(135deg, transparent 10px, #111 10px),
    -webkit-linear-gradient(225deg, transparent 10px, #111 10px),
    -webkit-linear-gradient(315deg, transparent 10px, #111 10px);

  background-position: bottom left, bottom right, top right, top left;
  -moz-background-size: 50% 50%;
  -webkit-background-size: 50% 50%;
  background-size: 50% 50%;
  background-repeat: no-repeat;

  position: absolute;
  top: -25px;
}


.custom-corner {
  width: 10vw;
  height: 10vw;
  background: #e7972e;
  z-index: 10;
  margin-bottom: -10vw;
  clip-path: polygon(100% 0, 30% 0%, 0% 30%, 0% 100%, 10% 100%, 10% 35%, 35% 10%, 100% 10%);
  position: absolute
}
.custom-corner-topleft {
  top: 1vw;
  left: 1vw;
}

.custom-corner-topright {
  top: 1vw;
  right: 1vw;
  transform: rotate(90deg);
}

.custom-corner-bottomleft {
  bottom: 11vw;
  left: 1vw;
  transform: rotate(-90deg);
}

.custom-corner-bottomright {
  bottom: 11vw;
  right: 1vw;
  transform: rotate(180deg);
}

.content {
  width: 90%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5vh 5vw;
}

</style>
