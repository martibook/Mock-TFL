<script>
  import { MDBBtn } from "mdb-vue-ui-kit";
  import { DeltaAction, initConversations, initLTWCurrentConversationId, initMessages, store, APIHost } from '../store';
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
        store.ltwConversations = initConversations.slice();
        store.ltwMessages = initMessages.slice();
        store.ltwCurrentConversationId = initLTWCurrentConversationId;
      },

      async fullUploadMessages(messages) {
        let messagesUrl = `http://${APIHost}/CloudDataProxy/devices/${store.deviceId}/messages/full`;

        await axios
          .post(messagesUrl, messages)
          .then((response) => {
            console.log('full upload messages response', response)
            const token = response.data;
            
            store.updateToken = token;
          })
          .catch((error) => {
            console.log(error);
          })
      },

      async fullUploadMessagesDD(messages) {
        let messagesUrl = `http://${APIHost}/CloudDataProxy/devices/${store.deviceId}/messages`;

        await axios
          .post(messagesUrl, messages)
          .then((response) => {
            console.log('full upload messages response', response);

            store.updateToken = Date.now();
          })
          .catch((error) => {
            console.log(error);
          })
      },

      async onFullUpdate() {

        var allMessages = store.ltwMessages.map(function(item){
          return {
            ...item,
            lastModifiedDateTime: new Date().toISOString(),
            deltaAction: DeltaAction.CREATE
          }
        })
        console.log('we are going to full update', allMessages);
        
        // await this.fullUploadMessages(allMessages);
        await this.fullUploadMessagesDD(allMessages);

        store.ltwDeltaMessages = [];
        console.log('updateToken after full update', store.updateToken);
      },

      async deltaUploadMessages(messages) {
        if (store.updateToken == null) {
          store.updateToken = Date.now();
        }

        // const strUpdateToken = JSON.stringify(store.updateToken);
        let messagesUrl = `http://${APIHost}/CloudDataProxy/devices/${store.deviceId}/messages/delta?deltaToken=`;

        await axios
          .post(messagesUrl, messages)
          .then((response) => {
            console.log('delta upload messages response', response)
            const token = response.data;
            
            store.updateToken = token;
          })
          .catch((error) => {
            console.log(error);
          })
      },

      async deltaUploadMessagesDD(messages) {
        console.log(store.updateToken, typeof(store.updateToken))
        if (store.updateToken == null) {
          store.updateToken = Date.now();
        }

        const strUpdateToken = JSON.stringify(store.updateToken);
        console.log(strUpdateToken, typeof(strUpdateToken))
        let messagesUrl = `http://${APIHost}/CloudDataProxy/devices/${store.deviceId}/messages?`;

        await axios
          .post(messagesUrl, messages, {
            params: {
              deltatoken: store.updateToken
            }
          })
          .then((response) => {
            console.log('delta upload messages response', response)
            
            store.updateToken = Date.now();
          })
          .catch((error) => {
            console.log(error);
          })
      },

      async onDeltaUpdate() {
        if (store.ltwDeltaMessages.length == 0) {
          console.log('nothing to delta update');
          return;
        }

        const allMessages = store.ltwDeltaMessages.map((item) => {
          return {
            ...item,
            lastModifiedDateTime: new Date().toISOString(),
            deltaAction: DeltaAction.CREATE
          }
        })
        console.log('we are going to delta update', allMessages);

        // await this.deltaUploadMessages(allMessages);
        await this.deltaUploadMessagesDD(allMessages);

        store.ltwDeltaMessages = [];
        console.log('updateToken after delta update', store.updateToken);
      }
    }
  }
</script>

<template>
  <div class="sync-frame">
    <MDBBtn color="primary" class="sync" @click="onReset">Reset</MDBBtn>
    <MDBBtn color="primary" class="sync" @click="onFullUpdate">FullUpdate</MDBBtn>
    <MDBBtn color="primary" class="sync" @click="onDeltaUpdate">DeltaUpdate</MDBBtn>
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
