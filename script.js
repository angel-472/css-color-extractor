const txtCss = document.getElementById("txt-css");
const colorsContainer = document.getElementById("colors");

txtCss.addEventListener('input', () => {
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

  colorsContainer.innerHTML = '';
  colors.forEach((color) => {
    let element = getColorElement(color);
    colorsContainer.appendChild(element);
  });
});

function findColors(str) {
  const regex = /#([0-9a-fA-F]{3}){1,2}\b|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d\.]+\s*\)/g;
  const matches = str.match(regex);
  return matches || [];
}

function getColorElement(color){
  let element = document.createElement("div");
  element.classList.add("color");
  element.innerHTML =  `
  <div class="color-display" style="background-color: ${color};"></div>
  <p class="color-name">${color}</p>
  <button class="button color-change">Replace</button>
  `;
  return element;
}
