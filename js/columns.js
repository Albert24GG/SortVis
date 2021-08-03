const canvas = document.getElementById("columns");
const ctx = canvas.getContext("2d");
let arr = [];
var pos = [];
let width = 40;
let margin = 25;

function build(len){
    
    for(let i=0;i<len;i++){
        pos[i]=i*(width + margin);
        arr[i]=i+1;
    }
}

build(5);

let fps = 60;
let dtime = 1000/fps;
let animdur = 750;
setInterval(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-70;
    let off =  (canvas.width - arr.length * (width+margin))/2;
    let unit = canvas.height / Math.max.apply(null, arr) * 3 / 4 ;
    for (let i = 0; i < arr.length; i++) {
        const h = arr[i];
        ctx.fillStyle = "#4ae2a5";
        ctx.roundRect(off+pos[i],(canvas.height * 3 / 4)+20,width,-h*unit,5);
    }
    ctx.fillStyle = "#4ae2a5";
},dtime);

//lerp(loc : int -> indexul arrayului xoff in care va anima valoarea
//     from: int -> valoarea de inceput
//     to  : int -> valoarea de final
//     time: float -> nu te intereseaza, e pt recursivitate


let lerp = function (loc, from, to, time=0){
    let smooth = (1-Math.cos(time/1000*Math.PI))/2;
    if(time<1000) {
        setTimeout(function() {lerp(loc, from, to, time + dtime/(animdur/1000))},dtime);
    }
    pos[loc] = from*(1-smooth)+to*smooth;
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


  
