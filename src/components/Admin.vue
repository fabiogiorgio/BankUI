<template>
    <welcomeview></welcomeview>
    <h3>Insert the new desired password in the textbox to update it</h3>
    <div class="container">
        <div class="form-group">
            <input type="password" v-model="newPassword" class="form-control" placeholder="New Password">
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="updatePassword">Change Password</button>
        </div>
    </div>
</template>

<script>
import WelcomeView from './WelcomeView.vue'
import { GET_ID } from "../store/storeconstants";
export default {
    name: 'Admin',
    components: {
        welcomeview: WelcomeView
    },
    data() {
        return {
            newPassword: ''
        }
    },
    methods: {
        updatePassword() {
            fetch("https://sawacms.azurewebsites.net/api/UpdateAdmin", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminId: this.$store.getters[`auth/${GET_ID}`], newPassword: this.newPassword })
            })
                .then(response => {
                    if (response.ok) {
                        this.$router.push('/login')
                        alert("Password updated successfully!");
                    } else {
                        return response.json().then(error => {
                            alert("Error in password change!");
                            throw new Error(error.message)
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert("Failed to update password. Please check your input and try again")
                });
        },
        logout() {
            this.$auth.logout()
            this.$router.push({ name: '/login' })
        }
    }
}
</script>

<style>
.container {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
}

.form-group {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-control {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
}

.btn {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}

.btn-primary {
    background-color: #4CAF50;
    color: white;
    border: none;
}

.btn-primary:hover {
    background-color: #3e8e41;
}
</style>
