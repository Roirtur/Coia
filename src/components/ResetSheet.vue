<template>
    <div v-if="confirmationWindow">
        <div class="confirmation-window-background" @click="confirmationWindow = false">
        </div>
        <div class="confirmation-container">
            <div class="confirmation-text">
                Are you sure you want to reset your character ?
                <br><br>
                (Make sure to save it first)
            </div>
            <div class="confirmation-buttons">
                <div @click="resetData" class="confirmation-button-yes">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                </div>
                <div @click="confirmationWindow = false" class="confirmation-button-no">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path
                            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </div>
            </div>
        </div>

    </div>

    <div class="reset-button" @click="confirmationWindow = true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
                d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z" />
        </svg>
    </div>

</template>

<script>
export default {
    name: 'ResetSheet',
    data() {
        return {
            confirmationWindow: false,
        }
    },
    methods: {
        resetData() {
            localStorage.clear();
            window.location.reload();
        }
    }
}
</script>

<style scoped>
.confirmation-window-background {
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

.confirmation-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 5vh;
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

.confirmation-text {
    font-size: 2em;
    color: #efefef;
    padding: 20px;
    height: 50%;
    align-items: flex-end;
    display: flex;
}

.confirmation-buttons {
    display: flex;
    flex-direction: row;
    gap: 15vw;
    align-items: center;
}

.confirmation-button-yes,
.confirmation-button-no {
    aspect-ratio: 1/1;
    height: 5vh;
    fill: #efefef;
    background-color: #e7972e;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s, transform 0.1s;
    padding: 10px;

}

.confirmation-button-yes:hover {
    background-color: #e42828;
    fill: #2e0101;
}

.confirmation-button-no:hover {
    background-color: #33d633;
    fill: #001f00;
}


.confirmation-button-yes:active,
.confirmation-button-no:active {
    transform: scale(0.9);
}


.reset-button {
    position: absolute;
    top: -1vw;
    left: -3vw;
    cursor: url(http://localhost:8080/72d71e87f1efd9cc.cur), auto;
    width: 40px;
    height: 40px;
    padding: 0;
    fill: #efefef;
    transition: all 0.3s, transform 0.1s;
}

.reset-button:hover {
    fill: #e7972e;
}

.reset-button:active {
    transform: scale(0.9);
}
</style>