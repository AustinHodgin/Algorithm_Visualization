# Algorithm_Visualization

This project is broken up into two parts. The first part is the sorting algorithm visualization
and the second part is a path finding algorithm visualization. I choose these two types of algorithms to 
visualize because I thought they looked intreating and their algorithms are used commonly within programming.
I wanted to practice and learn more about just pure JavaScript so I wanted this project to be done in as pure 
JavaScript as possible. 

This site can be viewed [Here](https://austinhodgin.github.io/Algorithm_Visualization/index.html)! 



# Sorting Algorithm

![Sorting_gif](https://user-images.githubusercontent.com/18235686/71937126-49066a00-3160-11ea-915c-0c24f049c61d.gif)

This section of the project focused on creating a sorting algorithm visualizer. I wanted to be able to 
show the difference between how the different sorting algorithms worked and could be implemented. When you enter
the page you are greeted with a side bar full of options and a blank canvas. These options are the number of elements
that will be sorted and displayed, which sorting algorithm that will be visualized, the case (Best, Worst, Average) the 
arry is in and then finally how long you want each step will take in milliseconds. Once a sorting algorithm is selected 
the summary and pseudo code is filled in with information about that algorithm. The summary section describes how the algorithm 
works as well as shows the Big O complexity of the given algorithm. The pseudo code section gives a basic idea of the code required 
to implement the algorithm. This is not the exact code used to create the visualization of the algorithm as they needed to be change slightly to be able to visualize them. 

Once all the options are selected and the user presses start the canvas will fill bars representing the values within the array. It will then start applying the sorting algorithm to the arry. When two elements are being compared they will be highlighted in green. If they then need to swap they will be highlighted in red. This is done to shows how many comparisons and swaps are required to completely sort the array. Currently there are four sorting algorithms implemented.

### Current Sorting Algorithms:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort

# Pathfinding Alorithms
Coming soon!
