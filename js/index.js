var fps = 48;
var dtime = 1000/fps;

let phoneMode = false;

const button_right_count = document.getElementById("button-right-count");
const button_left_count = document.getElementById("button-left-count");
const button_right_speed = document.getElementById("button-right-speed");
const button_left_speed  = document.getElementById("button-left-speed");
const alg_label = document.getElementById("alg-label");

const alg = document.getElementById("sorting-alg");
const count = document.getElementById("count");
const speed = document.getElementById("speed");


count.addEventListener("input",() => {
    if(count.value>999) count.value=999;
    if(count.value<0) count.value=0;
    build();
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

setInterval(() => {
    const topParent = document.getElementById('top-list');
    const botParent = document.getElementById('bottom-list');
    if(window.innerWidth>=1420) {

        if(!phoneMode) return;
        phoneMode = false;
        if(botParent.children){
            for(let i=0;i<3;i++) {
                topParent.appendChild(botParent.children[0]);
            }
        }
        toggleVision("block");
        return;
    };

    if(phoneMode) return;

    phoneMode = true;
    for(i=0;i<3;i++) {
        botParent.appendChild(topParent.children[3]);
    }
    toggleVision("none");

},dtime);

let toggleVision = state => {
    button_left_count.style.display = state;
    button_right_count.style.display = state;
    button_left_speed.style.display = state;
    button_right_speed.style.display = state;
    alg_label.style.display = state;
}