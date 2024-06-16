<template>
  <div class="status-main-container">
    <DiceRoll v-if="rollingDice" v-bind:diceNumber="diceNumber" v-bind:diceSides="diceSides"
      @close="rollingDice = false" @result="setLastRollValue" />
    <AdvantagesUtils />
    <GachaCounter />

    <div class="rest-button status-button" @click="fullRest">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
          d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
      </svg>
    </div>

    <div class="activate-debug" @click="toggleDebugMode">
      Debug
    </div>

    <div class="name-level-container">
      <div class="base-container name-container">
        <p>NAME :</p>
        <input class="text-field" v-model="name" type="text">
      </div>
      <div class="base-container level-container">
        <p>LEVEL :</p>
        <div class="text-field">
          <p> {{ level }} </p>
        </div>
        <p @click="addLvl" v-if="debugMode"> + </p>
        <p @click="removeLvl" v-if="debugMode"> - </p>
      </div>
    </div>

    <div class="player-stats-container">
      <div class="base-container body-status-container">

        <div class="status-head general-status-cell">
          <div class="head-shape general-body-border">
            <div class="head-shape general-body-fill" @click="worsenBody('head')" @contextmenu="healBody('head')"
              :style="{ 'background-color': this.bodyValues[this.body_status['head']] }">
            </div>
          </div>
        </div>

        <div class="status-upper-arm-left general-status-cell">
          <div class="upper-arm-shape left-shape general-body-border">
            <div class="upper-arm-shape general-body-fill" @click="worsenBody('upperArmLeft')"
              @contextmenu="healBody('upperArmLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['upperArmLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-upper-arm-right general-status-cell">
          <div class="upper-arm-shape right-shape general-body-border">
            <div class="upper-arm-shape general-body-fill" @click="worsenBody('upperArmRight')"
              @contextmenu="healBody('upperArmRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['upperArmRight']] }">
            </div>
          </div>
        </div>

        <div class="status-torso-left general-status-cell">
          <div class="torso-shape left-shape general-body-border">
            <div class="torso-shape general-body-fill" @click="worsenBody('torsoLeft')"
              @contextmenu="healBody('torsoLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['torsoLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-torso-right general-status-cell">
          <div class="torso-shape right-shape general-body-border">
            <div class="torso-shape general-body-fill" @click="worsenBody('torsoRight')"
              @contextmenu="healBody('torsoRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['torsoRight']] }">
            </div>
          </div>
        </div>

        <div class="status-waist-left general-status-cell">
          <div class="waist-shape left-shape general-body-border">
            <div class="waist-shape general-body-fill" @click="worsenBody('waistLeft')"
              @contextmenu="healBody('waistLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['waistLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-waist-right general-status-cell">
          <div class="waist-shape right-shape general-body-border">
            <div class="waist-shape general-body-fill" @click="worsenBody('waistRight')"
              @contextmenu="healBody('waistRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['waistRight']] }">
            </div>
          </div>
        </div>

        <div class="status-thigh-left general-status-cell">
          <div class="thigh-shape left-shape general-body-border">
            <div class="thigh-shape general-body-fill" @click="worsenBody('thighLeft')"
              @contextmenu="healBody('thighLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['thighLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-thigh-right general-status-cell">
          <div class="thigh-shape right-shape general-body-border">
            <div class="thigh-shape general-body-fill" @click="worsenBody('thighRight')"
              @contextmenu="healBody('thighRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['thighRight']] }">
            </div>
          </div>
        </div>

        <div class="status-calf-left general-status-cell">
          <div class="calf-shape left-shape general-body-border">
            <div class="calf-shape general-body-fill" @click="worsenBody('calfLeft')"
              @contextmenu="healBody('calfLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['calfLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-calf-right general-status-cell">
          <div class="calf-shape right-shape general-body-border">
            <div class="calf-shape general-body-fill" @click="worsenBody('calfRight')"
              @contextmenu="healBody('calfRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['calfRight']] }">
            </div>
          </div>
        </div>

        <div class="status-foot-left general-status-cell">
          <div class="foot-shape left-shape general-body-border">
            <div class="foot-shape general-body-fill" @click="worsenBody('footLeft')"
              @contextmenu="healBody('footLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['footLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-foot-right general-status-cell">
          <div class="foot-shape right-shape general-body-border">
            <div class="foot-shape general-body-fill" @click="worsenBody('footRight')"
              @contextmenu="healBody('footRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['footRight']] }">
            </div>
          </div>
        </div>

        <div class="status-lower-arm-left general-status-cell">
          <div class="lower-arm-shape left-shape general-body-border">
            <div class="lower-arm-shape general-body-fill" @click="worsenBody('lowerArmLeft')"
              @contextmenu="healBody('lowerArmLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['lowerArmLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-lower-arm-right general-status-cell">
          <div class="lower-arm-shape right-shape general-body-border">
            <div class="lower-arm-shape general-body-fill" @click="worsenBody('lowerArmRight')"
              @contextmenu="healBody('lowerArmRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['lowerArmRight']] }">
            </div>
          </div>
        </div>

        <div class="status-hand-left general-status-cell">
          <div class="hand-shape left-shape general-body-border">
            <div class="hand-shape general-body-fill" @click="worsenBody('handLeft')"
              @contextmenu="healBody('handLeft')"
              :style="{ 'background-color': this.bodyValues[this.body_status['handLeft']] }">
            </div>
          </div>
        </div>

        <div class="status-hand-right general-status-cell">
          <div class="hand-shape right-shape general-body-border">
            <div class="hand-shape general-body-fill" @click="worsenBody('handRight')"
              @contextmenu="healBody('handRight')"
              :style="{ 'background-color': this.bodyValues[this.body_status['handRight']] }">
            </div>
          </div>
        </div>
      </div>
      <div class="base-container health-container">
        <div class="full-hearth"
          v-for="n in Array.from({ length: Math.round((healthMax + 1) / 4) }, (_, index) => index)" :key="n">
          <div class="qhearth-icon-border" v-for="m in Math.min(healthMax - 4 * (n), 4)" :key="m">
            <div class="qhearth-icon" @click="toggleFill">
            </div>
          </div>
        </div>

        <div class="perma-action" v-if="debugMode">
          <div class="status-button" @click="addHealthPerma">+</div>
        </div>
      </div>
      <div class="base-container fatigue-container">

        <div class="fatigue-icon-border" v-for="m in fatigueMax" :key="m">
          <div class="fatigue-icon" @click="toggleFill">
          </div>
        </div>

        <div class="perma-action" v-if="debugMode">
          <div class="status-button fatigue-button fatigue-status-button" @click="addFatiguePerma">+</div>
        </div>
      </div>
      <div class="base-container mana-container">

        <div class="mana-icon-border" v-for="m in manaMax" :key="m">
          <div class="mana-icon" @click="toggleFill">
          </div>
        </div>

        <div class="perma-action" v-if="debugMode">
          <div class="status-button" @click="addManaPerma">+</div>
        </div>
      </div>
      <div class="base-container base-stats-container">
        <div class="flexend-container strength-container">
          <p>STRENGTH :</p>
          <div class="base-stat"
            @click="launchDices(dices.strengthNumber, this.possibleSidesValues[dices.strengthSides])">
            {{ dices.strengthNumber }}d{{ this.possibleSidesValues[dices.strengthSides] }}
          </div>
          <div class=" status-button">
            <div v-if="dices.strengthNumber < 35 && pointsAvailable" @click="addDice('strength')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.strengthSides < 9 && pointsAvailable" @click="lowerSides('strength')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
        <div class="flexend-container defense-container">
          <p>DEFENSE :</p>
          <div class="base-stat"
            @click="launchDices(dices.defenseNumber, this.possibleSidesValues[dices.defenseSides])">
            {{ dices.defenseNumber }}d{{ this.possibleSidesValues[dices.defenseSides] }}
          </div>
          <div class="status-button">
            <div v-if="dices.defenseNumber < 35 && pointsAvailable" @click="addDice('defense')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.defenseSides < 9 && pointsAvailable" @click="lowerSides('defense')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
        <div class="flexend-container magic-power-container">
          <p>MAGIC POW :</p>
          <div class="base-stat"
            @click="launchDices(dices.magicPowerNumber, this.possibleSidesValues[dices.magicPowerSides])">
            {{ dices.magicPowerNumber }}d{{ this.possibleSidesValues[dices.magicPowerSides] }}
          </div>
          <div class="status-button">
            <div v-if="dices.magicPowerNumber < 35 && pointsAvailable" @click="addDice('magicPower')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.magicPowerSides < 9 && pointsAvailable" @click="lowerSides('magicPower')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
        <div class="flexend-container magic-defense-container">
          <p>MAGIC DEF :</p>
          <div class="base-stat"
            @click="launchDices(dices.magicDefenseNumber, this.possibleSidesValues[dices.magicDefenseSides])">
            {{ dices.magicDefenseNumber }}d{{ this.possibleSidesValues[dices.magicDefenseSides] }}
          </div>
          <div class="status-button">
            <div v-if="dices.magicDefenseNumber < 35 && pointsAvailable" @click="addDice('magicDefense')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.magicDefenseSides < 9 && pointsAvailable" @click="lowerSides('magicDefense')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
        <div class="flexend-container dexterity-container">
          <p>DEXTERITY :</p>
          <div class="base-stat"
            @click="launchDices(dices.dexterityNumber, this.possibleSidesValues[dices.dexteritySides])">
            {{ dices.dexterityNumber }}d{{ this.possibleSidesValues[dices.dexteritySides] }}
          </div>
          <div class="status-button">
            <div v-if="dices.dexterityNumber < 35 && pointsAvailable" @click="addDice('dexterity')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.dexteritySides < 9 && pointsAvailable" @click="lowerSides('dexterity')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
        <div class="flexend-container agility-container">
          <p>AGILITY :</p>
          <div class="base-stat"
            @click="launchDices(dices.agilityNumber, this.possibleSidesValues[dices.agilitySides])">
            {{ dices.agilityNumber }}d{{ this.possibleSidesValues[dices.agilitySides] }}
          </div>
          <div class="status-button">
            <div v-if="dices.agilityNumber < 35 && pointsAvailable" @click="addDice('agility')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.agilitySides < 9 && pointsAvailable" @click="lowerSides('agility')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
        <div class="flexend-container focus-container">
          <p>FOCUS :</p>
          <div class="base-stat" @click="launchDices(dices.focusNumber, this.possibleSidesValues[dices.focusSides])">
            {{ dices.focusNumber }}d{{ this.possibleSidesValues[dices.focusSides] }}
          </div>
          <div class="status-button">
            <div v-if="dices.focusNumber < 35 && pointsAvailable" @click="addDice('focus')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.focusSides < 9 && pointsAvailable" @click="lowerSides('focus')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
        <div class="flexend-container stamina-container">
          <p>STAMINA :</p>
          <div class="base-stat"
            @click="launchDices(dices.staminaNumber, this.possibleSidesValues[dices.staminaSides])">
            {{ dices.staminaNumber }}d{{ this.possibleSidesValues[dices.staminaSides] }}
          </div>
          <div class=" status-button">
            <div v-if="dices.staminaNumber < 35 && pointsAvailable" @click="addDice('stamina')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" />
              </svg></div>
            <div v-if="dices.staminaSides < 9 && pointsAvailable" @click="lowerSides('stamina')"><svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M216.6 49.9C205.1 38.5 189.5 32 173.3 32C139.4 32 112 59.4 112 93.3v4.9c0 12 3.3 23.7 9.4 34l18.8 31.3c1.1 1.8 1.2 3.1 1 4.2c-.2 1.2-.8 2.5-2 3.6s-2.4 1.8-3.6 2c-1 .2-2.4 .1-4.2-1l-31.3-18.8c-10.3-6.2-22-9.4-34-9.4H61.3C27.4 144 0 171.4 0 205.3c0 16.2 6.5 31.8 17.9 43.3l1.2 1.2c3.4 3.4 3.4 9 0 12.4l-1.2 1.2C6.5 274.9 0 290.5 0 306.7C0 340.6 27.4 368 61.3 368h4.9c12 0 23.7-3.3 34-9.4l31.3-18.8c1.8-1.1 3.1-1.2 4.2-1c1.2 .2 2.5 .8 3.6 2s1.8 2.4 2 3.6c.2 1 .1 2.4-1 4.2l-18.8 31.3c-6.2 10.3-9.4 22-9.4 34v4.9c0 33.8 27.4 61.3 61.3 61.3c16.2 0 31.8-6.5 43.3-17.9l1.2-1.2c3.4-3.4 9-3.4 12.4 0l1.2 1.2c11.5 11.5 27.1 17.9 43.3 17.9c33.8 0 61.3-27.4 61.3-61.3v-4.9c0-12-3.3-23.7-9.4-34l-18.8-31.3c-1.1-1.8-1.2-3.1-1-4.2c.2-1.2 .8-2.5 2-3.6s2.4-1.8 3.6-2c1-.2 2.4-.1 4.2 1l31.3 18.8c10.3 6.2 22 9.4 34 9.4h4.9c33.8 0 61.3-27.4 61.3-61.3c0-16.2-6.5-31.8-17.9-43.3l-1.2-1.2c-3.4-3.4-3.4-9 0-12.4l1.2-1.2c11.5-11.5 17.9-27.1 17.9-43.3c0-33.8-27.4-61.3-61.3-61.3h-4.9c-12 0-23.7 3.3-34 9.4l-31.3 18.8c-1.8 1.1-3.1 1.2-4.2 1c-1.2-.2-2.5-.8-3.6-2s-1.8-2.4-2-3.6c-.2-1-.1-2.4 1-4.2l18.8-31.3c6.2-10.3 9.4-22 9.4-34V93.3C336 59.4 308.6 32 274.7 32c-16.2 0-31.8 6.5-43.3 17.9l-1.2 1.2c-3.4 3.4-9 3.4-12.4 0l-1.2-1.2z" />
              </svg></div>
          </div>
        </div>
      </div>
      <div class="base-container more-info-container">
        <div class="description-container">
          <div class="description-title">
            <p>DESCRIPTION :</p>
          </div>
          <textarea class="description-text text-field" v-model="description">
