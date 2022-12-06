<template>
  <p>Message to child: {{ message }}</p>
</template>
<script lang="ts" setup>
import { inject } from 'vue'

let message = inject(
  'message',
  (): string => {
    return '王二麻子'
  },
  true
)
</script>
