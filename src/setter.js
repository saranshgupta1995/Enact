function setValue(attr, val){

    let targetDOMElement = getAllElementsWithAttribute('en-render-on')[0];  //where to render the saved input

    let crazyAttrValue = this;
    console.log("this",crazyAttrValue);
    let objectScope = attr.split('.');
    console.log(objectScope)
    if(val!==undefined)
    for (let objIndex = 0; objIndex < objectScope.length; objIndex++) {
        if (objIndex === objectScope.length - 1) {
            crazyAttrValue[objectScope[objIndex]] = val;  //html to js
            console.log(crazyAttrValue);  //done
        } else {
            crazyAttrValue = crazyAttrValue[objectScope[objIndex]];
            console.log(crazyAttrValue);

        }
    }
    
    let renderFunction = targetDOMElement.getAttribute('en-renderer');  //what and how to render
    console.log("renderfn",renderFunction)

    crazyAttrValue = this;
    objectScope = renderFunction.split('.');
    console.log(objectScope)
    for (let objIndex = 0; objIndex < objectScope.length; objIndex++) {
        if (objIndex === objectScope.length - 1) {
            console.log(crazyAttrValue)
            targetDOMElement.innerHTML =crazyAttrValue[objectScope[objIndex]](); //js to html
            console.log(targetDOMElement)  
        } else {
            crazyAttrValue = crazyAttrValue[objectScope[objIndex]];
        }
    }

    traverse();

}