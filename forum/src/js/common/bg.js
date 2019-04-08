// 主函数
function int(canvasEle, num) {
  class Circle {
    constructor(x, y, r) {
      this.x = x; //圈圈坐标x
      this.y = y; //圈圈坐标y
      this.r = r || 3; //圈圈半径r
      this.mx = Math.random() * 2 - 1; //圈圈移动速度x
      this.my = Math.random() * 2 - 1; //圈圈移动速度y
      this.lineColor = `#eee`;
      this.color = `#eee`;
    }
    //画圈圈方法
    draw() {
      ctx.beginPath(ctx);
      ctx.arc(this.x, this.y, this.r, 0, 360);
      ctx.closePath;
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    //画鼠标圈圈方法
    drawcurrent() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 360);
      ctx.closePath;
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    //圈圈移动方法
    move() {
      this.mx = this.x > 0 && this.x < w ? this.mx : -this.mx;
      this.my = this.y > 0 && this.y < h ? this.my : -this.my;
      this.x += this.mx / 2;
      this.y += this.my / 2;
    }

    //圈圈之间连线的方法,传入其他圈圈对象作为参数。
    line(othercir) {
      var dx = this.x - othercir.x;
      var dy = this.y - othercir.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < 150) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(othercir.x, othercir.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.lineColor;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
  function radom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  function drawcanvas() {
    ctx.clearRect(0, 0, w, h);
    //画所有的圈圈，并执行连线，移动方法。
    for (var j = 0; j < circles.length; j++) {
      circles[j].draw();
      for (var k = 0; k < circles.length; k++) {
        circles[j].line(circles[k]);
      }
      circles[j].move();
    }
    // 画鼠标圈圈，并连线。
    // current_circle.drawcurrent();
    for (var m = 0; m < circles.length; m++) {
      current_circle.line(circles[m]);
    }

    return requestAnimationFrame(drawcanvas);
  }

  var canvas = document.getElementById('bg');
  console.log(canvas);
  var ctx = canvas.getContext('2d');
  var circles = [];
  canvas.width = canvas.offsetWidth * 1;
  canvas.height = canvas.offsetHeight * 1;
  var w = canvas.width;
  var h = canvas.height;
  for (var i = 0; i < num; i++) {
    var cir = new Circle(Math.random() * w, Math.random() * h);
    circles.push(cir);
  }
  let current_circle = new Circle(0, 0, 3);
  canvas.addEventListener('mousemove', function (e) {
    current_circle.x = e.offsetX * 1;
    current_circle.y = e.offsetY * 1;
  })
  return drawcanvas();
}

export default int;
