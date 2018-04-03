<template>
  <section class="section">
    <div class="container">
      <div class="content has-text-centered is-medium help">
        <p>Minesviueper</p>
        <br>
        <p>version {{version}}</p>
        <p>by wlh</p>
        <p>Minesviueper is open source and freely distributable</p>
        <br>
        <p>Help poor wlh in China!</p>
        <br>
        <p>type  <code>:q&lt;Enter&gt;</code> to exit game</p>
        <p>type  <code>:s&lt;Enter&gt;</code> to start game</p>
        <p>type  <code>:r&lt;Enter&gt;</code> to restart game</p>
        <br>
        <p>Tutorial</p>
        <p><code>h j k l ^ $ b w gg G</code> move cursor</p>
        <p><code>a</code> open current cell</p>
        <p><code>f</code> flag/unflag current cell</p>
        <p><code>i</code> open all 8 neighbors of current cell</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: function () {
    return {
      yes: null,
      version: '0.0.1'
    }
  }
}
</script>

<style>
.help p {
  margin-bottom: 0.2em
}
.help {
  line-height: 1.2;
}
.help {
  font-family: 'Hack', 'Consolas', monospace;
}
.content p:not(:last-child) { /* why ? */
  margin-bottom: 0.2em
}
</style>
