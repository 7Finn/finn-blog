<template>
  <div id="puzzle">
		<div class="info-div">
			Time: <span id="time-div">0</span>
			Steps: <span id="step-div">0</span>
		</div>
		<div id="game-div">
		</div>
		<div class="button-group-div">
			<button class="red-button button" id="start">Start</button>
			<button class="blue-button button" id="change">Change</button>
			<button class="green-button button" id="difficulty">Easy</button>
		</div>
		<button class="gray-button button" id="recover">Recover</button>
	</div>
</template>

<script>
module.exports =  {
  data: function() {
    return {}
  },
  mounted: function() {
    init();
    varGroup.changeButton.onclick = function() { changeImage(); };
    varGroup.startButton.onclick = function() { startGame(); };
    varGroup.difficultyButton.onclick = function() { changeDifficulty(); };
    varGroup.recoverButton.onclick = function() { recover(); };
  }
}


var varGroup = {
	startButton : null,
	changeButton : null,
	difficultyButton : null,
	difficultyDegree : 20,
	recoverButton : null,
	blank : {row: 4, col: 4},
	index : 0,
	time : 0,
	timer : null,
	timeDiv : null,
	gameDiv : null,
	stack : [],
	map : new Array,
	isPlaying : false,
	isRecover : false,
	stepNum : 0,
	stepDiv : null,
	charArr : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
	picNumber: 4
}


function init() {
	varGroup.gameDiv = document.getElementById('game-div');
	varGroup.changeButton = document.getElementById('change');
	varGroup.startButton = document.getElementById('start');
	varGroup.timeDiv = document.getElementById('time-div');
	varGroup.difficultyButton = document.getElementById('difficulty');
	varGroup.stepDiv = document.getElementById('step-div');
	varGroup.recoverButton = document.getElementById('recover');
	changeImage();
}

function changeImage() {
	if (varGroup.isRecover == true)
		return;
	varGroup.stack = [];
	varGroup.isPlaying = false; 	//还原游戏状态
	varGroup.gameDiv.innerHTML = ""; 		//清空拼图板块
	varGroup.blank.row = 4; 		//还原空白板块位置
	varGroup.blank.col = 4;
	clearInterval(varGroup.timer);  //清除时间
	varGroup.time = 0;
	varGroup.stepNum = 0;
	varGroup.timeDiv.innerHTML = "0";
	varGroup.stepDiv.innerHTML = "0";
	for (var i = 0; i < 4; ++i)		//清除map的数据
		varGroup.map[i] = [];

	var frag = document.createDocumentFragment(); //往拼图板块中加图
	if (varGroup.index >= varGroup.picNumber)
		varGroup.index = 0;
	for (var i = 0; i < 4; ++i) {
		var rowArr = [];
		for (var j = 0; j < 4; ++j) {
			var imgDiv = document.createElement('div');
			imgDiv.className = "row-" + (i + 1) + " col-" + (j + 1) + " pic" + " b" + (varGroup.index + 1);
			imgDiv.id = "pic" + (i + 1) + "-" + (j + 1);
			imgDiv.value = varGroup.charArr[i*4 + j];
			imgDiv.onclick = (function(i) {
				return function () {
					move(this, getPos(this));    //添加点击函数
				}
			})(i);
			rowArr[j] = imgDiv;					//把imgDiv放到map中，map是二维数组，直接存储对象，位置从0开始
			frag.appendChild(imgDiv);
		}
		varGroup.map[i] = rowArr;
	}
	varGroup.gameDiv.appendChild(frag);
	varGroup.index++; 							//背景图片翻页
}

//根据ClassName获取位置，返回的位置从1开始。
function getPos (id) {
	var name = id.className;
	var row = name[name.indexOf("row-") + 4];
	var col = name[name.indexOf("col-") + 4];
	return {
		row: parseInt(row),
		col: parseInt(col)
	}
}


