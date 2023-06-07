<template>
    <welcomeview></welcomeview>
    <h3>Deactivate the desired user by clicking on the green button</h3>
    <div>
        <ul class="user-list">
            <li v-for="user in users" :key="user.id">
                {{ user.name }} (ID: {{ user.id }})
                <button @click="deactivateUser(user.id)">Deactivate</button>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import WelcomeView from './WelcomeView.vue'
export default {
    name: 'Users',
    components: {
        welcomeview: WelcomeView
    },
    data() {
        return {
            users: []
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        getUsers(){
            const token = localStorage.getItem('token');
            axios.get('http://localhost:8080/api/users', {
             headers: {
                Authorization: `Bearer ${token}`
            }
            })
            .then(response => {
                this.users = response.data;
            });
        },
        deactivateUser(id) {
            axios.put(`https://sawacms.azurewebsites.net/api/users/${id}/false`)
                .then(() => {
                    this.getUsers()
                });
        }
    }
}
</script>

<style>
.user-list {
    list-style: none;
    padding: 0;
}

.user-list li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user-list button {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
}

.user-list button:hover {
    background-color: #3e8e41;
}
</style>

