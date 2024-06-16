<template>
    <div class="container">
        <div class="plus-button" :class="errorCssButton ? 'red' : ''" @click="addGachaPoints">
            +
        </div>
        <div class="value">
            {{ gachaPoints }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GachaCounter',
    data() {
        return {
            gachaPoints: +(localStorage.getItem("gachaPoints") || 1),
            errorCssButton: false,
        }
    },
    methods : {
        addGachaPoints () {
            if (+(localStorage.getItem("points") || 0) < 10) {
                this.errorCssButton = true;
                setTimeout(() => {
                    this.errorCssButton = false;
                }, 500);
                return;
            }
            localStorage.setItem("points", (+(localStorage.getItem("points") || 0) - 10).toString())
            this.gachaPoints++;
            localStorage.setItem("gachaPoints", this.gachaPoints.toString());
            location.reload();
        }
    }
}

</script>

<style scoped>
.container {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-50%) translateY(-50%);
    width: 50px;
    background-color: #111;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    font-size: 20px !important;
}

.plus-button,
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
    background-color: #e7972e;
    color: #fff;
}

.plus-button:hover {
    background-color: #cc8325;
}

.plus-button.red {
    background-color: #aa1e14;
}

.plus-button.red:hover {
    background-color: #6d110a;
}

</style>