let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

let bg = document.getElementById("bg");
let urDiv = document.getElementById("ur");
let starDiv = document.getElementById("star");
let bpmDiv = document.getElementById("bpm");
let ppDiv = document.getElementById("pp");
let comboDiv = document.getElementById("combo");
let hidelbDiv = document.getElementById("hideleaderboard");
let h100Div = document.getElementById("h100");
let h50Div = document.getElementById("h50");
let h0Div = document.getElementById("h0");
let scoreDiv = document.getElementById("score");
let accDiv = document.getElementById("acc");
let playerPicDiv = document.getElementById("playerPic");
let playerNameDiv = document.getElementById("playerName");
let playerRankDiv = document.getElementById("playerRank");
let playerCountryDiv = document.getElementById("playerCountry");
let playerRankCountryDiv = document.getElementById("playerRankCountry");

let lb1avatar = document.getElementById("leaderboard1avatar");
let lb1score = document.getElementById("leaderboard1score");
let lb1name = document.getElementById("leaderboard1name");
let lb1combo = document.getElementById("leaderboard1combo");
let lb1pp = document.getElementById("leaderboard1pp");
let lb1acc = document.getElementById("leaderboard1acc");

let lb2avatar = document.getElementById("leaderboard2avatar");
let lb2score = document.getElementById("leaderboard2score");
let lb2name = document.getElementById("leaderboard2name");
let lb2combo = document.getElementById("leaderboard2combo");
let lb2pp = document.getElementById("leaderboard2pp");
let lb2acc = document.getElementById("leaderboard2acc");

let lb3avatar = document.getElementById("leaderboard3avatar");
let lb3score = document.getElementById("leaderboard3score");
let lb3name = document.getElementById("leaderboard3name");
let lb3combo = document.getElementById("leaderboard3combo");
let lb3pp = document.getElementById("leaderboard3pp");
let lb3acc = document.getElementById("leaderboard3acc");

let lb4avatar = document.getElementById("leaderboard4avatar");
let lb4score = document.getElementById("leaderboard4score");
let lb4name = document.getElementById("leaderboard4name");
let lb4combo = document.getElementById("leaderboard4combo");
let lb4pp = document.getElementById("leaderboard4pp");
let lb4acc = document.getElementById("leaderboard4acc");

let lb5avatar = document.getElementById("leaderboard5avatar");
let lb5score = document.getElementById("leaderboard5score");
let lb5name = document.getElementById("leaderboard5name");
let lb5combo = document.getElementById("leaderboard5combo");
let lb5pp = document.getElementById("leaderboard5pp");
let lb5acc = document.getElementById("leaderboard5acc");

let lb6avatar = document.getElementById("leaderboard6avatar");
let lb6score = document.getElementById("leaderboard6score");
let lb6name = document.getElementById("leaderboard6name");
let lb6combo = document.getElementById("leaderboard6combo");
let lb6pp = document.getElementById("leaderboard6pp");
let lb6acc = document.getElementById("leaderboard6acc");

let lb7avatar = document.getElementById("leaderboard7avatar");
let lb7score = document.getElementById("leaderboard7score");
let lb7name = document.getElementById("leaderboard7name");
let lb7combo = document.getElementById("leaderboard7combo");
let lb7pp = document.getElementById("leaderboard7pp");
let lb7acc = document.getElementById("leaderboard7acc");

let lb8avatar = document.getElementById("leaderboard8avatar");
let lb8score = document.getElementById("leaderboard8score");
let lb8name = document.getElementById("leaderboard8name");
let lb8combo = document.getElementById("leaderboard8combo");
let lb8pp = document.getElementById("leaderboard8pp");
let lb8acc = document.getElementById("leaderboard8acc");

let lb9avatar = document.getElementById("leaderboard9avatar");
let lb9score = document.getElementById("leaderboard9score");
let lb9name = document.getElementById("leaderboard9name");
let lb9combo = document.getElementById("leaderboard9combo");
let lb9pp = document.getElementById("leaderboard9pp");
let lb9acc = document.getElementById("leaderboard9acc");

let lb10avatar = document.getElementById("leaderboard10avatar");
let lb10score = document.getElementById("leaderboard10score");
let lb10name = document.getElementById("leaderboard10name");
let lb10combo = document.getElementById("leaderboard10combo");
let lb10pp = document.getElementById("leaderboard10pp");
let lb10acc = document.getElementById("leaderboard10acc");

let hpOuter = document.getElementById("outerhpbar");
let hpInner = document.getElementById("innerhpbar");

let axios = window.axios;
let config;

