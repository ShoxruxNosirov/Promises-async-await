let promise2 = Promise.reject(new Error("Promise Failed!"));
promise2.catch(err => alert('caught  -> 3'));
// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason + '  -> _3_')); // ignored