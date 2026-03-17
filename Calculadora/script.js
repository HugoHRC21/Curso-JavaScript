const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;

const divide = (a,b) => {
    if(b === 0){
        return "Error: cannot divide by 0";
    }
    return a / b;
};

function getNumber(){
    const n1 = parseFloat(document.getElementById("number1").value);
    const n2 = parseFloat(document.getElementById("number2").value);
    return [n1,n2];
};

document.getElementById("btnAdd").addEventListener("click", () => {
    const [n1,n2] = getNumber();
    document.getElementById("result").innerText = "Result: " + add(n1,n2);
});

document.getElementById("btnSubtract").addEventListener("click", () => {
    const [n1,n2] = getNumber();
    document.getElementById("result").innerText = "Result: " + subtract(n1,n2);
});

document.getElementById("btnMultiply").addEventListener("click", () => {
    const [n1,n2] = getNumber();
    document.getElementById("result").innerText = "Result: " + multiply(n1,n2);
});

document.getElementById("btnDivide").addEventListener("click", () => {
    const [n1,n2] = getNumber();
    document.getElementById("result").innerText = "Result: " + divide(n1,n2);
});

