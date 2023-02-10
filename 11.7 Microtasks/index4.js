let promise3 = Promise.reject(new Error("Promise Failed!"));
// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason + '  -> _4_'));