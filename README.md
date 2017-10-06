# Object-Reader [![Build Status](https://travis-ci.org/montaque22/object-reader.svg?branch=master)](https://travis-ci.org/montaque22/object-reader)


### Table of Contents

-   [ObjectReader](#objectreader)
    -   [doesSourceExists](#doessourceexists)
    -   [setSource](#setsource)
    -   [getSource](#getsource)
    -   [inspect](#inspect)
    -   [inject](#inject)
    -   [toString](#tostring)

## ObjectReader

ObjectReader is a class that allows you to access the properties of objects and arrays without fear of having
illegal access errors It also allows you to quickly add data and construct your object using simple string dot
notation.

**Parameters**

-   `source`  

**Examples**

_Install Via NPM_

```javascript
npm install --save montaque-objectreader
```

_Install Via Bower_

```javascript
bower install montaque-objectreader
```

_Other_

```javascript
// Or just download and place the object-reader.js file in your directory and enjoy.
```

**Meta**

-   **author**: Michael Montaque on 8/14/16.

### doesSourceExists

Returns whether or not the reader has a source associated with it

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### setSource

sets the source of the reader. (The source is the object that will be read.)

**Parameters**

-   `source`  {Object | Array} changes the source of the reader to the value provided

### getSource

Returns the source as given or as an array of objects.

**Parameters**

-   `asArray`  {Boolean} If true will return source as array

Returns **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** returns the ObjectReader's source. NOTE: the returned source is a deep clone of the
original so it can be manipulated without mutating the original

### inspect

This method allows you to read into an object many levels deep using a string dot notation. If you try to
access properties from undefined members it will return undefined or whatever you tell it to return in the
defaultProperty param. You can also access array members by referring to the index in the dot notation.

**Parameters**

-   `propertyString`  {String}   Dot notations string path to the key you want to access
-   `defaultProperty`  {any}     value you want to return if the accessed key is non-existent

**Examples**

```javascript
var obj = {a:1, b:{c:'test', d:{e:'me'}, f:[30,29,{g:31}]}}
 var reader = new ObjectReader(obj);
 reader.inspect('a')                         // -> 1
 reader.inspect('b.c')                       // -> 'test'
 reader.inspect('b.d.e')                     // -> 'me'
 reader.inspect('b.f.2.g')                   // -> 31
 reader.inspect(b.d.f.g, 'Does not exist')   // -> 'Does not exist'
```

Returns **any** 

### inject

Sets the given value to the key dictated by the keyString using recursion. If isStrict is set to true then the
function will fail and return false when trying to set a value to illegal objects or if the path dictated by
the keyString does not exist. If successful, this method mutates the original object (source).

**Parameters**

-   `keyString`  Path (Denoted in string dot notation) of where to set the value
-   `value`  value you want to set
-   `isStrict`  protects the object from unintended mutations.

**Examples**

```javascript
var obj = {a:1, b:{c:'test', d:{e:'me'}}}
 var reader = new ObjectReader(obj);

 // To set a new value at an existing key path
 reader.inject('b.c', 3)   // true  ( obj.b.c -> 3 )

 // To set a new value at a shallow non-existent path
 reader.inject('b.d.f', 'new value' )   // true ( obj.b.d.f -> 'new value' )

 // To set a new value at a deep non-existent path
 reader.inspect('e.f.g', 'created')          // true ({a:1, b:{c:'test', d:{e:'me'}}, e:{f:{g:created}})

 // You can also set arrays by using number
 reader.inspect(a.0.b.0, 'exist')            // true (obj -> {a:[{b:['exist']}], b:{c:'test', d:{e:'me'}})

 // To safely set a new value at a deep non-existent path without unexpected mutations
 reader.inspect('b.c.d', 'fail', true)       // false (obj.b.c.d does not exist so nothing happens)
 reader.inspect('e.f.g', 'fail', true)       // false (obj.e does not exist so nothing happens)
 reader.inspect('e', 'pass', true)           // true (obj -> {a:1, b:{c:'test', d:{e:'me'}}, e:'pass')
```

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Returns true if successful.

### toString

Overrides the toString method to return the object back as a string

**Parameters**

-   `nDeep`  
