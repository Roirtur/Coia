<template>
  <div class="all-skills-container">
    <div class="activate-debug" @click="debugMode = !debugMode">
      Debug
    </div>
    <DiceRoll v-if="rollingDice" v-bind:diceNumber="diceNumber" v-bind:diceSides="diceSides"
      @close="rollingDice = false" @result="checkLastRollValue" />
    <AdvantagesUtils />

    <GachaCounter />
    <GachaWheel v-if="gachaWheelBool" @close="reloadWindow" @rotateEnd="onRotateEnd"/>
    <div class="signature-skills corner-background">
      <div class="skill-container-title">
        <p>Signature skills</p>
      </div>

      <div class="wheel-button" @click="gachaWheelBool = true" v-if="hasGachaPoints">
        <svg id="Layer_1" enable-background="new 0 0 509.505 509.505" viewBox="0 0 509.505 509.505"
          xmlns="http://www.w3.org/2000/svg">
          <g>
            <g>
              <g>
                <path id="XMLID_234_"
                  d="m239.747 297.42c-1.5-.532-2.967-1.136-4.39-1.817l-86.196 86.196c25.776 21.535 57.138 34.525 90.586 37.522z" />
                <path id="XMLID_233_"
                  d="m419.068 270h-121.9c-.532 1.5-1.136 2.967-1.817 4.39l86.195 86.195c21.535-25.777 34.525-57.138 37.522-90.585z" />
                <path id="XMLID_232_"
                  d="m274.137 295.602c-1.423.682-2.89 1.285-4.39 1.817v121.9c33.447-2.996 64.808-15.985 90.585-37.522z" />
                <path id="XMLID_231_" d="m295.71 3.271c-27.05-4.344-55.412-4.482-83.864.31l42.647 82.32z" />
                <path id="XMLID_230_"
                  d="m127.948 360.586 86.196-86.196c-.683-1.423-1.285-2.89-1.817-4.39h-121.9c2.996 33.447 15.985 64.806 37.521 90.586z" />
                <path id="XMLID_229_"
                  d="m214.145 235.61-86.196-86.195c-21.536 25.776-34.526 57.137-37.522 90.585h121.9c.533-1.5 1.136-2.967 1.818-4.39z" />
                <path id="XMLID_228_"
                  d="m269.747 122.533v90.047c1.5.532 2.967 1.136 4.39 1.817l86.185-86.185c-21.752-18.091-47.943-30.393-75.699-35.503z" />
                <path id="XMLID_227_"
                  d="m325.87 10.016-27.403 54.939c35.412 8.171 68.273 26.266 94.167 52.158 76.199 76.222 76.218 199.531.002 275.771-76.222 76.199-199.53 76.224-275.774.004-76.198-76.223-76.223-199.531-.003-275.773 25.641-25.631 58.126-43.632 93.124-51.914l-28.299-54.622c-179.891 50.638-245.574 289.524-107.248 424.732 94.918 98.927 265.707 98.923 360.623 0 138.91-135.849 72.058-375.753-109.189-425.295z" />
                <path id="XMLID_226_"
                  d="m381.545 149.415-86.195 86.195c.682 1.423 1.285 2.89 1.817 4.39h121.9c-2.996-33.447-15.985-64.807-37.522-90.585z" />
                <path id="XMLID_225_"
                  d="m239.747 122.655-15.458-29.838c-27.523 5.171-53.509 17.435-75.114 35.397l86.183 86.183c1.423-.682 2.89-1.285 4.39-1.817v-89.925z" />
                <path id="XMLID_224_"
                  d="m254.747 270c8.271 0 15-6.729 15-15-.754-19.872-29.249-19.867-30 0 0 8.271 6.729 15 15 15z" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div v-for="(skill, index) in signatureSkills" :key="index" class="signature-skill">
        <input class="skill-name" v-model="skill.name" type="text" @contextmenu="skill.showNotes = true">
        <div class="skill-notes" v-if="skill.showNotes" @contextmenu="skill.showNotes = false">
          <textarea v-model="skill.notes" class="text-field notes-textarea">

          </textarea>
        </div>
        <div class="dices" @click="launchDices(skill)" :class="skill.upgradable ? 'upgradable' : ''">
          <span @click="if (debugMode || skill.points > 0) addDice(skill);"
            @contextmenu="if (debugMode) removeDice(skill);">{{ skill.diceNumber }}</span>d<span
            @click="if (debugMode || skill.points > 0) addDiceSide(skill);"
            @contextmenu="if (debugMode) removeDiceSide(skill);">{{ possibleSides[skill.diceSides] }}</span>
        </div>
        <input class="skill-cost" v-model="skill.cost" type="text">
        <div class="rarity" :class="{ [`rarity-${rarities[skill.rarity]}`]: true }" @click="rarityUp(index)"
          @contextmenu="rarityDown(index)"> {{ rarities[skill.rarity] }} </div>
        <div v-if="debugMode" @click="signatureSkills.splice(index, 1)"> - </div>
      </div>
      <div v-if="signatureSkills.length < 12" class="add-signature-skill" @click="addSignatureSkill()">
        +
      </div>
    </div>
    <div class="casual-skills corner-background">
      <div class="skill-container-title">
        <p>Basic skills</p>
      </div>
      <div v-for="(skill, index) in casualSkills" :key="index" class="casual-skill">
        <input class="skill-name" v-model="skill.name" type="text" @contextmenu="skill.showNotes = true">
        <div class="skill-notes" v-if="skill.showNotes" @contextmenu="skill.showNotes = false">
          <textarea v-model="skill.notes" class="text-field notes-textarea">

          </textarea>
        </div>
        <div class="dices" @click="launchDices(skill)" :class="skill.upgradable ? 'upgradable' : ''">
          <span @click="if (debugMode || skill.points > 0) addDice(skill);"
            @contextmenu="if (debugMode) removeDice(skill);">
            {{ skill.diceNumber }}</span>d<span @click="if (debugMode || skill.points > 0) addDiceSide(skill);"
            @contextmenu="if (debugMode) removeDiceSide(skill);">
            {{ possibleSides[skill.diceSides] }}</span>
        </div>
        <input class="skill-cost" v-model="skill.cost" type="text">
        <div @click="if (debugMode) addLevel(skill);" @contextmenu="if (debugMode) removeLevel(skill);">
          {{ skill.level }}
        </div>
        <div @click="if (debugMode) addExperience(skill);" @contextmenu="if (debugMode) removeExperience(skill);">
          {{ skill.experience }}
        </div>
        <div v-if="debugMode" @click="casualSkills.splice(index, 1)"> - </div>
      </div>
      <div v-if="casualSkills.length < 45" class="add-casual-skill" @click="addCasualSkill">
        +
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import AdvantagesUtils from "./AdvantagesUtils.vue"
import GachaCounter from "./GachaCounter.vue"
import DiceRoll from "./DiceRoll.vue"
import { defineComponent, reactive, watch, onMounted } from "vue";
import GachaWheel from './GachaWheel.vue'


