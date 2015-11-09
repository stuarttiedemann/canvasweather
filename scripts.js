$(document).ready(function($){

	var apikey = 'YourKey';
	var weatherUrl = "";
	var searchField = "";
	var fiveDayData = [];
	$('#search-form').submit(function(){
		event.preventDefault();
		searchField = $('#search-field').val();
		
		console.log("The value of searchField is "+searchField);
		weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="+searchField+",us,ga&units=imperial&APPID="+apikey;
		forecastUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+searchField+",us,ga&units=imperial&cnt=5&APPID="+apikey;
		
		$.getJSON(weatherUrl, function(weatherData){
			console.log(weatherData);

			




			var currTemp = weatherData.main.temp;
			var icon = weatherData.weather[0].icon;
			var canvas = $('#weather-canvas');
			var context = canvas[0].getContext('2d');
			var location = weatherData.name;
			var html = "<h2 id='current-weather-location'>"+location+"</h2><img id='current-weather-icon' src='http://openweathermap.org/img/w/"+icon+".png'>";
			console.log("the location is "+location);
			var description = weatherData.weather[0].description;

			var lineWidth = 5;
			var outterRadius = 70;
			var innerRadius = outterRadius - lineWidth;
			var currPerc = 0;
			var counterClockwise = false;
			var circ = Math.PI * 2;
			var quart = Math.PI / 2;
			var shadeColor;
			
			if(currTemp < 32){
				shadeColor = '#D4F0FF';
			}else if((currTemp >= 32) && (currTemp < 59)){
				shadeColor = "#129793";
			}else if((currTemp >= 59) && (currTemp < 75)){
				shadeColor = "#7cfc00";
			}else if((currTemp >= 75) && (currTemp < 90)){
				shadeColor = "#FF6600";
			}else{
				shadeColor = '#E3170D';
			}
			animate();

			function animate(current){
				context.clearRect(0,0,250,500);
				context.restore();
				context.fillStyle = "#ccc";
				context.beginPath();
				context.arc(175,75,innerRadius,0,2*Math.PI,true);
				context.closePath();
				context.fill();
				context.lineWidth = 10;
				context.strokeStyle = shadeColor;
				context.beginPath();
				context.arc(175, 75, outterRadius, -(quart), ((circ) * current) - quart, false);
				context.stroke();
				context.font = "16px Myriad Pro";
				context.fillStyle = "Blue";
				context.textBaseline = "top";
				context.fillText(description,200-outterRadius, 110-outterRadius/2);
				context.fillText(currTemp,230-outterRadius, 85-outterRadius/2);
				currPerc++;
				if(currPerc < currTemp){
					requestAnimationFrame(function () {
						animate(currPerc / 100);
					});
				}
				$('#forecast').html(html);

			
			context.closePath();
			}

			$.getJSON(forecastUrl, function(forecastData){
				var d_names = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				var maxTemp = 0;
				var minTemp = 0;
				var forecastDescription = "";
				var forecastIcon;
				var html2 = "";
				var myNewDate = "";
			
				for(i=0;i<5;i++){
					maxTemp = forecastData.list[i].temp.max;
					minTemp = forecastData.list[i].temp.min;
					forecastDescription = forecastData.list[i].weather[0].description;
					forecastIcon = forecastData.list[i].weather[0].icon;
					var myDate = new Date();
					myDate.setDate(myDate.getDate()+i);
					myNewDate = myDate.toString();
					
					var x = myNewDate.slice(0,10);
					console.log(x);
					// var curr_date = myDate.getDate();
					// var curr_month = myDate.getMonth();
					// var curr_day  = myDate.getDay();
		
					html2 = "<div class='each-day-forecast'><p>"+x+"</p><img src='http://openweathermap.org/img/w/"+forecastIcon+".png'><p>High: "+maxTemp+"</p><p>Low: "+minTemp+"</p><p>"+forecastDescription+"</p></div>";

					$('#five-day-forecast').append(html2);

				}
	
			});





		});
		
	})
});
