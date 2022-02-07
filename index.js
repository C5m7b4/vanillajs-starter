(function iife() {
  console.log('code is running');
})();

const data = [
  { id: 1, name: 'apple', price: 0.99, size: 'each', category: 'fruit' },
  { id: 2, name: 'bananna', price: 1.1, size: 'each', category: 'fruit' },
  { id: 3, name: 'grapes', price: 1.99, size: 'bundle', category: 'fruit' },
  { id: 4, name: 'apple', price: 0.89, size: 'each', category: 'fruit' },
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
