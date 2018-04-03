<template>
<section class="section">
  <div class="container">
    <div class="content has-text-centered is-large help">
      <p>Minesviueper</p>
      <br>
      <p>version {{version}}</p>
      <p>by wlh</p>
      <p>Minesviueper is open source and freely distributable</p>
      <br>
      <p>Help poor wlh in China!</p>
      <br>
      <p>type  :q&lt;Enter&gt; to exit</p>
      <p>type  :s&lt;Enter&gt; to start game</p>
      <p>type  :r&lt;Enter&gt; to restart game</p>
      <br>
      <p>Turtorial</p>
      <p><code>h j k l ^ $ b w gg G</code> move</p>
      <p><code>a</code> open current cell</p>
      <p><code>f</code> toggle flag current cell</p>
      <p><code>i</code> open all neighbors of current cell</p>
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
  font-family: monospace;
}
.content p:not(:last-child) { /* why ? */
  margin-bottom: 0.2em
}
</style>
