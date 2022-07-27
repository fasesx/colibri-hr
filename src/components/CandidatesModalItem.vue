<template>
  <div
    v-if="editable"
    class="candidates-modal-item"
  >
    <label
      :for="editable"
      class="candidates-modal-item__label"
    >
      {{ name }}
    </label>
    <input
      :id="editable"
      :disabled="disabled"
      type="text"
      class="candidates-modal-item__value"
      :value="value"
      @input="onInput"
    >
  </div>
  <div
    v-else
    class="candidates-modal-item"
  >
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
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: [String, Number],
      required: false,
      validator(val) {
        return ['string', 'number'].includes(typeof val) || val === null
      }
    },
    editable: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onInput(event: Event) {
      console.log('update:input')
      this.$emit('input', (event.target as HTMLInputElement).value)
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