Nothing
          </textarea>
        </div>
        <div class="class-container">
          <p>CLASS :</p>
          <input v-model="playerClass" class="text-field" type="text">
        </div>
        <div class="job-container">
          <p>JOB :</p>
          <input class="text-field" v-model="job" type="text">
        </div>
      </div>
    </div>

    <div class="points-exp-container">
      <div class="base-container points-container">
        <p>POINTS :</p>
        <div class="text-field">
          <p>{{ points }}</p>
        </div>
        <p @click="addPoint" v-if="debugMode"> + </p>
        <p @click="removePoint" v-if="debugMode"> - </p>
      </div>
      <div class="base-container exp-container">
        <p>EXPERIENCE :</p>
        <div class="text-field">
          <p>{{ experience }}</p>
        </div>
        <p @click="addExp" v-if="debugMode"> + </p>
        <p @click="removeExp" v-if="debugMode"> - </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import DiceRoll from './DiceRoll.vue';
import AdvantagesUtils from './AdvantagesUtils.vue'
import GachaCounter from './GachaCounter.vue'

export default {
  name: 'StatusPage',
  data() {
    return {
      debugMode: false,
      points: parseInt(localStorage.points) || 0,
      pointsAvailable: parseInt(localStorage.points) > 0 || false,
      experience: parseInt(localStorage.experience) || 0,
      job: localStorage.job || 'Jobless',
      playerClass: localStorage.getItem('playerClass') || 'None',
      description: localStorage.description || 'Nothing',
      mana: parseInt(localStorage.mana) || 2,
      manaMax: parseInt(localStorage.manaMax) || 2,
      lostManaTrack: parseInt(localStorage.lostManaTrack) || 0,
      manaMaxGainedToday: parseInt(localStorage.manaMaxGainedToday) || 0,
      manaMaxGainedThisLevel: parseInt(localStorage.manaMaxGainedThisLevel) || 0,

      health: parseInt(localStorage.health) || 8,
      healthMax: parseInt(localStorage.healthMax) || 8,
      lostHeartTrack: parseInt(localStorage.lostHeartTrack) || 0,
      isCheckingPermaHealthUp: false,
      fatigue: parseInt(localStorage.fatigue) || 0,
      fatigueMax: parseInt(localStorage.fatigueMax) || 3,
      name: localStorage.name || 'Character',
      level: parseInt(localStorage.level) || 0,
      body_status: {
        head: parseInt(localStorage.head) || 0,
        upperArmLeft: parseInt(localStorage.upperArmLeft) || 0,
        upperArmRight: parseInt(localStorage.upperArmRight) || 0,
        torsoLeft: parseInt(localStorage.torsoLeft) || 0,
        torsoRight: parseInt(localStorage.torsoRight) || 0,
        waistLeft: parseInt(localStorage.waistLeft) || 0,
        waistRight: parseInt(localStorage.waistRight) || 0,
        lowerArmLeft: parseInt(localStorage.lowerArmLeft) || 0,
        lowerArmRight: parseInt(localStorage.lowerArmRight) || 0,
        handLeft: parseInt(localStorage.handLeft) || 0,
        handRight: parseInt(localStorage.handRight) || 0,
        thighLeft: parseInt(localStorage.thighLeft) || 0,
        thighRight: parseInt(localStorage.thighRight) || 0,
        calfLeft: parseInt(localStorage.calfLeft) || 0,
        calfRight: parseInt(localStorage.calfRight) || 0,
        footLeft: parseInt(localStorage.footLeft) || 0,
        footRight: parseInt(localStorage.footRight) || 0,
      },
      bodyValues: {
        0: "#121212",
        1: "#B92100",
        2: "#880808",
        3: "#330423",
      },
      dices: {
        strengthNumber: parseInt(localStorage.strengthNumber) || 1,
        strengthSides: parseInt(localStorage.strengthSides) || 0,
        defenseNumber: parseInt(localStorage.defenseNumber) || 1,
        defenseSides: parseInt(localStorage.defenseSides) || 0,
        dexterityNumber: parseInt(localStorage.dexterityNumber) || 1,
        dexteritySides: parseInt(localStorage.dexteritySides) || 0,
        agilityNumber: parseInt(localStorage.agilityNumber) || 1,
        agilitySides: parseInt(localStorage.agilitySides) || 0,
        focusNumber: parseInt(localStorage.focusNumber) || 1,
        focusSides: parseInt(localStorage.focusSides) || 0,
        staminaNumber: parseInt(localStorage.staminaNumber) || 1,
        staminaSides: parseInt(localStorage.staminaSides) || 0,
        magicPowerNumber: parseInt(localStorage.magicPowerNumber) || 1,
        magicPowerSides: parseInt(localStorage.magicPowerSides) || 0,
        magicDefenseNumber: parseInt(localStorage.magicDefenseNumber) || 1,
        magicDefenseSides: parseInt(localStorage.magicDefenseSides) || 0,
      },
      possibleSidesValues: {
        0: 100,
        1: 50,
        2: 20,
        3: 12,
        4: 10,
        5: 8,
        6: 6,
        7: 4,
        8: 3,
        9: 2,
      },
      rollingDice: false,
      diceNumber: 0,
      diceSides: 0,
      lastRollValue: 0,
    };
  },
  mounted() {
    var healthCells = document.getElementsByClassName('qhearth-icon');
    var manaCells = document.getElementsByClassName('mana-icon');
    var fatigueCells = document.getElementsByClassName('fatigue-icon');

    for (let i = 0; i < this.health; i++) {
      healthCells[i].classList.add('qhearth-filled');
    }

    for (let i = 0; i < this.mana; i++) {
      manaCells[i].classList.add('mana-filled');
    }

    for (let i = 0; i < this.fatigue; i++) {
      fatigueCells[i].classList.add('fatigue-filled');
    }

    this.checkExperienceLeveling()
  },
  methods: {
    toggleFill: function (event) {
      var classname = event.target.className.split('-')[0];
      var newclass = classname + '-filled';
      event.target.classList.toggle(newclass);

      switch (classname) {
        case 'qhearth':
          this.health += event.target.classList.contains(newclass) ? 1 : -1;
          this.lostHeartTrack += event.target.classList.contains(newclass) ? -1 : 1;
          break;
        case 'fatigue':
          this.fatigue += event.target.classList.contains(newclass) ? 1 : -1;
          break;
        case 'mana':
          this.mana += event.target.classList.contains(newclass) ? 1 : -1;
          this.lostManaTrack += event.target.classList.contains(newclass) ? -1 : 1;
          break;
      }

    },
    addPoint: function () {
      this.points += 1;
    },
    removePoint: function () {
      this.points -= 1;
    },
    addExp: function () {
      this.experience += 1;
    },
    removeExp: function () {
      this.experience -= 1;
    },
    addLvl: function () {
      this.level += 1;
    },
    removeLvl: function () {
      this.level -= 1;
    },

    fullRest: function () {
      this.health = this.healthMax;
      this.fatigue = 0;
      this.mana = this.manaMax;
      this.lostHeartTrack = 0;
      this.lostManaTrack = 0;
      this.manaMaxGainedToday = 0;

      for (const key in this.body_status) {
        this.body_status[key] -= 1;
      }

      setTimeout(() => {
        location.reload();
      }, 200);

    },
    addHealthPerma: function () {
      this.healthMax += 1;
    },
    addFatiguePerma: function () {
      this.fatigueMax += 1;
    },
    addManaPerma: function () {
      this.manaMax += 1;
    },
    addDice: function (stat) {
      this.dices[stat + 'Number'] += 1;
      this.points -= 1;
    },
    lowerSides: function (stat) {
      this.dices[stat + 'Sides'] += 1;
      this.points -= 1;
    },
    worsenBody: function (part) {
      if (this.body_status[part] === 3) {
        return;
      }
      this.body_status[part] += 1;
    },
    healBody: function (part) {
      if (this.body_status[part] === 0) {
        return;
      }
      this.body_status[part] -= 1;
    },
    launchDices(diceNumber, diceSides) {
      this.diceNumber = diceNumber;
      this.diceSides = diceSides;
      this.rollingDice = true;
    },
    toggleDebugMode() {
      this.debugMode = !this.debugMode;
    },
    getRequiredExp(level) {
      var exp = 3 + 2 * level;

      return exp;
    },
    getLevelUpPoints(level) {
      var points = Math.round((level - 1.6) / 3);

      return points;
    },
    setLastRollValue(value) {
      this.lastRollValue = value;
    },
    conditionalGainPermaHealth(value) {
      var fullHearts = (this.healthMax - this.healthMax % 4) / 4;

      if (this.level < 4 && value >= Math.round(fullHearts / 2)) {
        this.healthMax += 1;
        return;
      }
      if (this.level < 8 && value >= fullHearts) {
        this.healthMax += 1;
        return;
      }
      if (this.level < 12 && value >= Math.round(fullHearts * 3 / 2)) {
        this.healthMax += 1;
        return;
      }
      if (this.level < 16 && value >= fullHearts * 2) {
        this.healthMax += 1;
        return;
      }
    },
    checkExperienceLeveling() {
      if (this.experience >= this.getRequiredExp(this.level)) {
        this.experience -= this.getRequiredExp(this.level);
        this.level += 1;
        this.points += this.getLevelUpPoints(this.level);
      }
    }
  },
  watch: {
    rollingDice: function (newRolling) {

      if (!newRolling && this.isCheckingPermaHealthUp) {
        this.conditionalGainPermaHealth(this.lastRollValue)
        this.isCheckingPermaHealthUp = false;
        return;
      }
    },
    points: function (newPoints) {
      if (newPoints < 0) {
        this.points = 0;
        this.pointsAvailable = false;
        return;
      }
      localStorage.setItem('points', newPoints);

      this.pointsAvailable = newPoints > 0;
    },
    experience: function (newExperience) {
      this.checkExperienceLeveling();
      localStorage.setItem('experience', newExperience);
    },
    level: function (newLevel) {
      this.manaMaxGainedThisLevel = 0;

      localStorage.setItem('manaMaxGainedThisLevel', 0);
      localStorage.setItem('level', newLevel);
    },
    dices: {
      handler: function (newDices) {
        for (const key in newDices) {
          localStorage.setItem(key, newDices[key]);
        }
      },
      deep: true,
    },
    body_status: {
      handler: function (newBodyStatus) {
        for (const key in newBodyStatus) {
          if (newBodyStatus[key] < 0) {
            newBodyStatus[key] = 0;
          }
          localStorage.setItem(key, newBodyStatus[key]);
        }
      },
      deep: true,
    },
    health: function () {
      localStorage.setItem('health', this.health);
    },
    healthMax: function () {
      localStorage.setItem('healthMax', this.healthMax);
    },
    lostHeartTrack: function () {
      if (this.lostHeartTrack < 0) {
        this.lostHeartTrack = 0;
      }
      else if (this.lostHeartTrack >= 4) {
        this.launchDices(this.dices.defenseNumber, this.possibleSidesValues[this.dices.defenseSides]);
        this.isCheckingPermaHealthUp = true;

        this.lostHeartTrack = 0;

      }
      localStorage.setItem('lostHeartTrack', this.lostHeartTrack);
    },

    fatigue: function () {
      localStorage.setItem('fatigue', this.fatigue);
    },
    fatigueMax: function () {
      localStorage.setItem('fatigueMax', this.fatigueMax);
    },

    mana: function () {
      localStorage.setItem('mana', this.mana);
    },
    manaMax: function () {
      localStorage.setItem('manaMax', this.manaMax);
    },
    manaMaxGainedToday: function () {
      localStorage.setItem('manaMaxGainedToday', this.manaMaxGainedToday);
    },
    manaMaxGainedThisLevel: function () {
      localStorage.setItem('manaMaxGainedThisLevel', this.manaMaxGainedThisLevel);
    },

    lostManaTrack: function () {
      if (this.lostManaTrack <= 0) {
        this.lostManaTrack = 0;
        return;
      }

      switch (true) {
        case this.level === 0:
          if (this.manaMaxGainedToday >= 2) return;

          this.addManaPerma();
          this.manaMaxGainedToday += 1;
          this.lostManaTrack = 0;
          break;

        case this.level === 1:
          if (this.manaMaxGainedThisLevel >= 10 ||
            this.manaMaxGainedToday >= 2 ||
            this.lostManaTrack < this.manaMax - this.dices.magicPowerSides) return;

          this.addManaPerma();
          this.manaMaxGainedToday += 1;
          this.manaMaxGainedThisLevel += 1;
          this.lostManaTrack = 0;
          break;

        case this.level === 2:
          if (this.manaMaxGainedThisLevel >= 8 ||
            this.manaMaxGainedToday >= 1 ||
            this.lostManaTrack < this.manaMax - this.dices.magicPowerSides) return;

          this.addManaPerma();
          this.manaMaxGainedToday += 1;
          this.manaMaxGainedThisLevel += 1;
          this.lostManaTrack = 0;
          break;
        case this.level === 3:
          if (this.manaMaxGainedThisLevel >= 5 ||
            this.manaMaxGainedToday >= 1 ||
            this.lostManaTrack < this.manaMax - this.dices.magicPowerSides) return;

          this.addManaPerma();
          this.manaMaxGainedToday += 1;
          this.manaMaxGainedThisLevel += 1;
          this.lostManaTrack = 0;
          break;
        case this.level < 8:
          if (this.manaMaxGainedThisLevel >= 2 ||
            this.manaMaxGainedToday >= 1 ||
            this.lostManaTrack < this.manaMax - this.dices.magicPowerSides) return;

          this.addManaPerma();
          this.manaMaxGainedToday += 1;
          this.manaMaxGainedThisLevel += 1;
          this.lostManaTrack = 0;
          break;
        default:
          if (this.manaMaxGainedThisLevel >= 1 ||
            this.lostManaTrack < this.manaMax - this.dices.magicPowerSides) return;

          this.addManaPerma();
          this.manaMaxGainedThisLevel += 1;
          this.lostManaTrack = 0;
          break;

      }

      localStorage.setItem('manaMaxGainedThisLevel', this.manaMaxGainedThisLevel);

    },

    description: function () {
      localStorage.setItem('description', this.description);
    },
    job: function () {
      localStorage.setItem('job', this.job);
    },
    playerClass: function () {
      localStorage.setItem('playerClass', this.playerClass);
    },
    name: function (name) {
      localStorage.setItem('name', name);
    },
  },
  components: {
    DiceRoll,
    AdvantagesUtils,
    GachaCounter
  }

}

