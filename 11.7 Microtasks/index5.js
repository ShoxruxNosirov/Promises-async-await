let promise4 = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise4.catch(err => alert('caught  -> 5')), 1000);
// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason + '  -> _5_'));