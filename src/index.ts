interface Iitems {
  data: string[];
}

//------------------Elements--------------------------
const list = document.getElementById("list") as HTMLElement;
const searchInput = document.getElementById("searchbox") as HTMLInputElement;
const labels = document.getElementsByClassName("item-label");
const cards = document.getElementsByClassName("card");
const checkBoxes = document.getElementsByClassName(
  "check-box"
) as HTMLCollection;

//--------------------states-----------------------
let items: Iitems;
let selectedItems: string[] = [];

//check local storage on mount
document.addEventListener("DOMContentLoaded", () => {
  const storedSelectedItems = localStorage.getItem("selectedItems");
  if (storedSelectedItems) {
    selectedItems = JSON.parse(storedSelectedItems!);
  }
});

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

function toggleSelection(title: string) {
  if (selectedItems.includes(title)) {
    selectedItems = selectedItems.filter((each) => each !== title);
  } else {
    selectedItems.push(title);
  }

  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

const createNewItemElement = function (taskString: string) {
  const listItem = document.createElement("li");
  listItem.classList.add("card");

  const checkBox = document.createElement("input");
  checkBox.classList.add("check-box");
  checkBox.type = "checkBox";

  if (selectedItems && selectedItems.includes(taskString)) {
    checkBox.checked = true;
  }
  listItem.addEventListener("click", (e) => {
    toggleSelection(listItem.childNodes[1].textContent!);
    //toggle checkbox
    checkBox.checked = !checkBox.checked;

    if (checkBox.checked) {
      checkBox.parentElement?.parentElement?.prepend(checkBox.parentElement);
    }
  });

  const label = document.createElement("label");
  label.classList.add("item-label");
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
for (let i = 0; i < checkBoxes.length; i++) {
  checkBoxes[i].addEventListener("", function () {});
}

//---------------------------------------------
getItems().then((result) => {
  items = result;

  selectedItems.forEach((selectedItem) => {
    items.data.forEach((item) => {
      if (item === selectedItem) {
        //change the first element of the refrence array
        items.data.unshift(items.data.splice(items.data.indexOf(item), 1)[0]);
      }
    });
  });
  items.data.forEach((each) => {
    list?.appendChild(createNewItemElement(each));
  });
});



