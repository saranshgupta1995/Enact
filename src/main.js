// 'crazy-' has been used for detecting targeted elements

function getAllElementsWithAttribute(attribute) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

Element.prototype.insertChildAtIndex = function (child, index) {
    if (!index) index = 0
    if (index >= this.children.length) {
        this.appendChild(child)
    } else {
        this.insertBefore(child, this.children[index])
    }
}



setInterval(() => {
    
    getAllElementsWithAttribute('crazy-').forEach((elem, i) => {
        let allAttrs = elem.getAttributeNames();
        allAttrs.forEach(attr => {
            
            // Untested two way binding
            if (attr.startsWith('[') && attr.endsWith(']')) {

                elem.removeAttribute('crazy-');
                elem.setAttribute('crazy-' + i);
                let attrValue = elem.getAttribute(attr.slice(1, attr.length - 1));
                let crazyAttrValue = this;
                attrValue.split('.').forEach(x => {
                    crazyAttrValue = crazyAttrValue[x];
                })
                data[i] = crazyAttrValue;

            } else {

                // js->html one way binding
                if (attr.startsWith('[')) {
                    let crazyAttrValue = this;
                    elem.getAttribute(attr).split('.').forEach(x => {
                        crazyAttrValue = crazyAttrValue[x];
                    })
                    elem[attr.slice(1)] = crazyAttrValue
                }

                // html->js one way binding
                if (attr.endsWith(')')) {
                    let crazyAttrValue = this;
                    let objectScope = elem.getAttribute(attr).split('.');
                    for (let objIndex = 0; objIndex < objectScope.length; objIndex++) {
                        if (objIndex === objectScope.length - 1) {
                            crazyAttrValue[objectScope[objIndex]] = elem[attr.slice(0, attr.length - 1)];
                            // setValue(crazyAttrValue[objectScope[objIndex]], elem[attr.slice(0, attr.length - 1)])
                        } else {
                            crazyAttrValue = crazyAttrValue[objectScope[objIndex]];
                        }
                    }
                }

            }


        })
    })

}, 0)
