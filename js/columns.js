//---------   SETUP   ---------\\

const canvas = document.getElementById("columns");
const ctx = canvas.getContext("2d");

let arr = [];
let pos = [];
let color = [];

let is_started = false;

let base_colors = ["#4ae2a5","#21c6e8","#a6aca2"];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-70;

let build = function() {
    if(is_started) return;
    arr=[];
    pos=[];
    color=[];
    for(let i=0;i<count.value;i++){
        pos[i]=i;
        arr[i]=i+1;
        color[i] = base_colors[0];
    }
}

build();
let animdur = 500;
let height;

//---------   RENDER LOOP ---------\\

setInterval(() => {
    canvas.width = window.innerWidth;
    if(window.innerWidth<1420) {
        canvas.height = window.innerHeight-140;
    } else {
        canvas.height = window.innerHeight-70
    }
    

    let rect_width = Math.min(canvas.width / ( 2 * arr.length),40);

    let off =  (canvas.width - arr.length * (3*rect_width/2))/2;
    let unit;
    is_started ? unit = canvas.height / height * 3 / 4 : unit = canvas.height / Math.max.apply(null, arr) * 3 / 4 

    for (let i = 0; i < arr.length; i++) {
        ctx.fillStyle = color[i];
        ctx.roundRect 
        (
            off+pos[i]*(3*rect_width/2),
            (canvas.height * 3 / 4) + 20 ,
            rect_width,
            -arr[i]*unit,
            Math.min(rect_width/2,5)
        );
    }
    ctx.font = '18px Poppins';
    ctx.fillStyle = base_colors[0];
    ctx.fillText("\u00a92021 All Rights Reserved.",canvas.width-285,canvas.height-40);
    ctx.fillText("by Albert & Traian",canvas.width-250,canvas.height-20);
    
},dtime);

//---------   SWAP FUNCTION   ---------\\

let swap = async function (from, to, time=0) {
    color[from] = color[to] = base_colors[1];
    let smooth = (1-Math.cos(time/1000*Math.PI))/2;
    if(time+(dtime/(animdur/1000))>=1000 || animdur < dtime) {
        pos[from]=from;
        pos[to]=to;

        let aux = arr[from];
        arr[from]=arr[to];
        arr[to]=aux;
        color[from] = color[to] = base_colors[0];
        await sleep(1);
        return;
    }
    pos[from] = from*(1-smooth)+to*smooth;
    pos[to] = to*(1-smooth)+from*smooth;
    await sleep(dtime);
    await swap(from, to, Math.ceil(time + dtime/(animdur/1000)));

}

//---------   BUTTON FUNCTIONS   ---------\\

function randomize(notButton=false) {
    if(is_started && !notButton) return;
    for(let i=0;i<arr.length;++i){
        let rand = Math.floor(Math.random() * arr.length);
        let aux = arr[i];
        arr[i] = arr[rand];
        arr[rand] = aux;
    }
}

let addElem = function () {
    if(is_started) return;
    arr.push(arr.length+1);
    pos.push(pos.length);
    color.push(base_colors[0]);
}

