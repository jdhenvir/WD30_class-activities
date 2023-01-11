
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
    let val_arr;
    if(val.endsWith("+")||val.endsWith("-")||val.endsWith("*")||val.endsWith("/")){
        //will remove first the trailing operator and consider it as not part of the equation.
        delete_input();
        // update the val...
        val = display.innerText;
    }
    val_arr = val.split(' ');
    console.log(val_arr);
    // first loop run to evaluate multiplications or division operations.
    for (let i = 0; i < val_arr.length; i++) {
        if (val_arr[i] == '*'){
            val_arr[i] = val_arr[i + 1] * val_arr[i - 1];
            val_arr.splice(i + 1, 1)
            val_arr.splice(i - 1, 1)
            i--;
            console.log(val_arr);
            continue;
        }
        if (val_arr[i] === '/') {
            val_arr[i] = val_arr[i - 1] / val_arr[i + 1];
            val_arr.splice(i + 1, 1)
            val_arr.splice(i - 1, 1);
            i--;
            console.log(val_arr);
        }
        }

    // second loop run to evaluate addition or subtraction operations.
    for (let i = 0; i < val_arr.length; i++) {
        if (val_arr[i] == '+'){
            val_arr[i] = (+val_arr[i - 1]) + (+val_arr[i + 1]);
            val_arr.splice(i + 1, 1)
            val_arr.splice(i - 1, 1)
            i--;
            console.log(val_arr);
            continue;
        }
        if (val_arr[i] === '-') {
            val_arr[i] = (+val_arr[i - 1]) - (+val_arr[i + 1]);
            val_arr.splice(i + 1, 1)
            val_arr.splice(i - 1, 1);
            i--;
            console.log(val_arr);
        }
    }

    // Checking to see if the result have a decimal point if so round it up to two decimal points
    if (val_arr[0] % 1 !== 0) {
        val_arr[0] = val_arr[0].toFixed(2);
    }

    // print the result in display
    display.innerText = val_arr[0]; 
    expresion_display.innerText = val + " = ";
    new_entry = true;
}

function operate(operation) {
   
    /* Checking to see if the result have a decimal point if so round it up to two decimal points for better readability else just set operation result to it's original value*/
    if (operation[0] % 1 !== 0) {
      operationResult = Math.round(operation[0] * 100) / 100;
    } else {
      operationResult = operation[0];
    }
    return operationResult;
  }


document.querySelector(".num-btn-grp").addEventListener('click', num_input );
document.querySelector(".oparators-btn-grp").addEventListener('click', operator_input );
document.querySelector("#aux-btn-c").addEventListener('click', delete_input );
document.querySelector("#aux-btn-ac").addEventListener('click', clear_input );
document.querySelector("#aux-btn-equals").addEventListener('click', calculate );


