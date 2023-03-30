<script>
  export default {
    props: {
        tag: {
            type: String,
            required: true,
            default: 'Tag'
        }
    }
  }
</script>

<template>
    <h1>{{ tag }}</h1>
</template>