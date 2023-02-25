const txtCss = document.getElementById("txt-css");
const colorsContainer = document.getElementById("colors");
const btnCopyCSS = document.getElementById("copy-css");

txtCss.addEventListener('input', () => {
  updateColors();
});

function updateColors(){
  let matches = findColors(txtCss.value);
  let colors = [];
  if(matches !== undefined){
    matches.forEach((i) => {
      if(!colors.includes(i)){
        colors.push(i);
      }
    });
  }
  console.log(colors);

  while(colorsContainer.lastElementChild.id !== "no-colors"){
    colorsContainer.lastElementChild.remove();
  }
  colors.forEach((color) => {
    let element = getColorElement(color);
    colorsContainer.appendChild(element);
  });
  updateNoColors();
}

function findColors(str) {
  const regex = /#([0-9a-fA-F]{3}){1,2}\b|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d\.]+\s*\)/g;
  const matches = str.match(regex);
  return matches || [];
}

function getColorElement(color){
  let element = document.createElement("div");
  let pickerId = crypto.randomUUID();
  element.classList.add("color");
  element.innerHTML =  `
  <input data-color="${color}" class="color-display" type="color" value="${color}">
  <p class="color-name">${color}</p>
  <button class="button" data-color="${color}">Copy</button>
  `;
  return element;
}

function replaceColor(oldColor, newColor){
  txtCss.value = txtCss.value.replaceAll(oldColor, newColor);
  updateColors();
}

document.addEventListener('click', ({ target }) => {
  if (target.matches('button') && target.getAttribute("data-color") !== undefined) {
    let color = target.getAttribute("data-color");
    navigator.clipboard.writeText(color);
    let value = target.innerText;
    let copiedText = "Copied";
    if(value !== copiedText){
      target.innerText = copiedText;
      setTimeout(() => {
        target.innerText = value;
      }, 1200);
    }
  }
});

document.addEventListener('change', ({ target }) => {
  if (target.matches('input') && target.getAttribute("data-color") !== undefined) {
    let oldColor = target.getAttribute("data-color");
    let newColor = target.value;
    replaceColor(oldColor,newColor);
  }
});

btnCopyCSS.addEventListener('click', () => {
  alert('CSS Copied!');
  navigator.clipboard.writeText(txtCss.value);
});

//no colors
let noColors = true;
const divNoColors = document.getElementById("no-colors");
setInterval(() => {
  updateNoColors();
}, 100);

function updateNoColors(){
  if(colorsContainer.lastElementChild == divNoColors && divNoColors.style.display !== 'flex'){
    divNoColors.style.display = 'flex';
  }
  else if(colorsContainer.lastElementChild !== divNoColors && divNoColors.style.display !== 'none') {
    divNoColors.style.display = 'none';
  }
}
