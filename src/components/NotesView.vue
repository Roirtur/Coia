<template>
    <textarea class="description-text text-field notes-container" v-model="notes">
    </textarea>
</template>

<script lang='ts'>
export default {
    name: 'NotesView',
    data() {
        return {
            notes: localStorage.getItem("playerGlobalNotes") || ''
        }
    },
    watch : {
        notes (notes){
            localStorage.setItem("playerGlobalNotes", notes);
        }
    }
}
</script>

<style scoped>

.text-field {
  background-color: #121212;
  color: #e7972e;
  border: none;
  text-shadow: 2px 2px 2px #0a0a0a !important;
  font-family: recharge !important;
  font-size: 1.1em;
  padding: 30px;
  width: calc(90% - 60px);
}

.text-field:focus {
    outline: 2px solid #e7972e;
}

.notes-container {
    width: 85%;
    height: 80%;
}
</style>