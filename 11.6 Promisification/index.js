function promisify(f) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        function callback(err, ...results) {
          if(err) {
            reject(err)
          } else {
            resolve(results)
          } 
        }
        args.push(callback);
        f.call(this, ...args);
      });
    };
  }
  
  // usage:

  let loadScriptPromise = promisify(loadScript);
  let callBack = (script) => alert(`Cool, the data arr =[ ${script} ] is loaded!`)

  loadScriptPromise('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js')
    .then(callBack, alert);

    function loadScript(src, callback) {
        let script = document.createElement('script');
        script.src = src;
      
        script.onload = () => callback(null, script, " biror qiymat");
        script.onerror = () => callback(new Error(`Script load error for ${src}`));
      
        document.head.append(script);
      }