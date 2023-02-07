fetch('https://no-such-server.blabla')
    .than(response => response.json())
    .catch(err => console.log(err))         // // TypeError: failed to fetch (the text may vary)

new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(alert); // Error: Whoops!

new Promise((resolve, reject) => {
    reject(new Error("Whoops!"));
}).catch(alert); // Error: Whoops!

new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    throw new Error("Whoops!"); // rejects the promise
}).catch(alert); // Error: Whoops!

new Promise((resolve, reject) => {
    resolve("ok");
}).then((result) => {
    blabla(); // no such function
}).catch(alert); // ReferenceError: blabla is not defined

// the execution: catch -> then
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(function (error) {
    alert("The error is handled, continue normally");
}).then(() => alert("Next successful handler runs"));

// the execution: catch -> catch
new Promise((resolve, reject) => {
    throw new Error("Whoops!");
}).catch(function (error) {
    if (error instanceof URIError) {
        // handle it
    } else {
        alert("Can't handle such error");
        throw error; // throwing this or another error jumps to the next catch
    }
}).then(function () {
    /* doesn't run here */
}).catch(error => { // (**)
    alert(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way
});