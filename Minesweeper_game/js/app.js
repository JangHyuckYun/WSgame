function click(game){
		var btn = Array.from(document.querySelectorAll(".btn")); //Array.from = 배열로 바꿔줌
		btn.map(v=> {
			v.addEventListener("click", function() {
				cnt = Number(this.dataset.cnt);
				if(cnt != 8 && cnt != 14 && cnt != 20){
					alert("값이 잘못되었습니다 다시 시도하여 주세요");
					return false;
				}else{
					document.querySelector(".first_screen").style.display = "none";
					create_mw(cnt);
				}
			})
		});
		// li들을 클릭할떄
		if(game == "start"){
			var li = Array.from(document.querySelectorAll("li"));
			li.map(v => v.addEventListener("click",function(){
					console.log(v.item());
			}));
		}
	}
	function create_mw(cnt){
		if(cnt == 8){
			var size = 400;
			var ani_cnt = "1";
		}else if(cnt == 14) {
			var size = 800;
			var ani_cnt = "2";
		}else if(cnt == 20){
			var size = 900;
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
		var game = "start";
		click(game);
		setTimeout(function(){timer()},500);
	}

	function game_start(cnt){
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
			document.querySelector(`#menu>li:nth-child(${mine_arr[j][1]})>ul>li:nth-child(${mine_arr[j][0]})`).style.background ="#"+ran_color;
		}
	}
	function timer(){
		var timer, i = 0, divide = 100;
		timer = document.querySelector(".tiemr_second");
		setInterval(function(){
			i++;
			timer.innerHTML = (i / divide);
		},(1000/ divide));
	}

	window.onload = function(){
		var cnt = 0;
		click();
	}