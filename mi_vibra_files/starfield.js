//  VISUALS    from  alfonsofonso's algodrone starfield
var stars=[];
var BaseAlt=-40;
var amp=0;
var alt=0;
var radio=0;//hipotenusa del canvas
var margen=100;
var ratio=0.01;/// tamaño circulos
var stage = new createjs.Stage("micanvas");
var canvasContext=document.getElementById("micanvas");
//stage.mouseEnabled=false;
var floarr=new Float32Array(256);
var selectedStarColor="#ffff88";
var unselectedColor="#eeeeee";
var minStarRadius=18;
var minFreq=40;
var inicio=false;


function ponEstrellas(num){
  for (let i = 0; i < num; i++) {
    let equis=amp/2;//(amp/(i+0.1));
    //la altura de la estrella viene definida por su frecuencia almacenada en mainArr ?
    let igriega=alt/2 //
    var c = new createjs.Shape();
    c.x = equis
    c.y = igriega+BaseAlt;
    c.radio=10*i;
    c.color=""+randomGreyHex()+"";
    c.graphics.beginFill(c.color).drawCircle(2, 2, 5);
    stage.addChild(c);
    stars.push(c);
  }
}

function oscEstrellas(){
  for (let i = 0; i < mainArr.length; i++) {
    mainArr[i][3].getFloatTimeDomainData(floarr);
    let radiusito=(sumarr(floarr)/ratio)/mainArr[i][0].frequency.value;// magia
    console.log(ratio,radiusito)
    if (radiusito<0) {
      radiusito=10;
    }
    let c= stars[i].color;
    stars[i].graphics.clear().beginFill(randomGreyHex()).drawCircle(0,0,radiusito);
  }
}

/////////////////////////////////////////////////////////////

function info(){
  console.log("  ***   info() para esta info  ****")
  console.log(" variables decisivas: ")
  console.log(" ctx  mainGain  mainArr  currentOsc  circulos");
  console.log(" intervalo  ombak  canvi  ratio   VIBRA")
  console.log(" funciones decisivas:");
  console.log("  addArmonic() ")
  console.log("  ***   fin info   ****")
}


function tick(event) {
  stage.update();
  oscEstrellas()
  //stars[0].
}

window.onresize = function(event) {
  ajustaCanvas()
}
function ajustaCanvas(){
  amp=canvasContext.width  = window.innerWidth-10;
  alt=canvasContext.height = (window.innerHeight-10);
  radio= Math.round(Math.sqrt(amp*amp+alt*alt)/2);
  if(inicio){
    reajustaEstrellas()
  }
}

function creaCanvas(argument) {
  // body...
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.setFPS=60;
  createjs.Ticker.addEventListener("tick", tick);
  ajustaCanvas();
  console.log("creoCanvas")
}

onload=function(){
 creaCanvas();
  info();
}

function randomGreyHex() {
  var v = (Math.random()*(256)|0).toString(16);//bitwise OR. Gives value in the range 0-255 which is then converted to base 16 (hex).
  return "#" + v + v + v;
}
