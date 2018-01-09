// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var arrOfKeyVals = [],
     arrVals = [],
     objKeys = [];

   // check for primitive types : ARRAYS
   if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null)
     return '' + obj;
   else if (typeof obj === 'string')
     return '"' + obj + '"';

   // check for ARRAYS
   else if (Array.isArray(obj)) {
     //check for empty array
     if (obj[0] === undefined)
       return '[]';
     else {
       obj.forEach(function(el) {
         arrVals.push(stringifyJSON(el));
       });
       return '[' + arrVals + ']';
     }
   }
   // check for OBJECTS
   else if (obj instanceof Object) {
     //get object keys
     objKeys = Object.keys(obj);
     //set key output;
     objKeys.forEach(function(key) {
       var keyOut = '"' + key + '":';
       var keyValOut = obj[key];
         // check to skip functions and undefined prop
       if (keyValOut instanceof Function || typeof keyValOut === undefined)
         arrOfKeyVals.push('');
       else if (typeof keyValOut === 'string')
         arrOfKeyVals.push(keyOut + '"' + keyValOut + '"');
       else if (typeof keyValOut === 'boolean' || typeof keValOut === 'number' || keyValOut === null)
         arrOfKeyVals.push(keyOut + keyValOut);
       //check for nested objects, call recursively until no more objects
       else if (keyValOut instanceof Object) {
         arrOfKeyVals.push(keyOut + stringifyJSON(keyValOut));
       }
     });
     return '{' + arrOfKeyVals + '}';
   }
  };