function move(id, pos) {
	if (varGroup.isPlaying == false)
		return;
	if ((pos.row + 1 == varGroup.blank.row || pos.row - 1 == varGroup.blank.row ) && pos.col == varGroup.blank.col) {
		swapClassName(id, varGroup.map[varGroup.blank.row - 1][varGroup.blank.col - 1]);
		swapPosInArr(pos, varGroup.blank);
		pushStack();
		varGroup.blank.row = pos.row;
		varGroup.blank.col = pos.col;
		varGroup.stepNum++;
		varGroup.stepDiv.innerHTML = varGroup.stepNum;
	} else if (pos.row == varGroup.blank.row && (pos.col + 1 == varGroup.blank.col || pos.col - 1 == varGroup.blank.col)) {
		swapClassName(id, varGroup.map[varGroup.blank.row - 1][varGroup.blank.col - 1]);
		swapPosInArr(pos, varGroup.blank);
		pushStack();
		varGroup.blank.row = pos.row;
		varGroup.blank.col = pos.col;
		varGroup.stepNum++;
		varGroup.stepDiv.innerHTML = varGroup.stepNum;
	} else {
		return;
	}

	if (check()) {
		alert("You Win!\nThe time you cost is : " + varGroup.time + "\nThe setps you cost is : " + varGroup.stepNum);
		varGroup.isPlaying = false;
		varGroup.time = 0;
		varGroup.stepNum = 0;
		clearInterval(varGroup.timer); //清除时间循环
	}
}

function pushStack () {
	var mapString = "";
	for (var i = 0; i < 4; ++i)
	for (var j = 0; j < 4; ++j) {
		mapString = mapString + varGroup.map[i][j].value;
	}
	var a = {row: varGroup.blank.row, col: varGroup.blank.col};
	var temp = {
		string : mapString,
		next : a,
	};
	// var k;
	// for (k = varGroup.stack.length - 1; k >= 0; --k) {
	// 	if (varGroup.stack[k].string == temp.string) {
	// 		var l = varGroup.stack.length - 1 - k;
	// 		for (var t = 0; t < l; ++t)
	// 			varGroup.stack.pop();
	// 	}
	// }
	// if (k < 0)
	varGroup.stack.push(temp);
}

function startGame() {
	if (varGroup.isRecover == true)
		return;
	clearInterval(varGroup.timer); //清除时间循环
	varGroup.time = 0;
	varGroup.stepNum = 0;
	varGroup.timeDiv.innerHTML = "0";
	varGroup.stepDiv.innerHTML = "0";
	varGroup.recoverButton.className = "green-button button";
	varGroup.isPlaying = true;     //把游戏状态改成开始
	varGroup.timer = setInterval(function () {
		varGroup.time++;
		varGroup.timeDiv.innerHTML= varGroup.time;
	}, 1000);
	random();      //随机打乱拼图
}

function random() {
	var dirRow = [0, -1, 0, 1];
	var dirCol = [1, 0, -1, 0];
	for (var k = 0; k < varGroup.difficultyDegree; ++k) { //执行100次有效的移动
		while (true) {
			var randomDir = Math.floor(Math.random() * 4);
			var NextRow = varGroup.blank.row + dirRow[randomDir] - 1;    //NextRow从0开始
			var NextCol = varGroup.blank.col + dirCol[randomDir] - 1;	 //NextCol从0开始
			if (NextRow > 3 || NextRow < 0 || NextCol > 3 || NextCol < 0) {   //如果超出格子则继续
				continue;
			} else {
				var target = {row : NextRow, col : NextCol}
				//作死代码区-----------------------------
				var mapString = "";
				for (var i = 0; i < 4; ++i)
				for (var j = 0; j < 4; ++j) {
					mapString = mapString + varGroup.map[i][j].value;
				}
				var a = {row: varGroup.blank.row, col: varGroup.blank.col};
				var temp = {
					string : mapString,
					next : a,
				};
				var x;
				for (x = varGroup.stack.length - 1; x >= 0; --x) {
					if (varGroup.stack[x].string == temp.string) {
						var l = varGroup.stack.length - 1 - x;
						for (var t = 0; t < l; ++t)
							varGroup.stack.pop();
					}
				}
				if (x < 0)
				varGroup.stack.push(temp);
				//作死代码区-----------------------------
				swap(target);
				break;
			}
		}
	}
	for (var i = 0; i < 4; ++i)
	for (var j = 0; j < 4; ++j) {
		varGroup.map[i][j].className = "row-" + (i + 1) + " col-" + (j + 1) + " pic" + " b" + varGroup.index;
	}
}

