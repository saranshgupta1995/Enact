import { setValue } from "./../src/setter";

var pikachu="pika";
var arr=["chocolate","banana","peanuts","caramel","blueberry","baking soda","milk"];

function raichu() {
    render = function () {
        console.log('da')
    }

    return pikachu && "Hi " + pikachu;
}

var setPika=function(e){
    setValue('pikachu',e.target.value)
}

window.setPika=setPika;

console.log(setValue)