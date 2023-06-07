<template>
    <welcomeview></welcomeview>
    <h3>Insert text in the textbox to update Terms and Conditions<br>
        First textbox stands for Terms, second for Conditions
    </h3>
    <div class="container">
        <div class="input-container">
            <textarea v-model="title" class="text-area"></textarea>
            <textarea v-model="textArea" class="text-area"></textarea>
        </div>
        <button @click="updateTermsAndConditions" class="update-button">Update</button>
    </div>
</template>

<script>
import axios from 'axios';
import WelcomeView from './WelcomeView.vue'
export default {
    name: 'TermsAndConditions',
    components: {
        welcomeview: WelcomeView
    },
    data() {
        return {
            textArea: '',
            text: '',
            title: ''
        }
    },
    mounted() {
        axios.get('https://sawacms.azurewebsites.net/api/TermsAndCondition')
            .then(response => {
                this.title = response.data.title
                this.textArea = response.data.content
            })
    },
    methods: {
        updateTermsAndConditions() {
            if (this.textArea) {
                axios.put('https://sawacms.azurewebsites.net/api/UpdateTermsAndConditions', {
                    newTitle: this.title, newContent: this.textArea
                }, { headers: { 'Content-Type': 'application/json' } })
                    .then(response => {
                        alert("Terms and Conditions updated")
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