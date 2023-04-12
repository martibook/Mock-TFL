<script>
  import { MDBBtn } from "mdb-vue-ui-kit";
  import { initConversations, initCurrentConversationId, initMessages, store, extractConversations, extractConversationsWithReceivers, updateByID, APIHost } from '../store';
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
        store.messages = [];

        // store.messages = initMessages.slice();
        store.conversations = extractConversations(store.messages);

        store.currentConversationId = initCurrentConversationId;
      },
      onPull() {
        let messagesUrl = `http://${APIHost}/CloudDataProxy/devices/${store.deviceId}/messages/full`;

        axios
          .get(messagesUrl)
          .then((response) => {
            console.log('what we got when full sync', response);

            const messages = response.data;
            store.messages = messages;
            store.conversations = extractConversations(messages);

            console.log('messages after full sync', store.messages);
            console.log('conversations after full sync', store.conversations);

            store.syncToken = Dete.now();
            console.log('fresh syncToken after full sync', store.syncToken);
          })
          .catch((error) => {
            console.log(error);
          })
      },
      onDeltaPull() {
        let messagesUrl = `http://${APIHost}/CloudDataProxy/devices/${store.deviceId}/messages/full`;

        if (store.syncToken == null) {
          store.syncToken = Date.now()
        }

        const strSyncToken = JSON.stringify(store.syncToken);
        axios
          .get(messagesUrl, { params: {
            deltatoken: strSyncToken
          }})
          .then((response) => {
            console.log(`what we got when delta sync with syncToken ${store.syncToken}`, response);

            const deltaMessages = response.data;

            // update local messages
            updateByID(store.messages, deltaMessages)
            // extract conversations
            const deltaConversations = extractConversations(deltaMessages)
            // update local conversations
            updateByID(store.conversations, deltaConversations)

            store.syncToken = Date.now();
            console.log('fresh syncToken after delta sync', store.syncToken);
          })
      },
      onDeltaPullDD() {
        let messagesUrl = `http://localhost:86/clouddataproxy/devices/${store.deviceId}/messages?`;

        if (store.syncToken == null) {
          store.syncToken = Date.now()
        }

        const strSyncToken = JSON.stringify(store.syncToken);
        axios
          .get(messagesUrl, { params: {
            deltatoken: strSyncToken
          }})
          .then((response) => {
            console.log(`what we got when delta sync with syncToken ${store.syncToken}`, response);

            const deltaMessages = response.data.value;

            // update local messages
            updateByID(store.messages, deltaMessages)
            // extract conversations
            const deltaConversations = extractConversations(deltaMessages)
            // update local conversations
            updateByID(store.conversations, deltaConversations)

            store.syncToken = Date.now();
            console.log('fresh syncToken after delta sync', store.syncToken);
          })
      },
      onPullDD() {
        let messagesUrl = `http://${APIHost}/clouddataproxy/devices/${store.deviceId}/messages?`;
        axios
          .get(messagesUrl)
          .then((response) => {
            console.log('what we got when full sync', response);

            const messages = response.data.value
            store.messages = messages
            store.conversations = extractConversations(messages)

            console.log('after full sync messages', store.messages);
            console.log('after full sync conversations', store.conversations);

            store.syncToken = Date.now();
            console.log('fresh syncToken after full sync', store.syncToken);
          })
      },
      onPullDDConversationAndMessage() {
        let conversationUr = `http://${APIHost}/clouddataproxy/devices/${store.deviceId}/conversations?`;
        let messagesUrl = `http://${APIHost}/clouddataproxy/devices/${store.deviceId}/messages?`;

        let getConversationReq = axios.get(conversationUr);
        let getMessagesReq = axios.get(messagesUrl);
        
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
    <MDBBtn color="primary" class="sync" @click="onPullDD">FullSync</MDBBtn>
    <MDBBtn color="primary" class="sync" @click="onDeltaPullDD">DeltaSync</MDBBtn>
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
