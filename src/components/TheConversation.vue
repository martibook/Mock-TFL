<script setup>
import ConversationItem from './ConversationItem.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
</script>

<script>
import { store } from '../store'

export default {
  data() {
    return store
  }
}
</script>

<template>

  <ul>
    <li v-for="(conv, i) in conversations" @click="currentConversationId = conv.id">
      <ConversationItem :name="conv.name">
        <template #avatar>
          <EcosystemIcon />
        </template>
      </ConversationItem>
    </li>
  </ul>

</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
</style>
