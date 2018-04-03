<template>
  <div class="game">
    <start-page v-if="!start"></start-page>
    <div class="gameboard" v-if="start">
      <section class="hero is-small is-bold is-dark"
        :class="{'is-success':win, 'is-warning':lose}">
        <div class="hero-body">
          <div class="container">
            <h1 class="title has-text-centered">
              {{info}}
            </h1>
          </div>
        </div>
      </section>
      <div class="columns">
        <div class="column">
          <div class="left-cnt content has-text-centered is-medium">
          mines left: {{leftMines}}
          </div>
          <div align="center">
            <table>
              <tr v-for="(row, i) in board" :key="i">
                <td v-for="(c, j) in row" :key="j" >
                  <cell :data="c" :curr="setCurr(i, j)">
                  </cell>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StartPage from './StartPage'
import Cell from './Cell'
export default {
  data: function () {
    return {
      start: false,
      totalMines: 10,
      leftMines: 0,
      openedCells: 0,
      board: null,
      rows: 9,
      cols: 9,
      cr: 1, // current row
      cc: 1, // current col
      lose: false,
      win: false,
      adj: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

    }
  },
  methods: {
    setCurr: function (i, j) {
      return i === this.cr && j === this.cc
    },
    generateMines: function () {
      let leftMines = this.totalMines
      while (leftMines !== 0) {
        let i = Math.floor(1 + Math.random() * this.rows)
        let j = Math.floor(1 + Math.random() * this.cols)
        if (this.board[i][j].n === 9) {
          continue
        }
        this.board[i][j].n = 9
        leftMines -= 1
      }
      for (let i = 1; i <= this.rows; i++) {
        for (let j = 1; j <= this.cols; j++) {
          let cnt = 0
          if (this.board[i][j].n === 9) continue
          for (let k = 0; k < 8; k++) {
            if (this.board[i + this.adj[k][0]][j + this.adj[k][1]].n === 9) {
              cnt++
            }
          }
          this.board[i][j].n = cnt
        }
      }
    },
    gameOver: function () {
      this.lose = true
      for (let i = 1; i <= this.rows; i++) { // open all cells
        for (let j = 1; j <= this.cols; j++) {
          this.board[i][j].opened = true
        }
      }
      // alert('Gamer Over')
    },
    gameWin: function () {
      this.win = true
      for (let i = 1; i <= this.rows; i++) { // open all cells
        for (let j = 1; j <= this.cols; j++) {
          this.board[i][j].opened = true
        }
      }
      // alert('You Win')
    },
    overBoarder (cr, cc) {
      return cr < 1 || cr > this.rows || cc < 1 || cc > this.cols
    },
    openCell: function (cr, cc) {
      let board = this.board
      if (this.overBoarder(cr, cc)) {
        return
      }
      if (!board[cr][cc].flagged && !board[cr][cc].opened) {
        board[cr][cc].opened = true
        this.openedCells++
      }
      if (board[cr][cc].n === 9 && !board[cr][cc].flagged) { // BOMB!
        this.gameOver()
        return
      }
      // BFS open 8 neighbours
      let q = []
      q.push([cr, cc])
      while (q.length !== 0) {
        let p = q.shift()
        let x = p[0]
        let y = p[1]
        for (let k = 0; k < 8; k++) {
          let nx = x + this.adj[k][0]
          let ny = y + this.adj[k][1]
          if (this.overBoarder(nx, ny)) {
            continue
          }
          let cur = board[nx][ny]
          if (board[x][y].n === 0 && cur.n !== 9 && !cur.opened && !cur.flagged) {
            cur.opened = true
            this.openedCells++
            q.push([x + this.adj[k][0], y + this.adj[k][1]])
          }
        }
      }
    },
    openNeighbour: function () {
      let r = this.cr
      let c = this.cc
      this.openCell(r, c)
      for (let k = 0; k < 8; k++) {
        this.openCell(r + this.adj[k][0], c + this.adj[k][1])
      }
    },
    flagCell: function () {
      let curCell = this.board[this.cr][this.cc]
      let old = curCell.flagged
      if (!curCell.opened) {
        curCell.flagged = !old
      }
      if (old === false) {
        this.leftMines--
      } else {
        this.leftMines++
      }
    },
    startGame: function () {
      this.cr = 1
      this.cc = 1
      this.openedCells = 0
      this.lose = false
      this.win = false
      this.leftMines = this.totalMines
      this.board = []
      for (let i = 0; i <= this.rows + 1; i++) {
        let row = []
        for (let j = 0; j <= this.cols + 1; j++) {
          let n = 0
          if (i === 0 || i === this.rows + 1 || j === 0 || j === this.cols + 1) {
            n = -1 // border
          }
          row.push({
            n: n, opened: false, flagged: false
          })
        }
        this.board.push(row)
      }
      this.generateMines()
    },
    execute: function (cmd) {
      if (this.lose && cmd !== ':r' && cmd !== ':q') {
        return
      }
      switch (cmd) {
        case ':s':
        case ':start':
          this.start = true
          this.startGame()
          break
        case ':r':
        case ':restart':
          if (this.start) {
            this.startGame()
          }
          break
        case ':q':
        case ':quit':
          this.start = false
          break
        case 'h':
          if (this.cc - 1 >= 1) {
            this.cc -= 1
          }
          break
        case 'j':
          if (this.cr + 1 <= this.rows) {
            this.cr += 1
          }
          break
        case 'k':
          if (this.cr - 1 >= 1) {
            this.cr -= 1
          }
          break
        case 'l':
          if (this.cc + 1 <= this.cols) {
            this.cc += 1
          }
          break
        case '^':
          this.cc = 1
          break
        case '$':
          this.cc = this.cols
          break
        case 'gg':
          this.cr = 1
          break
        case 'G':
          this.cr = this.rows
          break
        case 'b': // jump to prev not opened cell
          while ((this.board[this.cr][this.cc].opened ||
                  this.board[this.cr][this.cc].flagged) &&
                  this.cc > 1) {
            this.cc--
          }
          break
        case 'w': // jump to next not opened cell
          while ((this.board[this.cr][this.cc].opened ||
                  this.board[this.cr][this.cc].flagged) &&
                  this.cc < this.cols) {
            this.cc++
          }
          break
        case 'a':
          this.openCell(this.cr, this.cc)
          break
        case 'f':
          this.flagCell()
          break
        case 'i':
          this.openNeighbour()
          break
        default:
          break
      }
    }
  },
  components: {
    StartPage, Cell
  },
  watch: {
    openedCells: function (val) {
      if (val === (this.cols * this.rows - this.totalMines)) {
        this.gameWin()
      }
    }
  },
  computed: {
    info: function () {
      if (this.lose) {
        return 'You Lose!'
      } else if (this.win) {
        return 'You Win!'
      } else {
        return 'Minesviueper'
      }
    }
  }
}
</script>
<style scoped>
.left-cnt {
  margin-top: 1.5rem;
}
</style>
