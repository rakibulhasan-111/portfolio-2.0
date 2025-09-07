<template>
	<main v-if="!loading" id="hello">
	  <!-- gradients -->
	  <div class="css-blurry-gradient-blue"></div>
	  <div class="css-blurry-gradient-green"></div>
  
	  <section class="hero">
		<div class="head">
		  <span>
			Hi all, I am
		  </span>
		  <h1>{{ dev.name }}</h1>
		  <span class="diple flex">
			>&nbsp;
			<h2 class="line-1 anim-typewriter max-w-fit">
			  {{ dev.role }}
			</h2>
		  </span>
		</div>
  
		<div id="info">
		  <span class="action">
			// complete the game to continue
		  </span>
		  <span :class="{ hide: isMobile }">
			// you can also see it on my Github page
		  </span>
		  <span :class="{ hide: !isMobile }">
			// find my profile on Github:
		  </span>
		  <p class="code">
			<span class="identifier">const</span>
			<span class="variable-name">githubLink</span>
			<span class="operator">=</span>
			<a
			  class="string"
			  :href="'https://github.com/' + dev.contacts.social.github.user"
			>
			  "https://github.com/{{ dev.contacts.social.github.user }}"
			</a>
		  </p>
		</div>
	  </section>
  
	  <section data-aos="fade-up" class="game" v-if="!isMobile">
		<SnakeGame />
	  </section>
	</main>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import dev from '~/developer.json' // ✅ direct JSON import
  
  const isMobile = ref(false)
  const loading = ref(false)
  
  onMounted(() => {
	if (window.innerWidth <= 1024) isMobile.value = true
	window.addEventListener('resize', handleResize)
  })
  
  onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize)
  })
  
  function handleResize() {
	isMobile.value = window.innerWidth <= 1024
  }
  </script>
  
  <style scoped>
  /* --- your existing styles unchanged --- */
  </style>
  