// let promise = Promise.all(iterable);

Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(val => console.log(val)); // 1,2,3 when promises are ready: 


let urls1 = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests1 = urls1.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests1)
  .then(responses1 => responses1.forEach(
    response => console.log(`${response.url}: ${response.status}`)
  ));

let names = ['iliakan', 'remy', 'jeresig'];

let requests2 = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests2)
  .then(responses => {
    // all responses are resolved successfully
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => console.log(user.name)));

Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(val => console.log(val)); // Error: Whoops!

let urls2 = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls2.map(url => fetch(url)))
  .then(results => { 
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        console.log(`${urls2[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        console.log(`${urls2[num]}: ${result.reason}`);
      }
    });
  })

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(val => console.log(val)); // 1

/*
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(console.log); // Error: Whoops!
*/

Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
/*
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(123), 2000))
])
.then(val => console.log(val))      // 123
.catch(error => {                   // ignored
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
*/

//  let promise = new Promise(resolve => resolve(value));
//  let promise = Promise.resolve(value)

//  let promise = nwe Promise((res, rej) => rej(new Error('Whoops!')))
//  let promise = Promise.reject(new Error('Whoops!'))

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}