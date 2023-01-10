
const display = document.querySelector(".answer-display");
const expresion_display = document.querySelector(".expression-display");
display.innerText=0
let new_entry = false;

const num_input = (e) => {
    let val = display.innerText;

    if(new_entry){
        display.innerText = e.target.innerText;
    }

    else if(val == 0) {
        display.innerText = e.target.innerText;
    }
    else if(val.endsWith("+")||val.endsWith("-")||val.endsWith("*")||val.endsWith("/")){
        display.innerText += " " + e.target.innerText ;
    }
    else{
        display.innerText += e.target.innerText;
    }

    new_entry = false;
}

const operator_input = (e) => {
    let val = display.innerText;
    if(val.endsWith("+")||val.endsWith("-")||val.endsWith("*")||val.endsWith("/")){
        delete_input();
    }
    display.innerText += " " + e.target.innerText ;
    new_entry = false;
}

const delete_input = () => {
    let val = display.innerText;
    if(val.length==1){
        display.innerText = 0;
    }
    else{
        display.innerText = val.slice(0,-1);
    }
}

const clear_input = () => {
    display.innerText = "0";
    expresion_display.innerText = ""
}

const calculate = ()=> {
    let val = display.innerText;
    if(val.endsWith("+")||val.endsWith("-")||val.endsWith("*")||val.endsWith("/")){
        //will remove first the trailing operator and consider it as not part of the equation.
        delete_input();
        // update the val...
        val = display.innerText;
    }
    // javascript eval function. magically do the operation correctly! dont worry about operator precedence anymore!
    display.innerText = eval(val); 
    expresion_display.innerText = val + " = ";
    new_entry = true;
}

document.querySelector(".num-btn-grp").addEventListener('click', num_input );
document.querySelector(".oparators-btn-grp").addEventListener('click', operator_input );
document.querySelector("#aux-btn-c").addEventListener('click', delete_input );
document.querySelector("#aux-btn-ac").addEventListener('click', clear_input );
document.querySelector("#aux-btn-equals").addEventListener('click', calculate );