type sigSkill = {
  name: string;
  points: number;
  rarity: number;
  diceNumber: number;
  diceSides: number;
  cost: string;
  notes: string;
  showNotes: boolean;
  upgradable: boolean;
};
type casuSkill = {
  name: string;
  points: number;
  level: number;
  experience: number;
  diceNumber: number;
  diceSides: number;
  cost: string;
  notes: string;
  showNotes: boolean;
  upgradable: boolean;
};

const possibleSides = [
  100, 50, 20, 12, 10, 8, 6, 4, 3, 2
];

const rarities = [
  'Elementary', 'Primordial', 'Arcane', 'Esoteric', 'Celestial', 'Divine', 'Godlike'
]
const raritiesPoints = [
  2, 3, 4, 5, 6, 7, 8, 9
]


export default defineComponent({
  name: "SkillsView",
  setup() {
    const signatureSkills: sigSkill[] = reactive([]);
    const casualSkills: casuSkill[] = reactive([]);

    watch(
      signatureSkills,
      () => {
        const signatureSkillsJSON = JSON.stringify(signatureSkills);

        localStorage.setItem('signatureSkills', signatureSkillsJSON);
      },
      { deep: true }
    );
    watch(
      casualSkills,
      () => {
        const casualSkillsJSON = JSON.stringify(casualSkills);

        localStorage.setItem('casualSkills', casualSkillsJSON);
      },
      { deep: true }
    );

    const loadDatas = () => {
      const signatureSkillsJSON = localStorage.getItem('signatureSkills') || "[]";

      const savedSigSkills = JSON.parse(signatureSkillsJSON);

      savedSigSkills.forEach((skill: sigSkill) => {
        signatureSkills.push(skill)
      });

      const casualSkillsJSON = localStorage.getItem('casualSkills') || "[]";

      const savedCasuSkills = JSON.parse(casualSkillsJSON);

      savedCasuSkills.forEach((skill: casuSkill) => {
        casualSkills.push(skill)
      });

    };

    onMounted(() => {
      loadDatas();
    });

    const addSignatureSkill = (rarity = 0) => {
      signatureSkills.push({
        name: "Unknown",
        points: raritiesPoints[rarity],
        rarity: rarity,
        diceNumber: 1,
        diceSides: 0,
        cost: "Free",
        notes: "Unknown effect",
        showNotes: false,
        upgradable: true,
      });
    };

    const addCasualSkill = () => {
      casualSkills.push({
        name: "Unknown",
        points: 0,
        level: 0,
        experience: 0,
        diceNumber: 1,
        diceSides: 0,
        cost: "Free",
        notes: "Unknown effect",
        showNotes: false,
        upgradable: false,
      });
    };

    const rarityUp = (index: number) => {
      if (signatureSkills[index].rarity >= 6) return;
      signatureSkills[index].rarity++;
      signatureSkills[index].diceNumber = 1;
      signatureSkills[index].diceSides = 0;
      signatureSkills[index].points = raritiesPoints[signatureSkills[index].rarity];
      signatureSkills[index].upgradable = signatureSkills[index].points != 0;
    }

    const rarityDown = (index: number) => {
      if (signatureSkills[index].rarity <= 0) return;
      signatureSkills[index].rarity--;
      signatureSkills[index].diceNumber = 1;
      signatureSkills[index].diceSides = 0;
      signatureSkills[index].points = raritiesPoints[signatureSkills[index].rarity];
      signatureSkills[index].upgradable = signatureSkills[index].points != 0;
    }

    return {
      signatureSkills,
      addSignatureSkill,
      addCasualSkill,
      possibleSides,
      rarities,
      rarityUp,
      rarityDown,
      casualSkills,
      raritiesPoints
    };
  },
  methods: {
    addDice(skill: any) {
      if (skill.diceNumber >= 35) return;
      this.removePoint(skill);
      skill.diceNumber++;
    },
    removeDice(skill: any) {
      if (skill.diceNumber <= 1) {
        skill.diceNumber = 1;
        return;
      }
      skill.diceNumber--;
    },
    addDiceSide(skill: any) {
      if (skill.diceSides > 8) {
        skill.diceSides = 9
        return;
      }
      this.removePoint(skill);
      skill.diceSides++;
    },
    removeDiceSide(skill: any) {
      if (skill.diceSides < 1) {
        skill.diceSides = 0
        return;
      }
      skill.diceSides--;
    },
    addLevel(skill: any) {
      skill.level++;
      skill.points++;
      this.setUpgradable(skill)
    },
    removeLevel(skill: any) {
      skill.level--;
      skill.points = skill.level;
      this.setUpgradable(skill)
      skill.diceNumber = 0;
      skill.diceSides = 0;
    },
    removePoint(skill: any) {
      if (skill.points <= 1) {
        skill.points = 0;
        this.setUpgradable(skill)
        return;
      }
      skill.points--;
    },
    expRequired(skill: any) {
      var exp = (skill.level ** 2) + 1
      return exp;
    },
    addExperience(skill: any, value = 1) {
      skill.experience += value;
      var expRequired = this.expRequired(skill)
      localStorage.setItem('experience', +localStorage.getItem('experience') + value)
      if (skill.experience >= expRequired) {
        this.addLevel(skill)
        skill.experience -= expRequired;
      }
    },
    removeExperience(skill: any) {
      if (skill.experience <= 0) return;
      skill.experience--;
    },
    checkLastRollValue(value: any) {
      if (this.rollingDiceObject) {
        if (value >= 1) {
          this.addExperience(this.rollingDiceObject, value);
          this.rollingDiceObject = null;
        }
      }
    },
    launchDices(skill: any) {
      if (this.debugMode || skill.upgradable) return;
      this.diceNumber = skill.diceNumber;
      this.diceSides = possibleSides[skill.diceSides];
      this.rollingDice = true;
      if (skill.experience != undefined) this.rollingDiceObject = skill;
    },
    setUpgradable(skill: any) {
      setTimeout(() => {
        skill.upgradable = skill.points != 0;
      }, 10)
    },
    reloadWindow () {
      location.reload();
    },
    onRotateEnd (rarity) {
      this.addSignatureSkill(rarity)
    }
  },
  components: {
    AdvantagesUtils,
    DiceRoll,
    GachaWheel,
    GachaCounter,
  },
  data() {
    return {
      rollingDice: false,
      diceNumber: 0,
      diceSides: 0,
      debugMode: false,
      rollingDiceObject: null,
      gachaWheelBool: false,
      hasGachaPoints: +(localStorage.getItem("gachaPoints") || 1) > 0
    }
  }
});

