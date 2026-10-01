// Array Methods
const items = [
  { name: "Bike", price: 100 },
  { name: "TV", price: 200 },
  { name: "Album", price: 10 },
  { name: "Book", price: 5 },
  { name: "Phone", price: 500 },
  { name: "Computer", price: 1000 },
  { name: "Keyboard", price: 25 },
];

// .filter() Array Method
const filterArray = items.filter((item) => {
  return item.price >= 200;
});

console.log(filterArray);

// .map() array method
const mapArray = items.map((itemsName) => {
  return itemsName.name;
});

console.log(mapArray);

// .find() array method
const findArray = items.find((findItem) => {
  return findItem.name === "Book";
});

console.log(findArray);

// .forEach() array Method
console.log('For Each');
items.forEach((doItem) => {
  console.log(doItem.price > 200);
});

// .some() array methods
const checkIfExpensive = items.some((expensiveItem) => {
  return expensiveItem.price > 200;
});

console.log(checkIfExpensive);

// .every() array methods
const ifAllCheap = items.every((isItCheap) => {
  return isItCheap.price <= 1000;
});

console.log(ifAllCheap);

// .reduce() array method
const total = items.reduce((currentTotal, item) => {
  return item.price + currentTotal;
}, 0);

console.log(total);

// .includes() array method
const newItems = [1, 2, 3, 4, 5];
const includesMethod = newItems.includes(4);
console.log(includesMethod);
