function setValue(attr, val){

    let targetDOMElement = getAllElementsWithAttribute('en-render-on')[0];

    let crazyAttrValue = this;
    let objectScope = attr.split('.');
    if(val!==undefined)
    for (let objIndex = 0; objIndex < objectScope.length; objIndex++) {
        if (objIndex === objectScope.length - 1) {
            crazyAttrValue[objectScope[objIndex]] = val;
        } else {
            crazyAttrValue = crazyAttrValue[objectScope[objIndex]];
        }
    }
    
    let renderFunction = targetDOMElement.getAttribute('en-renderer');

    crazyAttrValue = this;
    objectScope = renderFunction.split('.');
    for (let objIndex = 0; objIndex < objectScope.length; objIndex++) {
        if (objIndex === objectScope.length - 1) {
            targetDOMElement.innerHTML =crazyAttrValue[objectScope[objIndex]]();
        } else {
            crazyAttrValue = crazyAttrValue[objectScope[objIndex]];
        }
    }

    traverse();

}