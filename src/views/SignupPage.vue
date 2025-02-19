<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-[#8b795e]">
    <section class="bg-[#f3e8db] p-8 rounded-xl shadow-md max-w-md w-full text-center">
      <h1 class="text-[1.8rem] mb-4 text-[#5a4736] font-bold">Create your Account</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4 text-left">
          <label for="username" class="block font-bold mb-1 text-[#6d5b4b]">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="w-full px-3 py-2 border border-[#b6a694] rounded-md text-lg bg-[#ece2d0] transition-colors duration-300 focus:border-[#8b7252] focus:outline-none"
          />
        </div>

        <div class="mb-4 text-left">
          <label for="password" class="block font-bold mb-1 text-[#6d5b4b]">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-3 py-2 border border-[#b6a694] rounded-md text-lg bg-[#ece2d0] transition-colors duration-300 focus:border-[#8b7252] focus:outline-none"
          />
        </div>

        <div class="mb-4 text-left">
          <label for="confirmPassword" class="block font-bold mb-1 text-[#6d5b4b]"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            class="w-full px-3 py-2 border border-[#b6a694] rounded-md text-lg bg-[#ece2d0] transition-colors duration-300 focus:border-[#8b7252] focus:outline-none"
          />
        </div>

        <div v-if="errorMessage" class="text-[#8c3a2b] mb-4 text-[0.9rem]">{{ errorMessage }}</div>

        <button
          type="submit"
          class="w-full bg-[#6b5638] text-white px-4 py-2 rounded-md text-lg font-bold transition-all duration-300 hover:bg-[#54412d] hover:scale-105"
        >
          Sign Up
        </button>
      </form>
      <p class="mt-4 text-[0.9rem] text-[#6d5b4b]">
        Already have an account?
        <router-link
          to="/login"
          class="text-[#8b7252] font-bold no-underline hover:underline hover:text-[#5a4736]"
        >
          Login
        </router-link>
      </p>
    </section>
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
      router.push('/login')
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
