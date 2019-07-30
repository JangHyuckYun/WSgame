window.onload = function(){
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


	function create_mw(cnt){
		cnt = Number(cnt);
		if(cnt == 8)
			var size = 400;
		else if(cnt == 14)
			var size = 800;
		else if(cnt == 20)
			var size = 1000;
		else{
			alert("잘못된 값입니다 다시 시도해 주세요.");
			return false;
		}
		var nav = document.querySelector(".NW");

		var li = document.createElement("li");
		var li2 = document.createElement("li");
		var ul = document.createElement("ul");

		li.appendChild(ul).appendChild(li2);

		document.querySelector(".first_screen").style.display = "none";
		document.querySelector(".NW>ul>li").style.width = `calc(100% / ${cnt} )`;
		document.querySelector(".NW>ul>li>ul>li").style.height = `calc(100% / ${cnt} )`;
		nav.style.width = size+"px";
		nav.style.height = size+"px";
		for(var i = 0; i < cnt-1; i++){
			console.log(i);
			document.querySelector(".NW>ul").append(li);
		}

		nav.style.visibility = "visible";
	}
}