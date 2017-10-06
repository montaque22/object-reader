import {ObjectReader} from "./object-reader";

const keypath = $('#keypath ~ input');
const defaultValue = $('.group-2.default');
const value = $('.group-2.value');
const isStrict = $('.group-3');
const code = $('#display');
const swapable =  $('.swapable');
const methodDisplay = $('#method-display');
const injectMethod = $('#inject-method');
const inspectMethod = $('#inspect-method');
const Use = {
    inspect: () => {
        $('.group-3.answer').val(reader.inspect(keypath.val(), defaultValue.val()));
        updateObjectRepresentation();
    },
    inject: () => {
        var ans = reader.inject(keypath.val(), value.val(), isStrict.is(':checked'));
        if (!ans){
            $('.params').velocity('callout.shake')
        }
        updateObjectRepresentation();
    }
};
const Display =  {
    inject: () => {
        const html = Prism.highlight(`reader.inject(${keypath.val() || 'path'}, ${value.val() || 'value'}, [isStrict=${!!isStrict.is(':checked')}])`, Prism.languages.javascript);
        methodDisplay.html(html);
    },
    inspect: () =>{
        const html = Prism.highlight(`reader.inspect(${keypath.val() || 'path'}, ${value.val() || '[defaultValue]'})`, Prism.languages.javascript);
        methodDisplay.html(html);
    }
};
let method = '';
let reader = null;
const deepObj = {
    a: "hello",
    peanut:{
        butter:{
            and:["jelly","time"]
        }
    },
    c: function(){
        return 'Read a book'
    },
    d: 'done'
};

keypath.keyup(updateMethodDisplay);
value.keyup(updateMethodDisplay);
isStrict.click(updateMethodDisplay);
injectMethod.click(changeMethod);
inspectMethod.click(changeMethod);


init();


// Prefills the object reader with the given data
$('#prefill').click(()=>{

    // update the object reader
    reader.setSource(deepObj);

    // update the object representation section
    updateObjectRepresentation();
})

// Cleans the object and starts over
$('#reset').click(init);


$('#submit').click((key) =>{
    try{
        // Calls the appropriate function
        Use[method]();
    }catch (err){
        // updates the object board
        updateObjectRepresentation(err.message);
    }finally {

        // update the method board
        updateMethodDisplay();
    }

});



function init(){

    // creates a new object reader
    reader = new ObjectReader({});

    // setup the inject method as default
    injectMethod.click();

    // Prints the object
    updateObjectRepresentation()
}

/**
 *
 */
function updateMethodDisplay(){
    Display[method]();
}

function updateObjectRepresentation(msg){
    const log = Prism.highlight(reader.toString(), Prism.languages.javascript);
    keypath.val('')
    value.val('')
    code.html(msg || log);
    console.log(msg)
}

// Changes the method to the users selection
function changeMethod(e){
    // Change the new method
    swapable.removeClass(method + '-mode');

    $(`#${method}-method`).removeClass('btn-success').addClass('btn-link');

    method = e.target.getAttribute('method');

    $(`#${method}-method`).removeClass('btn-link').addClass('btn-success');

    swapable.addClass(method + '-mode');




    // update the method board
    updateMethodDisplay()
}

// (function(ObjectReader){
//     var deepObj = {
//         a: "hello",
//         b:{
//             a:"world",
//             b:['item 1',function(){
//                 return "item 2"
//             },{
//                 a: 'Item 3'
//             }],
//         },
//         c:function(){
//             return 'hello world function'
//         }
//     };
//
//     var read = new ObjectReader(deepObj);
//
//     // Printing Objects
//     console.log(read.getSource());
//     console.log(read.getSource(true));
//
//     console.log(read.inspect('a'));                 // hello
//     console.log(read.inspect('b.a'));               // world
//     console.log(read.inspect('c')());               // hello world function
//
//     var shallowObj = read.inspect('b');
//     read.setSource(shallowObj);                     // sets the source of the reader
//
//     console.log(read.inspect('a'));                 // world
//     console.log(read.inspect('b.2.a'));             // Item 3
//     console.log(read.inspect('c', function(){       // fired because c does not exist
//         return "fired because c does not exist";
//     })());
//
//     var shallowArray = read.inspect('b');
//     read.setSource(shallowArray);
//
//     console.log(read.inspect('0'));                 // item 1
//     console.log(read.inspect('2'));                 // {a: 'Item 3'}
//     console.log(read.inspect('5'));                 // undefined
//     console.log(read.inspect('5','alternate'));     // alternate
//
//     // Printing Arrays
//     console.log(read.getSource());
//     console.log(read.getSource(true));
//
//
//     read.setSource(deepObj);
//     console.log(read.inject('b.a', 'mike', true));
//     debugger
// })(ObjectReader);