socket.onopen = () => {
	console.log("Successfully Connected");
	fetch("config.json")
		.then(response => response.json())
		.then(json => config = json);
};

socket.onclose = event => {
	console.log("Socket Closed Connection: ", event);
	socket.send("Client Closed!")
};

socket.onerror = error => {
	console.log("Socket Error: ", error);
};

let state;
let pullLeaderboardScores = false;
let playerId = "";
let playerInfo;
let lbDataProcessed = new Map();
let lbProcessed = false;
let userProcessed = false;
let allProcessed = false;
let oldScore = 0;
let lastCombo = 0;
let lastTime = 0;

socket.onmessage = event => {
	let data = JSON.parse(event.data);

	state = data.menu.state;

	if(state == 2) {
		document.getElementsByClassName("ur")[0].classList.remove("hidden");
		document.getElementsByClassName("star")[0].classList.remove("hidden");
		document.getElementsByClassName("bpm")[0].classList.remove("hidden");
		document.getElementsByClassName("pp")[0].classList.remove("hidden");
		document.getElementsByClassName("combo")[0].classList.remove("hidden");
		document.getElementsByClassName("leaderboard")[0].classList.remove("hidden");
		document.getElementsByClassName("h100")[0].classList.remove("hidden");
		document.getElementsByClassName("h50")[0].classList.remove("hidden");
		document.getElementsByClassName("h0")[0].classList.remove("hidden");
		document.getElementsByClassName("score")[0].classList.remove("hidden");
		document.getElementsByClassName("acc")[0].classList.remove("hidden");
		document.getElementsByClassName("playerInfo")[0].classList.remove("hidden");
		//hidelbDiv.classList.remove("hidden");
		hpOuter.classList.remove("hidden");
	} else {
		document.getElementsByClassName("ur")[0].classList.add("hidden");
		document.getElementsByClassName("star")[0].classList.add("hidden");
		document.getElementsByClassName("bpm")[0].classList.add("hidden");
		document.getElementsByClassName("pp")[0].classList.add("hidden");
		document.getElementsByClassName("combo")[0].classList.add("hidden");
		document.getElementsByClassName("leaderboard")[0].classList.add("hidden");
		document.getElementsByClassName("pb")[0].classList.add("hidden");
		document.getElementsByClassName("h100")[0].classList.add("hidden");
		document.getElementsByClassName("h50")[0].classList.add("hidden");
		document.getElementsByClassName("h0")[0].classList.add("hidden");
		document.getElementsByClassName("score")[0].classList.add("hidden");
		document.getElementsByClassName("acc")[0].classList.add("hidden");
		document.getElementsByClassName("playerInfo")[0].classList.add("hidden");
		hidelbDiv.classList.add("hidden");
		hpOuter.classList.add("hidden");
		lbDataProcessed = new Map();
		playerInfo = undefined;
		lbProcessed = false;
		userProcessed = false;
		allProcessed = false;
		oldScore = 0;
		lastCombo = 0;
		lastTime = 0;

		lb1avatar.src = ""; 
		lb1score.innerHTML = "";
		lb1name.innerHTML = ""; 
		lb1combo.innerHTML = ""; 
		lb1pp.innerHTML = ""; 
		lb1acc.innerHTML = ""; 
		lb2avatar.src = ""; 
		lb2score.innerHTML = "";
		lb2name.innerHTML = ""; 
		lb2combo.innerHTML = ""; 
		lb2pp.innerHTML = ""; 
		lb2acc.innerHTML = "";
		lb3avatar.src = ""; 
		lb3score.innerHTML = "";
		lb3name.innerHTML = ""; 
		lb3combo.innerHTML = ""; 
		lb3pp.innerHTML = ""; 
		lb3acc.innerHTML = "";  
		lb4avatar.src = ""; 
		lb4score.innerHTML = "";
		lb4name.innerHTML = ""; 
		lb4combo.innerHTML = ""; 
		lb4pp.innerHTML = ""; 
		lb4acc.innerHTML = ""; 
		lb5avatar.src = ""; 
		lb5score.innerHTML = "";
		lb5name.innerHTML = ""; 
		lb5combo.innerHTML = ""; 
		lb5pp.innerHTML = ""; 
		lb5acc.innerHTML = ""; 
		lb6avatar.src = ""; 
		lb6score.innerHTML = "";
		lb6name.innerHTML = ""; 
		lb6combo.innerHTML = ""; 
		lb6pp.innerHTML = ""; 
		lb6acc.innerHTML = ""; 
		lb7avatar.src = ""; 
		lb7score.innerHTML = "";
		lb7name.innerHTML = ""; 
		lb7combo.innerHTML = ""; 
		lb7pp.innerHTML = ""; 
		lb7acc.innerHTML = ""; 
		lb8avatar.src = ""; 
		lb8score.innerHTML = "";
		lb8name.innerHTML = ""; 
		lb8combo.innerHTML = ""; 
		lb8pp.innerHTML = ""; 
		lb8acc.innerHTML = ""; 
		lb9avatar.src = ""; 
		lb9score.innerHTML = "";
		lb9name.innerHTML = ""; 
		lb9combo.innerHTML = ""; 
		lb9pp.innerHTML = ""; 
		lb9acc.innerHTML = ""; 
		lb10avatar.src = ""; 
		lb10score.innerHTML = "";
		lb10name.innerHTML = ""; 
		lb10combo.innerHTML = ""; 
		lb10pp.innerHTML = ""; 
		lb10acc.innerHTML = ""; 
	}

	if(lbDataProcessed.size == 0 && state == 2) {
		pullLeaderboardScores = true;
	}

	if(pullLeaderboardScores && data.gameplay.leaderboard.ourplayer.name != "") {
		pullLeaderboardScores = false;

		axios.get("/get_scores", {
			baseURL: "https://osu.ppy.sh/api",
			params: {
				"k": config.apiKey,
				"b": data.menu.bm.id,
				"m": 0
			}
		}).then(response => {
			let leaderboardData = response.data;

			for(let i = 0; i < leaderboardData.length; i++) {
				let hit300 = parseInt(leaderboardData[i].count300);
				let hit100 = parseInt(leaderboardData[i].count100);
				let hit50 = parseInt(leaderboardData[i].count50);
				let miss = parseInt(leaderboardData[i].countmiss);
				let totalHits = hit300 + hit100 + hit50 + miss;
				let accRaw = (hit300 * 300 + hit100 * 100 + hit50 * 50) / (300 * totalHits);
				let acc = Math.round(accRaw * 10000) / 100;

				let playInfo = {
					"score": leaderboardData[i].score.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
					"userId": leaderboardData[i].user_id,
					"pp": Math.round(leaderboardData[i].pp * 100) / 100,
					"combo": leaderboardData[i].maxcombo,
					"acc": acc
				};
	
				lbDataProcessed.set(leaderboardData[i].username, playInfo);
			}

			lbProcessed = true;
		});

		axios.get("/get_user", {
			baseURL: "https://osu.ppy.sh/api",
			params: {
				"k": config.apiKey,
				"u": data.gameplay.leaderboard.ourplayer.name,
				"m": 0,
				"type": "string"
			}
		}).then(response => {
			playerId = response.data[0].user_id;
			playerInfo = {
				"name": response.data[0].username,
				"rank": response.data[0].pp_rank,
				"country": response.data[0].country,
				"countryRank": response.data[0].pp_country_rank
			};

			userProcessed = true;
		});
	}

	if(lbProcessed && userProcessed && !allProcessed) {
		if(data.gameplay.leaderboard.slots[data.gameplay.leaderboard.ourplayer.position - 2].name == config.playerName) {
			axios.get("/get_scores", {
				baseURL: "https://osu.ppy.sh/api",
				params: {
					"k": config.apiKey,
					"b": data.menu.bm.id,
					"m": 0,
					"u": config.playerName,
					"type": "string"
				}
			}).then(response => {
				console.log(response);

				let hit300 = parseInt(response.data[0].count300);
				let hit100 = parseInt(response.data[0].count100);
				let hit50 = parseInt(response.data[0].count50);
				let miss = parseInt(response.data[0].countmiss);
				let totalHits = hit300 + hit100 + hit50 + miss;
				let accRaw = (hit300 * 300 + hit100 * 100 + hit50 * 50) / (300 * totalHits);
				let acc = Math.round(accRaw * 10000) / 100;

				let playInfo = {
					"score": response.data[0].score.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
					"userId": response.data[0].user_id,
					"pp": Math.round(response.data[0].pp * 100) / 100,
					"combo": response.data[0].maxcombo,
					"acc": acc
				};
	
				if(data.gameplay.leaderboard.ourplayer.name == config.playerName) {
					oldScore = response.data[0].score;
				} else {
					lbDataProcessed.set(response.data[0].username, playInfo);
				}

				allProcessed = true;
			});
		} else {
			allProcessed = true;
		}
	}

	if(allProcessed) {
		let player = data.gameplay.leaderboard.ourplayer;
		let playerPosition = player.position;

		let hit300 = data.gameplay.hits["300"];
		let hit100 = data.gameplay.hits["100"];
		let hit50 = data.gameplay.hits["50"];
		let miss = data.gameplay.hits["0"];
		let totalHits = hit300 + hit100 + hit50 + miss;
		let accRaw = (hit300 * 300 + hit100 * 100 + hit50 * 50) / (300 * totalHits);
		let acc = Math.round(accRaw * 10000) / 100;

		lbDataProcessed.set(player.name, {
			"score": data.gameplay.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
			"userId": playerId,
			"pp": Math.round(data.gameplay.pp.current * 100) / 100,
			"combo": data.gameplay.combo.max,
			"acc": acc,

		});

		let pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10;

		if(playerPosition <= 10) {
			pos1 = 0;
			pos2 = 1;
			pos3 = 2;
			pos4 = 3;
			pos5 = 4;
			pos6 = 5;
			pos7 = 6;
			pos8 = 7;
			pos9 = 8;
			pos10 = 9;
		} else {
			if(data.gameplay.leaderboard.slots[playerPosition - 1].name == data.gameplay.leaderboard.slots[playerPosition - 2].name) {
				playerPosition--;
			}
			pos1 = playerPosition - 10;
			pos2 = playerPosition - 9;
			pos3 = playerPosition - 8;
			pos4 = playerPosition - 7;
			pos5 = playerPosition - 6;
			pos6 = playerPosition - 5;
			pos7 = playerPosition - 4;
			pos8 = playerPosition - 3;
			pos9 = playerPosition - 2;
			pos10 = playerPosition - 1;
		}

		let player1name = data.gameplay.leaderboard.slots[pos1].name;
		let player1 = lbDataProcessed.get(player1name);
		lb1avatar.src = "https://a.ppy.sh/" + player1.userId;
		lb1score.innerHTML = player1.score;
		lb1name.innerHTML = player1name;
		lb1combo.innerHTML = player1.combo + "x";
		lb1pp.innerHTML = player1.pp + "pp";
		lb1acc.innerHTML = player1.acc + "%";

		let player2name = data.gameplay.leaderboard.slots[pos2].name;
		let player2 = lbDataProcessed.get(player2name);
		lb2avatar.src = "https://a.ppy.sh/" + player2.userId;
		lb2score.innerHTML = player2.score;
		lb2name.innerHTML = player2name;
		lb2combo.innerHTML = player2.combo + "x";
		lb2pp.innerHTML = player2.pp + "pp";
		lb2acc.innerHTML = player2.acc + "%";

		let player3name = data.gameplay.leaderboard.slots[pos3].name;
		let player3 = lbDataProcessed.get(player3name);
		lb3avatar.src = "https://a.ppy.sh/" + player3.userId;
		lb3score.innerHTML = player3.score;
		lb3name.innerHTML = player3name;
		lb3combo.innerHTML = player3.combo + "x";
		lb3pp.innerHTML = player3.pp + "pp";
		lb3acc.innerHTML = player3.acc + "%";

		let player4name = data.gameplay.leaderboard.slots[pos4].name;
		let player4 = lbDataProcessed.get(player4name);
		lb4avatar.src = "https://a.ppy.sh/" + player4.userId;
		lb4score.innerHTML = player4.score;
		lb4name.innerHTML = player4name;
		lb4combo.innerHTML = player4.combo + "x";
		lb4pp.innerHTML = player4.pp + "pp";
		lb4acc.innerHTML = player4.acc + "%";

		let player5name = data.gameplay.leaderboard.slots[pos5].name;
		let player5 = lbDataProcessed.get(player5name);
		lb5avatar.src = "https://a.ppy.sh/" + player5.userId;
		lb5score.innerHTML = player5.score;
		lb5name.innerHTML = player5name;
		lb5combo.innerHTML = player5.combo + "x";
		lb5pp.innerHTML = player5.pp + "pp";
		lb5acc.innerHTML = player5.acc + "%";

		let player6name = data.gameplay.leaderboard.slots[pos6].name;
		let player6 = lbDataProcessed.get(player6name);
		lb6avatar.src = "https://a.ppy.sh/" + player6.userId;
		lb6score.innerHTML = player6.score;
		lb6name.innerHTML = player6name;
		lb6combo.innerHTML = player6.combo + "x";
		lb6pp.innerHTML = player6.pp + "pp";
		lb6acc.innerHTML = player6.acc + "%";

		let player7name = data.gameplay.leaderboard.slots[pos7].name;
		let player7 = lbDataProcessed.get(player7name);
		lb7avatar.src = "https://a.ppy.sh/" + player7.userId;
		lb7score.innerHTML = player7.score;
		lb7name.innerHTML = player7name;
		lb7combo.innerHTML = player7.combo + "x";
		lb7pp.innerHTML = player7.pp + "pp";
		lb7acc.innerHTML = player7.acc + "%";

		let player8name = data.gameplay.leaderboard.slots[pos8].name;
		let player8 = lbDataProcessed.get(player8name);
		lb8avatar.src = "https://a.ppy.sh/" + player8.userId;
		lb8score.innerHTML = player8.score;
		lb8name.innerHTML = player8name;
		lb8combo.innerHTML = player8.combo + "x";
		lb8pp.innerHTML = player8.pp + "pp";
		lb8acc.innerHTML = player8.acc + "%";

		let player9name = data.gameplay.leaderboard.slots[pos9].name;
		let player9 = lbDataProcessed.get(player9name);
		lb9avatar.src = "https://a.ppy.sh/" + player9.userId;
		lb9score.innerHTML = player9.score;
		lb9name.innerHTML = player9name;
		lb9combo.innerHTML = player9.combo + "x";
		lb9pp.innerHTML = player9.pp + "pp";
		lb9acc.innerHTML = player9.acc + "%";

		let player10name = data.gameplay.leaderboard.slots[pos10].name;
		let player10 = lbDataProcessed.get(player10name);
		lb10avatar.src = "https://a.ppy.sh/" + player10.userId;
		lb10score.innerHTML = player10.score;
		lb10name.innerHTML = player10name;
		lb10combo.innerHTML = player10.combo + "x";
		lb10pp.innerHTML = player10.pp + "pp";
		lb10acc.innerHTML = player10.acc + "%";

		if(data.gameplay.leaderboard.ourplayer.name == config.playerName) {
			if(data.gameplay.leaderboard.ourplayer.score > oldScore) {
				document.getElementsByClassName("pb")[0].classList.remove("hidden");
			}
		}
	
		if(lastTime + 2000 < data.menu.bm.time.current) {
			lastTime = data.menu.bm.time.current;
	
			if(lastCombo == data.gameplay.combo.current) {
				hidelbDiv.classList.remove("hidden");
			} else {
				lastCombo = data.gameplay.combo.current;
				hidelbDiv.classList.add("hidden");
			}
		}

		playerPicDiv.src = "https://a.ppy.sh/" + playerId;

		playerCountryDiv.src = "./flags/" + playerInfo.country.toLowerCase() + ".svg";

		playerNameDiv.innerHTML = playerInfo.name;

		playerRankDiv.innerHTML = "#" + playerInfo.rank;

		playerRankCountryDiv.innerHTML = "#" + playerInfo.countryRank;
	}
	
	if(data.gameplay.hits.unstableRate >= 0) {
		let ur = data.gameplay.hits.unstableRate;
		urDiv.innerHTML = Math.round(ur * 100) / 100;
	}

	if(data.menu.bm.stats.SR >= 0) {
		let sr = data.menu.bm.stats.SR;
		starDiv.innerHTML = Math.round(sr * 100) / 100;
	}

	if(data.menu.bm.stats.BPM.min >= 0) {
		let bpm = data.menu.bm.stats.BPM.min;
		bpmDiv.innerHTML = (Math.round(bpm * 100) / 100) + " BPM";
	}

	if(data.gameplay.combo.current >= 0) {
		let combo = data.gameplay.combo.current;
		comboDiv.innerHTML = combo + "x";
	}

	if(data.gameplay.pp.current >= 0) {
		let pp = data.gameplay.pp.current;
		ppDiv.innerHTML = pp + "pp";
	}

	if(data.gameplay.hp.normal >= 0) {
		let hp = data.gameplay.hp.normal;
		let hpPercent = Math.round(hp / 200 * 10000) / 100;
		hpInner.style.width = hpPercent + "%";
	}

	if(data.gameplay.hits["100"] >= 0) {
		h100Div.innerHTML = data.gameplay.hits["100"];
	}

	if(data.gameplay.hits["50"] >= 0) {
		h50Div.innerHTML = data.gameplay.hits["50"];
	}

	if(data.gameplay.hits["0"] >= 0) {
		h0Div.innerHTML = data.gameplay.hits["0"];
	}

	if(data.gameplay.score >= 0) {
		scoreDiv.innerHTML = data.gameplay.score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	if(data.gameplay.accuracy >= 0) {
		accDiv.innerHTML = data.gameplay.accuracy + "%";
	}
}