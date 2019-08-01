// 구현 해야 할 목록
// 폰이 끝까지 가면 변신   킹과 룩 교체기능   body click .move remove
// (function (){
	let 
	black=1, 
	count=0, 
	thisidx,
	turn=0;

	for(let i=0; i<32; i++){ // 체스판 생성
		$("#chesswrap li:nth-child("+black+")").css({"background" : "black"});
		black+=2;
		count++;
		if( count%4 == 0 ) black++;
		if( count%8 == 0 ) black=black-2;
	}
	
	$("#chesswrap li").click(function(){ // 말 클릭
		let clickthis = $(this);
		let before= turn;
		let m= turn == 0? "black": "white";
		let e= turn != 0? "black": "white";
		/*if(turn == 0){
			if(clickthis.children("div").hasClass("move")){
				// if(clickthis.children("div").attr('class') == "move"){
				var className = $("#chesswrap li").eq(thisidx).find('img').attr('class');
				var firstCheck = ['blackpawn','blackking','blackrook'];
				if(firstCheck.indexOf(className)>=0){
					$("#chesswrap li").eq(thisidx).find('img').attr('data-first',1);
				}
				//클릭한게 블랙 폰이면 data-first 1 삽입
				if(clickthis.find("img").attr('src') != undefined){
					$(".w_death").append(`<img src='${clickthis.find("img").attr('src')}'>`);
					if(clickthis.find('img').attr('class') == 'whiteking'){
						$(".gameover").css({"display" : "block"}).text('black Win!');
					}
				}
				var clone = $("#chesswrap>li").eq(thisidx).find("img").clone();
				//잡았을 경우 death_result에 사진 출력
				clickthis.find("img").remove();
				if(clone.attr('class') == 'blackpawn' && !~~(clickthis.index()/8)){// 끝까지 가면 퀸으로 됨
					clone =	$(".blackqueen").clone();
				}
				clickthis.append(clone);
				$("#chesswrap li").eq(thisidx).find("img").remove();
				turn = 1;
			}else if(clickthis.find('div').hasClass('castling')){
				clickthis.append($("#chesswrap li").eq(thisidx).find('img'));
				$("#chesswrap li").eq(thisidx).find("img").remove();
				if(clickthis.index()==58){
					$("#chesswrap li").eq(clickthis.index()+1).append($("#chesswrap li").eq(56).find('img'));
					$("#chesswrap li").eq(56).find('img').remove();
				}else{
					$("#chesswrap li").eq(clickthis.index()-1).append($("#chesswrap li").eq(63).find('img'));
					$("#chesswrap li").eq(63).find('img').remove();
				}
				$(".castling").remove();
				turn = 1;
			}
			$('.move').remove();
			//이 아래는 움직이는 칸 생성
			// if(clickthis.find('img').attr('class') != undefined)
			if(clickthis.find('img')[0]) 
				thisidx= clickthis.index();
			switch(clickthis.find("img").attr('class')){
				case "blackpawn" :
					pawnmove('white', -8);
					break;
				case "blackrook" :
					rookmove('black', 'white');
					break;
				case "blackknight" :
					knightmove('black');
					break;
				case "blackbishop" :
					bishopmove('black', 'white', 'bishop');
					break;
				case "blackqueen" :
					rookmove('black', 'white');
					bishopmove('black', 'white', 'queen');
					break;
				case "blackking" :
					kingmove('black');
					break;
			}
			$(".move").each(function (){
				if($(this).prev().attr('class') == 'whiteking'){
					$(".checkmate").css({"display" : "block"});
					setTimeout(function(){
						$(".checkmate").css({"display" : "none"});
					},700);
				}
			});
			if(turn == 1){ //턴이 바뀌었으면
				$(".text_box")
					.css({"background" : "black"})
					.html('<h1 style="color:white">turn : white</h1>');
				$(".move").remove();
				$(".castling").remove();
			}
		}else{
			// click img src indexof == black? white?
			if(clickthis.children("div").attr('class') == "move"){
				var className = $("#chesswrap li").eq(thisidx).find('img').attr('class');
				var firstCheck = ['whitepawn','whiteking','whiterook'];
				if(firstCheck.indexOf(className)>=0){
					$("#chesswrap li").eq(thisidx).find('img').attr('data-first',1);
				}
				//클릭한게 화이트 폰이면 data-first 1 삽입
				var clone = $("#chesswrap>li").eq(thisidx).find("img").clone();
				if(clickthis.find("img").attr('src') != undefined){
					$(".b_death").append(`<img src='${clickthis.find("img").attr('src')}'>`);
					if(clickthis.find('img').attr('class') == 'blackking'){
						$(".gameover").css({"display" : "block"}).text('white Win!');
					}
				}
				//잡았을 경우 death_result에 사진 출력
				clickthis.find("img").remove();
				if(clone.attr('class') == 'whitepawn' && ~~(clickthis.index()/8) == 7){ // 끝까지 가면 퀸으로 됨
					clone =	$(".whitequeen").clone();
				}
				clickthis.append(clone);
				$("#chesswrap li").eq(thisidx).find("img").remove();
				turn = 0;
			}else if(clickthis.find('div').hasClass('castling')){
				clickthis.append($("#chesswrap li").eq(thisidx).find('img'));
				$("#chesswrap li").eq(thisidx).find("img").remove();
				if(clickthis.index()==2){
					$("#chesswrap li").eq(clickthis.index()+1).append($("#chesswrap li").eq(0).find('img'));
					$("#chesswrap li").eq(0).find('img').remove();
				}else{
					$("#chesswrap li").eq(clickthis.index()-1).append($("#chesswrap li").eq(7).find('img'));
					$("#chesswrap li").eq(7).find('img').remove();
				}
				turn = 0;
			}
			$('.move').remove();
			if(clickthis.find('img')[0]) 
				thisidx=clickthis.index();
			switch(clickthis.find("img").attr('class')){
				case "whitepawn" :
					pawnmove('black',8);
					break;
				case "whiterook" :
					rookmove('white','black');
					break;
				case "whiteknight" :
					knightmove('white');
					break;
				case "whitebishop" :
					bishopmove('white','black','bishop');
					break;
				case "whitequeen" :
					rookmove('white','black');
					bishopmove('white','black','queen');
					break;
				case "whiteking" :
					kingmove('white');
					break;
			}
			// 이 아래는 움직이는 칸 생성
			$(".move").each(function(){
				if($(this).prev().attr('class') == 'blackking'){
					$(".checkmate").css({"display" : "block"});
					setTimeout(function(){
						$(".checkmate").css({"display" : "none"});
					},700)
				}
			})
			if(turn == 0){	//턴이 바뀌었으면
				$(".text_box")
					.css({"background" : "white"})
					.html('<h1 style="color:black">turn : black</h1>');
				$(".move").remove();
				$(".castling").remove();
			}
		}*/
		if(clickthis.children("div").hasClass("move")){
			// if(clickthis.children("div").attr('class') == "move"){
			var className = $("#chesswrap li").eq(thisidx).find('img').attr('class');
			var firstCheck = ['pawn','king','rook'];
			firstCheck= firstCheck.map(v => m+v);

			if(firstCheck.indexOf(className)>=0){
				$("#chesswrap li").eq(thisidx).find('img').attr('data-first',1);
			}
			if(clickthis.find("img").attr('src') != undefined){
				$(`.${e[0]}_death`).append(`<img src='${clickthis.find("img").attr('src')}'>`);
				if(clickthis.find('img').attr('class') == `${e}king`){
					$(".gameover").css({"display" : "block"}).text(`${m} Win!`);
				}
			}
			var clone = $("#chesswrap>li").eq(thisidx).find("img").clone();
			clickthis.find("img").remove();
			if(clone.attr('class') == `${m}pawn` && !~~(clickthis.index()/8)){// 끝까지 가면 퀸으로 됨
				clone =	$(".blackqueen").clone();
			}
			clickthis.append(clone);
			$("#chesswrap li").eq(thisidx).find("img").remove();
			turn= (turn+1)%2;
		}else if(clickthis.find('div').hasClass('castling')){ //캐슬링
			clickthis.append($("#chesswrap li").eq(thisidx).find('img'));
			$("#chesswrap li").eq(thisidx).find("img").remove();
			if(clickthis.index()== (turn == 0? 58: 2)){
				$("#chesswrap li").eq(clickthis.index()+1).append($("#chesswrap li").eq(turn == 0? 56: 0).find('img'));
				$("#chesswrap li").eq(turn == 0? 56: 0).find('img').remove();
			}else{
				$("#chesswrap li").eq(clickthis.index()-1).append($("#chesswrap li").eq(turn == 0? 63: 7).find('img'));
				$("#chesswrap li").eq(turn == 0? 63: 7).find('img').remove();
			}
			$(".castling").remove();
			turn= (turn+1)%2;
		}
		$('.move').remove();
		$('.castling').remove();
		if(clickthis.find('img')[0])
			thisidx=clickthis.index();
		if(clickthis.find("img")[0] && clickthis.find("img").attr('class').indexOf(m) == 0){
			/*if(clickthis.find("img").attr('class').replace(m, "") == "queen"){
				move.rook({
					enemy: e,
					calc: (16*turn)-8,
					my: m,
					name: clickthis.find("img").attr('class').replace(m, "")
				});
				move.bishop({
					enemy: e,
					calc: (16*turn)-8,
					my: m,
					name: clickthis.find("img").attr('class').replace(m, "")
				});
			}else{*/
			move[clickthis.find("img").attr('class').replace(m, "")]({
				enemy: e,
				calc: (16*turn)-8,
				my: m,
				name: clickthis.find("img").attr('class').replace(m, "")
			});
		}
		/*switch(clickthis.find("img").attr('class')){
			case `${m}pawn`:
				move.pawn(e, (16*turn)-8);
				break;
			case `${m}rook` :
				move.rook(m, e);
				break;
			case `${m}knight` :
				move.knight(m);
				break;
			case `${m}bishop` :
				move.bishop(m, e, 'bishop');
				break;
			case `${m}queen` :
				move.rook(m, e);
				move.bishop(m, e, 'queen');
				break;
			case `${m}king` :
				move.king(m);
				break;
		}*/
		$(".move").each(function (){
			if($(this).prev().attr('class') == (turn == 1? 'whiteking': 'blackking')){
				$(".checkmate").css({"display" : "block"});
				setTimeout(function(){
					$(".checkmate").css({"display" : "none"});
				},700);
			}
		});
		if(before != turn){	//턴이 바뀌었으면
			$(".text_box")
				.css({"background" : turn == 1? "black": "white"})
				.html(`<h1 style="color:${turn != 1? "black": "white"}">turn : ${turn != 1? "black": "white"}</h1>`);
			$(".move").remove();
			$(".castling").remove();
		}
	})
	let enemy, calc, my, name;
	const move= {
		pawn: (d) =>{
			enemy= d.enemy;
			calc= d.calc;
			if(!$("#chesswrap li").eq(thisidx + calc).find("img")[0]){ //앞에 말이 없다면
			$("#chesswrap li").eq(thisidx + calc).append('<div class="move"></div>');
			}
			if($("#chesswrap li").eq(thisidx).find("img").attr('data-first') == undefined && !$("#chesswrap li").eq(calc * 2 + thisidx).find("img")[0]){
				$("#chesswrap li").eq(calc * 2 + thisidx).append('<div class="move"></div>');
			}
			let right = String($("#chesswrap li").eq(thisidx+calc+1).find("img").attr('src')); //대각선
			let left = String($("#chesswrap li").eq(thisidx+calc-1).find("img").attr('src'));
			if(right.indexOf(enemy) >= 0 && parseInt((thisidx+calc) / 8) == parseInt((thisidx+calc+1) / 8)){
				$("#chesswrap li").eq(thisidx+calc+1).append('<div class="move"></div>');
			}
			if(left.indexOf(enemy) >= 0 && parseInt((thisidx+calc) / 8) == parseInt((thisidx+calc-1) / 8)){
				$("#chesswrap li").eq(thisidx+calc-1).append('<div class="move"></div>');
			}
		},
		rook: function (d){
			my= d.my;
			enemy= d.enemy;
			for(var i=thisidx-1; i>=parseInt(thisidx/8)*8; i--){ //왼쪽
				if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
			}
			for(var i=thisidx+1; i<parseInt(thisidx/8)*8+8; i++){ //오른쪽
				if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
			}
			for(var i=thisidx-8; i>=parseInt(thisidx%8); i-=8){ //위쪽
				if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
			}
			for(var i=thisidx+8; i<64; i+=8){//아래쪽
				if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
			}
		},
		knight: d =>{
			my= d.my;
			if(thisidx%8!=0 && thisidx-1-16 >= 0&&($("#chesswrap li").eq(thisidx-1-16).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx-1-16).find('img').attr('class').indexOf(my) ==-1))
				$("#chesswrap li").eq(thisidx-1-16).append('<div class="move"></div>');
			if(thisidx+1 < parseInt(thisidx/8+1)*8 && thisidx+1-16 >= 0 && ($("#chesswrap li").eq(thisidx+1-16).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx+1-16).find('img').attr('class').indexOf(my) ==-1))
				$("#chesswrap li").eq(thisidx+1-16).append('<div class="move"></div>');
			// 위쪽 좌우
			if(thisidx%8!=0 &&thisidx-1+16 < 64 &&($("#chesswrap li").eq(thisidx-1+16).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx-1+16).find('img').attr('class').indexOf(my) ==-1))
				$("#chesswrap li").eq(thisidx-1+16).append('<div class="move"></div>');
			if(thisidx+1 < parseInt(thisidx/8+1)*8 && thisidx+1+16 < 64 && ($("#chesswrap li").eq(thisidx+1+16).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx+1+16).find('img').attr('class').indexOf(my) ==-1))	
				$("#chesswrap li").eq(thisidx+1+16).append('<div class="move"></div>');
			//아래쪽 좌우
			if(thisidx%8!=1&&thisidx%8!=0&& thisidx-2-8 >= 0&& ($("#chesswrap li").eq(thisidx-2-8).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx-2-8).find('img').attr('class').indexOf(my) ==-1))
				$("#chesswrap li").eq(thisidx-2-8).append('<div class="move"></div>');	
			if(thisidx%8!=1&&thisidx%8!=0 && thisidx-2+8 < 64&&($("#chesswrap li").eq(thisidx-2+8).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx-2+8).find('img').attr('class').indexOf(my) ==-1))
				$("#chesswrap li").eq(thisidx-2+8).append('<div class="move"></div>');
			// 왼쪽 상하
			if(thisidx+2<parseInt(thisidx/8+1)*8&& thisidx+2-8 >= 0&&($("#chesswrap li").eq(thisidx+2-8).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx+2-8).find('img').attr('class').indexOf(my) ==-1))
				$("#chesswrap li").eq(thisidx+2-8).append('<div class="move"></div>');
			if(thisidx+2<parseInt(thisidx/8+1)*8 && thisidx+2+8 < 64 &&($("#chesswrap li").eq(thisidx+2+8).find('img').attr('class')==undefined || $("#chesswrap li").eq(thisidx+2+8).find('img').attr('class').indexOf(my) ==-1))
				$("#chesswrap li").eq(thisidx+2+8).append('<div class="move"></div>');
			// 오른쪽 상하
		},
		bishop: (d) =>{
			my= d.my;
			enemy= d.enemy;
			name= d.name;
			for(var i=thisidx; i>=0; i-=9){	//왼쪽 위
				var c = $("#chesswrap li").eq(i).find("img").attr('class');
				if(c!=undefined&&c.indexOf(name) >= 0&&i%8==0)
					break;
				else if(c!=undefined&&c.indexOf(name) >= 0)
					continue;
				if(c!=undefined&&c.indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
				if(i%8 == 0)
					break;
			}
			for(var i=thisidx; i>=0; i-=7){ // 오른쪽 위
				var c = $("#chesswrap li").eq(i).find("img").attr('class');
				if(c!=undefined&&c.indexOf(name) >= 0&&(i+1)%8==0)
					break;
				else if(c!=undefined&&c.indexOf(name) >= 0)
					continue;
				if(c!=undefined&&c.indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
				if((i+1)%8==0)
					break;
			}
			for(var i=thisidx; i<64; i+=7){ // 왼쪽 아래
				var c = $("#chesswrap li").eq(i).find("img").attr('class');
				if(c!=undefined&&c.indexOf(name) >= 0&&i%8==0)
					break;
				else if(c!=undefined&&c.indexOf(name) >= 0)
					continue;
				if(c!=undefined&&c.indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
				if(i%8==0)
					break;
			}
			for(var i=thisidx; i<64; i+=9){ // 오른쪽 아래
				var c = $("#chesswrap li").eq(i).find("img").attr('class');
				if(c!=undefined&&c.indexOf(name) >= 0&&(i+1)%8==0)
					break;
				else if(c!=undefined&&c.indexOf(name) >= 0)
					continue;
				if(c!=undefined&&c.indexOf(my)>=0)
					break;
				else if($("#chesswrap li").eq(i).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(i).find("img").attr('class').indexOf(enemy)>=0){
					$("#chesswrap li").eq(i).append('<div class="move"></div>');
					break;
				}
				$("#chesswrap li").eq(i).append('<div class="move"></div>');
				if((i+1)%8==0)
					break;
			}
		},
		king: d =>{
			my= d.my;
			if(thisidx+1 < 64&&($("#chesswrap li").eq(thisidx+1).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx+1).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx+1).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx+1).append('<div class="move"></div>');
			if(thisidx-1 >= 0&&($("#chesswrap li").eq(thisidx-1).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx-1).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx-1).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx-1).append('<div class="move"></div>');
			//좌우
			if(thisidx+7 < 64&&($("#chesswrap li").eq(thisidx+7).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx+7).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx+7).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx+7).append('<div class="move"></div>');
			if(thisidx+9 < 64&&($("#chesswrap li").eq(thisidx+9).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx+9).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx+9).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx+9).append('<div class="move"></div>');
			//아래 좌우
			if(thisidx+8 < 64&&($("#chesswrap li").eq(thisidx+8).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx+8).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx+8).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx+8).append('<div class="move"></div>');
			if(thisidx-8 >= 0&&($("#chesswrap li").eq(thisidx-8).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx-8).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx-8).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx-8).append('<div class="move"></div>');
			//직선 위아래
			if(thisidx-7 >= 0&&($("#chesswrap li").eq(thisidx-7).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx-7).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx-7).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx-7).append('<div class="move"></div>');
			if(thisidx-9 >= 0&&($("#chesswrap li").eq(thisidx-9).find("img").attr('class')==undefined||($("#chesswrap li").eq(thisidx-9).find("img").attr('class')!=undefined&&$("#chesswrap li").eq(thisidx-9).find("img").attr('class').indexOf(my)==-1)))
				$("#chesswrap li").eq(thisidx-9).append('<div class="move"></div>');
			//위 좌우
			move.castling(my);
		},
		castling: my =>{
			if($("#chesswrap li").eq(thisidx).attr('data-first')==undefined){
				for(var i= thisidx-1; i>= ~~(thisidx/8)*8; i--){
					if(!$("#chesswrap li").eq(i).find("img").hasClass(my+'rook') && $("#chesswrap li").eq(i).find('img').attr('class') != undefined){
						break;
					// }else if($("#chesswrap li").eq(i).find("img").hasClass(my+'rook')){
					}else if($("#chesswrap li").eq(i).find("img").hasClass(my+'rook')){
						if($("#chesswrap li").eq(i).find("img").attr('data-first') == undefined){
							$("#chesswrap li").eq(thisidx-2).append('<div class="castling"></div>');
						}
					}
				}
				for(var i= thisidx+1; i< ~~(thisidx/8)*8+8; i++){
					if(!$("#chesswrap li").eq(i).hasClass(my+'rook')&&$("#chesswrap li").eq(i).find('img').attr('class') != undefined){
						break;
					}else if($("#chesswrap li").eq(i).find("img").hasClass(my+'rook')){
						if($("#chesswrap li").eq(i).find("img").attr('data-first') == undefined){
							$("#chesswrap li").eq(thisidx+2).append('<div class="castling"></div>');
						}
					}
				}
			}
		},
		queen: d =>{
			move.rook(d);
			move.bishop(d);
		}
	};
// })();