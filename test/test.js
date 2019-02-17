var pikachu="pika";

function raichu() {
    render = function () {
        console.log('da')
    }

    return pikachu && "Hi " + pikachu;

}

setPika=function(e){
    setValue('pikachu',e.target.value)
}