const rune = document.querySelectorAll("img");
const itemsElements = document.querySelectorAll(".container");
const pageBody = document.querySelector("body");

const items = [];
let isOpen = false;

const getPopupWidth = (element) => {
  return element.offsetWidth;
};

const getPopupHeight = (element) => {
  return element.offsetHeight;
};

const calculateBoundingRect = (element) => {
  return ({ left, right, top, bottom } = element.getBoundingClientRect());
};

const displayPopup = (e) => {
  // get mouse position on page
  let x = e.clientX;
  let y = e.clientY;
  let selElement = rune[e.target.dataset.item - 1];
  // get image position on page
  let imgLeft = calculateBoundingRect(selElement).left;
  let imgRight = calculateBoundingRect(selElement).right;
  // get image position on page
  let imgTop = calculateBoundingRect(selElement).top;
  let imgBottom = calculateBoundingRect(selElement).bottom;

  // check if mouse is in image
  if (x > imgLeft && x < imgRight && y > imgTop && y < imgBottom) {
    isOpen = true;
    // display popup
    itemsElements[e.target.dataset.item - 1].classList.remove("hidden");
    if (imgTop > getPopupHeight(itemsElements[e.target.dataset.item - 1])) {
      console.log(imgLeft + (imgRight - imgLeft) / 2);
      itemsElements[e.target.dataset.item - 1].style.left =
        imgLeft +
        (imgRight - imgLeft) / 2 -
        getPopupWidth(itemsElements[e.target.dataset.item - 1]) / 2 +
        "px";
      itemsElements[e.target.dataset.item - 1].style.top =
        imgTop -
        getPopupHeight(itemsElements[e.target.dataset.item - 1]) +
        "px";
    }
    if (imgTop < getPopupHeight(itemsElements[e.target.dataset.item - 1])) {
      itemsElements[e.target.dataset.item - 1].style.left =
        imgLeft +
        (imgRight - imgLeft) / 2 -
        getPopupWidth(itemsElements[e.target.dataset.item - 1]) / 2 +
        "px";
      itemsElements[e.target.dataset.item - 1].style.top = imgBottom + "px";
    }
  }
};

// gets mouse position from page
document.onmousemove = (e) => {
  const target = e.target;
  if (!e.target.hasAttribute("data-item"))
    itemsElements.forEach((element) => element.classList.add("hidden"));
  if (e.target.hasAttribute("data-item")) {
    target.addEventListener("mousemove", displayPopup);
  } else {
    target.removeEventListener("mousemove", displayPopup);
  }
};
