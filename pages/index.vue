<template>
	<main v-if="!loading" id="hello">
  
	  <!-- gradients -->
	  <div class="css-blurry-gradient-blue"></div>
	  <div class="css-blurry-gradient-green"></div>
  
	  <section class="hero">
		<div class="head">
		  <span>Hi all, I am</span>
		  <h1>{{ devConfig.name }}</h1>
		  <span class="diple flex">
			>&nbsp;
			<h2 class="line-1 anim-typewriter max-w-fit">{{ devConfig.role }}</h2>
		  </span>
		</div>
  
		<div id="info">
		  <span class="action">// complete the game to continue</span>
		  <span :class="{hide: isMobile}">// you can also see it on my Github page</span>
		  <span :class="{hide: !isMobile}">// find my profile on Github:</span>
		  <p class="code">
			<span class="identifier">const</span>
			<span class="variable-name">githubLink</span>
			<span class="operator">=</span>
			<a class="string" :href="`https://github.com/${devConfig.contacts?.social?.github?.user || ''}`">
			  "https://github.com/{{ devConfig.contacts?.social?.github?.user || '' }}"
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
  
  const config = useRuntimeConfig()
  
  // Safe defaults for developer info
  const devConfig = {
	name: config.public.dev?.name || 'Developer Name',
	role: config.public.dev?.role || 'Your Role',
	contacts: {
	  social: {
		github: { user: config.public.dev?.contacts?.social?.github?.user || '' },
		twitter: { user: config.public.dev?.contacts?.social?.twitter?.user || '' },
	  },
	  email: config.public.dev?.contacts?.email || 'email@example.com',
	},
  }
  
  const isMobile = ref(false)
  const loading = ref(false)
  
  function handleResize() {
	isMobile.value = window.innerWidth <= 1024
  }
  
  onMounted(() => {
	handleResize()
	window.addEventListener('resize', handleResize)
  })
  
  onBeforeUnmount(() => {
	window.removeEventListener('resize', handleResize)
  })
  </script>
  