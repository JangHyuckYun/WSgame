// click 이벤트
const all = (ele, parent = document) => parent.querySelectorAll(ele)
const one = (ele, parent = document) => parent.querySelector(ele)
const crt = ele => document.createElement(ele)

function click(){
	var btn = Array.from(all(".btn")); //Array.from = 배열로 바꿔줌
	btn.forEach(v=> {
		v.addEventListener("click", () => {
			const cnt = ~~v.dataset.cnt;
			if (Array.from([8, 14, 20]).indexOf(cnt) === -1) {
				alert("값이 잘못되었습니다 다시 시도하여 주세요");
				return false;
			}
			one(".first_screen").style.display = "none";
			create_mw(cnt);
		})
	});
}
// 입력받은 값 만큼 li 생성
function create_mw(cnt){
	var size, ani_cnt
	switch (cnt) {
		case 8 :
		size = 400;
		ani_cnt = "1";
		break;
		case 14 : 
		size = 800;
		ani_cnt = "2";
		break;
		case 20 : 
		size = 900;
		ani_cnt = "3";
		break;
		default : 
		alert("잘못된 값입니다 다시 시도해 주세요.");
		return false;
		break;
	}

	const nav = one(".NW"), g_s = one(".g_s")
	nav.style.width = size+"px";
	nav.style.height = size+"px";

	for(var i = 0; i < cnt; i++){
		let li = crt("li");
		let ul = crt("ul");
		for(let j = 0; j < cnt; j++){
			let li2 = crt("li");
			li.appendChild(ul).setAttribute("id","sub");
			one("#sub", li).appendChild(li2).setAttribute("class","ttt");
		}
		one("#menu").appendChild(li);
	}

	one(".first_screen").style.display = "none";
	one(".timer").classList.remove("hidden");
	Array.from(all("li")).map(v=> v.classList.add("black"));
	Array.from(all(".NW>ul>li>ul>li")).forEach(v => v.style.height = `calc(100% / ${cnt} )`);
	nav.style.visibility = "visible";

	const li = Array.from(all(".ttt"));
	const two_arr = [];
	for (let i =  0; i < cnt; i++) {
		let i2 = i;
		two_arr[i] = [];
		for (let j = 0; j < cnt; j++) {
			two_arr[i][j] = j == 0 ? li[i] : li[i2 += cnt];
			// two_arr[i][j].innerHTML = "["+i+"]" + " "+ "["+j+"]";
		}
	}
	game_start(cnt);
	test(two_arr);
	setTimeout(timer,500);
}

function test(two_arr){
	two_arr.forEach((x,i)=> {
		x.forEach((y,j) => {
			y.addEventListener("click",() => {
				if(y.classList.contains('boom')) return end_game();

				let num = 0;
				var check_arr = [];
				// 클릭요소 기준 왼쪽
				// if(two_arr[i][j-1]) check_arr.push(two_arr[i][j-1]);
				// 클릭요소 기준 오른쪽
				// if(two_arr[i][j+1]) check_arr.push(two_arr[i][j+1]);
				for(let q= -1; q<2; q++){
					for(let w= -1; w<2; w++){
						if(q==0 && w==0) continue;
						if(two_arr[i+q] && two_arr[i+q][j+w] && two_arr[i+q][j+w].classList.contains("boom")){
							num++;
						} 
					}
				}
				/*check_arr.forEach(v => {
					if (v.classList.contains('boom')) num++;
				});*/
				/*if(i - 1 != -1 && i + 1 != 8 && j + 1 != 8 && i - 1 != -1 && j - 1 != -1){
					check_arr.push(
						two_arr[i-1][j-1],
						two_arr[i-1][j],
						two_arr[i-1][j+1],

						two_arr[i+1][j-1]
						two_arr[i+1][j],
						two_arr[i+1][j+1],
					);
				};*/
				y.style.background = "white";
				y.innerHTML = num; 
			});
		});
	});
}

// 폭탄 넣기
function game_start(cnt){
	const mine_arr= [];
	const createRand = cnt => Math.floor(Math.random() * cnt) + 1
	for(let i=0; i<cnt; i++){
		let x = createRand(cnt)
		let y = createRand(cnt)
		let plug = true;

		for (let j = 0, len = mine_arr.length; j < len; j++) {
			if(mine_arr[j][0] == x && mine_arr[j][1] == y){
				plug = false;
				i--;
			}
		}
		if (plug)
			mine_arr.push([x, y]);
		else
			i--;
	}
	for(let j = 0; j<cnt; j++){
		one(`#menu>li:nth-child(${mine_arr[j][1]})>ul>li:nth-child(${mine_arr[j][0]})`).classList.add("boom");
	}
}
function end_game(){
	Array.from(all("li")).filter(v=> v.classList.contains('boom')).map(v=> v.classList.remove("black"));
}
// 게임 플레이 시간 표시
function timer(){
	const target = one(".tiemr_second")
	const divide = 100
	let i = 0
	setInterval(_ => {
		timer.innerHTML = (++i / divide);
	}, (1000 / divide) );
}
// widnow 실행시
window.onload = click