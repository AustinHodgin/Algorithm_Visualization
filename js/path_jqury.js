//When Start Sorting button is clicked, grab the values in the sidebar menu and start the sortting function to build arry and then sort it.
$("#start").click(function () {
  let algo = $("#algo option:selected").val();
  let interval = Number($("#interval").val());

  if (algo === "BreathFirst") {
    mainGrid.breadthFirst(interval);
  } else if (algo === "DepthFirst") {
    mainGrid.depthFirst(interval);
  }
});

//Change the discription of summary and the code snippit when the drop down changes for sorting.
$("#algo").change(function () {
  let selectedAlgo = $("#algo option:selected").val();
  let summaryText = "";
  let codeText = "";
  let complexityText = "";
  if (selectedAlgo === "BreathFirst") {
    summaryText =
      "Breadth First Search is a search algorithm that traverse a graph looking for a given node. This algorithm starts at a given node and will then traverse the graph going layer by layer looking from left to right for the node.This algorithm is very similar to Depth First Search but instead of looking at the end of the search arry it looks at the start of it. If there is a path to from the start node to the end node it will guarantee it will find it and find the shortest path to it.";
    codeText =
      'BFS(Graph, startNode) {  \n \t let search = [ ]; \n \t let path = [ ];\n \t search.push(StartNode);\n \t while(search.length != 0) { \n \t \t  let node = search.shift(); \n \t \t   path.push(node); \n \t \t   if (node.type === "DEFAULT") { \n \t \t \t  node.setType("VISITED"); \n \t \t } \n \t \t if (node.type === "END") { \n \t \t \t let finalPath = backTrace(node); \n \t \t \t displayPath(finalPath); \n \t \t } else { \n \t \t \t  let neighbors = findNeighbors(node, search); \n \t \t \t  search = search.concat(neighbors); \n \t \t \t} \n \t \t if (search.length === 0) { \n \t \t \t print("No path found"); \n \t \t  } \n \t  }\n';
    complexityText =
      "Time Complexity: O( V + E) Where V is number of nodes and E is number of edges ";
  } else if (selectedAlgo === "DepthFirst") {
    summaryText =
      "Deapth first search is a recursive algorithm that searches a graph by going down the left most path and then once it reaches the end and then will go back up the tree until it can go right and will repeat the proccess until it finds the end node. This algorithm is very similar to Breadth First Search but instead of looking at the front of the search arry it looks at the end of it.  This will garaentee a path to the end node from the start node if one exists but does not garaentee the shortest path.   ";
    codeText =
      'DFS(Graph, startNode) {  \n \t let search = [ ]; \n \t let path = [ ];\n \t search.push(StartNode);\n \t while(search.length != 0) { \n \t \t  let node = search.pop(); \n \t \t   path.push(node); \n \t \t   if (node.type === "DEFAULT") { \n \t \t \t  node.setType("VISITED"); \n \t \t } \n \t \t if (node.type === "END") { \n \t \t \t let finalPath = backTrace(node); \n \t \t \t displayPath(finalPath); \n \t \t } else { \n \t \t \t  let neighbors = findNeighbors(node, search); \n \t \t \t  search = search.concat(neighbors); \n \t \t \t} \n \t \t if (search.length === 0) { \n \t \t \t print("No path found"); \n \t \t  } \n \t  }\n';

    complexityText =
      "Time Complexity: O( V + E) Where V is number of nodes and E is number of edges";
  }
  $("#summary").text(summaryText);
  $("#complexity").text(complexityText);
  $("#code").text(codeText);
});

$(window).on("load", function () {
  $("#PathModal").modal("show");
});
