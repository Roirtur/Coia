<template>
  <div class="all-skills-container">
    <div class="activate-debug" @click="debugMode = !debugMode">
      Debug
    </div>
    <DiceRoll v-if="rollingDice" v-bind:diceNumber="diceNumber" v-bind:diceSides="diceSides"
      @close="rollingDice = false" @result="checkLastRollValue" />
    <AdvantagesUtils />
    <GachaWheel v-if="gachaWheelBool"/>
    <div class="signature-skills corner-background">
      <div class="skill-container-title">
        <p>Signature skills</p>
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
      <div v-if="signatureSkills.length < 12" class="add-signature-skill" @click="addSignatureSkill">
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

    const addSignatureSkill = () => {
      signatureSkills.push({
        name: "Unknown",
        points: raritiesPoints[0],
        rarity: 0,
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
      var exp = (skill.level**2)+1
      console.log(exp)
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
    }
  },
  components: {
    AdvantagesUtils,
    DiceRoll,
    GachaWheel,
  },
  data() {
    return {
      rollingDice: false,
      diceNumber: 0,
      diceSides: 0,
      debugMode: false,
      rollingDiceObject: null,
      gachaWheelBool: false,
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
</style>