<template>
  <div id="landing-page">
    <section class="hero">
      <h1>Aki: Bring Your Ideas Together</h1>
      <p>Connect, collaborate, and create by pooling ideas with others.</p>
      <a href="#get-started" class="cta-button">Get Started</a>
    </section>

    <section id="about" class="about">
      <h2>About Aki</h2>
      <p>
        Aki is a minimalistic platform designed for people to pool ideas together, collaborate, and
        innovate in a simple and efficient way. Whether you're working on a project, starting a
        business, or exploring new concepts, Aki aims to tackle the rising number of consumers and
        create more producers.
      </p>
    </section>

    <section id="how-it-works" class="how-it-works">
      <h2>How It Works</h2>
      <div class="steps">
        <div class="step">
          <h3>1. Share Your Idea</h3>
          <p>Post your idea.</p>
        </div>
        <div class="step">
          <h3>2. Collaborate</h3>
          <p>Join the community and start working with others.</p>
        </div>
        <div class="step">
          <h3>3. Innovate</h3>
          <p>Work together to turn ideas into action and create something amazing.</p>
        </div>
      </div>
    </section>

    <section id="get-started" class="get-started">
      <h2>Ready to Pool Ideas?</h2>
      <p>Sign up now to start sharing and collaborating!</p>
      <router-link to="/signup">
        <button class="cta-button">Join Aki</button>
      </router-link>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'LandingPage',
  components: {},
})
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 100px 20px;
  background-color: #8c7b5b;
  color: white;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero .cta-button {
  display: inline-block;
  background-color: #6a4f35;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
}

.about {
  text-align: center;
  padding: 50px 20px;
  background-color: #f0e4d7;
}

.about h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #6a4f35;
}

.about p {
  font-size: 1.1rem;
  color: #6d6d6d;
  max-width: 800px;
  margin: 0 auto;
}

.how-it-works {
  text-align: center;
  padding: 50px 20px;
  background-color: #c3b59f;
}

.how-it-works .steps {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.how-it-works .step {
  width: 30%;
  margin-bottom: 30px;
}

.how-it-works .step h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #6a4f35;
}

.how-it-works .step p {
  color: #6d6d6d;
}

.get-started {
  text-align: center;
  padding: 50px 20px;
  background-color: #8c7b5b;
}

.get-started h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
}

.get-started .cta-button {
  background-color: #6a4f35;
  color: white;
  padding: 15px 30px;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
}
</style>
