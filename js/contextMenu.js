/*Context menu veriables */
let contextMenuClassName = "context-menu";
let contextMenuItemClassName = "context-menu__item";
let contextMenuLinkClassName = "context-menu__link";
let contextMenuActive = "context-menu--active";

let gridItemClassName = "gridItem";
let gridItemInContext;

let clickCoords;
let clickCoordsX;
let clickCoordsY;

let menu = document.querySelector(".context-menu");
let menuItems = menu.querySelectorAll(".context-menu__item");
let menuState = 0;
let menuWidth;
let menuHeight;
let menuPosition;
let menuPositionX;
let menuPositionY;

let windowWidth;
let windowHeight;

/***********************************
 * Helper functions for context Menu
 *
 * Mostly taken from https://www.sitepoint.com/building-custom-right-click-context-menu-javascript/
 ***********************************/
function contextInit() {
  contextListener();
  clickListener();
  keyupListener();
  resizeListener();
}

/**
 * Listens for click events.
 */
function clickListener() {
  document.addEventListener("click", function (e) {
    var clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

    if (clickeElIsLink) {
      e.preventDefault();

      //run what needs to be run for when a button is clicked
      menuItemListener(clickeElIsLink);
    } else {
      var button = e.which || e.button;
      if (button === 1) {
        toggleMenuOff();
      }
    }
  });
}

/**
 * Listens for keyup events.
 */
function resizeListener() {
  window.onresize = function (e) {
    toggleMenuOff();
  };
}

function contextListener() {
  document.addEventListener("contextmenu", function (e) {
    gridItemInContext = clickInsideElement(e, gridItemClassName);

    if (gridItemInContext) {
      e.preventDefault();
      toggleMenuOn();
      positionMenu(e);
    } else {
      gridItemInContext = null;
      toggleMenuOff();
    }
  });
}

function clickInsideElement(e, className) {
  var el = e.srcElement || e.target;
  //console.log(el);
  if (el.classList.contains(className)) {
    //console.log(el.cellID);
    return el;
  } else {
    while ((el = el.parentNode)) {
      if (el.classList && el.classList.contains(className)) {
        console.log(el);
        return el;
      }
    }
  }

  return false;
}

function menuItemListener(link) {
  let gridItemID = gridItemInContext.getAttribute("id");
  let gridItemAction = link.getAttribute("data-action");
  if (gridItemAction === "start") {
    mainGrid.setStart(gridItemID);
  } else if (gridItemAction === "end") {
    mainGrid.setEnd(gridItemID);
  } else if (gridItemAction === "wall") {
    mainGrid.toggleWall(gridItemID);
  } else if (gridItemAction === "randomWalls") {
    mainGrid.addRandomWalls();
  }
  toggleMenuOff();
}

function keyupListener() {
  window.onkeyup = function (e) {
    if (e.keyCode === 27) {
      toggleMenuOff();
    }
  };
}

function getPosition(e) {
  let posx = 0;
  let posy = 0;

  if (!e) {
    let e = window.event;
  }

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx =
      e.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    posy =
      e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy,
  };
}

// updated positionMenu function
function positionMenu(e) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;
  clickCoordsY = clickCoords.y;

  menuWidth = menu.offsetWidth + 4;
  menuHeight = menu.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if (windowWidth - clickCoordsX < menuWidth) {
    menu.style.left = windowWidth - menuWidth + "px";
  } else {
    menu.style.left = clickCoordsX + "px";
  }

  if (windowHeight - clickCoordsY < menuHeight) {
    menu.style.top = windowHeight - menuHeight + "px";
  } else {
    menu.style.top = clickCoordsY + "px";
  }
}

function resizeListener() {
  window.onresize = function (e) {
    toggleMenuOff();
  };
}

function toggleMenuOn() {
  if (menuState !== 1) {
    menuState = 1;
    menu.classList.add(contextMenuActive);
  }
}

function toggleMenuOff() {
  if (menuState !== 0) {
    menuState = 0;
    menu.classList.remove(contextMenuActive);
    currentSelectedGridID = null;
  }
}

contextInit();
