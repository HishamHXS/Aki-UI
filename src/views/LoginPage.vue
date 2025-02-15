<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <button type="submit" class="cta-button">Login</button>
      </form>
      <p class="signup-link">
        Don't have an account? <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import { nonAuthPost } from '../axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await nonAuthPost('auth/login', {
      username: username.value,
      password: password.value,
    })

    if (response.status === 200) {
      sessionStorage.setItem('token', response.data)
      router.push('/home')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        errorMessage.value = error.response.data.message || 'Something went wrong!'
      } else if (error.request) {
        errorMessage.value = 'No response received from the server.'
      } else {
        errorMessage.value = `Error: ${error.message}`
      }
    } else {
      errorMessage.value = 'An unexpected error occurred'
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #8b795e;
}

.login-container {
  background: #f3e8db;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  width: 100%;
  text-align: center;
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #5a4736;
  font-weight: bold;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #6d5b4b;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #b6a694;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #ece2d0;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #8b7252;
  outline: none;
}

.error {
  color: #8c3a2b;
  margin-top: -5px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.cta-button {
  width: 100%;
  background-color: #6b5638;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.cta-button:hover {
  background-color: #54412d;
  transform: scale(1.05);
}

.signup-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #6d5b4b;
}

.signup-link a {
  color: #8b7252;
  text-decoration: none;
  font-weight: bold;
}

.signup-link a:hover {
  text-decoration: underline;
  color: #5a4736;
}
</style>
