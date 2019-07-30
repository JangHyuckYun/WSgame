var black=1,count=0,savemove,thisidx,turn=0;
	for(i=0; i<32; i++){
		$("#chesswrap li:nth-child("+black+")").css({"background" : "black"});
		black+=2;
		count++;
		if(count%4==0){
			black=black+1;
		}
		if(count%8==0){
			black=black-2;
		}
	}
	//체스판 생성
	$("#chesswrap li").click(function(){
		if(turn == 0){
			if($(this).children("div").attr('class') == "move"){
				if($("#chesswrap li").eq(thisidx).find('img').attr('src') == "images/blackPawn.png"){
					$("#chesswrap li").eq(thisidx).find('img').attr('data-first',1);
				}
				var clone = $("#chesswrap>li").eq(thisidx).find("img").clone();
				$(this).append(clone);
				$("#chesswrap li").eq(thisidx).find("img").remove();
				turn = 1;
			}
			$('.move').remove();
			if($(this).find("img").attr('class') == "blackpawn"){
				thisidx=$(this).index();
				var pawnmove=8;
				savemove=thisidx-pawnmove;
				if($("#chesswrap li").eq(savemove).find("img").attr('src')==undefined){
					$("#chesswrap li").eq(savemove).append('<div class="move"></div>');
				}
				if($(this).find("img").attr('data-first') != 1 && $("#chesswrap li").eq(savemove-8).find("img").attr('src')==undefined){
					$("#chesswrap li").eq(savemove-8).append('<div class="move"></div>');
				}
				var right = String($("#chesswrap li").eq(savemove+1).find("img").attr('src')); //대각선
				var left = String($("#chesswrap li").eq(savemove-1).find("img").attr('src'));
				console.log(parseInt((savemove) / 8)+"  "+ parseInt((savemove+1) / 8)+"  "+savemove);
				if(right.indexOf('black') >= 0 && parseInt((savemove) / 8) == parseInt((savemove+1) / 8)){
					$("#chesswrap li").eq(savemove+1).append('<div class="move"></div>');
				}
				if(left.indexOf('black') >= 0 && parseInt((savemove) / 8) == parseInt((savemove-1) / 8)){
					$("#chesswrap li").eq(savemove-1).append('<div class="move"></div>');
				}
			}
			if(turn == 1){
				$(".text_box").css({"background" : "black"});
				$(".text_box").html('<h1 style="color:white">turn : white</h1>');
				$(".move").remove();
			}
		}else{
			if($(this).children("div").attr('class') == "move"){
				if($("#chesswrap li").eq(thisidx).find('img').attr('src') == "images/whitePawn.png"){
					$("#chesswrap li").eq(thisidx).find('img').attr('data-first',1);
				}
				var clone = $("#chesswrap>li").eq(thisidx).find("img").clone();
				$(this).append(clone);
				$("#chesswrap li").eq(thisidx).find("img").remove();
				turn = 0;
			}
			$('.move').remove();
			if($(this).find("img").attr('class') == "whitepawn"){
				thisidx=$(this).index();
				var pawnmove=8;
				savemove=thisidx+pawnmove;
				if($("#chesswrap li").eq(savemove).find("img").attr('src')==undefined){
					$("#chesswrap li").eq(savemove).append('<div class="move"></div>');
				}
				if($(this).find("img").attr('data-first') != 1 && $("#chesswrap li").eq(savemove+8).find("img").attr('src')==undefined){
					$("#chesswrap li").eq(savemove+8).append('<div class="move"></div>');
				}
				var right = String($("#chesswrap li").eq(savemove+1).find("img").attr('src')); //대각선
				var left = String($("#chesswrap li").eq(savemove-1).find("img").attr('src'));
				if(right.indexOf('black') >= 0 && parseInt((savemove) / 8) == parseInt((savemove+1) / 8)){
					$("#chesswrap li").eq(savemove+1).append('<div class="move"></div>');
				}
				if(left.indexOf('black') >= 0 && parseInt((savemove) / 8) == parseInt((savemove-1) / 8)){
					$("#chesswrap li").eq(savemove-1).append('<div class="move"></div>');
				}
			}
			if(turn == 0){
				$(".text_box").css({"background" : "white"});
				$(".text_box").html('<h1 style="color:black">turn : black</h1>');
				$(".move").remove();
			}
		}
	})