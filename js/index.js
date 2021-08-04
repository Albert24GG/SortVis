const button_right_count = document.getElementById("button-right-count");
const button_left_count = document.getElementById("button-left-count");
const button_right_speed = document.getElementById("button-right-speed");
const button_left_speed  = document.getElementById("button-left-speed");
const alg = document.getElementById("sorting-alg");
const sort_button = document.getElementById("sort_button");
const count = document.getElementById("count");
const speed = document.getElementById("speed");


count.addEventListener("input",(e) => {
    //if(is_started) e.preventDefault();
    if(count.value>999) count.value=999;
    if(count.value<0) count.value=0;
    rebuild();
}); 

speed.addEventListener("input",() => {
    if(speed.value>9999) speed.value=9999;
    if(speed.value<0) speed.value=0;

}); 

button_right_count.addEventListener("click",() => {
    if(is_started) return;
    if(count.value>=999) return;
    count.value++;
    addElem();
}); 

button_left_count.addEventListener("click",() => {
    if(is_started) return;
    if(count.value<=0) return;
    count.value--;
    delElem();
});

button_right_speed.addEventListener("click",() => {
    if(is_started) return;
    if(speed.value> 9999) return; 
    speed.value=parseInt(speed.value)+50;
});

button_left_speed.addEventListener("click",() => {
    if(is_started) return;
    if(speed.value <=0) return; 
    speed.value=parseInt(speed.value)-50;
});