</script>

<style scoped>
p {
  white-space: nowrap;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0;
  margin: 0;
}

.status-main-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.3em;
  gap: 2vh;
}

.base-container {
  background-color: #121212;
  align-items: center;
  justify-content: start;
  display: flex;
  padding: 7px 15px;
  box-shadow: 2px 2px 2px #0a0a0a;
}

.name-level-container,
.points-exp-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
  gap: 5vw;
}

.points-exp-container {
  margin-bottom: -1.6vw;
}

.player-stats-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 20px;
  width: 100%;
  height: 100%;
}

.body-status-container {
  grid-area: 1 / 1 / 7 / 3;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(14, 1fr);
  padding: 40px 50px;
  justify-self: center;
  width: 50%;
}

.general-body-border {
  position: relative;
  background-color: #e7972e;
  width: 100%;
  height: 100%;
}

.general-body-fill {
  background-color: #121212;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  position: absolute;
  top: 5px;
  left: 5px;
  transition: 0.2s;
}

.general-status-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
}

.left-shape {
  transform: scaleX(-1);
}

.right-shape {
  transform: scaleX(1);
}

.status-head {
  grid-area: 1 / 2 / 3 / 4;
}

.head-shape {
  clip-path: ellipse(24% 50% at 50% 50%);
}

