// The first resolve/reject call is execute, others is ignored
// The implemented resolve function get the param is the primitive value, not a promise
function f1() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        
        resolve(1);
      }, 3000);
    });
  }

  f1().then(function(x) {
    console.log('I get value: ', x);
    return 'aaaa';
  })
  .then(function(y) {
    
    console.log("Hello ", y);
    return new Promise(function(resolve, reject) {
      console.log('Do nothing');
      //resolve('ccccc');
      resolve(new Promise(function(resolve, reject) {
        resolve('dddd');
        reject('eeee');
      }));
      return 'bbbb';
    });
  })
  .then(function(z) {
    console.log("Goodbye ", z);
    z.then(function(a) {
      console.log('Ciao ', a);
    });  
  });
  
  /*
  > "I get value: " 1
  > "Hello " "aaaa"
  > "Do nothing"
  > "Goodbye " "dddd"

  z.then is not a function
  */