<template>
    <textarea class="inventory text-field" v-model="inventory">
    </textarea>
    <div class="kades-container">
        <span>Kades:</span>
        <span class="kades" :class="kades < 0 ? 'red' : ''">{{ kades }}</span>
        <div class="modify-kades-container">
            <div class="button-change-kades" @click="removeKades"> - </div>
            <input type="number" class="text-field add-kades-input" placeholder="Add/Rm" v-model="dynamicKades" />
            <div class="button-change-kades" @click="addKades"> + </div>
        </div>
    </div>
</template>

<script lang='ts'>
export default {
    name: 'InventoryView',
    data() {
        return {
            inventory: localStorage.getItem("playerInventory") || '',
            kades: +(localStorage.getItem("kades") || 0),
            dynamicKades: ""
        }
    },
    watch: {
        notes(inventory) {
            localStorage.setItem("playerInventory", inventory);
        },
        kades(kades) {
            localStorage.setItem("kades", kades);
        }
    },
    methods: {
        addKades() {
            this.kades += +this.dynamicKades
            this.dynamicKades = ""
        },
        removeKades() {
            this.kades -= +this.dynamicKades
            this.dynamicKades = ""
        }
    }
}
</script>

<style scoped>

.text-field[type=number]::-webkit-inner-spin-button, 
.text-field[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}


.inventory {
    width: calc(90% - 60px);
    padding: 30px;
    height: 80%;
}

.text-field {
    background-color: #121212;
    color: #e7972e;
    border: none;
    text-shadow: 2px 2px 2px #0a0a0a !important;
    font-family: recharge !important;
    font-size: 1.1em;
}

.text-field:focus {
    outline: 2px solid #e7972e;
}

.kades-container {
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
    background-color: #121212;
    color: #e7972e;
    width: 50%;
    padding: 10px 50px;
    font-size: 1.3em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
}

.kades {
    min-width: 150px;
    transition: all 0.3s;
}

.kades.red {
    color: #e42828
}

.add-kades-input {
    width: 150px;
    border: 2px solid #e7972e;
    justify-content: center;
    text-align: center;
}

.add-kades-input::placeholder {
    opacity: 0.2;
}

.modify-kades-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.button-change-kades {
    border: 1px solid #e7972e;
    aspect-ratio: 1/1;
    height: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>