function swap(target) {
	var temp = varGroup.map[target.row][target.col];
	varGroup.map[target.row][target.col] = varGroup.map[varGroup.blank.row - 1][varGroup.blank.col - 1];
	varGroup.map[varGroup.blank.row - 1][varGroup.blank.col - 1] = temp;
	varGroup.blank.row = target.row + 1;
	varGroup.blank.col = target.col + 1;
}

function swapClassName(a, b) {
	var temp = a.className;
	a.className = b.className;
	b.className = temp;
}

function swapPosInArr(a, b) {
	var temp = varGroup.map[a.row - 1][a.col - 1];
	varGroup.map[a.row - 1][a.col - 1] = varGroup.map[b.row - 1][b.col - 1];
	varGroup.map[b.row - 1][b.col - 1] = temp;
}

function swapPos(a, b) {
	var tempRow = a.row, tempCol = a.col;
	a.row = b.row;
	a.col = b.col;
	b.row = tempRow;
	b.col = tempCol;
}

function check() {
	for (var i = 0; i < 4; ++i)
	for (var j = 0; j < 4; ++j) {
		if (varGroup.map[i][j].id != ("pic" + (i + 1) + "-" + (j + 1)))
			return false;
	}
	return true;
}

function changeDifficulty () {
	if (varGroup.difficultyDegree == 20) {
		varGroup.difficultyDegree = 100;
		varGroup.difficultyButton.innerHTML = "Difficult";
		varGroup.difficultyButton.className = "red-button button";
	} else {
		varGroup.difficultyDegree = 20;
		varGroup.difficultyButton.innerHTML = "Easy";
		varGroup.difficultyButton.className = "green-button button";
	}
}

function recover() {
	if (varGroup.isPlaying == false) {
		return;
	}
	varGroup.isRecover = true;
	clearInterval(varGroup.timer);  //清除时间
	varGroup.time = 0;
	varGroup.stepNum = 0;
	varGroup.timeDiv.innerHTML = "0";
	varGroup.stepDiv.innerHTML = "0";
	varGroup.isPlaying = false;
	var i = varGroup.stack.length - 1;
	var timer2 = setInterval(function() {
		if (i < 0) {
			clearInterval(timer2);
			varGroup.isRecover = false;
			varGroup.recoverButton.className = "gray-button button";
			return;
		}
		var id = varGroup.map[varGroup.stack[i].next.row - 1][varGroup.stack[i].next.col - 1];
		swapClassName(id, varGroup.map[varGroup.blank.row - 1][varGroup.blank.col - 1]);
		swapPosInArr(varGroup.stack[i].next, varGroup.blank);
		varGroup.blank.row = varGroup.stack[i].next.row;
		varGroup.blank.col = varGroup.stack[i].next.col;
		i--;
	}, 100);
}


</script>

<style >

#puzzle {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 600px;
  background-color: #ecf0f1;
  border-radius: 5px;
  -moz-box-shadow: 1px -1px 1px #d4d8d9 inset, 1px 1px 1px 1px #e3e3e3;
  -webkit-box-shadow: 1px -1px 1px #d4d8d9 inset, 1px 1px 1px 1px #e3e3e3;
  box-shadow: 1px -1px 1px #d4d8d9 inset, 1px 1px 1px 1px #e3e3e3;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

#puzzle .info-div {
  font-family: 'Century Gothic', serif;
  font-size: 20px;
  width: 200px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}



#puzzle .button-group-div {
  position: relative;
  width: 400px;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
}

#puzzle #game-div {
  position: relative;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 401px;
  border-radius: 5px;
  background-color: #D2D2D2;
  -webkit-box-shadow:inset 0 0 5px #888;
  -moz-box-shadow:inset 0 0 5px #888;
  box-shadow:inset 0 0 5px #888;
}

