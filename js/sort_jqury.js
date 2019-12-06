
//When Start Sorting button is clicked, grab the values in the sidebar menu and start the sortting function to build arry and then sort it.
$("button").click(function () {
  let numElements = Number($("#numElements").val());
  let algo = $("#algo option:selected").val();
  let arrCase = $("#arrCase option:selected").val();
  let interval = Number($("#interval").val());
  console.log("interval:", interval);
  sort.init(algo, numElements, arrCase, interval);
  displaySorting(sort.actionsArry, sort.unsortedArray, interval);
});

//Change the discription of summary and the code snippit when the drop down changes for sorting.
$("#algo").change(function () {
  var selectedAlgo = $("#algo option:selected").val();
  var summaryText = "";
  var codeText = "";
  if (selectedAlgo === "bubble") {
    summaryText = "bubble sort!";
    codeText = "Some code!";
  } else if (selectedAlgo === "quick") {
    summaryText = "quick sort!";
    codeText = "Some code!";
  } else if (selectedAlgo === "merge") {
    summaryText = "merge sort!";
    codeText = "Some code!";
  } else if (selectedAlgo === "insertion") {
    summaryText = "insertion sort!";
    codeText = "Some code!";
  } else if (selectedAlgo === "heap") {
    summaryText = "heap sort!";
    codeText = "Some code!";
  }

  $("#summary").text(summaryText);
  $("#code").text(codeText);
});