.status-upper-arm-left {
  grid-area: 3 / 1 / 6 / 2;
}

.status-upper-arm-right {
  grid-area: 3 / 4 / 6 / 5;
}

.upper-arm-shape {
  clip-path: polygon(0% 20%, 0 50%, 10% 100%, 45% 88%, 35% 30%);
  position: absolute;
  height: 110%;
  top: 0;
}

.upper-arm-shape.left-shape {
  right: -5px;
}

.upper-arm-shape.right-shape {
  left: -5px;
}

.upper-arm-shape.general-body-fill {
  height: calc(100% - 12px);
  width: calc(100% - 18px);
  top: 8px;
  left: 4px;
}

.status-torso-left {
  grid-area: 3 / 2 / 6 / 3;
}

.status-torso-right {
  grid-area: 3 / 3 / 6 / 4;
}

.torso-shape {
  clip-path: polygon(0% 5%, 90% 20%, 80% 100%, 0% 90%);
}

.status-waist-left {
  grid-area: 6 / 2 / 8 / 3;
}

.status-waist-right {
  grid-area: 6 / 3 / 8 / 4;
}

.waist-shape {
  clip-path: polygon(0% 0%, 75% 10%, 85% 60%, 0% 100%);
  position: absolute;
  height: 135%;
  top: 0;
}

