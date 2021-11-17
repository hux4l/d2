const rune = document.querySelectorAll("img");
const itemsElements = document.querySelectorAll(".container");
const pageBody = document.querySelector("body");

const items = [];
let isOpen = false;
const stat = {
  name: "",
  value: "",
};

const item = {
  name: "",
  type: "",
  runes: [],
  primaryStat: {
    name: "",
    value: "",
  },

  durability: {
    curr: "",
    max: "",
  },

  requirements: {
    stat: "",
    value: "",
  },

  weaponClass: {
    class: "",
    speed: "",
  },

  bonuses: {
    bonus: {
      name: "",
      value: "",
      bonusLevel: "",
      characterClass: "",
    },
    setBonus: {
      name: "",
      value: "",
      bonusLevel: "",
      characterClass: "",
    },
  },

  setBonuses: {
    bonus: {
      name: "",
      value: "",
      bonusLevel: "",
      characterClass: "",
    },
  },

  setItems: [
    {
      name: "",
      active: true,
    },
  ],
};
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

  const popupTemplate = function (item) {
    return `
    <div class="container font-size hidden" data-id="2">
      <div class="item name name-set">Sigon's Shelter</div>
      <div class="item type name-set">Gothic Plate</div>
      <div class="item stats name-common">
        <p>Defense: 170</p>
        <p>Durabilit: 33 of 55</p>
      </div>
      <div class="item requirements name-common">
        <p class="requirement-not">Required Strenght: 70</p>
        <p>Required Level: 6</p>
      </div>
      <div class="item bonuses name-magic">
        <p>+25% Enhanced Defense</p>
        <p>Lightning Resist +30%</p>
      </div>
      <div class="item bonues-special name-set">
        <p>Attacker Takes Damage of 20</p>
      </div>
      <div class="item bonuses-sets name-unique padding-set">
        <p>10% Life Stolen per hit</p>
      </div>
      <div class="item set-name name-set">
        <p class="name-unique">Sigon's Complete Steel</p>
        <p class="requirement-not">Sigon's Guard</p>
        <p class="requirement-not">Sigon's Wrap</p>
        <p>Sigon's Sabot</p>
        <p>Sigon's Shelter</p>
        <p class="requirement-not">Sigon's Visor</p>
        <p class="requirement-not">Sigon's Gage</p>
      </div>
    </div>
    `;
  };

  popupTemplate();

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
