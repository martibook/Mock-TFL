<script setup>
import PushListener from './components/PushListener.vue'
import TFLSyncButton from './components/TFLSyncButton.vue'
import TFLTheConversation from './components/TFLTheConversation.vue'
import TFLTheMessage from './components/TFLTheMessage.vue'
import LTWSyncButton from './components/LTWSyncButton.vue'
import LTWTheConversation from './components/LTWTheConversation.vue'
import LTWTheMessage from './components/LTWTheMessage.vue'
import LTWInput from './components/LTWInput.vue'
import IndicatorLabel from './components/IndicatorLabel.vue'
</script>

<template>
  <div class="basic">

    <div class="tfl">
      <header>
        <TFLSyncButton/>
      </header>

      <main>
        <div class="the-conversation">
          <TFLTheConversation />
        </div>
        <div class="the-message">
          <TFLTheMessage/>
        </div>
      </main>

      <div class="tag">
        <IndicatorLabel tag="TFL"/>
      </div>
    </div>

    <div></div>

    <div class="ltw">
      <header>
        <LTWSyncButton/>
      </header>

      <main>
        <div class="the-conversation">
          <LTWTheConversation />
        </div>
        <div class="the-panel">
          <div class="the-message">
          <LTWTheMessage/>
        </div>
          <LTWInput />
        </div>
      </main>

      <div class="tag">
        <IndicatorLabel tag="LTW"/>
      </div>
    </div>

  </div>

  <div class="push">
    <PushListener></PushListener>
  </div>
</template>

<style scoped>

.basic {
  display: grid;
  grid-template-columns: auto 10rem auto;
}

.tfl {
  display: grid;
  grid-template-rows: auto auto;
}

header {
  display: flex;
  margin-bottom: 3rem;
  /* place-items: center; */
  /* line-height: 1.5; */
}

main {
  display: grid;
  grid-template-columns: minmax(12rem, 25%) minmax(60rem, auto);
  height: 40rem;
}

.tag {
  padding-top: 2em;
  text-align: center;
  place-content: center;
  place-items: center;
}

.the-conversation {
  display: grid;
  grid-template-rows: auto;
  overflow-y: scroll;
}

.the-panel {
  display: grid;
  grid-template-rows: auto minmax(4rem, 10rem);
  /* place-items: center; */
}

.the-message {
  /* display: flex; */
  place-items: center;
  background-color: rgb(234, 239, 243);
  overflow-y: scroll;
}

.push {
  margin-top: 5rem;
}

</style>
