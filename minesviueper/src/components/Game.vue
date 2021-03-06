<template>
  <div class="game">
    <start-page v-if="!start"></start-page>
    <div class="gameboard" v-if="start">
      <section class="hero is-small is-bold is-dark"
        :class="{'is-success':win, 'is-warning':lose}">
        <div class="hero-body">
          <div class="cheat" :class="cheatInfo===1?'cheat-mine' : ''" v-if="cheat"></div>
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
            mines {{leftMines}} &emsp;&emsp;&emsp;
            time {{time}}
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
      adj: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
      timer: null,
      time: 0,
      cheat: false
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
    overBorder (cr, cc) {
      return cr < 1 || cr > this.rows || cc < 1 || cc > this.cols
    },
    openCell: function (cr, cc) {
      let board = this.board
      if (this.overBorder(cr, cc)) {
        return
      }
      if (!board[cr][cc].flagged && !board[cr][cc].opened) {
        board[cr][cc].opened = true
        this.openedCells++
      }
      if (board[cr][cc].n === 9 && !board[cr][cc].flagged) { // BOMB!
        this.lose = true
        this.endGame()
        return
      }
      // BFS open 8 neighbours with n === 0
      let q = []
      q.push([cr, cc])
      while (q.length !== 0) {
        let p = q.shift()
        let x = p[0]
        let y = p[1]
        for (let k = 0; k < 8; k++) {
          let nx = x + this.adj[k][0]
          let ny = y + this.adj[k][1]
          if (this.overBorder(nx, ny)) {
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
      if (curCell.opened) return
      let old = curCell.flagged
      curCell.flagged = !old
      if (old === false) {
        this.leftMines--
      } else {
        this.leftMines++
      }
    },
    startGame: function () {
      this.cr = 1
      this.cc = 1
      this.time = 0
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
      this.timer = setInterval(() => {
        this.time += 1
      }, 1000)
    },
    endGame: function () {
      window.clearInterval(this.timer)
      for (let i = 1; i <= this.rows; i++) { // open all cells
        for (let j = 1; j <= this.cols; j++) {
          this.board[i][j].opened = true
        }
      }
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
            this.endGame()
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
          if (this.overBorder(this.cr, this.cc - 1)) {
            return
          }
          do {
            this.cc--
          } while ((this.board[this.cr][this.cc].opened ||
                  this.board[this.cr][this.cc].flagged) &&
                  this.cc > 1)
          break
        case 'w': // jump to next not opened cell
          if (this.overBorder(this.cr, this.cc + 1)) {
            return
          }
          do {
            this.cc++
          } while ((this.board[this.cr][this.cc].opened ||
                  this.board[this.cr][this.cc].flagged) &&
                  this.cc < this.cols)
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
        case ':xyzzy':
          this.cheat = !this.cheat
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
        this.win = true
        this.endGame()
      }
    }
  },
  computed: {
    info: function () {
      if (this.lose) {
        return 'You Lose!'
      } else if (this.win) {
        return 'You Win!'
      } else if (this.cheat) {
        return 'Cheater!!!'
      } else {
        return 'Minesviueper'
      }
    },
    cheatInfo: function () {
      return this.board[this.cr][this.cc].n === 9 ? 1 : 0
    }
  }
}
</script>

<style scoped>
.left-cnt {
  margin-top: 1.5rem;
}
.cheat {
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
}
.cheat-mine {
  background-color: white;
}
</style>
