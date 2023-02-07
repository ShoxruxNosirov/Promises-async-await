new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function (result) {
    console.log(result);
    return result * 2;                  // 1 * 2  
}).then(function (result) {
    console.log(result);
    return result * 2;                  // 2 * 2
}).then(function (result) {
    console.log(result);
    return result * 2;                  // 4 * 4
});

let promise1 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
});
promise1.then(function (result) {
    console.log(result);
    return result * 2;                  // 1 * 2 
});
promise1.then(function (result) {
    console.log(result);
    return result * 2;                  // 1 * 2
});
promise1.then(function (result) {
    console.log(result);
    return result * 2;                  // 1 * 2
});

new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
}).then(function (result) {
    console.log(result);                                      // 1
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) {
    console.log(result);                                      // 2
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
    });
}).then(function (result) {
    console.log(result);                                      // 4
});