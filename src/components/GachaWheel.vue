<template>
    <div class="background">
        <div class="wheel-container corner-background">
            <WheelComponent style="width: 90%; max-width: 100%" :prizes="prizesCanvas" :verify="canvasVerify"
                :canvas="canvasOptions" @rotateEnd="onRotateEnd" @rotateStart="onRotateStart"/>
        </div>
    </div>
</template>

<script lang='ts'>
// @ts-nocheck
import WheelComponent from './WheelComponent.vue'

export default {
    name: 'GachaWheel',
    components: {
        WheelComponent,
    },
    data() {
        return {
            prizesCanvas: [
                {
                    id: 1,
                    name: "Elementary",
                    value: "Elementary",
                    bgColor: "#42071c",
                    color: "#fff",
                    probability: 17,
                },
                {
                    id: 2,
                    name: "Primordial",
                    value: "Primordial",
                    bgColor: "#661431",
                    color: "#fff",
                    probability: 25,
                },
                {
                    id: 3,
                    name: "Arcane",
                    value: "Arcane",
                    bgColor: "#a1259a",
                    color: "#fff",
                    probability: 35,
                },
                {
                    id: 4,
                    name: "Esoteric",
                    value: "Esoteric",
                    bgColor: "#6a24ab",
                    color: "#fff",
                    probability: 15,
                },

                {
                    id: 5,
                    name: "Celestial",
                    value: "Celestial",
                    bgColor: "#4d35c4",
                    color: "#fff",
                    probability: 5,
                },
                {
                    id: 6,
                    name: "Divine",
                    value: "Divine",
                    bgColor: "#abd5ff",
                    color: "#111",
                    probability: 3,
                }
            ],
            canvasVerify: false,

            canvasOptions: {
                btnWidth: 150,
                borderColor: "#eee",
                borderWidth: 6,
            },
        }
    },
    methods: {
        onRotateEnd(prize) {
            console.log(prize, prize.name)
        },
        onRotateStart() {
            console.log("started")
        }
    }
}
</script>

<style scoped>
.background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10;
}

.wheel-container {
    position: absolute;
    height: 60%;
    aspect-ratio: 1/1;
    background-color: #111;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.corner-background {
    background:
        -moz-linear-gradient(45deg, transparent 50px, #111 10px),
        -moz-linear-gradient(135deg, transparent 50px, #111 10px),
        -moz-linear-gradient(225deg, transparent 50px, #111 10px),
        -moz-linear-gradient(315deg, transparent 50px, #111 10px);
    background:
        -o-linear-gradient(45deg, transparent 50px, #111 10px),
        -o-linear-gradient(135deg, transparent 50px, #111 10px),
        -o-linear-gradient(225deg, transparent 50px, #111 10px),
        -o-linear-gradient(315deg, transparent 50px, #111 10px);
    background:
        -webkit-linear-gradient(45deg, transparent 50px, #111 10px),
        -webkit-linear-gradient(135deg, transparent 50px, #111 10px),
        -webkit-linear-gradient(225deg, transparent 50px, #111 10px),
        -webkit-linear-gradient(315deg, transparent 50px, #111 10px);

    background-position: bottom left, bottom right, top right, top left;
    -moz-background-size: 50% 50%;
    -webkit-background-size: 50% 50%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
}
</style>