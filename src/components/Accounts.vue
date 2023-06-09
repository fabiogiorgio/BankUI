<template>
  <div class="container">
    <welcomeview></welcomeview>
    <h3>Deactivate the desired account by clicking on the deactivate button</h3>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Account Id</th>
            <th>Account Type</th>
            <th>Account Status</th>
            <th>Transaction Limit</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td>{{ account.id }}</td>
            <td>{{ account.accountType }}</td>
            <td>{{ account.accountStatus }}</td>
            <td>{{ account.transactionLimit }}</td>
            <td>
              <button @click="deactivateAccount(account.id)">Deactivate</button>
            </td>
            <td>
              <button @click="editAccount(account.id)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="editingAccountId" class="form-container">
      <h3>Edit Account</h3>
      <form @submit.prevent="saveUser">
        <label for="accountType">Account Type:</label>
        <input type="text" id="accountType" v-model="editedAccount.accountType" required>
        <label for="accountStatus">Account Status:</label>
        <input type="text" id="accountStatus" v-model="editedAccount.accountStatus" required>
        <label for="transactionLimit">Transaction Limit:</label>
        <input type="long" id="transactionLimit" v-model="editedAccount.transactionLimit" required>
        <label for="dayLimit">Day Limit:</label>
        <input type="long" id="dayLimit" v-model="editedAccount.dayLimit" required>
        <label for="absoluteLimit">Absolute Limit:</label>
        <input type="long" id="absoluteLimit" v-model="editedAccount.absoluteLimit" required>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>


  
  <script>
  import axios from 'axios';
  import WelcomeView from './WelcomeView.vue'
  
  export default {
    name: 'accounts',
    components: {
      welcomeview: WelcomeView
    },
    data() {
      return {
        accounts: [],
        editingAccountId: null,
        editedAccount: {
          accountType: '',
          accountStatus: '',
          transactionLimit: '',
          dayLimit: ''
        }
      }
    },
    mounted() {
      this.getAccounts()
    },
    methods: {
      getAccounts() {
        const token = localStorage.getItem('bearerToken');
        const header = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'http://localhost:8081/',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        };
  
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get('http://localhost:8080/api/accounts', { headers: header })
          .then(response => {
            this.accounts = response.data;
          });
      },
      deactivateAccount
      (id) {
        axios.put(`http://localhost:8080/api/accounts/${id}/deactivate`)
          .then(() => {
            this.getAccounts();
          });
      },
      editAccount(id) {
        this.editingAccountId = id;
        const account = this.accounts.find(account => account.id === id);
        this.editedAccount = {
          accountType: account.accountType,
          accountStatus: account.accountStatus,
          transactionLimit: account.transactionLimit,
          dayLimit: account.dayLimit,
          absoluteLimit: account.absoluteLimit
        };
      },
      saveUser() {
        axios.put(`http://localhost:8080/api/accounts/${this.editingAccountId}`, this.editedAccount)
          .then(() => {
            this.editingAccountId = null;
            this.editedAccount = {
              accountType: '',
              accountStatus: '',
              transactionLimit: '',
              dayLimit: '',
              absoluteLimit: ''
            };
            this.getAccounts();
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

.table-container {
  margin-top: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

.table th {
  background-color: #f5f5f5;
}

.table tr:hover {
  background-color: #f9f9f9;
}

.table button {
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.table button:hover {
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
.form-container input[type="long"] {
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
  