#puzzle #time-div {
  margin-right: 10px;
}

#puzzle .button {
  cursor: pointer;
  color: #fff;
  width: 100px;
  height: 30px;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
}

#puzzle .button:active {
  margin-top: 1px;
  margin-bottom: 1px;
  border-bottom: 0;
}

#puzzle #start {
  position: absolute;
  left: 5%;
}
#puzzle .red-button {
  background-color: #E24A1F;
  border-bottom: 1px solid #AF3B2F;
  -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #B94949;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #B94949;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #B94949;
}

#puzzle #change {
  position: absolute;
  left: 0;
  right: 0;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
}

#puzzle .blue-button {
  width: auto;
  background-color: #1BB2C7;
  border-bottom: 1px solid #118292;
  -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #3799A7;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #3799A7;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #3799A7;
}

#puzzle #difficulty {
  position: absolute;
  right: 5%;
}

#puzzle .green-button {
  background-color: #01AD44;
  border-bottom: 1px solid #198241;
  -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #1D8E49;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #1D8E49;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #1D8E49;
}

#puzzle .gray-button {
  background-color: #B5B5B5;
  border-bottom: 1px solid #A5A5A5;
  -moz-box-shadow: 0.5px 0.5px 0.5px 0.5px #8A8A8A;
  -webkit-box-shadow: 0.5px 0.5px 0.5px 0.5px #8A8A8A;
  box-shadow: 0.5px 0.5px 0.5px 0.5px #8A8A8A;
}

#puzzle #recover {
  margin-top: 50px;
}

#puzzle .pic {
  position: absolute;
  margin: 1.1px;
  width: 97.8px;
  height: 97.8px;
  border-radius: 5px;
  -moz-box-shadow: 0.8px 0.8px 0.8px 0.8px #929292;
  -webkit-box-shadow: 0.8px 0.8px 0.8px 0.8px #929292;
  box-shadow: 0.8px 0.8px 0.8px 0.8px #929292;
  background-repeat:no-repeat;
  background-size: 400px 400px;
  -moz-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

#puzzle .pic:hover {
  -moz-transform: scale(1.05,1.05);
  -webkit-transform: scale(1.05,1.05);
  transform: scale(1.05,1.05);
  z-index: 10;
}
#puzzle .b1 {background-image: url(../assets/img/1.jpg);}
#puzzle .b2 {background-image: url(../assets/img/2.jpg);}
#puzzle .b3 {background-image: url(../assets/img/3.jpg);}
#puzzle .b4 {background-image: url(../assets/img/4.jpg);}



#puzzle .row-1 {top: 0;}
#puzzle .row-2 {top: 100px;}
#puzzle .row-3 {top: 200px;}
#puzzle .row-4 {top: 300px;}
#puzzle .col-1 {left: 0;}
#puzzle .col-2 {left: 100px;}
#puzzle .col-3 {left: 200px;}
#puzzle .col-4 {left: 300px;}
#puzzle #pic1-1 {background-position: 0 0;}
#puzzle #pic1-2 {background-position: 33.3% 0;}
#puzzle #pic1-3 {background-position: 66.6% 0;}
#puzzle #pic1-4 {background-position: 100% 0;}
#puzzle #pic2-1 {background-position: 0 33.3%;}
#puzzle #pic2-2 {background-position: 33.3% 33.3%;}
#puzzle #pic2-3 {background-position: 66.6% 33.3%;}
#puzzle #pic2-4 {background-position: 100% 33.3%;}
#puzzle #pic3-1 {background-position: 0 66.6%;}
#puzzle #pic3-2 {background-position: 33.3% 66.6%;}
#puzzle #pic3-3 {background-position: 66.6% 66.6%;}
#puzzle #pic3-4 {background-position: 100% 66.6%;}
#puzzle #pic4-1 {background-position: 0 100%;}
#puzzle #pic4-2 {background-position: 33.3% 100%;}
#puzzle #pic4-3 {background-position: 66.6% 100%;}
#puzzle #pic4-4 {display: none;}

</style>
