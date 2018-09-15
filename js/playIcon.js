function playIcon() {
    var c =document.getElementById("playCanvas");
    var ctx = c.getContext("2d");
//绘制圆形
    ctx.moveTo(120,48);
    ctx.lineTo(120,108);
    ctx.lineTo(210,78);
//ctx.lineTo(46,18);
    ctx.fillStyle = "#555";
    ctx.fill();
}


