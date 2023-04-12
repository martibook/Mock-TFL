<script>
import { DeltaAction, store, getRecepients, getMessageCount } from '../store'

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
                var newMessage = {
                    id: `${store.ltwCurrentConversationId}-${getMessageCount(store.ltwMessages, store.ltwCurrentConversationId) + 1}`,
                    conversationId: store.ltwCurrentConversationId,
                    body: this.content,
                    deltaAction: DeltaAction.CREATE,
                    lastModifiedDateTime: new Date().toISOString(),
                    sender: {
                        phoneNumber: store.selfPhoneNumber
                    },
                    recipients: getRecepients(store.ltwConversations, store.ltwCurrentConversationId)
                }

                store.ltwMessages.push(newMessage)
                store.ltwDeltaMessages.push(newMessage)
                this.content = ''

                console.log(newMessage)
                console.log('ltw delta msg after adding a new one', store.ltwDeltaMessages);
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