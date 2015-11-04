$(document).ready(function($){

	var apikey = 'f41d10de3c0215d8df8b41a0b82a5f87';
	var weatherUrl = "";
	var searchField = "";

	$('#search-form').submit(function(){
		event.preventDefault();
		searchField = $('#search-field').val();
		
		console.log(searchField);
	

		console.log("The value of searchField is "+searchField);
		weatherUrl = "http://api.openweathermap.org/data/2.5/weather?zip="+searchField+",us,ga&units=imperial&APPID="+apikey;
		console.log("Weatherurl is "+weatherUrl);
	$.getJSON(weatherUrl, function(weatherData){
		console.log(weatherData);
		var currTemp = weatherData.main.temp;

		var canvas = $('#weather-canvas');
		var context = canvas[0].getContext('2d');
		var location = weatherData.name;
		console.log("the location is "+location);
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
		context.arc(155,75,innerRadius,0,2*Math.PI,true);
		context.closePath();
		context.fill();
		context.lineWidth = 10;
		context.strokeStyle = shadeColor;
		context.beginPath();
		context.arc(155, 75, outterRadius, -(quart), ((circ) * current) - quart, false);
		context.stroke();
		context.font = "24px Myriad Pro";
		context.fillStyle = "Blue";
		context.textBaseline = "top";
		context.fillText(location,185,95);
		context.fillText(currTemp,175-outterRadius, 85-outterRadius/2);
		currPerc++;
		if(currPerc < currTemp){
			requestAnimationFrame(function () {
				animate(currPerc / 100);
			});
		}
	

	
	context.closePath();
	}
	});
	})
});
