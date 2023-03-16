<script>
import { store } from '../store';

export default {
    data() {
        return store
    }
}
</script>

<template>
    <ul>
        <li v-for="(message, i) in messages.filter((message) => message.conversationId == currentConversationId)">
            <div class="text-in">{{ message.body }}</div>
        </li>
    </ul>
</template>

<style scoped>

ul {
    list-style-type: none;
}
    .text-in {
        display: inline-block;
        position: relative;
        padding: 0 1rem;
        /* max-width: var(calc(100% - 4rem)); */
        min-height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1.2rem;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 4px;

        margin-top: 2rem;
    }

    .text-out {
        display: inline-block;
        position: relative;
        padding: 0 1rem;
        /* max-width: var(calc(100% - 4rem)); */
        min-height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1.2rem;
        text-align: left;
        word-break: break-all;
        background-color: lightgreen;
        border-radius: 4px;

        margin-top: 2rem;
    }
</style>