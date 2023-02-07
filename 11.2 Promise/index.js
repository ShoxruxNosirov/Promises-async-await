let promise1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done"), 1000);
});
promise1.then(
    result => console.log(result), // shows "done!" after 1 second
    error => console.log(error) // doesn't run
);


let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});
promise2.then(
    result => console.log(result), // doesn't run
    error => console.log(error.name) // Error: "Whoops!"
);

let promise3 = new Promise(function (resolve, reject) {
    resolve("done");
    reject(new Error("…")); // ignored
    setTimeout(() => resolve("…")); // ignored
});
promise3.then(
    result => console.log(result), // shows "done!"
    error => console.log(error.name) // doesn't run
);

let promise4 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});
promise4.then(
    result => console.log(result), // doesn't run
    error => console.log(error.name) // shows "Error: Whoops!"
);

let promise5 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});
promise5.catch(err => console.log(err.name));

new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
})
    .finally(() => console.log("Promise ready")) // triggers first
    .then(result => console.log(result)); // <-- .then shows "value"

new Promise((resolve, reject) => {
    throw new Error("error");
    //reject(1234)
})
    .finally(() => console.log("Promise ready")) // triggers first
    .catch(err => console.log(err.name));  // <-- .catch shows the error   (Error: error)
