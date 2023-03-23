<script>
  import { MDBBtn } from "mdb-vue-ui-kit";
  import { initConversations, initCurrentConversationId, initMessages, store } from '../store';
  import axios from "axios";

  export default {
    components: {
      MDBBtn
    },
    data() {
      return { store }
    },
    methods: {
      onReset() {
        store.conversations = initConversations;
        store.messages = initMessages;
        store.currentConversationId = initCurrentConversationId;
      },
      onPull() {
        let getConversationUr = "http://localhost:86/clouddataproxy/devices/11/conversations?";
        let getMessagesUrl = "http://localhost:86/clouddataproxy/devices/11/messages?";

        let getConversationReq = axios.get(getConversationUr);
        let getMessagesReq = axios.get(getMessagesUrl);
        
        axios
          .all([getConversationReq, getMessagesReq])
          .then(
            axios.spread((...responses) => {
              const conversationRes = responses[0];
              const messageRes = responses[1];

              console.log('conversation response', typeof(conversationRes));
              console.log(conversationRes);

              console.log('message response', typeof(messageRes));
              console.log(messageRes);

              store.conversations = conversationRes.data.value;
              store.messages = messageRes.data.value;
              store.currentConversationId = store.conversations[0].id;
            })
          )
          .catch((error) => {
            console.log(error);
          })
      }
    }
  }
</script>

<template>
  <div class="sync-frame">
    <MDBBtn color="primary" class="sync" @click="onReset">Reset</MDBBtn>
    <MDBBtn color="primary" class="sync" @click="onPull">FullSync</MDBBtn>
    <MDBBtn color="primary" class="sync">DeltaSync</MDBBtn>
  </div>
</template>

<style scoped>

.sync-frame {
  padding: 2rem 0;
}

.sync {
  text-align: center;
  font-size: 1.2rem;
}


</style>
