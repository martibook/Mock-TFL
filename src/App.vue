<script setup>
import SyncButton from './components/SyncButton.vue';
import TheConversation from './components/TheConversation.vue'
import TheMessage from './components/TheMessage.vue';
</script>

<template>
  <div class="parent">
    <header>
      <SyncButton/>
    </header>

    <main>
      <div class="the-conversation">
        <TheConversation />
      </div>
      <div class="the-message">
        <TheMessage></TheMessage>
      </div>
    </main>
  </div>
</template>

<style scoped>

.parent {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

header {
  display: flex;
  /* place-items: center; */
  /* line-height: 1.5; */
}

main {
  display: grid;
  grid-template-columns: minmax(12rem, 25%) minmax(60rem, auto);
}

.the-conversation {
  display: grid;
  grid-template-rows: auto;
}

.the-message {
  display: flex;
  place-items: center;
  background-color: rgb(234, 239, 243);
}

</style>