.waist-shape.general-body-fill {
  height: 90%;
  top: 5px;
}

.status-thigh-left {
  grid-area: 8 / 2 / 11 / 3;
}

.status-thigh-right {
  grid-area: 8 / 3 / 11 / 4;
}

.thigh-shape {
  clip-path: polygon(90% 0%, 75% 100%, 30% 80%, 10% 30%);
}

.status-calf-left {
  grid-area: 11 / 2 / 14 / 3;
}

.status-calf-right {
  grid-area: 11 / 3 / 14 / 4;
}

.calf-shape {
  clip-path: polygon(30% 0%, 65% 10%, 80% 25%, 65% 100%, 35% 95%, 20% 30%);
  position: absolute;
  height: 105%;
  top: -10px;
}

.calf-shape.general-body-fill {
  height: calc(100% - 8px);
  top: 4px;
}

.status-foot-left {
  grid-area: 14 / 2 / 15 / 3;
}

.status-foot-right {
  grid-area: 14 / 3 / 15 / 4;
}

.foot-shape {
  clip-path: polygon(30% 0%, 65% 10%, 65% 40%, 95% 100%, 20% 100%);
}

.foot-shape.general-body-fill {
  height: calc(100% - 7px);
  width: calc(100% - 10px);
  left: 5px;
  top: 4px;
}

