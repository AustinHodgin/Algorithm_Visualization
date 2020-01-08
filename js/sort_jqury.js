//When Start Sorting button is clicked, grab the values in the sidebar menu and start the sortting function to build arry and then sort it.
$("button").click(function() {
  let numElements = Number($("#numElements").val());
  let algo = $("#algo option:selected").val();
  let arrCase = $("#arrCase option:selected").val();
  let interval = Number($("#interval").val());
  sort.init(algo, numElements, arrCase, interval);
  displaySorting(sort.actionsArry, sort.unsortedArray, interval);
});

//Change the discription of summary and the code snippit when the drop down changes for sorting.
$("#algo").change(function() {
  var selectedAlgo = $("#algo option:selected").val();
  var summaryText = "";
  var codeText = "";
  if (selectedAlgo === "bubble") {
    summaryText =
      "Bubble sort is a simple sorting algorithm that looks at the first element and compares it to the element to the right. If it is larger then it will swap the two elements and then move on to the next element. This compairison is done until it finds an element smaller then it. It will then start over at the begining. This proccess is repeted until the arry is sorted.";
    codeText =
      "BubbleSort(array): \n  for i to n: \n    for j to n-i-1: \n     if array[j] > arr[j+1] \n      swap(array[j] ,array[j+1])";
    complexityText = "Complexity: O(n^2)";
  } else if (selectedAlgo === "selection") {
    summaryText =
      "Selection sort sorts by repeatedly finding the minimum element from the array and putting it at the beggining. It will then move the begining point up one. This is repeated until the arry is sorted.";
    codeText =
      "SelectionSort(array): \n   for i = 1 to n - 1: \n     min = i \n     for j = i+1 to n: \n       if array[j] < list[min] then \n           min = j \n        if indexMin != i then \n          swap(list[min], list[i]";
    complexityText = "Complexity: O(n^2)";
  } else if (selectedAlgo === "merge") {
    summaryText =
      "Merge sort is a divide and conquer algorithm that divides the array into several sub arrays, sorts those, and then merges them back together. This algorithm is a recrivice algorithm which helps cut down the run time. ";
    codeText =
      "MergeSort(array, left, right): \n    if left > right\n     return\n    mid = (left + right)/2\n    MergeSort(array, left, mid);\n    MergeSort(array, mid+1, right);\n    Merge(array, left, mid, right)";
    complexityText = "Complexity: O(nlog(n))";
  } else if (selectedAlgo === "insertion") {
    summaryText =
      "Insertion sort builds a final array one item at a time. It iterates through the array looking for where the element should be inserted and insertis it into the correct place within the final array. This proccess is repeated until all the elements have been placed in the correct place.";
    codeText =
      "InsertionSort(array): \n   for j = 2 to n: \n     key = array[j] \n      insert array[j] \n     i = j - 1\n     while i > 0 and array[i] > key:\n       do array[i+1] = array[i]\n        i = i -1 \n     array[i+1] = key";
    complexityText = "Complexity: O(n^2)";
  }

  $("#summary").text(summaryText);
  $("#complexity").text(complexityText);
  $("#code").text(codeText);
});
