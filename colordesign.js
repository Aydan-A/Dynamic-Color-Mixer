let colorboxs = document.querySelector(".color-palettes");
let container = document.querySelector(".color-container");
let inputColors = document.querySelectorAll(".color");
let colorCodes = document.querySelectorAll(".colorCode");
let finalColor = document.querySelector(".final-color");
let addBtn = document.querySelector(".add-more-palette");
let submitBtn = document.querySelector(".submit");
let finalcolorCode = document.querySelector(".finalcolorCode");


function mixColors(colors) {
  let r = 0,
    g = 0,
    b = 0;

  colors.forEach((color) => {
    let rgb = hexToRgb(color);
    r += rgb.r;
    g += rgb.g;
    b += rgb.b;
  });

  let colorCount = colors.length;

  let mixedColor = {
    r: Math.floor(r / colorCount),
    g: Math.floor(g / colorCount),
    b: Math.floor(b / colorCount),
  };

  return `rgb(${mixedColor.r},${mixedColor.g},${mixedColor.b})`;
}

function adaptchanges(colorInput, hexInput) {
  colorInput.addEventListener("input", () => {
    hexInput.value = colorInput.value;
  });

  hexInput.addEventListener("change", () => {
    colorInput.value = hexInput.value;
  });
}

inputColors.forEach((input, index) => {
  input.addEventListener("input", () => {
    let color = input.value;
    let colorCodeInput = colorCodes[index];
    colorCodeInput.value = color;

    colorCodeInput.addEventListener("change", () => {
      input.value = colorCodeInput.value;
    });

    adaptchanges(colorCodeInput, input);
  });
});

function hexToRgb(hex) {
  let hexwithoutSymbol = hex.replace("#", "");
  let r = parseInt(hexwithoutSymbol.substring(0, 2), 16);
  let g = parseInt(hexwithoutSymbol.substring(2, 4), 16);
  let b = parseInt(hexwithoutSymbol.substring(4, 6), 16);

  return { r, g, b };
}


addBtn.addEventListener("click", () => {
  
  let maindiv = document.createElement("div");
  maindiv.setAttribute("class", "palette");

  let currentColorCount = document.querySelectorAll(".palette").length;

  let label = document.createElement("label");
  label.innerHTML=`Color ${currentColorCount}`
//   console.log(number)
  label.setAttribute("class","numberofColor")

  let input = document.createElement("input");
  input.setAttribute("type", "color");
  input.setAttribute("placeholder", "+Select the color");
  input.setAttribute("class", "color");

  let text = document.createElement("input");
  text.setAttribute("type", "text");
  text.setAttribute("placeholder", "Enter the Hex Code");
  text.setAttribute("class", "colorCode");

  let span = document.createElement("span");
  span.innerHTML = "Delete";
  span.setAttribute("class", "delete");


  maindiv.appendChild(label);
  maindiv.appendChild(input);
  maindiv.appendChild(text);
  maindiv.appendChild(span);

  colorboxs.appendChild(maindiv);

  adaptchanges(input, text);
});

submitBtn.addEventListener("click", () => {
  let Allcolors = document.querySelectorAll(".colorCode");

  let colorsArray = Array.from(Allcolors).map((code) => code.value);
  let mixedColor = mixColors(colorsArray);
  finalColor.style.backgroundColor = mixedColor;
  finalcolorCode.value = mixedColor;
});


colorboxs.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      let parent = e.target.parentElement;
      parent.remove();
      numberingOfColors();
    }
  });

function numberingOfColors() {
    let numberLabels = document.querySelectorAll(".numberofColor");
    numberLabels.forEach((label,index)=>{
        label.innerHTML=`Color ${index+1}`;
    })
}