.status-lower-arm-left {
  grid-area: 6 / 1 / 9 / 2;
}

.status-lower-arm-right {
  grid-area: 6 / 4 / 9 / 5;
}

.lower-arm-shape {
  clip-path: polygon(6% 15%, 40% 2%, 35% 75%, 10% 80%);
}

.lower-arm-shape.general-body-fill {
  height: calc(100% - 12px);
  width: calc(100% - 20px);
  left: 5px;
  top: 6px;
}

.status-hand-left {
  grid-area: 8 / 1 / 10 / 2;
}

.status-hand-right {
  grid-area: 8 / 4 / 10 / 5;
}

.hand-shape {
  clip-path: polygon(10% 25%, 35% 20%, 30% 100%, 15% 100%, 10% 50%, 0% 35%);
}

.hand-shape.general-body-fill {
  height: calc(100% - 10px);
  width: calc(100% - 25px);
  top: 5px;
  left: 6px;
}

.health-container {
  grid-area: 1 / 3 / 2 / 7;
  display: flex;
  gap: 10px;
  position: relative;
}

.full-hearth {
  aspect-ratio: 1 / 1;
  height: calc(100% - 10px);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 3px;
}

.qhearth-icon-border {
  position: relative;
  background-color: #880808;
  width: 100%;
  height: 100%;
  box-shadow: 2px 2px 2px #0a0a0a;
}

