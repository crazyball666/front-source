! function () {
  let W, H;
  let pointCount = 80;
  let canvas = document.createElement("canvas"),
    context = canvas.getContext("2d");

  //设置创建的canvas的相关属性
  canvas.id = "BG";
  canvas.style.cssText = "position:fixed;top:0;left:0;z-index:-99";
  document.getElementsByTagName("body")[0].appendChild(canvas);
  getWindowWH();
  window.onresize = getWindowWH;

  function getWindowWH() {
    W = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      H = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }


  //生成随机位置的小方块
  var random = Math.random,
    squares = []; //存放小方块

  //往squares[]数组放小方块
  for (let p = 0; p < pointCount; p++) {
    var square_x = random() * W, //横坐标
      square_y = random() * H, //纵坐标
      square_xa = 2 * random() - 1, //x轴位移 -1,1
      square_ya = 2 * random() - 1; //y轴位移
    squares.push({
      x: square_x,
      y: square_y,
      xa: square_xa,
      ya: square_ya,
      max: 6000
    })
  }

  //生成鼠标小方块
  var mouse = {
    x: null,
    y: null,
    max: 20000
  };
  //获取鼠标所在坐标
  window.onmousemove = function (i) {
    //i为W3C DOM，window.event 为 IE DOM，以实现兼容IE
    //不过目前似乎IE已经支持W3C DOM，我用的是IE11，我注释掉下一句代码也能实现鼠标交互效果，
    //网上说7/8/9是不支持的，本人没有试验，
    //当然加上是没有错的
    i = i || window.event;
    mouse.x = i.clientX;
    mouse.y = i.clientY;
  }
  //鼠标移出窗口后，消除鼠标小方块
  window.onmouseout = function () {
    mouse.x = null;
    mouse.y = null;
  }


  //绘制小方块，小方块移动(碰到边界反向移动)，小方块受鼠标束缚
  var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
    window.setTimeout(i, 1000 / 45)
  };

  function draw() {
    //清除画布
    context.clearRect(0, 0, W, H);
    var w = [mouse].concat(squares); //连接(合并)鼠标小方块数组和其他小方块数组
    var x, A;
    //square属性表：x，y，xa，ya，max
    squares.forEach(function (i) {
      //实现小方块定向移动
      i.x += i.xa;
      i.y += i.ya;
      // 控制小方块移动方向
      // 当小方块达到窗口边界时，反向移动
      i.xa = i.xa * (i.x > W || i.x < 0 ? -1 : 1);
      i.ya = i.ya * (i.y > H || i.y < 0 ? -1 : 1);
      //fillRect前两个参数为矩形左上角的x，y坐标，后两个分别为宽度和高度
      //绘制小方块
      context.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
      //遍历w中所有元素
      for (let n = 0; n < w.length; n++) {
        x = w[n];
        //如果x与i不是同一个对象实例且x的xy坐标存在
        if (i !== x && null !== x.x && null !== x.y) {
          var x_diff = i.x - x.x; //i和x的x坐标差
          var y_diff = i.y - x.y; //i和x的y坐标差
          var distance = x_diff * x_diff + y_diff * y_diff; //斜边平方
          if (distance < x.max) {
            //使i小方块受鼠标小方块束缚，即如果i小方块与鼠标小方块距离过大，i小方块会被鼠标小方块束缚,
            //造成 多个小方块以鼠标为圆心，mouse.max/2为半径绕成一圈
            if (x === mouse && distance > x.max / 2) {
              i.x = i.x - 0.03 * x_diff;
              i.y = i.y - 0.03 * y_diff;
            }
            A = (x.max - distance) / x.max;
            context.beginPath();
            //设置画笔的画线的粗细与两个小方块的距离相关，范围0-0.5，两个小方块距离越远画线越细，达到max时画线消失
            context.lineWidth = A / 2;
            //设置画笔的画线颜色为s.c即画布颜色，透明度为(A+0.2)即两个小方块距离越远画线越淡
            context.strokeStyle = "rgba(0.0.0," + (A + 0.2) + ")";
            //设置画笔的笔触为i小方块
            context.moveTo(i.x, i.y);
            //使画笔的笔触移动到x小方块
            context.lineTo(x.x, x.y);
            //完成画线的绘制，即绘制连接小方块的线 
            context.stroke();
          }
        }
      }
      w.splice(w.indexOf(i), 1);
    });
    animation(draw);
  }

  //此处是等待0.1秒后，执行一次draw()，真正的动画效果是用window.requestAnimationFrame实现的
  setTimeout(function () {
    draw();
  }, 100)

}();