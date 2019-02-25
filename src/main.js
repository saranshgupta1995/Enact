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



// setInterval(() => {
traverse = () => {
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

            } else if (attr.startsWith('[') || attr.endsWith(')')){

                // js->html one way binding
                console.log(attr);

                if (attr.startsWith('[')) {
                    let crazyAttrValue = this;
                    console.log("1",crazyAttrValue);
                    elem.getAttribute(attr).split('.').forEach(x => {  
                        crazyAttrValue = crazyAttrValue[x];  //binding to pikachu variable
                        console.log(2,crazyAttrValue);

                    })
                    console.log(elem);
                    console.log(attr.slice(1));

                    elem[attr.slice(1)] = crazyAttrValue //why this, why not value
                }

                // html->js one way binding
                if (attr.endsWith(')')) {
                    let crazyAttrValue = this;
                    let objectScope = elem.getAttribute(attr).split('.');
                    for (let objIndex = 0; objIndex < objectScope.length; objIndex++) {
                        if (objIndex === objectScope.length - 1) {
                            crazyAttrValue[objectScope[objIndex]] = elem[attr.slice(0, attr.length - 1)];
                            console.log(3,crazyAttrValue);

                            // setValue(crazyAttrValue[objectScope[objIndex]], elem[attr.slice(0, attr.length - 1)])
                        } else {
                            crazyAttrValue = crazyAttrValue[objectScope[objIndex]];
                    console.log(4,crazyAttrValue);

                        }
                    }
                }

            }


        })
    })
}
// }, 0)

traverseOnLoad = () => {
    getAllElementsWithAttribute('crazy-').forEach((elem, i) => {
        let allAttrs = elem.getAttributeNames();
        allAttrs.forEach(attr => {
        if (attr=='for'){
                //html for directive
                let crazyAttrValue = this;
                let iterator,opertor, iterable;
                iterator=elem.getAttribute(attr).split(' ')[0];
                operator=elem.getAttribute(attr).split(' ')[1];
                iterable=elem.getAttribute(attr).split(' ')[2];
                // console.log(iterable);
                iterable.split('.').forEach(x => {  
                    crazyAttrValue = crazyAttrValue[x];  //binding to pikachu variable
                })
                iterable=crazyAttrValue;
                console.log("iterable",iterable);
                let innerContent;
                innerContent=elem.innerHTML;
                console.log("For innerHTML=",innerContent);
                parent=elem.parentNode;
                parent.removeChild(elem);
                elem.removeAttribute('crazy-');
                elem.removeAttribute('for'); 
                for (let idx in iterable) {
                    let cln = elem.cloneNode(true);
                    cln.innerHTML=cln.innerHTML.trim();
                    startIdx=cln.innerHTML.indexOf('{');
                    endIdx=cln.innerHTML.indexOf('}');
                    if (startIdx>=0 && endIdx>=0 && startIdx<endIdx) {
                        if (cln.innerHTML.substring(startIdx+1, endIdx)==iterator) {
                            let a=Array.from(cln.innerHTML)
                            a.splice(startIdx,endIdx-startIdx+1,iterable[idx]);
                            cln.innerHTML=a.join('');
                        }
                        
                    }
                    parent.appendChild(cln);
                    console.log("idx",idx, cln);
                }
               
            }


        })
    })
}


document.addEventListener("DOMContentLoaded", traverseOnLoad);
