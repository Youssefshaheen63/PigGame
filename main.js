"use strict";

const roll = document.querySelector(".roll");
const dice = document.querySelector(".dice");
const Newgamebtn = document.querySelector(".Newgame");
const hold = document.querySelector(".hold");

const p1_cur_score = document.querySelector(".p0Result");
const p2_cur_score = document.querySelector(".p1Result");
const Player1__Score = document.querySelector(".Player0__Score");
const Player2__Score = document.querySelector(".Player1__Score");

let scores = [0, 0];
let currentScore = 0;
let activeplayer = 0;
let Playingstate = true;

const SwitchingPlayer = function () {
	document.querySelector(`.p${activeplayer}Result`).innerHTML = 0;
	currentScore = 0;
	activeplayer = activeplayer === 0 ? 1 : 0;
	document.querySelector(`.Player_0`).classList.toggle("player--active");
	document.querySelector(`.Player_1`).classList.toggle("player--active");
};
roll.addEventListener("click", function () {
	if (Playingstate) {
		let dicenum = Math.trunc(Math.random() * 6) + 1;
		dice.classList.remove("hidden");
		dice.src = `/imgs/dice-${dicenum}.png`;

		if (dicenum !== 1) {
			currentScore += dicenum;
			document.querySelector(`.p${activeplayer}Result`).innerHTML =
				currentScore;
		} else {
			SwitchingPlayer();
		}
	}
});
let h2 = document.createElement("h2");
let divwin = document.createElement("div");
hold.addEventListener("click", function () {
	if (Playingstate) {
		scores[activeplayer] += currentScore;
		document.querySelector(`.Player${activeplayer}__Score`).textContent =
			scores[activeplayer];
		if (scores[activeplayer] >= 100) {
			Playingstate = false;
			document
				.querySelector(`.Player_${activeplayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.Player_${activeplayer}`)
				.classList.remove("player--active");
			dice.classList.add("hidden");
			document.querySelector(`.p${activeplayer}Result`).innerHTML = 0;
			divwin.className = "win";
			h2.textContent = `Player ${activeplayer + 1} Win... 🏆`;
			divwin.append(h2);
			document.body.append(divwin);
			document.querySelector(".win").style.top = "0px";
		} else {
			SwitchingPlayer();
		}
	}
});

Newgamebtn.addEventListener("click", function () {
	document.querySelector(".Player0__Score").textContent = 0;
	document.querySelector(".Player1__Score").textContent = 0;
	document.querySelector(".p0Result").textContent = 0;
	document.querySelector(".p1Result").textContent = 0;
	currentScore = 0;
	scores = [0, 0];
	document.querySelector(`.Player_0`).classList.remove("player--winner");
	document.querySelector(`.Player_1`).classList.remove("player--winner");
	document.querySelector(`.Player_0`).classList.add("player--active");
	document.querySelector(`.Player_1`).classList.remove("player--active");
	activeplayer = 0;
	document.querySelector(".win").style.top = "-50%";
	Playingstate = true;
});
