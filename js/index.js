const button_right_count = document.getElementById("button-right-count");
const button_left_count = document.getElementById("button-left-count");
const button_right_speed = document.getElementById("button-right-speed");
const button_left_speed  = document.getElementById("button-left-speed");

const count = document.getElementById("count");
const speed = document.getElementById("speed");

count.addEventListener("input",() => {
    if(count.value>999) count.value=999;
    if(count.value<0) count.value=0;
}); 

speed.addEventListener("input",() => {
    if(speed.value>999) speed.value=999;
    if(speed.value<0) speed.value=0;

}); 

button_right_count.addEventListener("click",() => {
    if(count.value<999) count.value++;
    test();
}); 

button_left_count.addEventListener("click",() => {
    if(count.value>0) count.value--;
});

button_right_speed.addEventListener("click",() => {
    if(speed.value<999) speed.value++;
});

button_left_speed.addEventListener("click",() => {
    if(speed.value>0) speed.value--;
});