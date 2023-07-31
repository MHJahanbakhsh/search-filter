interface Iitems {
  data: string[];
}

//------------------Elements--------------------------
const list = document.getElementById("list") as HTMLElement;
const searchInput = document.getElementById("searchbox") as HTMLInputElement;
const labels = document.getElementsByClassName("item-label");
const cards = document.getElementsByClassName("card");
const checkBoxes = document.getElementsByClassName("checkbox");

//--------------------states-----------------------
let items: Iitems;
const selectedItems: string[] = [];

//--------------------Functions-------------------
function searchCards() {
  const value = searchInput.value;

  for (let i = 0; i < labels.length; i++) {
    if (!labels[i].textContent?.toLocaleLowerCase().includes(value)) {
      labels[i].parentElement?.classList.add("hidden");
    } else {
      labels[i].parentElement?.classList.remove("hidden");
    }
  }
}

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const createNewItemElement = function (taskString: string) {
  const listItem = document.createElement("li");
  listItem.classList.add("card");

  const checkBox = document.createElement("input");
  checkBox.className = "checkbox";

  const label = document.createElement("label");
  label.className = "item-label";

  checkBox.type = "checkBox";

  label.innerText = taskString;

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);

  return listItem;
};

async function getItems(): Promise<Iitems> {
  const res = await fetch("../public/assets/Rasha Challenge __ Items.json");
  const data = res.json();
  return data;
}

//-------------------Event listeners------------------------
searchInput.addEventListener(
  "input",
  debounce(() => searchCards())
);
console.log(checkBoxes);
for (let i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].addEventListener("change", function () {
    console.log("changed");
  });
}

getItems().then((result) => {
  items = result;
  console.log("runnign");

  items.data.forEach((each) => {
    list?.appendChild(createNewItemElement(each));
  });
});

//------------- search function--------------
