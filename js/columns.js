const canvas = document.getElementById("columns");
const ctx = canvas.getContext("2d");
let arr = [];
let pos = [];
let color = [];
let rect_width;
let is_started = false;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-70;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

function build(len){
    for(let i=0;i<len;i++){
        pos[i]=i;
        arr[i]=i+1;
        color[i] = "#4ae2a5";
    }
}

build(20);

let fps = 48;
let dtime = 1000/fps;
let animdur = 500;

setInterval(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-70;

    rect_width = Math.min(canvas.width / ( 2 * arr.length),40);

    let off =  (canvas.width - arr.length * (3*rect_width/2))/2;
    let unit = canvas.height / Math.max.apply(null, arr) * 3 / 4 ;


    for (let i = 0; i < arr.length; i++) {
        const h = arr[i];
        ctx.fillStyle = color[i];
        radius = Math.min(rect_width/2,5);
        ctx.roundRect 
        (
            off+pos[i]*(3*rect_width/2),
            (canvas.height * 3 / 4) + 20 ,
            rect_width,
            -h*unit,
            radius
        );
    }
},dtime);

let swap = function (from, to, time=0){
    let smooth = (1-Math.cos(time/1000*Math.PI))/2;
    console.log("x");
    if(time+(dtime/(animdur/1000))>=1000 || animdur < dtime) {
        console.log(time);
        pos[from]=from;
        pos[to]=to;

        let aux = arr[from];
        arr[from]=arr[to];
        arr[to]=aux;
        return;
    }
    pos[from] = from*(1-smooth)+to*smooth;
    pos[to] = to*(1-smooth)+from*smooth;
    setTimeout(function() {swap(from, to, Math.ceil(time + dtime/(animdur/1000)))},dtime);

}

function randomize(){
    if(is_started) return;
    for(let i=0;i<arr.length;++i){
        let rand = getRandomInt(arr.length);
        let aux = arr[i];
        arr[i] = arr[rand];
        arr[rand] = aux;
    }
}

let rebuild = function () {
    if(is_started) return;
    arr=[];
    pos=[];
    color=[];
    build(count.value);
}

let addElem = function () {
    if(is_started) return;
    arr.push(arr.length+1);
    pos.push(pos.length);
}

let delElem = function () {
    if(is_started) return;
    arr.pop();
    pos.pop();
}

function sort(){
    animdur = 500 / (parseInt(speed.value) / 100);
    changeState(true);
    if(alg.value == 1){
        bubbleSort(arr);
    }
    
}
async function bubbleSort(arr){
    var len = arr.length;
    for (var i = 0; i<len; i++){
      for(var j = 0; j<len-i-1; j++){
        if(!is_started) return;
        if(arr[j]>arr[j+1]){
            color[j] = color[j+1] = "#21c6e8";
            swap(j,j+1);
            await sleep(animdur);
            color[j] = color[j+1] = "#4ae2a5";
            
        }
      }
    }
    changeState(false);
 }

let changeState = function (state=false) {
    is_started = state;
    count.disabled = state;
    speed.disabled = state;
    button_right_count.disabled = state;
    button_left_count.disabled = state;
    button_right_speed.disabled = state;
    button_left_speed.disabled = state;
    alg.disabled = state;
}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius=0) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y - radius);
      ctx.lineTo(x + width , y + height + radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height + radius);
      ctx.lineTo(x, y - radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();   
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }



  
