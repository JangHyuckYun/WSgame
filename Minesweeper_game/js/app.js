const one = (ele, parent = document) => parent.querySelector(ele);
const all = (ele, parent = document) => parent.querySelectorAll(ele);// click 이벤트
const crt = ele => document.createElement(ele);
const target = one(".tiemr_second");
const divide = 100;
let timer, ttime = 0;

function init() {
	stop_right_click();
	let cnt;
	let height;
	all(".btn").forEach(v => {
		v.addEventListener("click", () => {
			cnt = ~~v.dataset.cnt;
			height = ~~v.dataset.h;
			if(v.classList.contains('replay')) return reload();
			if ([9, 16, 30].indexOf(cnt) === -1 || [9, 16].indexOf(height) === -1) {
				alert("값이 잘못되었습니다 다시 시도하여 주세요");
				throw "wrong cnt";
			}
			one(".first_screen").style.display = "none";
			create_mw(cnt,height);
		})
	});
}
function create_mw(cnt,height) {
	let sub_li = [],size,boom_cnt;
	switch (cnt) {
		case 9 :
		size = 450;
		ani_cnt = "1";
		boom_cnt = 10;
		break;
		case 16 : 
		size = 800;
		ani_cnt = "2";
		boom_cnt = 40;
		break;
		case 30 : 
		size = 1500;
		ani_cnt = "3";
		boom_cnt = 100;
		break;
		default : 
		alert("잘못된 값입니다 다시 시도해 주세요.");
		throw 'wrong cnt';
		break;
	}
	one(".NW").style.width = `${size}px`;
	one(".op").style.width = `${size}px`;
	one(".NW").style.height = `${height * 50}px`;
	for(let i = 0; i < cnt; i++){
		let li = crt("li");
		let ul = crt("ul");
		for(let j = 0; j < height; j++){
			let li2 = crt("li");
			li.appendChild(ul).setAttribute("id","sub");
			one("#sub", li).appendChild(li2).setAttribute("class","sub_li");
		}
		one("#menu").appendChild(li);
	}
	all(".sub_li").forEach(v => v.style.height = `calc(100% / ${height})`);
	all(".sub_li").forEach(v => v.classList.add("black"));
	one(".NW").style.visibility = "visible";

	const all_li = Array.from(all(".sub_li"));
	for(let i = 0, len = height; i < len; i++){
		let i2 = i; sub_li[i] = [];
		for(let j = 0, len = cnt; j < len; j++){
			sub_li[i][j] = j == 0 ? all_li[i] : all_li[i2 += height];
		}
	}
	play_game(sub_li,height,cnt,boom_cnt);
}
function play_game(sub_li,height,cnt,boom_cnt) {
	const boom_arr = [];
	let chk_fir = 0,chk_boom = [],num = 0,chk_final = 0;
	sub_li.forEach((x,i)=>{
		x.forEach((y,j)=>{
			y.addEventListener("contextmenu",function(e){
				if(e.button == 2){
					if(y.style.background == "white") throw "이미 클릭한곳에는 우클릭을할 수 없습니다."; 
					else y.classList.toggle("boom");
					
				}
			})
			y.addEventListener("click",e=>{
				num = 0;
				if(chk_fir == 0){// 처음 클릭씨 폭탄 생성
					one(".timer").classList.remove("hidden");
					timer = setInterval(time,(1000/divide));//처음 클릭시 타이머 시작
					for(let q =  -1; q < 2; q++){
						for(let w =  -1; w < 2; w++){
							if(sub_li[q+i] && sub_li[q+i][w+j]) chk_boom.push([(q+i),(w+j)]);
						}
					}
					let chk_cnt = 0;
					const createRand = cnt => Math.floor(Math.random() * height-1) + 1;
					for(let i=0,len = boom_cnt; i< len; i++){
						let ranX = createRand(cnt);
						let ranY = createRand(cnt);
						let plug = true;
						chk_boom.forEach(v =>{
							while(ranX == v[0] && ranY == v[1]){
								ranX = createRand(cnt);
								ranY = createRand(cnt);
							}
						});
						for (let j = 0, len = boom_arr.length; j < len; j++) {
							if(boom_arr[j][0] == ranX && boom_arr[j][1] == ranY){
								plug = false;
								i--;
							}
						}
						if (plug){
							boom_arr.push([ranX,ranY]);
						}

					}
					chk_fir = 1;
				}
				for(let q =  0; q < boom_cnt; q++){// 클릭한 곳이 폭탄인지 확인
					if(boom_arr[q][0] == i && boom_arr[q][1] == j) return lose(sub_li,boom_arr,cnt);
				}
				for(let q =  -1; q < 2; q++){// 클릭한 곳 주변이 폭탄인지 확인
					for(let w =  -1; w < 2; w++){
						if(q==0 && w==0) continue;
						if(sub_li[q+i] && sub_li[q+i][w+j]){
							for(let t = 0; t < boom_cnt; t++){
								if(boom_arr[t][0] == (q+i) && boom_arr[t][1] == (w+j)) num++;
							}
						}
					}
				}

				y.style.background = "white";
				chk_final++;
				if(num == 0){
					for(let q= -1; q<2; q++){
						for(let w= -1; w<2; w++){
							if(q==0 && w==0) continue;
							if(sub_li[i+q] && sub_li[i+q][j+w]){
								if(sub_li[i+q][j+w].style.background != "white") sub_li[i+q][j+w].click();
							}
						}
					}
				}else{
					y.innerHTML = num; 
				}
				if(chk_final == ((cnt * cnt) - boom_cnt)){
					clearInterval(timer);
					return clear(sub_li,boom_arr,boom_cnt);
				}


			});
		});
	});
}
function stop_right_click() {
	if(document.addEventListener){
		document.addEventListener("contextmenu",function(e){
			e.preventDefault();
		})		
	}
}
function game_clear(sub_li,boom_arr,cnt) {
	clearInterval(timer);
	one(".op").style.display = "block";
	one(".replay").style.display = "block";
	alert("축하해요 클리어 하셨습니다"); 
	boom_arr.forEach(v=> sub_li[v[0]][v[1]].style.background = "red");
}
function lose(sub_li,boom_arr,boom_cnt) {
	clearInterval(timer);
	one(".op").style.display = "block";
	one(".replay").style.display = "block";
	boom_arr.forEach(v=> sub_li[v[0]][v[1]].style.background = "red");

}
function time() { target.innerHTML = (++ttime/divide); }
function reload() { location.reload(); }
window.onload = init;