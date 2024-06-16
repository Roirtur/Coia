<template>
    <div class="kills-container">
        <div class="unranked-races">
            <div v-for="groupName in Object.keys(races)" :key="groupName" class="race-type-container"
                :style="groupName == 'Underworld' ? 'display:none;' : ''">
                <div class="category-title">{{ groupName }} :</div>
                <div v-for="(count, raceName) in races[groupName]" :key="raceName" class="values-container" @click="addOne(races[groupName], raceName)"  @contextmenu="removeOne(races[groupName], raceName)">
                    {{ raceName }} : <span class="count-value">{{ count }}</span>
                </div>
            </div>
        </div>
        <div class="ranked-races">
            <div v-for="(_, raceRank) in races['Underworld']" :key="raceRank" class="race-type-container">
                <div class="category-title">{{ raceRank }} :</div>
                <div v-for="(rankCount, rankRaceName) in races['Underworld'][raceRank]" :key="rankRaceName" class="values-container" @click="addOne(races['Underworld'][raceRank], rankRaceName)"  @contextmenu="removeOne(races['Underworld'][raceRank], rankRaceName)">
                    <span style="display: flex; flex-wrap: nowrap;">{{ rankRaceName }}</span> : <span class="count-value">{{ rankCount }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-nocheck
import { ref, watchEffect } from 'vue';

export default {
    name: 'KillsRegistery',
    setup() {
        const races = ref({
            "Animals": {
                "Slugcat": 0,
                "Monster kelp": 0,
                "Leviathan": 0,
                "Worm grass": 0,
                "Lantern mouse": 0,
                "Jetfish": 0,
                "Raindeer": 0,
                "Hammerbeak": 0,
                "Head-tail": 0,
                "Hermit rat": 0,
                "Shroombear": 0,
                "Mizoujack": 0,
                "Man-toyer": 0
            },
            "Sentient beings": {
                "Omiris": 0,
                "Barbarian": 0,
                "Myconid": 0,
                "Elf": 0,
                "Ent": 0,
                "Bangaa": 0,
                "Burmecian": 0,
                "Galka": 0,
                "Garif": 0,
                "Qsiti": 0,
                "Palico": 0,
                "Goron": 0,
            },
            "Underworld": {
                "Rank 1": {
                    "Gremlin": 0,
                    "Acheman": 0,
                    "Giant insect": 0,
                    "ChuChu": 0,
                    "Skeleton": 0,
                },
                "Rank 2": {
                    "Kappa": 0,
                    "Antica": 0,
                    "Draugr": 0,
                    "Falmer": 0,
                    "Deku": 0,
                    "Inbyo": 0,
                },
                "Rank 3": {
                    "Bigfoot": 0,
                    "Mermaid": 0,
                    "Bugbear": 0,
                    "Bloathead": 0,
                    "Corpse-Weeper": 0,
                },
                "Rank 4": {
                    "Bodak": 0,
                    "Cyclopes": 0,
                    "Charr": 0,
                    "Mimic": 0,
                    "Enchanted": 0,
                    "Draconian": 0,
                    "Ghost": 0,
                },
                "Rank 5": {
                    "Capra Demon": 0,
                    "Doppelganger": 0,
                    "Drake": 0,
                    "Pisaca": 0,
                },
                "Rank 6": {
                    "Titan": 0,
                    "Turbinid-Dragon": 0,
                    "Tidal-freezer": 0,
                    "Hollow": 0,
                },
            },
            "Higher beings": {
                "God": 0,
                "Angel": 0,
                "Etheral": 0,
                "Constellation": 0,
            }
        });

        // Load data from Local Storage on mount
        if (localStorage.getItem('racesKills')) {
            races.value = JSON.parse(localStorage.getItem('racesKills') || '');
        }

        // Save data to Local Storage whenever it changes
        watchEffect(() => {
            localStorage.setItem('racesKills', JSON.stringify(races.value));
        });

        return { races };
    },
    methods: {
        isRank(name: string) {
            return /^Rank \d+$/.test(name);
        },
        addOne(raceArray: any, raceName: string) {
            raceArray[raceName]++
        },
        removeOne(raceArray: any, raceName: string) {
            if (raceArray[raceName] > 0) raceArray[raceName]--
        }
    }
};

</script>


<style scoped>
.scrollable-container {
    overflow-y: auto;
    overflow-x: hidden;
}

.kills-container {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.race-type-container {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    background-color: #111;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5px;
}

.unranked-races {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 100%;
}

.ranked-races {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 70%;
}

.category-title {
    width: fit-content;
    color: #e7972e;
}

.values-container {
    border: 1px solid #e7972e;
    padding: 5px 10px;
    font-size: 0.8em;
    flex-wrap: nowrap;
    display: flex;
    gap: 5px;
    align-items: center;
}

.count-value {
    color: #e7972e;
}
</style>