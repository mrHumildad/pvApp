// creando sonido
var ctx=new AudioContext();
var mainGain=ctx.createGain();
var mainArr=[];
var currentOsc=[];
const VIBRA=216;////// FREQUENCIA base
var MaxFreq=5000;
var empezar= false;
var intervalo;//timer setInteval
var ombak=7.83; //starting ombak en Shumman Frequency in Hz 
var canvi=1000;//ms
var prob=1;//para dar probabilidad de existencia de la onda 1 = 100%
var serieArmonicos = [ 2 , 3/2 , 4/3 , 5/4 ]
let barSpeed = 100; //velocidad de llenar barra 100 para test rapido 
function creaOscilador(f){//f=freq 
  var notarr=[];
  // oscilador
  var o = ctx.createOscillator();
  o.frequency.value = f;
  o.name="oscilador";
  o.start(ctx.currentTime);
  notarr.push(o);
  // panorama
  var p=ctx.createStereoPanner();/// por desarrollar o no
  p.name="oscPan";
  notarr.push(p);
  // volumen oscilador
  var g=ctx.createGain();
  g.name="oscGain";
  g.gain.value=0.01;//1/(mainArr.length+1);  ///aqui iba Math.random
  notarr.push(g);
 
  // analyser
  var analyser = ctx.createAnalyser();
  analyser.name="analyser";
  analyser.fftSize=256;
  notarr.push(analyser);
  
  o.connect(g);
  g.connect(p)
  p.connect(mainGain);
  g.connect(analyser);

  currentOsc=notarr;
  return notarr
}

let addOns = ['', ]


var i = 0;
function barAnimation() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 1000);
    function frame() {
      if (width >= 1000) {
        clearInterval(id);
        i = 0;
        width = 1;
        window.document.getElementById('levelUp').style.display="inline";
        const botones = window.document.getElementById('botones')
        botones.style.display="block";

        //elem.style.width = 0;
        return ;
      } else {
        width += barSpeed;
        elem.style.width = width/10 + "%";
      }
    }
  }
}

function start(){    /////                  INICIO      ///////////////////

  window.document.getElementById('startPoint').style.display="none";
  window.document.getElementById('myProgress').style.display="block";
  inicio=true;
  info();
  barAnimation();

  //creaEscala();

  var o=creaOscilador(VIBRA)  /// la vibra
  var oo=creaOscilador(VIBRA + ombak);  ////el batiment
  mainArr.push(o);
  mainArr.push(oo);

  mainGain.connect(ctx.destination) 
  ponEstrellas(mainArr.length);
  balancea()
  console.log(mainArr)
  //temporizador()
 
}

const resetProgress = () => {
  window.document.getElementById('levelUp').style.display="none";
  const botones = window.document.getElementById('botones')
  botones.style.display="none";
  barAnimation()
}

function addArmonic(num){
  console.log('add armonic');
  let n=num||0;
  let ef=serieArmonicos[n];
  var ob=creaOscilador(VIBRA * ef)   ///armónico
  var obo=creaOscilador(VIBRA * ef + ombak)  // el batiment arm
  mainArr.push(ob);
  mainArr.push(obo);

  ponEstrellas(2);
  balancea();
  resetProgress();
}


//////////////////////////////////////////////////////////  helpers
function noteFromPitch( frequency ) {
  var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
  return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
  return 440 * Math.pow(2,(note-69)/12);
}

function sumarr(arr){
  let sum=0;
  for (let i = 0; i < arr.length; i++) {
    sum+=Math.abs(arr[i])
  }
  return sum
}
function balancea(){

  for(var i in mainArr){
    mainArr[i][2].gain.linearRampToValueAtTime(1/mainArr.length, ctx.currentTime+3);
    //ratio=ratio-0.001;
  }
  console.log("balanceo")
}

function temporizador(){
  intervalo=setInterval(oscila,canvi);//canvi en milisegundos
}

function oscila(cuant){
  let pertur=(Math.random()-0.5)*8;
  ombak=ombak+pertur;
  
  for (let i = 0; i<mainArr.length; i++) {
    if(i%2==0){
    }else{
    mainArr[i][0].frequency.linearRampToValueAtTime(
      mainArr[i][0].frequency.value+pertur, ctx.currentTime+1)//// cambia la frecuencia de cada star en -1 a 1hz
    }
  }
  console.log("f", ombak, pertur,mainArr[0][0].frequency.value)
}