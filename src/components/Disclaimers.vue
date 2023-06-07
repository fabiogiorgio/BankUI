<template>
    <welcomeview></welcomeview>
    <h3>Insert text in the textbox to update a Disclaimer:</h3>
    <div class="container">
        <div class="input-container">
            <textarea v-model="textArea" class="text-area"></textarea>
        </div>
        <button @click="updateDisclaimer" class="update-button">Update</button>
    </div>
</template>

<script>
import axios from 'axios';
import WelcomeView from './WelcomeView.vue'
export default {
    name: 'Disclaimers',
    components: {
        welcomeview: WelcomeView
    },
    data() {
        return {
            textArea: '',
            text: ''
        }
    },
    mounted() {
        axios.get('https://sawacms.azurewebsites.net/api/Disclaimers')
            .then(response => {
                this.textArea = response.data.disclaimers
            })
    },
    methods: {
        updateDisclaimer() {
            if (this.textArea) {
                axios.put('https://sawacms.azurewebsites.net/api/UpdateDisclaimers', {
                    newDisclaimer: this.textArea
                }, { headers: { 'Content-Type': 'application/json' } })
                    .then(response => {
                        alert("Disclaimer updated")
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
    }
}
</script>
 
<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-container {
    width: 80%;
    margin-bottom: 1rem;
}

.text-area {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid gray;
    min-height: 150px;
}

.update-button {
    background-color: #4CAF50;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    align-self: center;
}

.update-button:hover {
    background-color: #3e8e41;
}

.updated-text {
    margin-top: 1rem;
    font-size: 1.2rem;
}
</style>