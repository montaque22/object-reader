# ObjectReader

[![Build Status](https://travis-ci.org/montaque22/object-reader.svg?branch=master)](https://travis-ci.org/montaque22/object-reader)

**ObjectReader** provides a safe way to access and modify arrays and objects. Gone are the days of seeing... 
>TypeError: Cannot read property '{insert non-existent property name here}' of undefined. 

**ObjectReader** allows you to access all the undefined properties and array indecies you want without complaining.
 
 #### Example
 ```js
 var ObjectReader = require('montaque-objectreader').ObjectReader;
 var obj = {a:1, b:{c:'test', d:{e:'me'}}}
 var reader = new ObjectReader(obj);
 reader.inspect('b.d.e')    // -> me
 reader.inspect('b.d.nonExistentProperty.anotherNonExistentPropery')    // -> undefined
 reader.inspect('b.d.nonExistentProperty', 'Return this if not exist')  // -> 'Return this if not exist'
 reader.inject('b.d.nonExistentProperty', 'i exist') // obj.b.d.nonExistentProperty -> 'i exist'
 ```
 
 ## Installation
 
 **Install Via Node**
```sh
$ npm install --save montaque-objectreader
```

 **Install Via Bower**
```sh
$ bower install --save montaque-objectreader
```
**Other**
Feel free to manually add this to your web projects and enjoy.

## API
To see all the awesome things ObjectReader can do check out the [API HERE](API.md)
## License
Copyright (c) 2016, Michael Montaque <montaque.developer@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

