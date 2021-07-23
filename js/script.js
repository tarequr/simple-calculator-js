/*............... history section ...............*/
function getHistory() {
    return document.getElementById('history-value').innerText;
}

function printHistory(num) {
    document.getElementById('history-value').innerText = num;
}

/*............... output section ...............*/
function getOutput() {
    return document.getElementById('output-value').innerText;
}

function printOutput(num) {
    if (num == '') {
        document.getElementById('output-value').innerText = num; //when we click clear button show empty value.
    }else{
        document.getElementById('output-value').innerText = formatNumber(num);
    }
}

/*............... remove ( , ) from number ...............*/
function normalNumber(num) {
    return Number(num.replace(/,/g,""));
}

/*............... here number is formating like 1200 = 1,200 ...............*/
function formatNumber(num) {
    let number = Number(num); //convert string to number. 
    let formatNum = number.toLocaleString('en'); //number formating.
    
    return formatNum;
}

/*............... here catch the all number of calculator button ...............*/
let history; //global variable.
let number = document.getElementsByClassName('number');
for (let i = 0; i < number.length; i++) {
    const allNumber = number[i];
    allNumber.addEventListener('click', function(){
        history = getHistory();
        historyValue = history + this.id;
        printHistory(historyValue);
    })
    
}

/*............... here catch the all operator of calculator button ...............*/
let operator = document.getElementsByClassName('operator');
for (let i = 0; i < operator.length; i++) {
    const allOperator = operator[i];
    allOperator.addEventListener('click', function(){
        if (this.id == 'clear') {
            printHistory(''); //history clear
            printOutput(''); //output clear
        }else if (this.id == 'backspace') {
            history = getHistory();
            historyBackspace = history.substr(0, history.length - 1); //here value start 0 and remove a data last element.
            printHistory(historyBackspace);
            printOutput('');
        }else if (this.id == '=') {
            history = getHistory();
            let result = eval(history); //eval work for mathmatical term.

            if (result.toString().length <= 12) {
                printOutput(result);
                printHistory(history + '=');
            }else{
                alert('Your result is too much value for this calculator');
            }
            
        }else{
            let output = getOutput();
            history = getHistory();

            if (output) {
                historyValue = normalNumber(output) + this.id;
                printHistory(historyValue); //remove ( , ) using normalNumber function & calculate new vlue with old vlue
            }else if (history == '') {
                printHistory(''); //we cann't fist time use operator like + , _ , * .....
            }else if (isNaN(history[history.length - 1])) {
                historyValue = history.substr(0, history.length - 1) + this.id;
                printHistory(historyValue); //we cann't use multiple operator together. like 12*+-30 .
            }else{
                historyValue = history + this.id;
                printHistory(historyValue); //show result.
            }
                        
        }
    })
    
}