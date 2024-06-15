<template>
    <div class="navigation-container">
        <router-link to="/" class="navigation-container-button">
            Stats
        </router-link>
        <router-link to="/skills" class="navigation-container-button">
            Skills
        </router-link>
        <router-link to="/inventory" class="navigation-container-button">
            Inventory
        </router-link>
        <router-link v-if="mapActive" to="/notes" class="navigation-container-button">
            Notes
        </router-link>
        <!-- <router-link v-if="mapActive" to="/map" class="navigation-container-button">
            World
        </router-link> -->
        <!-- <router-link v-if="marketActive" to="/market" class="navigation-container-button">
            Market 
        </router-link> -->    
    </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      marketActive: true,
      mapActive: true
    }
  }
}
</script>

<style scoped>
.navigation-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    flex-wrap: nowrap
}

.navigation-container-button {
    width: 100%;
    text-decoration: none;
    color: #e7972e;
    transition: color 0.3s;
}

.navigation-container-button:hover {
    color: #fefefe;
}

.router-link-active {
    color: #fefefe;
}

    
</style>