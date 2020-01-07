/******************************************************************
 *Functions:
 *   DisplaySorting: Main function used to display the sortting algorthim by using the actions arry to animate what is happening in the arry
 *   animate: draws the arry using the given steps in the action arry
 *   boundY: rebinds the Y to the bottom left of the screen from the top left of the screen to help with drawing.
 *
 ******************************************************************/

//global var to see if something is already running
var runInterval;

function displaySorting(actionArr, unsortedArr, interval) {
  //select canvus in document
  let canvas = document.querySelector("canvas");
  //set height and width of canvus if not set
  canvas.width = 800;
  canvas.height = 600;

  //set Colors
  const DEFALT_COLOR = "#fff"; //white
  const SWAP_COLOR = "#FF0000"; //red
  const COMPARE_COLOR = "#008000"; //green
  let colors = [];

  //set contex
  var c = canvas.getContext("2d");

  c.width = Window.innerWidth;

  //translate the y to the bottom left and inverts the y values
  c.translate(0, canvas.height);
  c.scale(1, -1);

  //copying the arrys
  let actions = actionArr.slice(0); //coppy arry
  let arr = unsortedArr.slice(0); // copy arry
  let width = 2;
  let size = arr.length;
  let spacing = canvas.width / (width * size + size + 1);
  let barWidth = spacing * width;
  //let runInterval;

  //find the min in the function
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < size; i++) {
    min = arr[i] < min ? arr[i] : min;
    max = arr[i] > max ? arr[i] : max;
  }

  //Utility function to bound Y to be 0 and canvas height
  function boundY(y) {
    let a = canvas.height / (min - max);
    let b = canvas.height / (max - min);
    return a * y + b;
  }

  function buildColorsArry(actionArr, arr) {
    let action = "default";
    let left = 0;
    let right = 0;
    if (actionArr.length !== 0) {
      action = actionArr[0];
      left = actionArr[1];
      right = actionArr[2];
    }
    let colorsArr = [];
    for (let i = 0; i < arr.length; i++) {
      colorsArr[i] = DEFALT_COLOR;
    }
    if (action === "compare") {
      colorsArr[left] = COMPARE_COLOR;
      colorsArr[right] = COMPARE_COLOR;
    } else if (action === "swaped") {
      colorsArr[left] = SWAP_COLOR;
      colorsArr[right] = SWAP_COLOR;
    }

    return colorsArr;
  }

  //draw arry function
  function drawArry(arr, colors, spacing, barWidth) {
    //clear display
    c.clearRect(0, 0, 800, 600);
    let x = spacing;
    //console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      let y = boundY(arr[i]);
      c.fillStyle = colors[i];
      c.fillRect(x, -y, barWidth, y);
      x = x + spacing + barWidth;
    }
  }

  //swap function
  function swap(arr, i, j) {
    let tempArr = arr.slice(0);
    let temp = 0;
    temp = tempArr[i];
    tempArr[i] = tempArr[j];
    tempArr[j] = temp;
    return tempArr;
  }

  function animate(actionArr, arr, interval, colors) {
    if (runInterval) {
      clearInterval(runInterval);
    }
    clearInterval(runInterval);
    runInterval = setInterval(function() {
      if (actionArr.length === 0) {
        colors = buildColorsArry(actionArr, arr, spacing, barWidth);
        drawArry(arr, colors, spacing, barWidth);
        clearInterval(runInterval);
      } else {
        let action = actionArr.shift();
        colors = buildColorsArry(action, arr);
        drawArry(arr, colors, spacing, barWidth);
        if (action[0] == "swaped") {
          arr = swap(arr, action[1], action[2]);
        }
      }
    }, interval);
  }
  animate(actionArr, arr, interval, colors, runInterval);
}
