function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
    alert(`Cool, the script ${script.src} is loaded`);
});

/*
  loadScript('/my/script.js', function(script) {

    alert(`Cool, the ${script.src} is loaded, let's load one more`);

    loadScript('/my/script2.js', function(script) {

      alert(`Cool, the ${script.src} is loaded, let's load one more`);
  
      loadScript('/my/script3.js', function(script) {
        // ...continue after all scripts are loaded
        alert(`Cool, the ${script.src} is loaded, let's load one more`);

      });
  
    });
  
  });

*/