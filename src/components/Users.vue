<template>
    <welcomeview></welcomeview>
    <h3>Deactivate the desired user by clicking on the green button</h3>
    <div>
        <ul class="user-list">
            <li v-for="user in users" :key="user.id">
                {{ user.firstName }}
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
            const token = localStorage.getItem('bearerToken');
            console.log(token)
            const header = {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin' : 'http://localhost:8082/',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
           axios.get('http://localhost:8080/api/users', { headers: header
            })
            .then(response => {
                this.users = response.data;
            });
        },
        deactivateUser(id) {
            axios.put(``)
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


