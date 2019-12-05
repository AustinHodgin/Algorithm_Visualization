/******************************************************************
 *Functions:
 *   DisplaySorting: Main function used to display the sortting algorthim by using the actions arry to animate what is happening in the arry
 *   animate: draws the arry using the given steps in the action arry
 *   boundY: rebinds the Y to the bottom left of the screen from the top left of the screen to help with drawing.
 *
 ******************************************************************/


///TODO! Turninto object

function displaySorting(actionArr, unsortedArr, interval, isRunning) {
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
  let runInterval;

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
  function animate(actionArr, arr, interval, colors, runInterval) {
    if (runInterval) {
      stop(runInterval);
    }
    runInterval = setInterval(function () {
      console.log("runInterval", runInterval);
      isRunning = true;
      if (actionArr.length === 0) {
        console.log("actionArr Last:", actionArr);
        console.log("arr last", arr);
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
    isRunning = false;
  }
  animate(actionArr, arr, interval, colors, runInterval);
}


var display = {
  mainActionArr: [],
  arr: [],
  DEFALT_COLOR: "#fff", //white
  SWAP_COLOR: "#FF0000", //red
  COMPARE_COLOR: "#008000", //green
  colors: [],
  min: 0,
  max: 0,
  spacing: 0,
  barWidth: 0,
  interval: 0,
  runningInterval: 0,
  context: null,
  canvas: null,
  canvasHeight: 600,
  canvasWidth: 800,

  //init function
  init: function (actionArr, arr, interval) {
    //reset all variables
    this.mainActionArr = actionArr.slice(0);
    this.arr = arr.slice(0);
    this.colors = [];
    this.min = 0;
    this.max = 0;
    this.spacing = 0;
    this.barWidth = 0;
    this.interval = interval;

    console.log(this.mainActionArr);

    //setup canvas
    this.setupCanvas();

    //find min max
    this.findMinMax();



    //setup interval
    if (this.runningInterval) {
      clearInterval(this.runningInterval);
    } else {
      this.runningInterval = setInterval(function () {
        console.log("mainactionArr inside interval", this.mainActionArr);
        if (this.mainActionArr.length === 0) {
          this.buildColorsArry(this.mainActionArr);
          this.drawArry(mainActionArr);
        } else {
          let action = this.mainActionArr.shift();
          buildColorsArry(action);
          this.drawArry();
          if (action[0] === "swapped") {
            this.swap(action[1], action[2]);
          }
        }
      }, this.interval);
    }
  },

  findMinMax: function () {
    //find the min in the function
    this.min = this.arr[0];
    this.max = this.arr[0];
    for (let i = 0; i < this.arr.length; i++) {
      this.min = this.arr[i] < this.min ? this.arr[i] : this.min;
      this.max = this.arr[i] > this.max ? this.arr[i] : this.max;
    }
  },
  setupCanvas: function () {
    //select canvus in document
    this.canvas = document.querySelector("canvas");
    //set height and width of canvus if not set
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    //set contex
    this.context = this.canvas.getContext("2d");
    //translate the y to the bottom left and inverts the y values
    this.context.translate(0, this.canvas.height);
    this.context.scale(1, -1);

  },
  boundY: function (y) {
    let a = this.canvas.height / (this.min - this.max);
    let b = this.canvas.height / (this.max - this.min);
    return a * y + b;
  },

  swap: function (i, j) {
    let temp = 0;
    temp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = temp;
  },

  buildColorsArry: function (actionArr) {
    this.colors = [];
    let action = "default";
    let left = 0;
    let right = 0;
    if (mainActionArr.length !== 0) {
      action = actionArr[0];
      left = actionArr[1];
      right = actionArr[2];
    }
    for (let i = 0; i < this.arr.length; i++) {
      this.colors[i] = DEFALT_COLOR;
    }
    if (action === "compare") {
      this.colors[left] = COMPARE_COLOR;
      this.colors[right] = COMPARE_COLOR;
    } else if (action === "swaped") {
      this.colors[left] = SWAP_COLOR;
      this.colors[right] = SWAP_COLOR;
    }
  },
  drawArry: function () {
    //clear display
    this.context.clearRect(0, 0, 800, 600);
    let x = this.spacing;
    //console.log(arr);
    for (let i = 0; i < this.arr.length; i++) {
      let y = this.boundY(arr[i]);
      this.context.fillStyle = this.colors[i];
      this.context.fillRect(x, -y, this.barWidth, y);
      x = x + this.spacing + this.barWidth;
    }
  },
}