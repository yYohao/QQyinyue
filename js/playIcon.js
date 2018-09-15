var c =document.getElementById("playCanvas");
var ctx = c.getContext("2d");
//绘制圆形
ctx.beginPath();
ctx.arc(50,50,32,0,2*Math.PI);
ctx.fillStyle = "white";
ctx.fill();
ctx.beginPath();
ctx.moveTo(42,39);
ctx.lineTo(42,63);
ctx.lineTo(64,51);
//ctx.lineTo(46,18);
ctx.fillStyle = "#555";
ctx.fill();