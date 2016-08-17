<a name="montaque"></a>
## montaque : <code>object</code>
**Kind**: global namespace  

* [montaque](#montaque) : <code>object</code>
  * [.ObjectReader](#montaque.ObjectReader)
    * [new montaque.ObjectReader(source)](#new_montaque.ObjectReader_new)
    * [.doesSourceExists()](#montaque.ObjectReader#doesSourceExists) ⇒ <code>boolean</code>
    * [.setSource(source)](#montaque.ObjectReader#setSource)
    * [.getSource(asArray)](#montaque.ObjectReader#getSource) ⇒ <code>Object</code> &#124; <code>Array</code>
    * [.inspect(propertyString, defaultProperty)](#montaque.ObjectReader#inspect) ⇒ <code>any</code>
    * [.inject(keyString, value, isStrict)](#montaque.ObjectReader#inject) ⇒ <code>Boolean</code>

<a name="montaque.ObjectReader"></a>
### montaque.ObjectReader
**Kind**: static class of <code>[montaque](#montaque)</code>  

* [.ObjectReader](#montaque.ObjectReader)
  * [new montaque.ObjectReader(source)](#new_montaque.ObjectReader_new)
  * [.doesSourceExists()](#montaque.ObjectReader#doesSourceExists) ⇒ <code>boolean</code>
  * [.setSource(source)](#montaque.ObjectReader#setSource)
  * [.getSource(asArray)](#montaque.ObjectReader#getSource) ⇒ <code>Object</code> &#124; <code>Array</code>
  * [.inspect(propertyString, defaultProperty)](#montaque.ObjectReader#inspect) ⇒ <code>any</code>
  * [.inject(keyString, value, isStrict)](#montaque.ObjectReader#inject) ⇒ <code>Boolean</code>

<a name="new_montaque.ObjectReader_new"></a>
#### new montaque.ObjectReader(source)
Takes in a source object such as an array or object. Even if the source object is updated the ObjectReader
is pointing to the original and will contain the updated values


| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> &#124; <code>Array</code> | the object or array to inspect |

**Example**  
```js
var obj = {a:1, b:{c:'test', d:{e:'me'}}}
var reader = new ObjectReader(obj);

// alternatively
var reader = new montaque.ObjectReader(obj)

// or if you have npm
var ObjectReader = require('ObjectReader');
var reader = new ObjectReader(obj)

// or if you are using angular
angular.modules(<YOUR-APP-NAME>, ['montaque.objectreader']).run(['ObjectReader' function(ObjectReader){
     var reader = new ObjectReader(obj)
}])
```
<a name="montaque.ObjectReader#doesSourceExists"></a>
#### objectReader.doesSourceExists() ⇒ <code>boolean</code>
Returns whether or not the reader has a source associated with it

**Kind**: instance method of <code>[ObjectReader](#montaque.ObjectReader)</code>  
<a name="montaque.ObjectReader#setSource"></a>
#### objectReader.setSource(source)
sets the source of the reader. (The source is the object that will be read.)

**Kind**: instance method of <code>[ObjectReader](#montaque.ObjectReader)</code>  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>Object</code> &#124; <code>Array</code> | changes the source of the reader to the value provided |

<a name="montaque.ObjectReader#getSource"></a>
#### objectReader.getSource(asArray) ⇒ <code>Object</code> &#124; <code>Array</code>
Returns the source as given or as an array of objects.

**Kind**: instance method of <code>[ObjectReader](#montaque.ObjectReader)</code>  
**Returns**: <code>Object</code> &#124; <code>Array</code> - returns the ObjectReader's source. NOTE: the returned source is a deep clone of the
original so it can be manipulated without mutating the original  

| Param | Type | Description |
| --- | --- | --- |
| asArray | <code>Boolean</code> | If true will return source as array |

<a name="montaque.ObjectReader#inspect"></a>
#### objectReader.inspect(propertyString, defaultProperty) ⇒ <code>any</code>
This method allows you to read into an object many levels deep without throwing an error if you access
an undefined property. If you access an undefined property it will return undefined or it will return
the value you specified in the defaultProperty param.

**Kind**: instance method of <code>[ObjectReader](#montaque.ObjectReader)</code>  

| Param | Type | Description |
| --- | --- | --- |
| propertyString | <code>String</code> | Dot notations string path to the key you want to access |
| defaultProperty | <code>any</code> | value you want to return if the accessed key is non-existent |

**Example**  
```js
var obj = {a:1, b:{c:'test', d:{e:'me'}}}
 var reader = new ObjectReader(obj);
 reader.inspect('a')                         // -> 1
 reader.inspect('b.c')                       // -> test
 reader.inspect('b.d.e')                     // -> me
 reader.inspect(b.d.f.g, 'Does not exist')   // -> 'Does not exist'
```
<a name="montaque.ObjectReader#inject"></a>
#### objectReader.inject(keyString, value, isStrict) ⇒ <code>Boolean</code>
Sets the given value to the key dictated by the keyString using recursion. If isStrict is set to true then the
function will fail and return false when trying to set a value to illegal objects or if the path dictated by
the keyString does not exist. If successful, this method mutates the original object (source).

**Kind**: instance method of <code>[ObjectReader](#montaque.ObjectReader)</code>  
**Returns**: <code>Boolean</code> - - Returns true if successful.  

| Param | Description |
| --- | --- |
| keyString | Path (Denoted in string dot notation) of where to set the value |
| value | value you want to set |
| isStrict | protects the object from unintended mutations. |

**Example**  
```js
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
