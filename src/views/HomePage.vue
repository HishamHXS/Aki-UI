<template>
  <div id="app">
    <h1>Welcome to the Homepage</h1>
    <div>
      <p>Welcome back, {{ username }}</p>
      <button class="cta-button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { getUsernameFromToken } from '../auth'
export default {
  name: 'App',
  components: {},
  data() {
    const router = useRouter()
    const username = getUsernameFromToken()

    if (!username) {
      router.push('/login')
    }

    return {
      username,
      router,
    }
  },

  methods: {
    logout() {
      this.router.push('/').then(() => {
        sessionStorage.clear()
        window.location.reload()
      })
    },
  },
}
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #8b795e;
  color: #5a4736;
  font-family: 'Roboto Mono', monospace;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.user-info {
  background: #f3e8db;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.user-info span {
  font-weight: bold;
  color: #6d5b4b;
}

.error-message {
  color: #8c3a2b;
  font-size: 1rem;
  margin-top: 1rem;
}

.error-message a {
  color: #8b7252;
  font-weight: bold;
  text-decoration: none;
}

.error-message a:hover {
  text-decoration: underline;
  color: #5a4736;
}
</style>
