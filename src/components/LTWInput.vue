<script>
import { store } from '../store'

export default {
    data() {
        return {
            content: '',
            store
         }
    },
    methods: {
        onKeyup(e) {
            if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                // this.sendMessage(this.content);
                console.log(this.content);
                var newMessage = {
                    conversationId: store.ltwCurrentConversationId,
                    body: this.content,
                    direction: 'out'
                }
                store.ltwMessages.push(newMessage)
                this.content = ''
            }
        }
    }
}
</script>

<template>
    <div class="text">
        <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
    </div>
</template>

<style scoped>
.text textarea {
    padding: 1rem;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    /* font-family: "Micrsofot Yahei"; */
}
</style>