</script>

<style scoped>
.all-skills-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  gap: 20px;
}

.signature-skills {
  position: relative;
  width: calc(100% - 2* 100px);
  /* height: 50%; */
  max-height: 25%;
  height: 25vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  padding: 20px 100px;
  /* column-gap: 10px; */
}

.signature-skills .signature-skill,
.add-signature-skill,
.add-casual-skill,
.casual-skill {
  padding: 10px 0;
  margin-right: 10px;
  padding-right: 10px;
  flex-direction: row;
  width: fit-content;
  display: flex;
  gap: 10px;
  align-items: center;
  width: calc(33% - 10px);
  border-right: 2px solid white;
  /* position: relative; */
}

.casual-skill {
  padding: 5px 0;
}

.skill-notes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

textarea.notes-textarea {
  background-color: rgba(0, 0, 0, 0.8);
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  z-index: 2;
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


.add-signature-skill,
.add-casual-skill {
  justify-content: center;
  border: none;
}

.dices {
  width: 20%;
  transition: all 0.3s;
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

.casual-skills {
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  padding: 20px 100px;
  width: calc(100% - 2* 100px);
}

.skill-container-title {
  position: absolute;
  width: 40%;
  height: 40px;
  background-color: #080808;
  justify-content: center;
  align-content: center;
  display: flex;
  top: 0;
  right: 50%;
  transform: translateY(-40%) translateX(50%);
}

.skill-container-title p {
  height: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
  display: flex;
}


input {
  background-color: #121212;
  color: #e7972e;
  border: none;
  text-shadow: 2px 2px 2px #0a0a0a !important;
  font-family: recharge !important;
  width: 50%;
  font-size: 1em;
}

input:active,
input:focus,
input:focus-visible {
  border: none;
  outline: none;
}

.skill-name {
  width: 35%;
}

.skill-cost {
  width: 20%;
}


.rarity {
  width: 36%;
}

.rarity-Elementary {
  color: #42071c;
}

.rarity-Primordial {
  color: #661431;
}

.rarity-Arcane {
  color: #a1259a;
}

.rarity-Esoteric {
  color: #6a24ab;
}

.rarity-Celestial {
  color: #4d35c4;
}

.rarity-Divine {
  color: #abd5ff;
}

.rarity-Godlike {
  color: #d4af37;
}

.activate-debug {
  position: absolute;
  bottom: -40px;
  left: -70px;
  opacity: 0.2;
}

.upgradable {
  color: #33d633;
}

.wheel-button {
  position: absolute;
  width: 30px;
  height: 30px;
  fill: #fff;
  background-color: #e7972e;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  top: 0;
  transform: translateY(-50%);
  right: 10%;
}

.wheel-button:hover {
  background-color: #cc8325;
}
</style>