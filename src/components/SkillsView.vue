<template>
  <div class="all-skills-container">
    <div class="activate-debug" @click="debugMode = !debugMode">
      Debug
    </div>
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
        <div> {{ skill.diceNumber }}d{{ possibleSides[skill.diceSides] }} </div>
        <input class="skill-cost" v-model="skill.cost" type="text">
        <div class="rarity" :class="{ [`rarity-${rarities[skill.rarity]}`]: true }" @click="rarityUp(index)" @contextmenu="rarityDown(index)"> {{ rarities[skill.rarity] }} </div>
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
      <div class="skills-column skills-column-border">

      </div>
      <div class="skills-column skills-column-border">

      </div>
      <div class="skills-column skills-column-border">

      </div>
      <div class="skills-column skills-column-border">

      </div>
      <div class="skills-column">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch, ref } from "vue";

type Skill = {
  name: string;
  rarity: number;
  diceNumber: number;
  diceSides: number;
  cost: string;
  notes: string;
  showNotes: boolean;
};

const possibleSides = [
  100, 50, 20, 12, 10, 8, 6, 4, 3, 2
];

const rarities = [
  'Elementary', 'Primordial', 'Arcane', 'Esoteric', 'Celestial', 'Divine', 'Godlike'
]


export default defineComponent({
  name: "SkillsView",
  setup() {
    const signatureSkills: Skill[] = reactive([]);
    const debugMode = ref(false);

    watch(
      () => signatureSkills,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      },
      { deep: true }
    );

    const addSignatureSkill = () => {
      signatureSkills.push({
        name: "Unknown",
        rarity: 0,
        diceNumber: 1,
        diceSides: 0,
        cost: "Free",
        notes: "Unknown effect",
        showNotes: false,
      });
    };

    const rarityUp = (index: number) => {
      if (signatureSkills[index].rarity >= 6) return;
      signatureSkills[index].rarity++;
    }

    const rarityDown = (index: number) => {
      if (signatureSkills[index].rarity <= 0) return;
      signatureSkills[index].rarity--;
    }

    return {
      signatureSkills,
      addSignatureSkill,
      possibleSides,
      rarities,
      rarityUp,
      rarityDown,
      debugMode,
    };
  },
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  padding: 20px 100px;
  /* column-gap: 10px; */
}

.signature-skills .signature-skill,
.add-signature-skill {
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


.add-signature-skill {
  justify-content: center;
  border: none;
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
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
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
  color: #c5a88c;
}

.rarity-Primordial {
  color: #4ac487;
}

.rarity-Arcane {
  color: #ce6ee6;
}

.rarity-Esoteric {
  color: #5738ad;
}

.rarity-Celestial {
  color: #52d2e9;
}

.rarity-Divine {
  color: #a7dfe9;
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
</style>