.qhearth-icon {
  background-color: #121212;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  position: absolute;
  top: 3px;
  left: 3px;
  transition: 0.1s;
}

.qhearth-filled {
  background-color: rgb(136, 8, 8);
}


.fatigue-container {
  grid-area: 2 / 3 / 3 / 5;
  gap: 5px;
  position: relative;
}

.fatigue-icon-border {
  position: relative;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: #eee;
  width: calc(3vw);
  height: calc(3vw);
  align-self: center;
}

.fatigue-icon {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  background-color: #121212;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  position: absolute;
  top: 3px;
  left: 3px;
  transition: 0.08s;
}

.fatigue-filled {
  background-color: #eee;
}

.mana-container {
  grid-area: 2 / 5 / 3 / 7;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  padding: 10px;
  position: relative;
}

.mana-icon-border {
  position: relative;
  clip-path: circle(50% at 50% 50%);
  background-color: #2f179c;
  height: 100%;
  aspect-ratio: 1/1;
  align-self: center;
}

.mana-icon {
  clip-path: circle(50% at 50% 50%);
  background-color: #121212;
  width: calc(100% - 6px);
  aspect-ratio: 1/1;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: 0.08s;
}

.qhearth-icon,
.fatigue-icon,
.mana-icon {
  cursor: url('../assets/cursors/set115_skyrim/SR-unav.cur'), auto;
}

