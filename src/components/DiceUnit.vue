<template>
    <div class="container">
        <div :id="'cube-' + this.id" class="cube">
            <div class="front face">
                {{ diceValueFront }}

            </div>
            <div class="back face">
                {{ diceValueBack }}

            </div>
            <div class="left face">
                {{ diceValueLeft }}

            </div>
            <div class="right face">
                {{ diceValueRight }}

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DiceUnit',
    data() {
        return {
            diceValueFront: Math.floor(Math.random() * this.diceSides) + 1,
            diceValueBack: Math.floor(Math.random() * this.diceSides) + 1,
            diceValueLeft: Math.floor(Math.random() * this.diceSides) + 1,
            diceValueRight: Math.floor(Math.random() * this.diceSides) + 1,
            delay: 50,
            neededRollTime: 1000,
            rollTime: 0,
            currentSide: 0,
            rotationSpeed: 200,
            result: 0,
            resultId: "",
        }
    },
    props: {
        diceSides: {
            type: Number,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    mounted() {
        const dice = document.getElementById('cube-' + this.id)

        this.initRollAnimation(dice)
        this.rollDice()
    },
    methods: {
        rollDice() {
            this.draws++
            if (this.rollTime < this.neededRollTime) {
                setTimeout(() => {
                    this.rollTime += this.delay
                    this.rollDice()
                }, this.delay)
            }
        },
        changeColor() {

            const dice = document.getElementById('cube-' + this.id)

            setTimeout(() => {
                if (this.result === this.diceSides) {
                    dice.classList.add('dice-ultra-success')
                    this.resultId = "ultra-success"
                } else if (this.result % 2 === 0) {
                    dice.classList.add('dice-success')
                    this.resultId = "success"
                } else {
                    dice.classList.add('dice-failure')
                    this.resultId = "failure"
                }

                this.returnResult()
            }, 10)

        },
        initRollAnimation(dice) {
            this.currentSide++
            var new_value = Math.floor(Math.random() * this.diceSides) + 1

            if (this.currentSide % 4 === 0) {
                this.diceValueBack = new_value
                this.result = this.diceValueFront
            } else if (this.currentSide % 4 === 1) {
                this.diceValueLeft = new_value
                this.result = this.diceValueRight
            } else if (this.currentSide % 4 === 2) {
                this.diceValueFront = new_value
                this.result = this.diceValueBack
            } else if (this.currentSide % 4 === 3) {
                this.diceValueRight = new_value
                this.result = this.diceValueRight
            }



            dice.style.transform = 'rotateY(' + this.currentSide * 90 + 'deg)'
            if (this.rollTime < this.neededRollTime) {
                setTimeout(() => {
                    this.initRollAnimation(dice)
                }, this.rotationSpeed + 10)
            } else {
                dice.style.transition = 'transform 1.5s'
                dice.style.transform = 'rotateY(' + (this.currentSide + 4) * 90 + 'deg)'

                if (this.currentSide % 4 === 0) {
                    this.diceValueBack = this.result
                } else if (this.currentSide % 4 === 1) {
                    this.diceValueLeft = this.result
                } else if (this.currentSide % 4 === 2) {
                    this.diceValueFront = this.result
                } else if (this.currentSide % 4 === 3) {
                    this.diceValueRight = this.result
                }

                setTimeout(() => {
                    this.changeColor()
                }, 1000)
            }
        },
        returnResult() {
            setTimeout(() => {
                this.$emit('result', this.resultId);

                if (this.resultId === "ultra-success") {
                    const dice = document.getElementById('cube-' + this.id)
                    this.resetComponent(dice)

                    setTimeout(() => {
                        this.initRollAnimation(dice)
                        this.rollDice()
                    }, 20)
                }
            }, 1000)


            return this.resultId
        },
        resetComponent(dice) {
            dice.classList.remove('dice-ultra-success')
            dice.classList.remove('dice-success')
            dice.classList.remove('dice-failure')

            this.delay = 50;
            this.neededRollTime = 1000;
            this.rollTime = 0;
            this.result = 0;
            this.resultId = "";
        }

    }

}
</script>

<style scoped>
.dice {
    width: 130px;
    height: 130px;
    border-radius: 10%;
    background-color: #fefefe;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: #1e1e1e;
    transition: background-color 0.5s, color 0.5s;
}

.dice-success div {
    background-color: #33d633;
    color: #001f00;
    border-color: #001f00;
}

.dice-failure div {
    background-color: #e42828;
    color: #2e0101;
    border-color: #2e0101;
}

.dice-ultra-success div {
    background-color: #6fd9e7;
    color: #000b1f;
    border-color: #000b1f;
}


.front {
    transform:
        translateZ(50px);
}

.back {
    transform:
        rotateY(180deg) translateZ(50px);
}

.right {
    transform:
        rotateY(90deg) translateZ(50px);
}

.left {
    transform:
        rotateY(-90deg) translateZ(50px);
}

.cube {
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    position: absolute;

    transform-style: preserve-3d;

    transition: transform 200ms linear;
}

.container {
    width: 100px;
    height: 100px;
    position: relative;
}

.face {
    background: white;
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    border: #a3a3a3 solid 2px;
    color: #1e1e1e;
    text-align: center;
    justify-content: center;
    align-items: center;
    transition: background-color 0.5s, color 0.5s, border-color 0.5s;
}
</style>