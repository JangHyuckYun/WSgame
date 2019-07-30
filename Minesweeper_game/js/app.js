function setting(){
		var btn = Array.from(document.querySelectorAll(".btn")); //Array.from = 배열로 바꿔줌
		btn.map(v=> {
			v.addEventListener("click", function() {
				var cnt = this.dataset.cnt;
				if(cnt != 8 && cnt != 14 && cnt != 20){
					alert("값이 잘못되었습니다 다시 시도하여 주세요");
					return false;
				}else{
					document.querySelector(".first_screen").style.display = "none";
					create_mw(cnt);
				}
			})
		})
	}
	function create_mw(cnt){
		cnt = Number(cnt);
		if(cnt == 8){
			var size = 400;
			var ani_cnt = "1";
			document.querySelector(".timer").style.bottom = "290px";
			document.querySelector(".timer").style.left = "180px";
		}else if(cnt == 14) {
			var size = 800;
			var ani_cnt = "2";
		}else if(cnt == 20){
			var size = 1000;
			var ani_cnt = "3";
		}else{
			alert("잘못된 값입니다 다시 시도해 주세요.");
			return false;
		}

		let nav = document.querySelector(".NW");
		let g_s = document.querySelector(".g_s");
		nav.style.width = size+"px";
		nav.style.height = size+"px";

		for(var i = 0; i < cnt; i++){
			let li = document.createElement("li");
			let ul = document.createElement("ul");
			for(let j = 0; j < cnt; j++){
				let li2 = document.createElement("li");
				li.appendChild(ul).setAttribute("id","sub");
				li.querySelector("#sub").appendChild(li2);
			}
			document.querySelector("#menu").appendChild(li);
		}

		document.querySelector(".first_screen").style.display = "none";
		var ul_li_ul_li = Array.from(document.querySelectorAll(".NW>ul>li>ul>li"));
		ul_li_ul_li.map(v => v.style.height = `calc(100% / ${cnt} )`);
		nav.style.visibility = "visible";
		g_s.style.visibility = "visible";
		g_s.style.animation = "down"+ani_cnt+" 0.5s both";
		game_start(cnt);
	}

	function game_start(cnt){
		timer();
		var mine_arr= [];
		for(var i=0; i<cnt; i++){
			var x = Math.floor(Math.random() * cnt)+1;
			var y = Math.floor(Math.random() * cnt)+1;
			var plug = true;

			for (var j = 0; j < mine_arr.length; j++) {
				if(mine_arr[j][0] == x && mine_arr[j][1] == y){
					plug = false;
					i--;
				}
			}
			if(plug)
				mine_arr.push([x, y]);
			else
				i--;
		}
		for(var j = 0; j<cnt; j++){
			ran_color = String(Math.round(Math.random() * 0xFFFFFF).toString(16));
			console.log("["+mine_arr[j][1]+"]"+"["+mine_arr[j][0] + "]");
			document.querySelector(`#menu>li:nth-child(${mine_arr[j][1]})>ul>li:nth-child(${mine_arr[j][0]})`).style.background ="#"+ran_color;
		}
	}
	function timer(){
		var timer, i = 0, divide = 100;
	}

	window.onload = function(){
		setting();
	}