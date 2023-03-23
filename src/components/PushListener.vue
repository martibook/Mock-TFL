<script>
  import { MDBBtn } from "mdb-vue-ui-kit";
  import axios from "axios";

  export default {
    data() {
      return {
        eventSource: null
      }
    },
    components: {
      MDBBtn
    },
    methods: {
        onSubscribe() {
            const token = Math.round(Math.random() * 1000000);
            const url = `http://localhost:86/push/subscribe/deviceid/${token}`;
            this.eventSource = new EventSource(url);

            this.eventSource.addEventListener("signal", (event) => {
                console.log(JSON.parse(event.data));
            })
        },
        onStop() {
          this.eventSource.close();
        }
    }
  }
</script>

<template>
    <div>
        <MDBBtn color="primary" class="sync" @click="onSubscribe">Subscribe Push</MDBBtn>
        <MDBBtn color="primary" class="sync" @click="onStop">Stop Subscribing</MDBBtn>
    </div>
</template>

<style scoped>
.sync {
  /* display: none; */
  text-align: center;
  font-size: 1.2rem;
}
</style>