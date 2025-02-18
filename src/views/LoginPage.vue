<template>
  <div class="flex justify-center items-center min-h-screen bg-[#8b795e]">
    <div class="bg-[#f3e8db] p-8 rounded-lg shadow-lg max-w-[350px] w-full text-center">
      <h2 class="text-[1.8rem] mb-4 text-[#5a4736] font-bold">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4 text-left">
          <label class="block font-bold mb-1 text-[#6d5b4b]" for="username">Username</label>
          <input
            class="w-full px-4 py-2 border border-[#b6a694] rounded-md text-lg bg-[#ece2d0] transition-colors duration-300 focus:border-[#8b7252] focus:outline-none"
            v-model="username"
            type="text"
            id="username"
            required
          />
        </div>
        <div class="mb-4 text-left">
          <label class="block font-bold mb-1 text-[#6d5b4b]" for="password">Password</label>
          <input
            class="w-full px-4 py-2 border border-[#b6a694] rounded-md text-lg bg-[#ece2d0] transition-colors duration-300 focus:border-[#8b7252] focus:outline-none"
            v-model="password"
            type="password"
            id="password"
            required
          />
        </div>
        <p v-if="errorMessage" class="text-[#8c3a2b] -mt-1 mb-4 text-[0.9rem]">
          {{ errorMessage }}
        </p>
        <button
          type="submit"
          class="w-full bg-[#6b5638] text-white px-4 py-2 rounded-md text-lg font-bold transition duration-300 hover:bg-[#54412d] transform hover:scale-105"
        >
          Login
        </button>
      </form>
      <p class="mt-4 text-[0.9rem] text-[#6d5b4b]">
        Don't have an account?
        <router-link
          to="/signup"
          class="text-[#8b7252] font-bold no-underline hover:underline hover:text-[#5a4736]"
        >
          Sign up
        </router-link>
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
    // Add more indepth validation.
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
