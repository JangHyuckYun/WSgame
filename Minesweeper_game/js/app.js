
// click 이벤트
const all = (ele, parent = document) => parent.querySelectorAll(ele)
const one = (ele, parent = document) => parent.querySelector(ele)
const crt = ele => document.createElement(ele)

function click(){//처음 버튼클릭
	var btn = Array.from(all(".btn")); //Array.from = 배열로 바꿔줌
	btn.forEach(v=> {
		v.addEventListener("click", () => {
			const cnt = ~~v.dataset.cnt;
			if(v.classList.contains('reload')) return reload();
			if (Array.from([8, 14, 20]).indexOf(cnt) === -1) {
				alert("값이 잘못되었습니다 다시 시도하여 주세요");
				return false;
			}
			one(".first_screen").style.display = "none";
			create_mw(cnt);
		})
	});
}
function create_mw(cnt){// 입력받은 값 만큼 li 생성
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
		}
	}
	push_boom(cnt,two_arr);
	setTimeout(timer,500);
}
function play_game(two_arr,boom_arr,cnt){//게임 시작
	let chk_fir = 0;
	const createRand = cnt => Math.floor(Math.random() * cnt-1) + 1;
	two_arr.forEach((x,i)=> {
		x.forEach((y,j) => {
			y.addEventListener("click",() => {
				let v,num = 0;
				for(let a = 0; a < cnt; a++){
					for(let b = 0,len = boom_arr[a].length; b < len; b++ ){
						v = boom_arr[a][b].split(",");
						if(chk_fir == 0 && ~~v[0] == i && ~~v[1] == j){
							boom_arr[a][b] = createRand(cnt) + "," + createRand(cnt);
							chk_fir = 1;
						}else if(~~v[0] == i && ~~v[1] == j) return end_game(boom_arr,two_arr,cnt);
					}
				}
				for(let q= -1; q<2; q++){
					for(let w= -1; w<2; w++){
						if(q==0 && w==0) continue;
						if(two_arr[i+q] && two_arr[i+q][j+w]){
							for(let t = 0; t < cnt; t++){
								for(let tt = 0 , len = boom_arr[i].length; tt < len; tt++){
									// console.log(~~boom_arr[t][tt].split(",")[0] + " == " + (q+i));
									// console.log(~~boom_arr[t][tt].split(",")[0] + " == " + (w+i));
									if(~~boom_arr[t][tt].split(",")[0] == q+i && ~~boom_arr[t][tt].split(",")[1] == w+j) num++;
								}
							}
						} 
					}
				}
				y.style.background = "white";
				y.innerHTML = num; 
			});
		});
	});	
}
function push_boom(cnt,two_arr){// 폭탄 넣기
	var cnt2 = cnt == 20 ? cnt * 3 : cnt;  
	const mine_arr= [];
	const boom_arr = [];
	const createRand = cnt => Math.floor(Math.random() * cnt-1) + 1
	for(let i=0; i<cnt2; i++){
		let x = createRand(cnt)
		let y = createRand(cnt)
		let plug = true;

		for (let j = 0, len = mine_arr.length; j < len; j++) {
			if(mine_arr[j][0] == x && mine_arr[j][1] == y){
				plug = false;
				i--;
			}
		}
		if (plug){
			mine_arr.push([x, y]);
			boom_arr.push([x +","+y]);
		}else
		i--;
	}
	play_game(two_arr,boom_arr,cnt);
}
function end_game(boom_arr,two_arr,cnt){//게임 finish
	const stop = "stop";
	timer(stop);
	alert("끝");
	for(let i = 0; i < cnt; i++){
		for(let j = 0 , len = boom_arr[i].length; j < len; j++){
			var v = boom_arr[i][j].split(",");
			two_arr[~~v[0]][~~v[1]].style.background = "red";
		}
	}
	if(confirm("게임을 다시 시작 하시겠습니까?")){
		one("#menu").empty();
		one(".NW").style.visibility = "hidden";
		setTimeout(_=>{one(".first_screen").style.display = "block";},500);
	}else{
		alert("여기서 놀면서 다시 도전해 보세요");
		const stop = "stop";
		timer(stop);
		one(".replay").style.display = "block";
	}
}
function timer(stop){// 게임 플레이 시간 표시
	if(stop == "stop") return  clearInterval(time);
	const target = one(".tiemr_second")
	const divide = 100
	let i = 0
	var time = setInterval(_ => {
		target.innerHTML = (++i / divide);
	}, (1000 / divide) );
}
HTMLElement.prototype.empty = function() {//create empty()
	var that = this;
	while (that.hasChildNodes()) {
		that.removeChild(that.lastChild);
	}
};
function reload(){ location.reload(); }
window.onload = click // widnow 실행시
