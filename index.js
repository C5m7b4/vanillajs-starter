(function iife() {
  console.log('code is running');
})();

const data = [
  { id: 1, name: 'apple lg', price: 0.99, size: 'each', category: 'fruit' },
  { id: 2, name: 'bananna', price: 1.1, size: 'each', category: 'fruit' },
  { id: 3, name: 'grapes', price: 1.99, size: 'bundle', category: 'fruit' },
  { id: 4, name: 'apple sm', price: 0.89, size: 'each', category: 'fruit' },
  {
    id: 5,
    name: 'Dr. Pepper',
    price: 1.09,
    size: '12 oz',
    category: 'beverages',
  },
  { id: 6, name: 'Mt. Dew', price: 4.99, size: '12 pk', category: 'beverages' },
  { id: 7, name: 'Coke', price: 1.79, size: '2 Liter', category: 'beverages' },
  { id: 8, name: 'Pepsi', price: 1.79, size: '2 Liter', category: 'beverages' },
  { id: 9, name: 'Tic Tacs', price: 2.99, size: '12 oz', category: 'candy' },
  { id: 10, name: 'Snickers', price: 1.59, size: 'bar', category: 'candy' },
  { id: 11, name: 'Almond Joy', price: 1.69, size: 'bar', category: 'candy' },
];
let filteredData = data;

// first we are going to add some data that we can change
const state = {
  items: data,
  currentItem: {
    name: '',
    size: '',
    price: 0,
    category: '',
  },
};

// create a function to test for undefined or null
const isValid = (v) => {
  if (v !== 'undefined' && v !== null) return true;
  return false;
};

// add a function to handle when our state changes
// ie: this is triggered by the onChange event on the input boxes
const changeState = (identifier) => {
  const { id, value } = identifier;
  setValue(id, value);
  if (!isValid(id)) {
    return;
  }

  return {
    ...state,
    currentItem: {
      ...(state.currentItem[id] = value),
    },
  };
};

// this function will set the value back to the item in the document
const setValue = (identifier, value) => {
  if (isValid(value)) {
    document.getElementById(identifier).value = value;
  }
};

// create a function that will build a table with our data
const buildItemTable = () => {
  let html = `<table style="width: 90%; margin: 20px auto; cell-padding: 2px;color: #000"><tr><th>Produce</th><th>Size</th><th>Price</th><th>Category</th><th>Delete</th></tr>`;
  filteredData.map((item) => {
    const { name, size, price, category } = item;
    html += `<tr><td>${name}</td><td>${size}</td><td>${price}</td><td>${category}</td><td style="cursor:pointer;" onClick=deleteItem(${item.id})>Trash</td></tr>`;
  });
  html += '</table';
  document.getElementById('items').innerHTML = html;
};
buildItemTable();

// add a new function to the arrays prototype that will allow us to get unique values
Array.prototype.unique = function (field) {
  const newArray = [];
  this.forEach((record) => {
    const { [field]: targetField } = record;
    if (!newArray.includes(targetField)) {
      newArray.push(targetField);
    }
  });

  return newArray;
};

const buildFilterBox = () => {
  const categories = data.unique('category');
  let html =
    '<select onChange={handleFilterChange(this)}><option value="0">Select a Category to filter</option>';
  categories.map((c) => {
    html += `<option value="${c}">${c}</option>`;
  });
  html += '</select>';
  document.getElementById('filter').innerHTML = html;
};
buildFilterBox();

const handleFilterChange = (e) => {
  if (e.value == '0') {
    filteredData = state.items;
  } else {
    filteredData = state.items.filter((d) => d.category == e.value);
  }
  buildItemTable();
};

// now lets add the ability to delete an item
const deleteItem = (item) => {
  const itemIndex = state.items.findIndex((i) => i.id === item);
  if (itemIndex) {
    const copiedItems = Array.from(state.items);
    copiedItems.splice(itemIndex, 1);
    state.items = copiedItems;
    filteredData = copiedItems;
    buildItemTable();
  }
};

// now lets add curry to the mix so we can do some dynamic filtering
const filterData = (property) => {
  return function (value) {
    return data.filter((i) => i[property] == value);
  };
};

const curriedFilter = filterData('category');
fruits = curriedFilter('fruit');
console.log('fruits', fruits);
const bevs = curriedFilter('beverages');
console.log('bevs', bevs);
