<script setup>
import ConversationItem from './ConversationItem.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
</script>

<script>
export default {
  data() {
    return {
      conversations: [
          {
            name: 'Moley'
          },
          {
            name: 'Bear'
          }
        ]
    }
  }
}
</script>

<template>

  <ul v-for="(conv, i) in conversations">
    <li>
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
