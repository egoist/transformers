<style>
  header.panel {
    height: 40px;
    line-height: 40px;
    position: relative;
    background-color: #e7e7e7;
    .tabs {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      .tab {
        float: left;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        border: 1px solid #e2e2e2;
        background-color: #f0f0f0;
        border-right-width: 0;
        cursor: pointer;
        user-select: none;
        &:hover {
          box-shadow: 0 0 3px #ccc;
        }
        &.active {
          background-color: white;
        }
        &:first-child {
          border-radius: 3px 0 0 3px;
        }
        &:last-child {
          border-radius: 0 3px 3px 0;
          border-right-width: 1px;
        }
      }
    }
  }
</style>

<template>
  <header class="panel">
    <div class="tabs">
      <div class="tab"
        :class="{'active': html}">HTML</div>
      <div class="tab"
        :class="{'active': css}">CSS</div>
      <div class="tab"
        :class="{'active': javascript}">JavaScript</div>
      <div class="tab"
        :class="{'active': output}"
        @click="toggleOutput">Output</div>
    </div>
  </header>
</template>

<script>
  export default {
    data () {
      const state = this.$revue.getState()
      return {
        output: state.output.active,
        javascript: state.javascript.active
      }
    },
    ready () {
      this.$subscribe(
        'javascript.active as javascript',
        'output.active as output'
      )
    },
    methods: {
      toggleOutput () {
        this.$revue.dispatch({type: 'TOGGLE_OUTPUT'})
      }
    }
  }
</script>
