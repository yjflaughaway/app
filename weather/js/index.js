//1获取默认城市的天气信息
//2获取所有城市的信息
//3点击每个城市，获取当前城市的天气信息
//4在搜索框内输入所要搜索的城市，点击搜索按钮可以进行搜索。

	//获取默认天气内容
	let tianqi;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType:"jsonp",
		success:function(obj){
			tianqi=obj.data;
			console.log(tianqi);
			updata(tianqi);
		}
	})
	function updata(tianqi){
		$(".citys").html(tianqi.city);
		
		//当前城市空气状况
		$(".pollution").html(tianqi.weather.quality_level);
		//温度
		$(".txt-temperature").html(tianqi.weather.current_temperature+"°");
		$(".txt-weather").html(tianqi.weather.current_condition);
		$(".show").html(tianqi.weather.wind_direction+"&nbsp;"+tianqi.weather.wind_level+"级");
		$(".temperature:first").html(tianqi.weather.dat_high_temperature+"/"+tianqi.weather.dat_low_temperature+"°");
		$(".temperature:last").html(tianqi.weather.tomorrow_high_temperature+"/"+tianqi.weather.tomorrow_low_temperature+"°");
		$(".weather:first").html(tianqi.weather.current_condition);
		$(".logo:last").attr("src","img/"+tianqi.weather.dat_weather_icon_id+".png");
		$(".logo:first").attr("src","img/"+tianqi.weather.weather_icon_id+".png");
//		$(".logo:first").css({"background":"url(img/"+tianqi.weather.dat_weather_icon_id+".png) no-repeat","background-size":".52rem"});
		$(".weather:last").html(tianqi.weather.tomorrow_condition);
		//每小时的天气
		let hweather=tianqi.weather.hourly_forecast;
		$("#ls-hours-weather").html("");
		hweather.forEach(function(v){
			
			let str=`<li class="item">
						<p class="txt-time">${v.hour}:00</p>
						<img src="img/${v.weather_icon_id}
.png" class="icon">
						<p class="txt-degree positive">${v.temperature}°</p>
					</li>`
//			console.log(str);
			$("#ls-hours-weather").append(str);
		})
		//预测一周天气
		let dayweather=tianqi.weather.forecast_list;
		$("#ls-days").html("");
		dayweather.forEach(function(val){
			let str1=`<li class="item" >
						
						<p class="date">${val.date.substr(5,5)}</p>
						<div class="ct-daytime">
							<p class="weather">${val.condition.split("转")[0]}</p>
							<img src="img/${val.weather_icon_id}.png" class="icon">
						</div>
						<div class="ct-night">
							<img src="img/${val.weather_icon_id}.png" class="icon">
							<p class="weather">${val.condition.includes("转")?val.condition.split("转")[1]:val.condition}</p>
						</div>
						<p class="wind">${val.wind_direction}</p>
						<p class="wind">${val.wind_level}级</p>
					</li>`
			$("#ls-days").append(str1);
		})
	}
	$(".position").click(function(){
		$(".search-page").css({"height":"30rem"});
		$(".page1").css({"display":"none"});
	})
	$("#btn-cancel").click(function(){
		$(".search-page").css({"height":0});
		$(".page1").css({"display":"block"});
	})
	$("#btn-clean").click(function(){
		$("#ct-history").css({"display":"none"});
	})
	let city;
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(obj){
			city=obj.data;
			console.log(city);
			updataCity(city);
		}
	});
	function updataCity(city){
		for (let i in city) {
			for(let j in city[i]){
				let str2=`<li class="opt spot ">${j}</li>`
				$(".ls-city:last").append(str2);
			}
		}
	}
	
	//点击每个城市，获取当前城市的天气信息
	window.onload=function(){
		$(".ls-city:last li").click(function(){
			$(".search-page").css({"height":0});
			$(".page1").css({"display":"block"});
			let con=$(this).html();
			console.log(con);
				ajaxs(con);
				
		});
		//在搜索框输入内容，获取当前城市的天气信息
		$("input").focus(function(){
			$("#btn-cancel").html("搜索");
		})
		$("input").blur(function(){
			$("#btn-cancel").html("取消");
		})
		$("#btn-cancel").click(function(){
			let texts=$("input").val();
			for (let i in city) {
				for (let j in city[i]) {
					if(texts==j){
						ajaxs(texts);	
						return ;
					}
				}
			}
			alert("该城市不存在");
		})	
		
	}
	function ajaxs(tianqi1){
		console.log("我被调用了");
		$.ajax({
			type:"get",
			url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}`,
			dataType:"jsonp",
			success:function(obj){
				tianqi1=obj.data;
				console.log(tianqi1);
				updata(tianqi1);
			}
		})
	}
//	$.ajax({
//		type:"get",
//		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=仁怀",
//		dataType:"jsonp",
//		success:function(obj){
//			let t=obj.data;
//			console.log(t);
////			updata(tianqi1);
//		}
//	})
	
	
		
	
	
	

	