<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
        default: "No name"
      }
    }
  }
</script>

<template>
  <div class="item">
    <i>
      <slot name="avatar"></slot>
    </i>
    <div class="contact">
      <h3>
        {{ name }}
      </h3>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 2rem;
  display: flex;
}

.contact {
  display: flex;
  margin-left: 1rem;
  place-items: center;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-heading);
}

@media (min-width: 1024px) {

  i {
    top: calc(50% - 25px);
    /* left: -26px; */
    /* position: absolute; */
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }
}
</style>
