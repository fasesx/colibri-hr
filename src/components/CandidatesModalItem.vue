<template>
  <div class="candidates-modal-item">
    <span class="candidates-modal-item__label">
      {{ name }}
    </span>
    <span class="candidates-modal-item__value">
      {{ value }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style lang="scss">
.candidates-modal-item {
  padding-bottom: 0.8rem;

  &__label {
    @include text('body');
    font-weight: 600;
  }

  &__value {
    @include text('body');
  }
}
</style>