const canvas = document.getElementById("columns");
const ctx = canvas.getContext("2d");
let arr = [1,2,2,12,7];
var xoff = [10, 0, 0,0,0,0]
let width = 40;
let margin = 25;

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
        ctx.fillRect(off+i*(width + margin)+xoff[i],(canvas.height * 3 / 4)+20,width,-h*unit);
    }
    
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
    xoff[loc] = from*(1-smooth)+to*smooth;
}