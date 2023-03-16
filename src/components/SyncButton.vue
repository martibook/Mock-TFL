<script>
  import { MDBBtn } from "mdb-vue-ui-kit";
  export default {
    components: {
      MDBBtn
    }
  };
</script>

<template>
  <div class="sync-frame">
    <MDBBtn color="primary" class="sync">
      Sync
    </MDBBtn>
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
