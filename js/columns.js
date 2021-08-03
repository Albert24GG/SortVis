const canvas = document.getElementById("columns");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#4ae2a5"
let arr = [1,2,2,12,7];
let xoff = [10 , 45, 60 ,0,0,0]
let width = 40;
let margin = 25;

setInterval(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-70;
    let off =  (canvas.width - arr.length * (width+margin))/2;
    let unit = canvas.height / Math.max.apply(null, arr) * 3 / 4 ;
    for (let i = 0; i < arr.length; i++) {
        const h = arr[i];
        ctx.fillRect(off+i*(width + margin)+off[i],(canvas.height * 3 / 4)+20,width,-h*unit);
    }
},1000/60);

function lerp(from, to, time){
    
}

function moveToLeft(from, to){
    
}