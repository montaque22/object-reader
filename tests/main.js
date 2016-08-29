/**
 * Created by mmontaque on 8/19/16.
 */
var should          = require('chai').should();
var assert          = require('assert');
var ObjectReader    = require('../src/js/object-reader.js');



describe('Testing: constructor', function() {

    it('Should throw an error if given an number', function() {
        assert.throws(function(){
            new ObjectReader(4);
        }, Error, 'Constructor was supposed to throw an error');
    });

    it('Should return an ObjectReader Object if given an Object or Array', function() {
        var reader1 = new ObjectReader({});
        var reader2 = new ObjectReader([]);
        reader1.should.be.instanceOf(ObjectReader);
        reader2.should.be.instanceOf(ObjectReader);
    });


    it('Should return an ObjectReader Object if given nothing', function() {
        var reader = new ObjectReader();
        reader.should.be.instanceOf(ObjectReader)
    });

});

describe('Testing: getSource', function() {
    var obj = {
        a: 1,
        b: {
            c: 2,
            d: [{
                e: "f"
            }]
        }
    };
    var arr = [
        {
            a:'b',
            c:['d']
        },
        {
            e:'f'
        }];


    it('It should return the same object (Object)', function() {
        var reader = new ObjectReader(obj);
        assert.deepEqual(reader.getSource(), obj, 'Objects are not the same');
    });

    it('It should return the same object (Array)', function() {
        var reader = new ObjectReader(arr);
        assert.deepEqual(reader.getSource(), arr, 'Objects are not the same');
    });

    it('It should return an array with the same values when parameter is true (Object)', function() {
        var reader = new ObjectReader(obj);
        assert.deepEqual(reader.getSource(true), [ 1, {c: 2, d: [{ e: "f"}]}], 'Objects are not the same');
    });

    it('It should return an array with the same values when parameter is true (Array)', function() {
        var reader = new ObjectReader(arr);
        assert.deepEqual(reader.getSource(true), arr, 'Objects are not the same');
    });


});

describe('Testing: setSource', function() {

    it('Should return false if given an number', function() {
        var reader = new ObjectReader({});
        reader.setSource(4).should.equal(false)
    });

    it('Should return false if given a string "test"', function() {
        var reader = new ObjectReader({});
        reader.setSource("test").should.equal(false)
    });

    it('Should remain the same after returning false from setting a bad source', function() {
        var x = {a:1};
        var reader = new ObjectReader(x);
        reader.setSource("test");
        assert.deepEqual(reader.getSource(), x, 'not equal to the old object');
    });

    it('Should return the new object after successful set', function() {
        var a = {a:1};
        var b = {b:1};
        var reader = new ObjectReader(a);
        reader.setSource(b);
        assert.deepEqual(reader.getSource(), b, 'Not equal to the new object');
    });


    it('Should return an true if given an Array or object', function() {
        var reader = new ObjectReader();
        reader.setSource([]).should.be.equal(true);
        reader.setSource({}).should.be.equal(true);
    });

});

describe('Testing: inspect', function() {
    var obj = {
        a: 1,
        b: {
            c: 2,
            d: [{
                e: "f"
            }]
        }
    };
    var arr = [
        {
            a:'b',
            c:['d','e']
        },
        {
            f:'g'
        }];

    it('Should fetch deep array value from object', function() {
        var reader = new ObjectReader(obj);
        assert.equal(reader.inspect('b.d.0.e'),'f', 'was supposed to return "f');
    });

    it('Should fetch deep object value from array', function() {
        var reader = new ObjectReader(arr);
        assert.equal(reader.inspect('0.c.1'),'e', 'was supposed to return "e');
    });

    it('Should return undefined if accessing 3 levels deep of undefined', function() {
        var reader = new ObjectReader(obj);
        assert.equal(reader.inspect('a.d.0.e'),undefined, 'was supposed to return undefined');
    });

    it('Should return "Check" if accessing 3 levels deep of undefined', function() {
        var reader = new ObjectReader(obj);
        assert.equal(reader.inspect('a.d.0.e', "Check"),'Check', 'was supposed to return Check');
    });

});

describe('Testing: inject', function() {
    var obj = {};

    beforeEach(function() {
        obj = {
            a: 1,
            b: {
                c: 2,
                d: [{
                    e: "f"
                }]
            }
        };
    });

    it('Should successfully modify a deep existing value', function() {
        var reader = new ObjectReader(obj);
        assert.ok(reader.inject('b.d.0.e', 5), 'was supposed to return true');
    });

    it('Should successfully create a deep value from existing path', function() {
        var reader = new ObjectReader(obj);
        reader.inject('b.d.0.g.2', 'h').should.be.equal(true);
        reader.getSource().should.have.deep.property('b.d.0.g.2', 'h');
    });

    it('Should fail to create a deep value from a non-existing path', function() {
        var reader = new ObjectReader(obj);
        reader.inject('b.d.0.g.2', 5, true).should.equal(false)
        reader.getSource().should.not.have.deep.property('b.d.0.g.2');
    });

});

describe('Testing: doesSourceExist', function() {

    it('Should return true if initialized with an objectbor array', function() {
        var reader = new ObjectReader({});
        reader.doesSourceExists().should.equal(true);
        reader.setSource([]);
        reader.doesSourceExists().should.equal(true);
    });

    it('Should return false if initialized with nothing', function() {
        var reader = new ObjectReader();
        reader.doesSourceExists().should.equal(false);
    });
    

});
