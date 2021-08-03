const canvas = document.getElementById("columns");
const ctx = canvas.getContext("2d");
let arr = [];
let pos = [];
let rect_width;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-70;

function build(len){
    for(let i=0;i<len;i++){
        pos[i]=i;
        arr[i]=i+1;
    }
}

build(20);

let fps = 48;
let dtime = 1000/fps;
let animdur = 5000;

setInterval(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-70;

    rect_width = Math.min(canvas.width / ( 2 * arr.length),40);

    let off =  (canvas.width - arr.length * (3*rect_width/2))/2;
    let unit = canvas.height / Math.max.apply(null, arr) * 3 / 4 ;

    for (let i = 0; i < arr.length; i++) {
        const h = arr[i];
        ctx.fillStyle = "#4ae2a5";
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
    ctx.fillStyle = "#4ae2a5";
},dtime);


let swap = function (from, to, time=0){
    let smooth = (1-Math.cos(time/1000*Math.PI))/2;
    if(time>1000) {
        pos[from]=from;
        pos[to]=to;

        let aux = arr[from];
        arr[from]=arr[to];
        arr[to]=aux;
        return;
    }
    setTimeout(function() {swap(from, to, time + dtime/(animdur/1000))},dtime);
    pos[from] = from*(1-smooth)+to*smooth;
    pos[to] = to*(1-smooth)+from*smooth;
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



  
