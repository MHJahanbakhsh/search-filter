interface IResponse {
  data: string[];
}

interface Iitem {
  value: string;
  id: number;
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
let selectedItems: Iitem[] = [];

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

function toggleSelection(item: Iitem) {
  const exist = selectedItems.find((each) => {
    return each.id === item.id;
  });

  if (exist) {
    selectedItems = selectedItems.filter((each) => each.id !== item.id);
  } else {
    selectedItems.push(item);
  }

  localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
}

const createNewItemElement = function (item: Iitem) {
  const listItem = document.createElement("li");
  listItem.classList.add("card");
  listItem.id = item.id.toString();

  const checkBox = document.createElement("input");
  checkBox.classList.add("check-box");
  checkBox.type = "checkBox";

  if (selectedItems && selectedItems.some((each) => each.id == item.id)) {
    checkBox.checked = true;
  }
  listItem.addEventListener("click", (e) => {
    toggleSelection({
      value: listItem.childNodes[1].textContent!,
      id: +listItem.id,
    });

    //toggle checkbox
    checkBox.checked = !checkBox.checked;

    if (checkBox.checked) {
      checkBox.parentElement?.parentElement?.prepend(checkBox.parentElement);
    }
  });

  const label = document.createElement("label");
  label.classList.add("item-label");
  label.innerText = item.value;

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);

  return listItem;
};

async function getItems(): Promise<IResponse> {
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
  const itemsWithId = result.data.map((each, index) => {
    return { value: each, id: index };
  });

  selectedItems.forEach((selectedItem) => {
    itemsWithId.forEach((item) => {
      if (item.id === selectedItem.id) {
        //change the first element of the refrence array
        itemsWithId.unshift(
          itemsWithId.splice(itemsWithId.indexOf(item), 1)[0]
        );
      }
    });
  });
  itemsWithId.forEach((each) => {
    list?.appendChild(createNewItemElement(each));
  });
});
