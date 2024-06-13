<template>
    <div v-if="choiceWindow">
        <div class="choice-window-background" @click="choiceWindow = false">
        </div>
        <div class="choice-container">
            <div class="choice-text">
                Save or load ?
            </div>
            <div v-if="savedMessage" style="height: 0; padding-bottom: -100px;">
                Saved to your Download folder! (CoiaCharacter.json)
            </div>
            <div class="choice-buttons">
                <div @click="saveLocalStorageData" class="choice-button-save">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                </div>
                <div class="choice-button-load">
                    <input type="file" @change="handleFileUpload" accept=".json" />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>


    <div class="save-button" @click="choiceWindow = true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
    </div>

</template>

<script>



export default {
    name: 'SaveJson',
    data() {
        return {
            choiceWindow: false,
            savedMessage: false,        
        }
    },
    methods: {
        async saveLocalStorageData() {
            
            try {
                // Create a blob containing the local storage data
                const data = JSON.stringify(localStorage);
                const blob = new Blob([data], { type: 'application/json' });

                // Create a link to the blob
                const url = URL.createObjectURL(blob);

                // Create a hidden link element and simulate a click to trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.download = 'CoiaCharacter.json';
                link.click();

                // Remove the link and revoke the object URL
                URL.revokeObjectURL(url);
                link.remove();

                this.savedMessage = true;

                setTimeout(() => {
                    this.savedMessage = false;
                }, 5000);

            } catch (error) {
                console.error('Error saving local storage data:', error);
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file && file.type === "application/json") {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        Object.keys(data).forEach(key => {
                            localStorage.setItem(key, data[key]);
                        });
                        window.location.reload();
                    } catch (error) {
                        console.error('Error parsing JSON data:', error);
                    }
                };
                reader.readAsText(file);
            } else {
                console.error('Please select a valid JSON file.');
            }
        }
    }
}
</script>

<style scoped>
.choice-window-background {
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

.choice-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0;
    font-size: 0.9em;
    width: 50vw;
    height: 50vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    background:
        -moz-linear-gradient(45deg, transparent 55px, rgb(30, 30, 30) 10px),
        -moz-linear-gradient(135deg, transparent 55px, rgb(30, 30, 30) 10px),
        -moz-linear-gradient(225deg, transparent 55px, rgb(30, 30, 30) 10px),
        -moz-linear-gradient(315deg, transparent 55px, rgb(30, 30, 30) 10px);
    background:
        -o-linear-gradient(45deg, transparent 55px, rgb(30, 30, 30) 10px),
        -o-linear-gradient(135deg, transparent 55px, rgb(30, 30, 30) 10px),
        -o-linear-gradient(225deg, transparent 55px, rgb(30, 30, 30) 10px),
        -o-linear-gradient(315deg, transparent 55px, rgb(30, 30, 30) 10px);
    background:
        -webkit-linear-gradient(45deg, transparent 55px, rgb(30, 30, 30) 10px),
        -webkit-linear-gradient(135deg, transparent 55px, rgb(30, 30, 30) 10px),
        -webkit-linear-gradient(225deg, transparent 55px, rgb(30, 30, 30) 10px),
        -webkit-linear-gradient(315deg, transparent 55px, rgb(30, 30, 30) 10px);
    background-position: bottom left, bottom right, top right, top left;
    -moz-background-size: 51% 51%;
    -webkit-background-size: 51% 51%;
    background-size: 51% 51%;
    background-repeat: no-repeat;
}

.choice-text {
    font-size: 2em;
    color: #efefef;
    padding: 20px;
    height: 30%;
    align-items: flex-end;
    display: flex;
}

.choice-buttons {
    margin-top: 13vh;
    display: flex;
    flex-direction: row;
    gap: 15vw;
    align-items: center;
}

.choice-button-save,
.choice-button-load {
    aspect-ratio: 1/1;
    height: 4vh;
    fill: #efefef;
    background-color: #e7972e;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s, transform 0.1s;
    padding: 20px;
    position: relative;

}

.choice-button-save:hover,
.choice-button-load:hover {
    background-color: #b67015;
    fill: rgb(73, 43, 4);
}

.choice-button-save:active,
.choice-button-load:active {
    transform: scale(0.9);
}


.choice-button-load input {
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
}

.save-button {
    position: absolute;
    top: -1vw;
    right: -3vw;
    cursor: url(http://localhost:8080/72d71e87f1efd9cc.cur), auto;
    width: 35px;
    height: 35px;
    padding: 0;
    fill: #efefef;
    transition: all 0.3s, transform 0.1s;
}

.save-button:hover {
    fill: #e7972e;
}

.save-button:active {
    transform: scale(0.9);
}
</style>