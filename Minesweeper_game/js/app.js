// document.addEventListener("click",e=>{
// 	console.log(e.currentTarget);
// });
// click 이벤트
const all = (ele, parent = document) => parent.querySelectorAll(ele)
const one = (ele, parent = document) => parent.querySelector(ele)
const crt = ele => document.createElement(ele)
const target = one(".tiemr_second");
const divide = 100;
let timer,ttime = 0;

function click(){//처음 버튼클릭
var btn = Array.from(all(".btn")); //Array.from = 배열로 바꿔줌
btn.forEach(v=> {
	v.addEventListener("click", () => {
		const cnt = ~~v.dataset.cnt;
		if(v.classList.contains('replay')) return reoload();
		if (Array.from([9, 16, 30]).indexOf(cnt) === -1) {
			alert("값이 잘못되었습니다 다시 시도하여 주세요");
			return false;
		}
		one(".first_screen").style.display = "none";
		create_mw(cnt);
	})
});
}
// function replay(x,y){
	
// }
function create_mw(cnt){// 입력받은 값 만큼 li 생성
	var size,h, ani_cnt,lh;
	switch (cnt) {
		case 9 :
		size = 450;
		h = 300;
		lh = 32;
		ani_cnt = "1";
		break;
		case 16 : 
		size = 800;
		h = 600;
		lh = 36;
		ani_cnt = "2";
		break;
		case 30 : 
		size = 1500;
		h = 950;
		lh = 31;
		ani_cnt = "3";
		break;
		default : 
		alert("잘못된 값입니다 다시 시도해 주세요.");
		return false;
		break;
	}
	const nav = one(".NW"), g_s = one(".g_s")
	nav.style.width = size+"px";
	nav.style.height = h+"px";
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
	one(".op").style.width = `${size}px`;
	one(".timer").classList.remove("hidden");
	Array.from(all("li")).map(v=> v.classList.add("black"));
	Array.from(all("#menu>li>ul>li")).forEach(v=> v.style.lineHeight = lh+"px");
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
}
function play_game(two_arr,boom_arr,cnt,cnt2){//게임 시작
	timer = setInterval(time,(1000/divide));
	let chk_fir = 0,boom,ranX,ranY;
	const createRand = cnt => Math.floor(Math.random() * cnt-1) + 1;
	two_arr.forEach((x,i)=> {
		x.forEach((y,j) => {
			y.addEventListener("click", e => {
				let v,num = 0,num2 = 0;

				if(chk_fir == 0){
					for(var q = -1; q < 2; q++){
						for(var w = -1; w < 2; w++){
							if(two_arr[i+q] && two_arr[i+q][j+w]){
								for(let t = 0; t < cnt2; t++){
									for(let tt = 0 , len = boom_arr[t].length; tt < len; tt++){
										boom = boom_arr[t][tt].split(",");
										if(~~boom[0] == q+i && ~~boom[1] == w+j){
											while(true){
												ranX = createRand(cnt);
												ranY = createRand(cnt);
												if( ranX != ~~boom[0] && ranY != ~~boom[0]){
													break;
												}
											}
											console.log(boom_arr[t][tt]);
											boom_arr[t][tt] = ranX + "," + ranY;
											console.log(boom_arr[t][tt]);
											// console.log(ranX,ranY);
										}
									}
								}
							}
						}
					}
					chk_fir = 1;
				}

				for(let a = 0; a < cnt2; a++){
					for(let b = 0,len = boom_arr[a].length; b < len; b++ ){
						v = boom_arr[a][b].split(",");
						if(~~v[0] == i && ~~v[1] == j){ 
							clearInterval(timer);
							return end_game(boom_arr,two_arr,cnt,cnt2);
						}
					}
				}
				for(let q= -1; q<2; q++){
					for(let w= -1; w<2; w++){
						if(q==0 && w==0) continue;
						if(two_arr[i+q] && two_arr[i+q][j+w]){

							for(let t = 0; t < cnt2; t++){
								for(let tt = 0 , len = boom_arr[t].length; tt < len; tt++){
									boom = boom_arr[t][tt].split(",");
									if(~~boom[0] == q+i && ~~boom[1] == w+j) num++;
								}
							}
						} 
					}
				}
/*
처음 클릭한거 와 주변 8칸에 폭탄이 있을때  
폭탄을 새로 만듬 

*/
// if(num == 0) two_arr[q+i][w+j].style.background = "white";
// if(num == 0){
// 	let bool = true;
// 	while(bool){

// 	}
// }
y.style.background = "white";
if(num == 0){
	for(let q= -1; q<2; q++){
		for(let w= -1; w<2; w++){
			if(q==0 && w==0) continue;
			if(two_arr[i+q] && two_arr[i+q][j+w]){
				if(two_arr[i+q][j+w].style.background != "white") two_arr[i+q][j+w].click();
			}
		}
	}
}else{
	y.innerHTML = num; 
}
});
		});
	});	
}
function push_boom(cnt,two_arr){// 폭탄 넣기
	var cnt2 = cnt;
	if(cnt == 9) cnt2 = 10; 
	if(cnt == 16) cnt2 = 40; 
	if(cnt == 30) cnt2 = 90; 

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
	play_game(two_arr,boom_arr,cnt,cnt2);
}

function end_game(boom_arr,two_arr,cnt,cnt2){//게임 finish
	for(let i = 0; i < cnt2; i++){
		for(let j = 0 , len = boom_arr[i].length; j < len; j++){
			var v = boom_arr[i][j].split(",");
			two_arr[~~v[0]][~~v[1]].style.background = "red";
		}
	}
	one(".op").style.display = "block";
	one(".replay").style.display = "block";
}
function time(){// 게임 플레이 시간 표시
	target.innerHTML = (++ttime/divide);	
}
HTMLElement.prototype.empty = function() {//create empty()
	var that = this;
	while (that.hasChildNodes()) {
		that.removeChild(that.lastChild);
	}
};
function reload(){ location.reload(); }
window.onload = _=>{
	click();
	one(".replay").style.display = "none";
} // widnow 실행시
