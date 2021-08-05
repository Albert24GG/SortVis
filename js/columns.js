//---------   SETUP   ---------\\

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

//---------   RENDER LOOP ---------\\

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

//---------   SWAP FUNCTION   ---------\\

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

//---------   BUTTON FUNCTIONS   ---------\\

function randomize(notButton=false){
    if(is_started && !notButton) return;
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

//---------   UTILITY FUNCTIONS   ---------\\

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

  //---------   SORTS   ---------\\

  async function sort(){
    animdur = 500 / (parseInt(speed.value) / 100);
    changeState(true);
    switch (alg.value ){
        case "bubble":
            bubbleSort(arr);
            break;
        case "selec":
            await selectionSort(arr.length);
            changeState(false);
            break;
        case "inser":
            await insertionSort(arr.length);
            changeState(false);
            break;
        case "merge":
            await merge_sort(0,arr.length-1);
            changeState(false);
            break;
        case "heap":
            await heapSort();
            changeState(false);
            break;
        case "quick":
            await quicksort(0,arr.length-1);
            changeState(false);
            break;
        case "count":
            await countingSort();
            changeState(false);
            break;
        case "radix":
            await radixSort(arr.length);
            changeState(false);
            break;
        case "shell":
            await shellSort();
            changeState(false);
            break;
        case "bogo":
            await bogoSort();
            changeState(false);
            break;
        
    }
    
}

//---------   BUBBLE SORT   ---------\\

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
  
//---------   QUICK SORT   ---------\\

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
    let p = await partitionare(st,dr);
    await quicksort(st,p-1);
    await quicksort(p+1,dr);
}

//---------   MERGE SORT   ---------\\

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
}

//---------   INSERTION SORT   ---------\\
  
async function insertionSort(n) 
{ 
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        if(!is_started) return;
        key = arr[i]; 
        color[i] =  "#21c6e8";
        j = i - 1; 

        while (j >= 0 && arr[j] > key)
        { 
            if(!is_started) return;
            arr[j + 1] = arr[j]; 
            j --; 
        } 
        arr[j + 1] = key; 
        color[j+1] =  "#21c6e8";
        await sleep(animdur);
        color[j+1] = "#4ae2a5";
        color[i] = "#4ae2a5";
    } 
} 

//---------   HEAP SORT   ---------\\

async function heapSort()
    {
        var n = arr.length;
 
        for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
            await heapify(arr, n, i);
 
        for (var i = n - 1; i > 0; i--) {
            if(!is_started) return;
            swap(0,i);
            await sleep(animdur);
            await heapify(arr, i, 0);
        }
    }
 
    async function heapify(arr, n, i)
    {
        var largest = i; 
        var l = 2 * i + 1; 
        var r = 2 * i + 2; 
 
        if (l < n && arr[l] > arr[largest])
            largest = l;
 
        if (r < n && arr[r] > arr[largest])
            largest = r;
 
        if (largest != i) {
            
            if(!is_started) return;
            swap(i,largest);
            await sleep(animdur);
            await heapify(arr, n, largest);
        }
    }

//---------   SELECTION SORT   ---------\\

async function selectionSort(n)
{
    var i, j, min_idx;
 
    for (i = 0; i < n - 1; i++)
    {
        min_idx = i;
        for (j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
            if(!is_started) return;
 
        swap(min_idx, i);
        await sleep(animdur);
    }
}

//---------   COUNTING SORT   ---------\\

async function countingSort()
{
    var n = arr.length;
    var lim = n;
    var output = Array.from({length: n}, (_, i) => 0);
 
    var count = Array.from({length: 256}, (_, i) => 0);
    var output = [];
    var count = [];
 
    for(var i=0;i<=lim;++i){
        count[i]=0;
    }
    for (var i = 0; i < n; ++i)
        ++count[arr[i]];
        if(!is_started) return;

    
    for (var i = 1; i <= lim; ++i)
        count[i] += count[i - 1];
        if(!is_started) return;
 
    for (var i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        --count[arr[i]];
        if(!is_started) return;
    }
 
    for (var i = 0; i < n; ++i) {
        color[i] =  "#21c6e8";
        arr[i] = output[i];
        await sleep(animdur);
        color[i] = "#4ae2a5";
        if(!is_started) return;
    }

}

//---------   RADIX SORT   ---------\\

function getMax(n)
{
    let mx = arr[0];
        for (let i = 1; i < n; i++)
            if (arr[i] > mx)
                mx = arr[i];
            if(!is_started) return;
        return mx;
}
 

async function countSort(n,exp)
{
    let output = new Array(n);
    let i;
    let count = new Array(10);
    for(let i=0;i<10;i++)
        count[i]=0;
  
    for (i = 0; i < n; i++){
        count[Math.floor(arr[i] / exp) % 10]++;
        if(!is_started) return;
    }
  
    for (i = 1; i < 10; i++){
        count[i] += count[i - 1];
        if(!is_started) return;
    }
  
    for (i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
        if(!is_started) return;
    }
  
    for (i = 0; i < n; i++){
        color[i] =  "#21c6e8";
        arr[i] = output[i];
        await sleep(animdur);
        color[i] = "#4ae2a5";
        if(!is_started) return;
    }
}
 
async function radixSort(n)
{
        let m = await getMax(n);
        for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
            await countSort(n, exp);
}

//---------   SHELL SORT   ---------\\

async function shellSort()
{
    let n = arr.length;
  
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
        {
            if(!is_started) return;
            for (let i = gap; i < n; i += 1)
            {
                if(!is_started) return;
                let temp = arr[i];
  
                let j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                {
                    color[j] =  "#21c6e8";
                    color[j-gap] =  "#21c6e8";
                    await sleep(animdur);
                    arr[j] = arr[j - gap];
                    color[j] = "#4ae2a5";
                    color[j-gap] = "#4ae2a5";
                    if(!is_started) return;
                }
  
                arr[j] = temp;
            }
        }
}

//---------   BOGO SORT   ---------\\

let isSorted = function(n) {
    let len = n;
    while ( --len>= 1 ) {
        
        if (arr[len] < arr[len-1]) {
            return false;
        }
    }
    return true;
}
 

let bogoSort = async function()
{
    while ( !isSorted(arr.length) ){
        await randomize(true);
        await sleep(animdur);
        if(!is_started) return;
    }

}