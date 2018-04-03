<template>
  <footer class="cmd content is-large">
    <a href="" >{{command}}</a>
  </footer>
</template>

<script>
export default {
  data: function () {
    return {
      command: '',
      mode: 'normal',
      cmdValidKey: /^[a-zA-Z:]$|^Enter$|^Backspace$|^Escape$/,
      normalValidKey: /^[1-9hjklgbwGafi^$]$/,
      endKey: /^[hjklGabwfi^$]$/
    }
  },
  methods: {
    checkCmdEnd: function (key) { // check in command mode
      return key === 'Enter'
    },
    checkNormalEnd: function (key) { // check in normal mode
      let l = this.command.length
      if (this.endKey.test(key)) {
        return true
      } else if (l >= 2 && key === this.command[l - 2]) {
        return true
      }
      return false
    },
    normalHandleKey: function (key) { // handle
      if (!this.normalValidKey.test(key)) {
        return
      }
      this.command += key
      if (this.checkNormalEnd(key)) {
        this.sendCmd()
      }
    },
    cmdHandleKey: function (key) { // handle
      if (!this.cmdValidKey.test(key)) {
        return
      }
      if (key === 'Backspace') {
        if (this.command !== '') {
          this.command = this.command.substring(0, this.command.length - 1)
        }
      } else if (key === 'Escape') {
        this.command = ''
        this.sendCmd()
      } else if (key !== 'Enter') {
        this.command += key
      }
      if (this.checkCmdEnd(key)) {
        this.sendCmd()
      }
    },
    handleKey: function (keyEvent) {
      let key = keyEvent.key
      if (key === ':') {
        this.mode = 'cmd'
      }
      if (this.mode === 'cmd') {
        this.cmdHandleKey(key)
      } else {
        this.normalHandleKey(key)
      }
    },
    sendCmd: function () {
      this.mode = 'normal'
      this.$emit('sendcmd', this.command)
      this.command = ''
    }
  },
  mounted () {
    this.bodyListener = (e) => {
      this.handleKey(e)
    }
    document.body.addEventListener('keydown', this.bodyListener, false)
  },
  beforeDestroy () {
    document.body.removeEventListener('keydown', this.bodyListener)
  }
}
</script>
<style>
.cmd{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    /* font-size: 1.5rem; */
    background-color: #EEFFBB;
}
.cmd a {
  color: black;
  font-family: 'Hack', 'Consolas', monospace;
}
</style>
