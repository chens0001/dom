window.dom = {
  create(node) {
    const container = document.createElement('template');
    container.innerHTML = node.trim();
    return container.content.firstChild;
  },
  after(beforNode, afterNode) {
    beforNode.parentNode.insertBefore(afterNode, beforNode.nextSibling);
  },
  before(beforNode, afterNode) {
    beforNode.parentNode.insertBefore(afterNode, beforNode);
  },
  append(parentNode, node) {
    parentNode.appendChild(node);
  },
  wrap(node, parentNode) {
    dom.before(node, parentNode);
    dom.append(parentNode, node);
  },
  remove(node) {
    node.parentNode.removeChild(node)
    return node;
  },
  empty(node) {
    const array = [];
    let nodeFirstChild = node.firstChild;
    while (nodeFirstChild) {
      array.push(nodeFirstChild);
      nodeFirstChild = nodeFirstChild.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    if(arguments.length === 3) {
      node.setAttribute(name, value);
    } else if(arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string){
    if(arguments.length ===2 ){
      if('innerText' in node){
        node.innerText = string; 
      }else{
        node.textContent = string ;
      }
    }else if(arguments.length === 1){
      if('innerText' in node){
        return node.innerText;
      }else{
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if(arguments.length === 2){
      node.innerHTML = string;
    }else if(arguments.length === 1){
      return node.innerHTML; 
    }
  },
  style(node, name, value) {
    if(arguments.length === 3) {
      node.style[name] = value;
    } else if(arguments.length===2) {
      if(typeof name === 'string'){
        return node.style[name]
      }else if(name instanceof Object){
        const object = name;
        for(let key in object){
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },
  on(node, eventName, Fn){
    node.addEventListener(eventName, Fn);
  },
  off(node, eventName, Fn) {
    node.removeEventListener(eventName, Fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(item => item !== node);
  },
  next(node) {
    let nextSiblingNode = node.nextSibling;
    while(nextSiblingNode && nextSiblingNode.nodeType === 3){
      nextSiblingNode = nextSiblingNode.nextSibling
    }
    return nextSiblingNode;
  },
  previous(node) {
    let previousSiblingNode = node.previousSibling;
    while(previousSiblingNode && previousSiblingNode.nodeType === 3){
      previousSiblingNode = previousSiblingNode.previousSibling;
    }
    return previousSiblingNode;
  },
  each(nodeList, fn){
    for(let i=0;i<nodeList.length;i++){
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for(i=0;i<list.length;i++){
      if(list[i] === node){
        break;
      }
    }
    return i;
  }
}