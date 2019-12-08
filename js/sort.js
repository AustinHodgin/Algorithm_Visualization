/*************************
 * Sort:
 *  Function:
 *   create array: Create an arry with a given case of best (already sorted), worst (sorted backwards), average (random)
 *   bubble sort: Sort the array using the bubble sort algorimthm (calls: swap, compare)
 *   merge sort: sort array with mergesort (calls: swap, compare)
 *   quick sort: sort array with quick sort (calls: swap, compare)
 *   * Other sortting algorims
 *   *
 *   swap: swap two elements and put swap and the index of the elements swaped in action array
 *   compare: compare two index of the array and return a bool if it is less then the other and add compare and the two index into action arry
 *   Veriables:
 *     Unsorted array
 *     sorted arry
 *     actions arr
 */

var sort = {
  unsortedArray: [],
  sortedArray: [],
  actionsArry: [],

  init: function (algo, numElements, arrCase) {
    //make sure that they are empty
    this.unsortedArray = [];
    this.sortedArray = [];
    this.actionsArry = [];
    this.unsortedArray = this.createArray(numElements, arrCase);
    //select the algo that will be run
    switch (algo) {
      case "bubble":
        this.bubbleSort(this.unsortedArray);
        return;
      case "selection":
        this.selectionSort(this.unsortedArray);
        return;
      case "insertion":
        this.insertionSort(this.unsortedArray);
        return;
    }
  },
  //create an arry with best (already), worst(reverse sorted), average case arry
  createArray: function (num, arrCase) {
    let arr = [];
    if (arrCase === "average") {
      for (let i = 0; i < num; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
      }
    } else if (arrCase === "best") {
      for (let i = 0; i < num; i++) {
        arr.push(i);
      }
    } else if (arrCase === "worst") {
      for (let i = num; i > 0; i--) {
        arr.push(i);
      }
    }
    return arr;
  },
  //compare two elements in given arry
  compare: function (arr, i, j) {
    this.actionsArry.push(["compare", i, j]);
    return arr[i] > arr[j];
  },
  //swap two elements within the given arry
  swap: function (arr, i, j) {
    this.actionsArry.push(["swaped", i, j]);
    let temp = 0;
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
  },
  //sort using bubble sort algorimthm
  bubbleSort: function (unsorted) {
    let sorted = unsorted.slice(0);
    for (let i = 0; i < sorted.length - 1; i++) {
      for (let j = 0; j < sorted.length - i - 1; j++)
        if (this.compare(sorted, j, j + 1)) {
          this.swap(sorted, j, j + 1);
        }
    }
    this.sortedArray = sorted.slice(0);
  },
  selectionSort: function (unsorted) {
    let arr = unsorted.slice(0); //copy arry
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      let min = i;
      for (let j = i + 1; j < len; j++) {
        if (this.compare(arr, min, j)) {
          min = j;
        }
      }
      if (min !== i) {
        this.swap(arr, i, min);
      }
    }
  },
  insertionSort: function (unsorted) {
    let arr = unsorted.slice(0); //copy arry
    console.log("unsorted:", arr);
    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0 && !this.compare(arr, j, j - 1); j--) {
        this.swap(arr, j, j - 1);
      }
    }
  },
};

//Test Calls!

// console.log("average");
// sort.init("bubblesort", 100, "average");

// console.log(sort.unsortedArray);
// console.log(sort.sortedArray);
// console.log(sort.actionsArry);
// console.log(sort.unsortedArray);
// console.log(sort.sortedArray);
// console.log(sort.actionsArry);

// console.log("Best");
// sort.init("bubblesort", 100, "best");

// console.log(sort.unsortedArray);
// console.log(sort.sortedArray);
// console.log(sort.actionsArry);
// console.log(sort.unsortedArray);
// console.log(sort.sortedArray);
// console.log(sort.actionsArry);

// console.log("Worst");
// sort.init("bubblesort", 100, "worst");

// console.log(sort.unsortedArray);
// console.log(sort.sortedArray);
// console.log(sort.actionsArry);
// console.log(sort.unsortedArray);
// console.log(sort.sortedArray);
// console.log(sort.actionsArry);