.mana-filled {
  background-color: #2f179c;
}


.base-stats-container {
  grid-area: 3 / 3 / 5 / 7;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 5px;
  font-size: 0.9em;
}

.flexend-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.flexend-container p {
  width: 40%;
  justify-content: flex-end;
  margin-left: -20%;
}


.base-stat {
  padding: 0 20px;
  color: #e7972e;
  align-items: center;
  display: flex;
  justify-content: center;
  width: 20%;
}

.more-info-container {
  grid-area: 5 / 3 / 7 / 7;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.more-info-container .class-container,
.more-info-container .job-container {
  align-items: flex-end;
  padding-bottom: 10px;
  width: 90%;
}


.description-container {
  grid-area: 1 / 1 / 3 / 5;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-content: start;
  height: 100%;
  padding: 10px;
}

.description-title {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  align-items: center;
  height: 70%;
}

.description-text {
  grid-area: 1 / 2 / 3 / 5;
  justify-content: start;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  resize: none;
  overflow-y: scroll;
  padding-top: 10px;
  height: 110%;
}

.description-text::-webkit-scrollbar {
  display: none;
}

.class-container {
  grid-area: 3 / 1 / 4 / 3;
}

.job-container {
  grid-area: 3 / 3 / 4 / 5;
}

.job-container,
.class-container,
.name-container,
.level-container,
.points-container,
.exp-container {
  display: flex;
  gap: 10px;
  flex-direction: row;
  padding: 5px 20px;
  height: 100%;
  width: 100%;
  justify-content: start;
  align-items: center;
}

.text-field {
  background-color: #121212;
  color: #e7972e;
  border: none;
  text-shadow: 2px 2px 2px #0a0a0a !important;
  font-family: recharge !important;
  font-size: 1.1em;
  width: 100%;
}

.text-field:active,
.text-field:focus,
.text-field:focus-visible {
  border: none;
  outline: none;
}

.status-button {
  flex-direction: row;
  display: flex;
  gap: 5px;
  justify-content: space-between;
  position: relative;
  width: 0;
}

.status-button div {
  cursor: url('../assets/cursors/set115_skyrim/SR-precision.cur'), auto;
  padding: 5px;
  height: 30px;
  aspect-ratio: 1/1;
  background-color: #e7972e;
  color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #efefef;
  transition: all 0.3s, transform 0.1s;
}

.status-button div:hover {
  background-color: #cc8325;
}

.status-button div:active {
  transform: scale(0.9);
}

.rest-button {
  position: absolute;
  right: 6vw;
  top: 2.6vw;
  cursor: url('../assets/cursors/set115_skyrim/SR-precision.cur'), auto;
  padding: 10px;
  width: 30px;
  height: 30px;

  background-color: #e7972e;
  color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #efefef;
  transition: all 0.3s, transform 0.1s;
}

.rest-button:hover {
  background-color: #cc8325;
}

.rest-button:active {
  transform: scale(0.9);
}

.perma-action {
  position: absolute;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.perma-action div {
  background: #e7972e;
  color: #efefef;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  transition: all 0.3s, transform 0.1s;
}

.perma-action div:hover {
  background: #cc8325;
}

.perma-action div:active {
  transform: scale(0.9);
}

.activate-debug {
  position: absolute;
  bottom: -40px;
  left: -70px;
  opacity: 0.2;
}
</style>
