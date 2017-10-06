'use strict';
/**
 * @author Michael Montaque on 8/14/16.
 *
 * @overview
 * ObjectReader is a class that allows you to access the properties of objects and arrays without fear of having
 * illegal access errors It also allows you to quickly add data and construct your object using simple string dot
 * notation.
 *
 * @example <caption>Install Via NPM</caption>
 * npm install --save montaque-objectreader
 *
 * @example <caption>Install Via Bower</caption>
 * bower install montaque-objectreader
 */



export function ObjectReader(source){
    var _source = source;

    verifySource();
    runPolyfills();


    /**
     * Returns whether or not the reader has a source associated with it
     * @returns {boolean}
     */
    this.doesSourceExists = function(){
        return !!_source;
    };

    /**
     * sets the source of the reader. (The source is the object that will be read.)
     * @param {Object | Array} source changes the source of the reader to the value provided
     */
    this.setSource = function(source){
        var didPass = verifySource(source, true);

        if(didPass)
            _source = source;

        return didPass
    };

    /**
     * Returns the source as given or as an array of objects.
     * @param asArray {Boolean} If true will return source as array
     * @returns {Object | Array} returns the ObjectReader's source. NOTE: the returned source is a deep clone of the
     * original so it can be manipulated without mutating the original
     */
    this.getSource = function(asArray){
        var obj = null;
        if(Array.isArray(_source)){
            return Array.clone(_source)
        }else if(Object.isObject(_source)){
            obj = Object.clone(_source)
        }

        var keys    = asArray && !!obj && Object.keys(obj) || [];

        keys.forEach(function(key){
            if(!Array.isArray(obj))
                obj = [];
            obj.push(_source[key]);
        });

        return obj;
    };

    /**
     * This method allows you to read into an object many levels deep using a string dot notation. If you try to
     * access properties from undefined members it will return undefined or whatever you tell it to return in the
     * defaultProperty param. You can also access array members by referring to the index in the dot notation.
     *
     * @example
     *  var obj = {a:1, b:{c:'test', d:{e:'me'}, f:[30,29,{g:31}]}}
     *  var reader = new ObjectReader(obj);
     *  reader.inspect('a')                         // -> 1
     *  reader.inspect('b.c')                       // -> 'test'
     *  reader.inspect('b.d.e')                     // -> 'me'
     *  reader.inspect('b.f.2.g')                   // -> 31
     *  reader.inspect(b.d.f.g, 'Does not exist')   // -> 'Does not exist'
     *
     * @param {String} propertyString  Dot notations string path to the key you want to access
     * @param {any} defaultProperty    value you want to return if the accessed key is non-existent
     * @returns {any}
     */
    this.inspect = function(propertyString, defaultProperty){
        var propertyArray = propertyString.split('.');
        var intermediate = _source;

        propertyArray.forEach(function(property){
            if(intermediate){
                intermediate = intermediate[property];
            }
        });

        if((intermediate === undefined || intermediate === null) && defaultProperty !== undefined)
            return defaultProperty;
        return  intermediate;
    };


    /**
     * Sets the given value to the key dictated by the keyString using recursion. If isStrict is set to true then the
     * function will fail and return false when trying to set a value to illegal objects or if the path dictated by
     * the keyString does not exist. If successful, this method mutates the original object (source).
     *
     * @example
     *  var obj = {a:1, b:{c:'test', d:{e:'me'}}}
     *  var reader = new ObjectReader(obj);
     *
     *  // To set a new value at an existing key path
     *  reader.inject('b.c', 3)   // true  ( obj.b.c -> 3 )
     *
     *  // To set a new value at a shallow non-existent path
     *  reader.inject('b.d.f', 'new value' )   // true ( obj.b.d.f -> 'new value' )
     *
     *  // To set a new value at a deep non-existent path
     *  reader.inspect('e.f.g', 'created')          // true ({a:1, b:{c:'test', d:{e:'me'}}, e:{f:{g:created}})
     *
     *  // You can also set arrays by using number
     *  reader.inspect(a.0.b.0, 'exist')            // true (obj -> {a:[{b:['exist']}], b:{c:'test', d:{e:'me'}})
     *
     *  // To safely set a new value at a deep non-existent path without unexpected mutations
     *  reader.inspect('b.c.d', 'fail', true)       // false (obj.b.c.d does not exist so nothing happens)
     *  reader.inspect('e.f.g', 'fail', true)       // false (obj.e does not exist so nothing happens)
     *  reader.inspect('e', 'pass', true)           // true (obj -> {a:1, b:{c:'test', d:{e:'me'}}, e:'pass')
     *

     *
     * @param {String} keyString    - Path (Denoted in string dot notation) of where to set the value
     * @param {Any} value           - value you want to set
     * @param {Boolean} isStrict    - protects the object from unintended mutations.
     * @returns {Boolean}   - Returns true if successful.
     */
    this.inject = function(keyString, value, isStrict){

        // Make sure a source exists
        if(!_source){
            throw  new Error("Please set a source. (use setSource method)")
        }

        if(typeof keyString !== 'string' || !keyString ){
            throw new Error('inject method needs a non-empty string for the source')
        }

        // get the keys & source
        var propertyArray = keyString.split('.');
        var intermediate = _source;


        // uses recursion to mutate the object
        return  helper(intermediate, propertyArray, value);

        /*
         * initialized the object based on the given key. If the key is numerical then it will initialize an array.
         * otherwise it will init an object.
         *
         * @param data
         * @param key
         */
        function setup(data, key){
            const { prevKey } = ObjectReader;
            const num = parseFloat(key);

            // If there is no previous key then this must be our first time around so...
            if( prevKey === undefined ){

                // if the data exists (is object)
                if(typeof data[key] === 'object')
                    return data[key];

                // Save the key
                ObjectReader.prevKey = key;

                // Return the current data
                return data;
            }
            // Memorize the current key
            ObjectReader.prevKey = key;

            // If true the key was some character
            if(isNaN(num)){
                 data[prevKey] = data[prevKey] || {}
            }else{
                 data[prevKey] = data[prevKey] || []
            }

            return data[prevKey]
        }


        /*
         * Utilizes recursion to store the given input at the specified key.
         * @param source
         * @param keys
         * @param input
         * @returns {Boolean}
         */
        function helper(source, keys, input) {


            // get the first key and remove it from the array
            let key =  keys.shift();

            // if this is the last key set the value
            if( keys.length === 0 ){

                // Prevent creating new properties on level 1
                if(isStrict && isInvalid(source[key])){
                    return false
                }

                setup(source, key)[ObjectReader.prevKey] = input;

                delete ObjectReader.prevKey;

                return true
            }


            // cache the data
            let data = source[key];

            // if strict then we cannot create new properties. Only overwrite existing ones
            if(isStrict && isInvalid(data))
                return false;

            // We can create new properties (data == null | undefined) or add to existing objects (data = object)
            else if(data === null || data === undefined || typeof data === 'object'){

                return helper(setup(source, key), keys, input);
            }

            // we cannot modify primitives
            else
                return false


        }

    };

    function isInvalid(test){
        return test === undefined || test === null  || !(typeof test === 'object')
    }

    /**
     * Overrides the toString method to return the object back as a string
     */
    this.toString = function(){
        return objToString(_source)
    };

    function objToString(obj, ndeep=1) {
        //create an array that will later be joined into a string.
        if(obj == null){ return String(obj); }
        switch(typeof obj){
            case "string": return '"'+obj+'"';
            case "function": return obj.toString();
            case "object":
                var indent = Array(ndeep||1).join('\t'), isArray = Array.isArray(obj);
                return '{['[+isArray] + Object.keys(obj).map(function(key){
                    return '\n\t' + indent + key + ': ' + objToString(obj[key], (ndeep||1)+1);
                }).join(',') + '\n' + indent + '}]'[+isArray];
            default: return obj.toString();
        }
    }
    /*
        Make sure the source is of an acceptable type
     */
    function verifySource(source, suppressError){
        source = source || _source;

        switch(typeof source){
            case 'number':
            case 'string':
                if(suppressError)
                    return false;
                throw new Error( typeof source + ' is not a acceptable parameter for the ObjectReader')
            default:
                return true;
        }
    }

    /*
     * Setup all the polyfills needed to run this framework
     */
    function runPolyfills(){

        // adds Object.isObject
        objectTruthyPolyfill();

        // adds Object.clone
        objectClonePolyfill();

        // add Array.clone
        arrayClonePolyfill();

        // polyfill for Object.assign
        polyfill();

        function objectTruthyPolyfill(){
            if (typeof Object.isObject != 'function') {
                Object.isObject = function(target){
                    return Object.prototype.toString.call( target ) === '[object Object]'
                }
            }
        }

        function objectClonePolyfill(){
            if (typeof Object.clone != 'function') {

                Object.clone = function(target) {
                    if (!Object.isObject(target)) {
                        throw new Error("target needs to be an object")
                    }

                    var keys = Object.keys(target);
                    var copy = {};

                    keys.forEach(function(key){
                        var val = target[key];

                        if(Object.isObject(val)){
                            copy[key] = Object.clone(val)
                        }else if(Array.isArray(val)){
                            copy[key] = Array.clone(val)
                        }else{
                            copy[key] = val;
                        }

                    });

                    return copy;
                }
            }
        }

        function arrayClonePolyfill(){
            if (typeof Array.clone != 'function') {

                Array.clone = function(target) {
                    var copy = [];

                    if (!Array.isArray(target)) {
                        throw new Error("target needs to be an Array")
                    }

                    target.forEach(function(val, idx){

                        if(Object.isObject(val)){
                            copy[idx] = Object.clone(val)
                        }else if(Array.isArray(val)){
                            copy[idx] = Array.clone(val)
                        }else{
                            copy[idx] = val;
                        }

                    });

                    return copy;
                }
            }
        }

        function polyfill(){
            if (typeof Object.assign != 'function') {
                Object.assign = function(target) {
                    'use strict';
                    if (target == null) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    target = Object(target);
                    for (var index = 1; index < arguments.length; index++) {
                        var source = arguments[index];
                        if (source != null) {
                            for (var key in source) {
                                if (Object.prototype.hasOwnProperty.call(source, key)) {
                                    target[key] = source[key];
                                }
                            }
                        }
                    }
                    return target;
                };
            }
        }
    }
};

