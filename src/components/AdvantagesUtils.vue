<template>
    <div class="container">
        <div class="plus-button" @click="advantage++">
            +
        </div>
        <div class="value" @click="advantage = 0">
            {{ advantage }}
        </div>
        <div class="minus-button" @click="advantage--">
            -
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'advantagesUtils',
    data() {
        return {
            advantage: +(localStorage.getItem("advantages") || 0)
        }
    },
    watch : {
        advantage () {
            localStorage.setItem("advantages", this.advantage.toString());
        }
    }
}

</script>

<style scoped>
.container {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateX(50%) translateY(-50%);
    width: 50px;
    height: 20%;
    background-color: #111;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    font-size: 20px !important;
}

.plus-button,
.minus-button,
.value {
    padding: 10px;
    align-items: center;
    display: flex;
    justify-content: center;
    text-shadow: none;
    width: calc(100% - 20px);

    aspect-ratio: 1/1;
    transition: all 0.3s;
}

.plus-button {
    background-color: #33d633;
    color: #0c580c;
}

.plus-button:hover {
    background-color: #169732;
    color: #011f01;
}

.minus-button {
    background-color: #e42828;
    color: #2e0101
}
.minus-button:hover {
    background-color: #aa1e14;
    color: #220101
}
</style>