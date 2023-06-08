<template>
    <div>
      <welcomeview></welcomeview>
      <h3></h3>
      <div>
        <ul class="account_list">
          <li v-for="account in accounts" :key="account.id">
            Account Id:{{account.id}}, Account Type:{{ account.accountType }}, Account Status:{{account.accountStatus}}, Transaction Limit: {{account.transactionLimit}}
            <button @click="deactivateAccount
            (account.id)">Deactivate</button>
            <button @click="editAccount(account.id)">Edit</button>
          </li>
        </ul>
      </div>
      <div v-if="editingAccountId">
        <h3>Edit User</h3>
        <form @submit.prevent="saveUser">
          <label for="accountType">account Type:</label>
          <input type="text" id="accountType" v-model="editedAccount.accountType" required>
          <br>
          <label for="accountStatus">account Status:</label>
          <input type="text" id="accountStatus" v-model="editedAccount.accountStatus" required>
          <br>
          <label for="transactionLimit">transaction Limit:</label>
          <input type="long" id="transactionLimit" v-model="editedAccount.transactionLimit" required>
          <br>
          <label for="dayLimit">day Limit:</label>
          <input type="long" id="dayLimit" v-model="editedAccount.dayLimit" required>
          <br>
           <label for="absoluteLimit">absolute Limit:</label>
          <input type="long" id="absoluteLimit" v-model="editedAccount.absoluteLimit" required>
          <br>
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
  .account_list {
    list-style: none;
    padding: 0;
  }
  
  .account_list li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .account_list button {
    background-color: #4CAF50;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  
  .account_list button:hover {
    background-color: #3e8e41;
  }
  </style>
  