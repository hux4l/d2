const rune = document.querySelectorAll("img");
const itemsElements = document.querySelectorAll(".container");
const pageBody = document.querySelector("body");

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

const sigons = {
  id: "sigons_complete_steel_4",
  name: "Sigon's Shelter",
  type: "Gothic Plate",
  runes: [
    {
      name: "Tir",
      rank: 3,
      stat: {
        name: "Mana per Kill",
        stat: "manaPK",
        value: "2",
      },
      iLvl: 13,
      CLvl: 13,
    },
  ],
  primaryStat: {
    stat: "defense",
    name: "Defense",
    value: 170,
  },

  durability: {
    curr: 35,
    max: 55,
  },

  required: [
    {
      stat: "strenght",
      name: "Strenght",
      value: 70,
    },
    {
      stat: "level",
      name: "Level",
      value: 70,
    },
  ],

  itemSpeed: {
    stat: "movSpeed",
    class: "",
    speed: 0,
  },

  bonuses: [
    {
      type: "mBonus",
      name: "Enhanced Defense",
      stat: "enhancedDefense",
      value: 25,
      characterClass: "",
    },
    {
      type: "mBonus",
      name: "Lightning Resist",
      stat: "resistLightning",
      value: 30,
      characterClass: "",
    },
  ],

  sBonus: [
    {
      type: "sBonus",
      name: "Attacker takes Damage of ",
      stat: "attackerDamage",
      value: 20,
      characterClass: "",
      reqPieces: 2,
    },
  ],
};

const sigonsSet = {
  name: "Sigons Complete Steel",
  set: "sigons_complete_steel",
  setBonuses: [
    {
      name: "% Life stolen per hit",
      stat: "lifePerHit",
      value: 10,
      characterClass: "",
      reqPieces: 2,
    },
    {
      name: " Defense",
      stat: "defense",
      value: 100,
      characterClass: "",
      reqPieces: 3,
    },
    {
      name: "% Fire Resistance",
      stat: "resistFire",
      value: 12,
      characterClass: "",
      reqPieces: 6,
    },
    {
      name: "Atacker Takes Damage of ",
      stat: "attackerDamage",
      value: 12,
      characterClass: "",
      reqPieces: 6,
    },
    {
      name: "Damage taken reduced by ",
      stat: "damageTakenReduced",
      value: 7,
      characterClass: "",
      reqPieces: 6,
    },
    {
      name: " Maximum Fire Damage",
      stat: "fireDamage",
      value: 24,
      characterClass: "",
      reqPieces: 6,
    },
    {
      name: " Mana",
      stat: "mana",
      value: 20,
      characterClass: "",
      reqPieces: 6,
    },
  ],

  setItems: [
    {
      id: "sigons_complete_steel_1",
      name: "Sigon's Guard",
      active: false,
    },
    {
      id: "sigons_complete_steel_2",
      name: "Sigons Wrap",
      active: false,
    },
    {
      id: "sigons_complete_steel_3",
      name: "Sigon's Sabot",
      active: false,
    },
    {
      id: "sigons_complete_steel_4",
      name: "Sigon's Shelter",
      active: false,
    },
    {
      id: "sigons_complete_steel_5",
      name: "Sigon's Visor",
      active: false,
    },
    {
      id: "sigons_complete_steel_6",
      name: "Sigon's Gage",
      active: false,
    },
  ],
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
      itemsElements[e.target.dataset.item - 1].style.left =
        Math.trunc(
          imgLeft +
            (imgRight - imgLeft) / 2 -
            getPopupWidth(itemsElements[e.target.dataset.item - 1]) / 2
        ) + "px";
      itemsElements[e.target.dataset.item - 1].style.top =
        Math.trunc(
          imgTop - getPopupHeight(itemsElements[e.target.dataset.item - 1])
        ) + "px";
    }
    if (imgTop < getPopupHeight(itemsElements[e.target.dataset.item - 1])) {
      itemsElements[e.target.dataset.item - 1].style.left =
        Math.trunc(
          imgLeft +
            (imgRight - imgLeft) / 2 -
            getPopupWidth(itemsElements[e.target.dataset.item - 1]) / 2
        ) + "px";
      itemsElements[e.target.dataset.item - 1].style.top =
        Math.trunc(imgBottom) + "px";
    }
  }
};

const test = document.querySelector(".test");

const generatePopup = (item) => {
  return `
    <div class="test font-size" data-id="2">
      <div class="item name name-set">${item.name}</div>
      <div class="item type name-set">${item.type}</div>
      <div class="item stats name-common">
        <p>${item.primaryStat.name}: ${item.primaryStat.value}</p>
        <p>Durability: ${item.durability.curr} of ${item.durability.max}</p>
      </div>
      <div class="item requirements name-common">
        <p class="requirement-not">Required ${item.required[0].name}: ${item.required[0].value}</p>
        <p>Required ${item.required[1].name}: ${item.required[1].value}</p>
      </div>
      <div class="item bonuses name-magic">
        <p>+${item.bonuses[0].value}% ${item.bonuses[0].name}</p>
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
        <p class="requirement-not">Sigon's Sabot</p>
        <p>Sigon's Shelter</p>
        <p class="requirement-not">Sigon's Visor</p>
        <p class="requirement-not">Sigon's Gage</p>
      </div>
    </div>
    `;
};

test.insertAdjacentHTML("beforeend", generatePopup(sigons));

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
