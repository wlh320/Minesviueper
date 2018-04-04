webpackJsonp([0],{"36AQ":function(t,e){},GK12:function(t,e){},KCGt:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("GK12");var i=s("7+uW"),n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"section"},[s("div",{staticClass:"container"},[s("div",{staticClass:"content has-text-centered is-medium help"},[s("p",[t._v("Minesviueper")]),t._v(" "),s("br"),t._v(" "),s("p",[t._v("version "+t._s(t.version))]),t._v(" "),s("p",[t._v("by wlh")]),t._v(" "),s("p",[t._v("Minesviueper is open source and freely distributable")]),t._v(" "),s("br"),t._v(" "),s("p",[t._v("Help poor wlh in China!")]),t._v(" "),s("br"),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),s("br"),t._v(" "),s("p",[t._v("Tutorial")]),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("type  "),e("code",[this._v(":q<Enter>")]),this._v(" to exit game")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("type  "),e("code",[this._v(":s<Enter>")]),this._v(" to start game")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("type  "),e("code",[this._v(":r<Enter>")]),this._v(" to restart game")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("h j k l ^ $ b w gg G")]),this._v(" move cursor")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("a")]),this._v(" open current cell")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("f")]),this._v(" flag/unflag current cell")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("i")]),this._v(" open all 8 neighbors of current cell")])}]};var r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.isBorder?t._e():s("button",{class:["cell","button",{chosen:t.curr}]},[t.data.opened?s("div",[t.isMine?t._e():s("div",{staticClass:"number-cell"},[t._v(t._s(t.data.n))]),t._v(" "),t.isMine?s("div",{staticClass:"mine-cell"},[t._v("X")]):t._e()]):t._e(),t._v(" "),t.data.flagged?s("div",{staticClass:"flag-cell"},[t._v("F")]):t._e()])},staticRenderFns:[]};var a={data:function(){return{start:!1,totalMines:10,leftMines:0,openedCells:0,board:null,rows:9,cols:9,cr:1,cc:1,lose:!1,win:!1,adj:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],timer:null,time:0,cheat:!1}},methods:{setCurr:function(t,e){return t===this.cr&&e===this.cc},generateMines:function(){for(var t=this.totalMines;0!==t;){var e=Math.floor(1+Math.random()*this.rows),s=Math.floor(1+Math.random()*this.cols);9!==this.board[e][s].n&&(this.board[e][s].n=9,t-=1)}for(var i=1;i<=this.rows;i++)for(var n=1;n<=this.cols;n++){var r=0;if(9!==this.board[i][n].n){for(var a=0;a<8;a++)9===this.board[i+this.adj[a][0]][n+this.adj[a][1]].n&&r++;this.board[i][n].n=r}}},overBorder:function(t,e){return t<1||t>this.rows||e<1||e>this.cols},openCell:function(t,e){var s=this.board;if(!this.overBorder(t,e)){if(s[t][e].flagged||s[t][e].opened||(s[t][e].opened=!0,this.openedCells++),9===s[t][e].n&&!s[t][e].flagged)return this.lose=!0,void this.endGame();var i=[];for(i.push([t,e]);0!==i.length;)for(var n=i.shift(),r=n[0],a=n[1],c=0;c<8;c++){var o=r+this.adj[c][0],h=a+this.adj[c][1];if(!this.overBorder(o,h)){var l=s[o][h];0!==s[r][a].n||9===l.n||l.opened||l.flagged||(l.opened=!0,this.openedCells++,i.push([r+this.adj[c][0],a+this.adj[c][1]]))}}}},openNeighbour:function(){var t=this.cr,e=this.cc;this.openCell(t,e);for(var s=0;s<8;s++)this.openCell(t+this.adj[s][0],e+this.adj[s][1])},flagCell:function(){var t=this.board[this.cr][this.cc];if(!t.opened){var e=t.flagged;t.flagged=!e,!1===e?this.leftMines--:this.leftMines++}},startGame:function(){var t=this;this.cr=1,this.cc=1,this.time=0,this.openedCells=0,this.lose=!1,this.win=!1,this.leftMines=this.totalMines,this.board=[];for(var e=0;e<=this.rows+1;e++){for(var s=[],i=0;i<=this.cols+1;i++){var n=0;0!==e&&e!==this.rows+1&&0!==i&&i!==this.cols+1||(n=-1),s.push({n:n,opened:!1,flagged:!1})}this.board.push(s)}this.generateMines(),this.timer=setInterval(function(){t.time+=1},1e3)},endGame:function(){window.clearInterval(this.timer);for(var t=1;t<=this.rows;t++)for(var e=1;e<=this.cols;e++)this.board[t][e].opened=!0},execute:function(t){if(!this.lose||":r"===t||":q"===t)switch(t){case":s":case":start":this.start=!0,this.startGame();break;case":r":case":restart":this.start&&(this.endGame(),this.startGame());break;case":q":case":quit":this.start=!1;break;case"h":this.cc-1>=1&&(this.cc-=1);break;case"j":this.cr+1<=this.rows&&(this.cr+=1);break;case"k":this.cr-1>=1&&(this.cr-=1);break;case"l":this.cc+1<=this.cols&&(this.cc+=1);break;case"^":this.cc=1;break;case"$":this.cc=this.cols;break;case"gg":this.cr=1;break;case"G":this.cr=this.rows;break;case"b":if(this.overBorder(this.cr,this.cc-1))return;do{this.cc--}while((this.board[this.cr][this.cc].opened||this.board[this.cr][this.cc].flagged)&&this.cc>1);break;case"w":if(this.overBorder(this.cr,this.cc+1))return;do{this.cc++}while((this.board[this.cr][this.cc].opened||this.board[this.cr][this.cc].flagged)&&this.cc<this.cols);break;case"a":this.openCell(this.cr,this.cc);break;case"f":this.flagCell();break;case"i":this.openNeighbour();break;case":xyzzy":this.cheat=!this.cheat}}},components:{StartPage:s("VU/8")({data:function(){return{yes:null,version:"0.0.1"}}},n,!1,function(t){s("qadi")},null,null).exports,Cell:s("VU/8")({props:["data","curr"],data:function(){return{wtf:"fuck"}},computed:{isMine:function(){return 9===this.data.n},isBorder:function(){return-1===this.data.n}}},r,!1,function(t){s("KCGt")},null,null).exports},watch:{openedCells:function(t){t===this.cols*this.rows-this.totalMines&&(this.win=!0,this.endGame())}},computed:{info:function(){return this.lose?"You Lose!":this.win?"You Win!":this.cheat?"Cheater!!!":"Minesviueper"},cheatInfo:function(){return 9===this.board[this.cr][this.cc].n?1:0}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"game"},[t.start?t._e():s("start-page"),t._v(" "),t.start?s("div",{staticClass:"gameboard"},[s("section",{staticClass:"hero is-small is-bold is-dark",class:{"is-success":t.win,"is-warning":t.lose}},[s("div",{staticClass:"hero-body"},[t.cheat?s("div",{staticClass:"cheat",class:1===t.cheatInfo?"cheat-mine":""}):t._e(),t._v(" "),s("div",{staticClass:"container"},[s("h1",{staticClass:"title has-text-centered"},[t._v("\n            "+t._s(t.info)+"\n          ")])])])]),t._v(" "),s("div",{staticClass:"columns"},[s("div",{staticClass:"column"},[s("div",{staticClass:"left-cnt content has-text-centered is-medium"},[t._v("\n          mines "+t._s(t.leftMines)+"    \n          time "+t._s(t.time)+"\n        ")]),t._v(" "),s("div",{attrs:{align:"center"}},[s("table",t._l(t.board,function(e,i){return s("tr",{key:i},t._l(e,function(e,n){return s("td",{key:n},[s("cell",{attrs:{data:e,curr:t.setCurr(i,n)}})],1)}))}))])])])]):t._e()],1)},staticRenderFns:[]};var o={data:function(){return{command:"",mode:"normal",cmdValidKey:/^[a-zA-Z:]$|^Enter$|^Backspace$|^Escape$/,normalValidKey:/^[1-9hjklgbwGafi^$]$/,endKey:/^[hjklGabwfi^$]$/}},methods:{checkCmdEnd:function(t){return"Enter"===t},checkNormalEnd:function(t){var e=this.command.length;return!!this.endKey.test(t)||e>=2&&t===this.command[e-2]},normalHandleKey:function(t){this.normalValidKey.test(t)&&(this.command+=t,this.checkNormalEnd(t)&&this.sendCmd())},cmdHandleKey:function(t){this.cmdValidKey.test(t)&&("Backspace"===t?""!==this.command&&(this.command=this.command.substring(0,this.command.length-1)):"Escape"===t?(this.command="",this.sendCmd()):"Enter"!==t&&(this.command+=t),this.checkCmdEnd(t)&&this.sendCmd())},handleKey:function(t){var e=t.key;":"===e&&(this.mode="cmd"),"cmd"===this.mode?this.cmdHandleKey(e):this.normalHandleKey(e)},sendCmd:function(){this.mode="normal",this.$emit("sendcmd",this.command),this.command=""}},mounted:function(){var t=this;this.bodyListener=function(e){t.handleKey(e)},document.body.addEventListener("keydown",this.bodyListener,!1)},beforeDestroy:function(){document.body.removeEventListener("keydown",this.bodyListener)}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("footer",{staticClass:"cmd content is-large"},[e("a",{attrs:{href:""}},[this._v(this._s(this.command))])])},staticRenderFns:[]};var l={name:"App",components:{Game:s("VU/8")(a,c,!1,function(t){s("qbFV")},"data-v-72be1ac1",null).exports,CmdLine:s("VU/8")(o,h,!1,function(t){s("kXH8")},null,null).exports},data:function(){return{showStartPage:!0,input:null,command:null}},methods:{passCmd:function(t){this.$refs.game.execute(t)}}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("game",{ref:"game"}),this._v(" "),e("cmd-line",{attrs:{input:this.input},on:{sendcmd:this.passCmd}})],1)},staticRenderFns:[]};var u=s("VU/8")(l,d,!1,function(t){s("36AQ")},null,null).exports;i.a.config.productionTip=!1,new i.a({el:"#app",components:{App:u},template:"<App/>"})},kXH8:function(t,e){},qadi:function(t,e){},qbFV:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.f2173721857b10433ae8.js.map