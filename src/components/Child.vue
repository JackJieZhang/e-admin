<template>
  <GrandChild />
  <p>Message to grand child: {{ message }}</p>
</template>
<script lang="ts" setup>
import { inject } from 'vue'

const message = inject('message')
</script>
