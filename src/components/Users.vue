<template>
  <div class="container">
    <welcomeview></welcomeview>
    <h3>Deactivate the desired user by clicking on the deactivate button</h3>
    <div>
      <ul class="user-list">
        <li v-for="user in users" :key="user.id">
          {{ user.firstName }}
          <button @click="deactivateUser(user.id)">Deactivate</button>
          <button @click="editUser(user.id)">Edit</button>
        </li>
      </ul>
    </div>
    <div v-if="editingUserId" class="form-container">
      <h3>Edit User</h3>
      <form @submit.prevent="saveUser">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="editedUser.firstName" required>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="editedUser.lastName" required>
        <label for="mobileNumber">Mobile Number:</label>
        <input type="text" id="mobileNumber" v-model="editedUser.mobileNumber" required>
        <label for="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" v-model="editedUser.dateOfBirth">
        <button type="submit">Save</button>
      </form>
    </div>
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
        users: [],
        editingUserId: null,
        editedUser: {
          firstName: '',
          lastName: '',
          mobileNumber: '',
          dateOfBirth: ''
        }
      }
    },
    mounted() {
      this.getUsers()
    },
    methods: {
      getUsers() {
        const token = localStorage.getItem('bearerToken');
        const header = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:8081/',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };
  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get('http://localhost:8080/api/users', { headers: header })
          .then(response => {
            this.users = response.data;
          });
      },
      deactivateUser(id) {
        axios.put(`http://localhost:8080/api/users/${id}/deactivate`)
          .then(() => {
            this.getUsers();
          });
      },
      editUser(id) {
        this.editingUserId = id;
        const user = this.users.find(user => user.id === id);
        this.editedUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          mobileNumber: user.mobileNumber,
          dateOfBirth: user.dateOfBirth
        };
      },
      saveUser() {
        axios.put(`http://localhost:8080/api/users/${this.editingUserId}`, this.editedUser)
          .then(() => {
            this.editingUserId = null;
            this.editedUser = {
              firstName: '',
              lastName: '',
              mobileNumber: '',
              dateOfBirth: ''
            };
            this.getUsers();
          });
      }
    }
  }
  </script>
  
  <style>
  .container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.heading {
  font-size: 24px;
  margin-bottom: 20px;
}

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

.form-container {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

.form-container h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.form-container form {
  display: grid;
  grid-template-columns: 100px auto;
  grid-gap: 10px;
  align-items: center;
}

.form-container label {
  font-weight: bold;
}

.form-container input[type="text"],
.form-container input[type="date"] {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-container button[type="submit"] {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.form-container button[type="submit"]:hover {
  background-color: #555;
}

  </style>
  