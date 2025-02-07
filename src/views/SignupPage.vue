<template>
  <div id="signup-page">
    <section class="signup-form">
      <h1>Create Your Account</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>

        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>

        <div class="input-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>

        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <button type="submit" class="cta-button">Sign Up</button>
      </form>
      <p class="login-link">
        Already have an account? <router-link to="/login">Login</router-link>
      </p>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import { nonAuthPost } from '../api'

export default defineComponent({
  name: 'SignupPage',
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const errorMessage = ref('')

    const submitForm = async () => {
      const formData = {
        username: username.value,
        password: password.value,
      }

      JSON.stringify(formData)

      try {
        const response = await nonAuthPost('/users', formData)

        if (response.status === 200) {
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
    return {
      username,
      password,
      confirmPassword,
      errorMessage,
      submitForm,
    }
  },
})
</script>

<style scoped>
#signup-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #8b795e;
}

.signup-form {
  background: #f3e8db;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #5a4736;
  font-weight: bold;
}

.input-group {
  margin-bottom: 1rem;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #6d5b4b;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #b6a694;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #ece2d0;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #8b7252;
  outline: none;
}

.error-message {
  color: #8c3a2b;
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

.login-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #6d5b4b;
}

.login-link a {
  color: #8b7252;
  text-decoration: none;
  font-weight: bold;
}

.login-link a:hover {
  text-decoration: underline;
  color: #5a4736;
}
</style>
