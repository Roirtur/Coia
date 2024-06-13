<template>
    <div class="rolling-dice-background" @click="closeComponent">
        <div v-if="showResult" class="result-display">
            {{ result }} SUCCESS
        </div>
        <div class="rolling-dice-container">
            <DiceUnit :diceSides="diceSides" :id="n" v-for="n in dicesNumber"
                :key="n" @result="registerResult" />
        </div>
    </div>
</template>

<script>
import DiceUnit from './DiceUnit.vue'

export default {
    name: 'DiceRoll',
    data() {
        return {
            result: 0,
            stillRolling: this.diceNumber,
            ultraSuccess: 0,
            dicesNumber: this.diceNumber,
            showResult: false,
        }
    },
    props: {
        diceNumber: {
            type: Number,
            required: true
        },
        diceSides: {
            type: Number,
            required: true
        }
    },
    components: {
        DiceUnit
    },
    mounted() {
        this.resizeDices()
    },
    methods: {
        resizeDices() {
            if (this.diceNumber > 25) {
                const diceContainer = document.querySelector('.rolling-dice-container')
                diceContainer.style.maxWidth = '1200px'
            } else if (this.diceNumber > 16) {
                const diceContainer = document.querySelector('.rolling-dice-container')
                diceContainer.style.maxWidth = '1000px'
            } else if (this.diceNumber > 12) {
                const diceContainer = document.querySelector('.rolling-dice-container')
                diceContainer.style.maxWidth = '800px'
            }
        },
        registerResult(result) {
            if (result === "success") {
                this.result++
            } else if (result === "ultra-success") {
                this.result++
                this.ultraSuccess++
            }

            this.stillRolling--
        },
        closeComponent() {
            if (this.stillRolling !== 0) return;

            this.$emit('close');
        },
        returnResult() {
            this.$emit('result', this.result)
        }
    },
    watch: {
        stillRolling(value) {
            if (value === 0) {
                this.showResult = true
                this.returnResult()
            }
        },
        ultraSuccess() {
            this.stillRolling++
        }
    }


}
</script>

<style scoped>

.result-display {
    z-index: 11;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100px;
    align-items: center;
    display: flex;
    transform: translate(-50%, -50%);
    font-size: 3em;
    color: #cfcfcf;
    text-shadow: 4px 4px 4px #1e1e1e;
    padding: 30px;
    background: #111111;
    background:
        -moz-linear-gradient(45deg, transparent 35px, #111111 10px),
        -moz-linear-gradient(135deg, transparent 35px, #111111 10px),
        -moz-linear-gradient(225deg, transparent 35px, #111111 10px),
        -moz-linear-gradient(315deg, transparent 35px, #111111 10px);
    background:
        -o-linear-gradient(45deg, transparent 35px, #111111 10px),
        -o-linear-gradient(135deg, transparent 35px, #111111 10px),
        -o-linear-gradient(225deg, transparent 35px, #111111 10px),
        -o-linear-gradient(315deg, transparent 35px, #111111 10px);
    background:
        -webkit-linear-gradient(45deg, transparent 35px, #111111 10px),
        -webkit-linear-gradient(135deg, transparent 35px, #111111 10px),
        -webkit-linear-gradient(225deg, transparent 35px, #111111 10px),
        -webkit-linear-gradient(315deg, transparent 35px, #111111 10px);
    background-position: bottom left, bottom right, top right, top left;
    -moz-background-size: 51% 51%;
    -webkit-background-size: 51% 51%;
    background-size: 51% 51%;
    background-repeat: no-repeat;
}

.rolling-dice-background {
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

.rolling-dice-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    justify-content: center;
    align-items: center;
    background-color: #1e1e1e;
    padding: 50px;
    gap: 65px;
    margin: 40px 80px;
    /* background-color: #1e1e1e; */
    background: #1e1e1e;
    /* fallback */
    background:
        -moz-linear-gradient(45deg, transparent 35px, #1e1e1e 10px),
        -moz-linear-gradient(135deg, transparent 35px, #1e1e1e 10px),
        -moz-linear-gradient(225deg, transparent 35px, #1e1e1e 10px),
        -moz-linear-gradient(315deg, transparent 35px, #1e1e1e 10px);
    background:
        -o-linear-gradient(45deg, transparent 35px, #1e1e1e 10px),
        -o-linear-gradient(135deg, transparent 35px, #1e1e1e 10px),
        -o-linear-gradient(225deg, transparent 35px, #1e1e1e 10px),
        -o-linear-gradient(315deg, transparent 35px, #1e1e1e 10px);
    background:
        -webkit-linear-gradient(45deg, transparent 35px, #1e1e1e 10px),
        -webkit-linear-gradient(135deg, transparent 35px, #1e1e1e 10px),
        -webkit-linear-gradient(225deg, transparent 35px, #1e1e1e 10px),
        -webkit-linear-gradient(315deg, transparent 35px, #1e1e1e 10px);
    background-position: bottom left, bottom right, top right, top left;
    -moz-background-size: 51% 51%;
    -webkit-background-size: 51% 51%;
    background-size: 51% 51%;
    background-repeat: no-repeat;

}
</style>