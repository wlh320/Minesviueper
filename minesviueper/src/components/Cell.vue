<template>
  <button v-if="!isBorder"
  :class="['cell', 'button', {'chosen':curr}]">
    <div v-if="data.opened">
      <div v-if="!isMine" class="number-cell">{{data.n}}</div>
      <div v-if="isMine" class="mine-cell">X</div>
    </div>
    <div v-if="data.flagged" class="flag-cell">F</div>
  </button>
</template>

<script>
export default {
  props: ['data', 'curr'],
  data: function () {
    return {
      'wtf': 'fuck'
    }
  },
  computed: {
    isMine: function () {
      return this.data.n === 9
    },
    isBorder: function () {
      return this.data.n === -1
    }
  }
}
</script>

<style>
.chosen {
  background-color:hsl(171, 100%, 41%);
}
.cell {
  height: 2.5rem;
  width: 2.5rem;
  font-size: 1rem;
}
.flag-cell {
  color: red;
}
.mine-cell {
  color: darkorange;
}
.number-cell {
  color: black;
}
</style>
