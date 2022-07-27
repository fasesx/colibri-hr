<template>
  <div
    class="shared-modal__wrapper"
    @click.self="close"
  >
    <div class="shared-modal">
      <div class="shared-modal__header">
        <h1>{{ title }}</h1>
      </div>
      <div class="shared-modal__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    }
  },
  methods: {
    close() {
      this.$router.replace({hash: ''})
    }
  }
})
</script>


<style lang="scss">
.shared-modal {
  width: 50rem;
  background:white;

  &__header {
    padding: 1.6rem 0;
    position: relative;

    h1 {
      @include text('title');
      font-weight: 600;
    }

    &:after {
      content: ' ';
      position: absolute;
      bottom: 0;
      left: 1.6rem;
      right: 1.6rem;
      height: 0.1rem;
      background: rgba(0,0,0,6%);
    }
  }

  &__wrapper {
    display: grid;
    place-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 50%);
  }

  &__body {
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>