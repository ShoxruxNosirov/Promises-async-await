async function f1() {
    return 1;
}
f1().then(val => console.log(val)); // 1

async function f2() {
    return Promise.resolve(1);
}
f2().then(val => console.log(val)); // 1

async function f3() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
    });
    let result = await promise; // wait until the promise resolves (*)
    console.log(result); // "done!"
}
f3();

class Waiter {
    async wait() {
        return await Promise.resolve(1);
    }
}
new Waiter()
    .wait()
    .then(err => console.log(err)); // 1 (this is the same as (result => alert(result)))

async function f4() {
    try {
        let response = await fetch('http://no-such-url');
    } catch (err) {
        console.log(err); // TypeError: failed to fetch
    }
}
f4();

async function f5() {
    try {
        let response = await fetch('/no-user-here');
        let user = await response.json();
    } catch (err) {
        // catches errors both in fetch and response.json
        console.log(err);
    }
}
f5();

async function f6() {
    let response = await fetch('http://no-such-url');
}
// f() becomes a rejected promise
f6().catch(err => console.log(err)); // TypeError: failed to fetch // (*)

