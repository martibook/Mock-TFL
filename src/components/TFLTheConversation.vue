<script setup>
import ConversationItem from './ConversationItem.vue'
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
    <li v-for="(conv, i) in conversations" :class="{ active: conv.id == currentConversationId }"  @click="currentConversationId = conv.id">
      <ConversationItem :name="conv.recipients[0].phoneNumber">
        <!-- <template #avatar>
          <EcosystemIcon />
        </template> -->
      </ConversationItem>
    </li>
  </ul>

</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.active {
  background-color: rgb(179, 199, 230);
}
</style>
