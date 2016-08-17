(function(ObjectReader){
    var deepObj = {
        a: "hello",
        b:{
            a:"world",
            b:['item 1',function(){
                return "item 2"
            },{
                a: 'Item 3'
            }],
        },
        c:function(){
            return 'hello world function'
        }
    };

    var read = new ObjectReader(deepObj);

    // Printing Objects
    console.log(read.getSource());
    console.log(read.getSource(true));

    console.log(read.inspect('a'));                 // hello
    console.log(read.inspect('b.a'));               // world
    console.log(read.inspect('c')());               // hello world function

    var shallowObj = read.inspect('b');
    read.setSource(shallowObj);                     // sets the source of the reader

    console.log(read.inspect('a'));                 // world
    console.log(read.inspect('b.2.a'));             // Item 3
    console.log(read.inspect('c', function(){       // fired because c does not exist
        return "fired because c does not exist";
    })());

    var shallowArray = read.inspect('b');
    read.setSource(shallowArray);

    console.log(read.inspect('0'));                 // item 1
    console.log(read.inspect('2'));                 // {a: 'Item 3'}
    console.log(read.inspect('5'));                 // undefined
    console.log(read.inspect('5','alternate'));     // alternate

    // Printing Arrays
    console.log(read.getSource());
    console.log(read.getSource(true));


    read.setSource(deepObj);
    console.log(read.inject('b.a', 'mike', true));
    debugger
})(ObjectReader);
