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
    color[from] = color[to] = "#21c6e8";
    let smooth = (1-Math.cos(time/1000*Math.PI))/2;
    if(time+(dtime/(animdur/1000))>=1000 || animdur < dtime) {
        pos[from]=from;
        pos[to]=to;

        let aux = arr[from];
        arr[from]=arr[to];
        arr[to]=aux;
        color[from] = color[to] = "#4ae2a5";
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
    arr.splice(arr.indexOf(Math.max.apply(null, arr),0),1);
    pos.pop();
}

async function sort(){
    animdur = 500 / (parseInt(speed.value) / 100);
    changeState(true);
    switch (alg.value ){
        case "1":
            bubbleSort(arr);
            break;
        case "2":
            await merge_sort(0,arr.length-1);
            changeState(false);
            break;
        case "3":
            await quicksort(0,arr.length-1);
            changeState(false);
            break;
    }
    
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

    let btns = document.getElementsByClassName("base-button");
    let fields = document.getElementsByClassName("base-bg");
    
    fields_colors = ["#4ae2a5","#a6aca2"];
    
    for(i=0;i<btns.length;++i){
        let val = state ? 1 : 0;
        fields[i].style.backgroundColor = fields_colors[val];
        if(btns[i].id=="stop") continue;
        btns[i].disabled=state
    }
    
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

async function bubbleSort(arr){
    var len = arr.length;
    for (var i = 0; i<len; i++){
      for(var j = 0; j<len-i-1; j++){
        if(!is_started) return;
        if(arr[j]>arr[j+1]){ 
            swap(j,j+1);
            await sleep(animdur);
        }
      }
    }
    changeState(false);
}
  

async function partitionare(st,dr)
{
    let piv = arr[dr];
    let i = st-1,j=dr;
    while(i<j)
    {
        if(!is_started) return;
        while(i<j-1 && arr[i+1]<piv)
            ++i;
        while(i<j-1 && arr[j-1]>=piv)
            --j;
        if(i>=j-1)
            break;
        swap(i+1,j-1);
        await sleep(animdur);
    }
    swap(dr,i+1);
    await sleep(animdur);
    return j;
}

async function quicksort(st, dr)
{
    if(st>=dr)
    {
        return;
    }
    if(!is_started) return;
    let p = await partitionare(st,dr);//.then(console.log("hi"));
    await quicksort(st,p-1);
    await quicksort(p+1,dr);
}

async function interclasare(st, dr)
{
    let mij = Math.floor((st+dr)/2);
    let i=st,j=mij+1,cnt=st;
    var aux = [];
    while(i<=mij && j<=dr)
    {
        if(!is_started) return;
        if(arr[i]<=arr[j])
        {
            aux[cnt++] = arr[i++];
        }
        else{
            aux[cnt++] = arr[j++];
        }
    }
    while(i<=mij)
    {
        if(!is_started) return;
        aux[cnt++] = arr[i++];
    }
    while(j<=dr)
    {
        if(!is_started) return;
        aux[cnt++] = arr[j++];
    }
    for(let k = st;k<=dr;++k)
    {
        if(!is_started) return;
        arr[k]=aux[k];
        color[k] =  "#21c6e8";
        await sleep(animdur);
        color[k] = "#4ae2a5";
    }
}

async function merge_sort(st, dr)
{
    if(st==dr)
    {    
        return;
    }
    let mij = Math.floor((st+dr)/2);
    if(!is_started) return;
    await merge_sort(st,mij);
    await merge_sort(mij+1,dr);
    await interclasare(st,dr);
    //arr.forEach(function(item, index, array) {
    //    console.log(parseInt(item), index)
    //  })
}
  