let delElem = function () {
    if(is_started) return;
    arr.splice(arr.indexOf(Math.max.apply(null, arr),0),1);
    pos.pop();
    color.pop();
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
    
    for(i=0;i<btns.length;++i){
        let val = state ? 2 : 0;
        fields[i].style.backgroundColor = base_colors[val];
        if(btns[i].id=="stop") continue;
        btns[i].disabled=state;
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

async function sort() {
    height = Math.max.apply(null, arr);
    animdur = 500 / (parseInt(speed.value) / 100);
    if(alg.value=="radix" || alg.value=="count") {
        build();
        randomize();
    }
    changeState(true);
    switch (alg.value) {
        case "bubble":
            await bubbleSort(arr);
            changeState(false);
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
            await mergeSort(0,arr.length-1);
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
            await radixSort();
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

async function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i<len; i++) {
        for(var j = 0; j<len-i-1; j++) {
            if(!is_started) return;
            if(arr[j]>arr[j+1]) { 
                await swap(j,j+1);
            }
        }
    } 
}
  
//---------   QUICK SORT   ---------\\

async function partitionare(st,dr) {
    let piv = arr[dr];
    let i = st-1,j=dr;
    while(i<j) {
        if(!is_started) return;
        while(i<j-1 && arr[i+1]<piv) ++i;
        while(i<j-1 && arr[j-1]>=piv) --j;
        if(i>=j-1) break;
        await swap(i+1,j-1);
    }
    await swap(dr,i+1);
    return j;
}

async function quicksort(st, dr) {
    if(st>=dr) return;
    if(!is_started) return;

    let p = await partitionare(st,dr);
    await quicksort(st,p-1);
    await quicksort(p+1,dr);
}

//---------   MERGE SORT   ---------\\

async function interclasare(st, dr) {
    let mij = Math.floor((st+dr)/2);
    let i=st,j=mij+1,cnt=st;
    var aux = [];
    while(i<=mij && j<=dr) {
        if(arr[i]<=arr[j]) {
            aux[cnt++] = arr[i++];
        }
        else {
            aux[cnt++] = arr[j++];
        }
    }
    while(i<=mij) {
        aux[cnt++] = arr[i++];
    }
    while(j<=dr) {
        aux[cnt++] = arr[j++];
    }
    for(let k = st;k<=dr;++k) {
        if(!is_started) return;
        arr[k]=aux[k];
        color[k] =  base_colors[1];
        await sleep(animdur);
        color[k] = base_colors[0];
    }
}

async function mergeSort(st, dr) {
    if(st==dr)  return;

    let mij = Math.floor((st+dr)/2);
    if(!is_started) return;

    await mergeSort(st,mij);
    await mergeSort(mij+1,dr);
    await interclasare(st,dr);
}

//---------   INSERTION SORT   ---------\\
  
async function insertionSort(n) { 
    let i, key, j; 
    for (i = 1; i < n; i++) { 
        
        key = arr[i]; 
        color[i] =  base_colors[1];
        j = i - 1; 

        while (j >= 0 && arr[j] > key) { 
            arr[j + 1] = arr[j]; 
            j --; 
        } 
        arr[j + 1] = key;
        
        color[j+1] =  base_colors[1];
        await sleep(animdur);
        color[j+1] = base_colors[0];
        color[i] = base_colors[0];
        if(!is_started) return;
    } 
} 

//---------   HEAP SORT   ---------\\

async function heapSort() {
    var n = arr.length;
 
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(arr, n, i);
 
    for (var i = n - 1; i > 0; i--) {
        if(!is_started) return;
        await swap(0,i);
        await heapify(arr, i, 0);
    }
}
 
async function heapify(arr, n, i) {
    var largest = i; 
    var l = 2 * i + 1; 
    var r = 2 * i + 2; 

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        
        if(!is_started) return;
        await swap(i,largest);
        await heapify(arr, n, largest);
    }
}

//---------   SELECTION SORT   ---------\\

async function selectionSort(n) {
    var i, j, min_idx;
 
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
            if(!is_started) return;
 
        await swap(min_idx, i);
    }
}

//---------   COUNTING SORT   ---------\\

async function countingSort() {
    var n = arr.length;
    var lim = n;
    var output = Array.from({length: n}, (_, i) => 0);
 
    var count = Array.from({length: 256}, (_, i) => 0);
    var output = [];
    var count = [];
 
    for(var i=0;i<=lim;++i)
        count[i]=0;

    for (var i = 0; i < n; ++i)
        ++count[arr[i]];

    for (var i = 1; i <= lim; ++i)
        count[i] += count[i - 1];
 
    for (var i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        --count[arr[i]];
    }
 
    for (var i = 0; i < n; ++i) {
        color[i] =  base_colors[1];
        arr[i] = output[i];
        await sleep(animdur);
        color[i] = base_colors[0];
        if(!is_started) return;
    }

}

//---------   RADIX SORT   ---------\\

async function countSort(n,exp) {
    let output = new Array(n);
    let i;
    let count = new Array(10);

    for(let i=0;i<10;i++)
        count[i]=0;
  
    for (i = 0; i < n; i++)
        count[Math.floor(arr[i] / exp) % 10]++;
  
    for (i = 1; i < 10; i++)
        count[i] += count[i - 1];
  
    for (i = n - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        count[Math.floor(arr[i] / exp) % 10]--;
    }
  
    for (i = 0; i < n; i++){
        color[i] =  base_colors[1];
        arr[i] = output[i];
        await sleep(animdur);
        color[i] = base_colors[0];
        if(!is_started) return;
    }
}
 
async function radixSort() {
    let m = Math.max.apply(null, arr);
    for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
        await countSort(arr.length, exp);
}

//---------   SHELL SORT   ---------\\

async function shellSort() {
    let n = arr.length;
  
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = arr[i];

            let j;

            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                color[j] =  base_colors[1];
                color[j-gap] =  base_colors[1];
                await sleep(animdur);
                arr[j] = arr[j - gap];
                color[j] = base_colors[0];
                color[j-gap] = base_colors[0];
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

let bogoSort = async function() {
    while ( !isSorted(arr.length) ){
        randomize(true);
        await sleep(animdur);
        if(!is_started) return;
    }

}