const formDom = document.getElementById('formulario')
var accounts = [
    { user: "Mali", password: "123", balance: 200.00},
    { user: "Gera", password: "456", balance: 290.00},
    { user: "Maui", password: "789", balance: 67.00}
  ];
let currentAccount;
const userList = document.getElementById('user');
const menuContainer = document.getElementById ('menu-container');

const operationsContainer = document.getElementById('operations-container')
const operationsUser = document.getElementById('user-op')
const currentBalance = document.getElementById('current-balance')
const opCuenta = document.getElementById('cuenta')
const ingresoCuenta = document.getElementById ('ingreso')
const retiroCuenta = document.getElementById ('retiro')
const amountUser = document.getElementById('amount-user')
const amountButton = document.getElementById('amount-button')
const returnButton = document.getElementById('return-button')
const closeButton = document.getElementById('cerrar-button')




function crearElemento(tipoError){
    let span = document.createElement('span')
    span.classList.add('hide')
    span.setAttribute("id", `error${tipoError}`)
    span.innerHTML = `${tipoError} incorrecto`
    let div = document.getElementById(`contenedor${tipoError}`)
    div.appendChild(span)}

function mostrarError(tipoError){
    crearElemento (tipoError)
    console.log(tipoError)
    let span = document.getElementById(`error${tipoError}`)
    span.classList.remove('hide')
    span.classList.add('error')

    setInterval (function(){
        span.classList.remove('error')
        span.classList.add('hide')
}, 6000)
}


function validate(user, password){
    let message;
    let error = false;
    
    for (let i = 0; i < accounts.length; i++) {
      if(user == accounts[i].user) {
        if(password == accounts[i].password){
            //message = 'Bienvenido';
            error = false;
            currentAccount = accounts[i];
            loginSuccessful();
            formDom.reset();
            //console.log(`Balance ; ${accounts[i].balance}`);
            break;
        }
        else {
             message = 'Password incorrecto';
             error = true; 
             break;
        }
    }       
    else if (user != accounts[i].user){
      error = true; 
      message = 'Usuario no existe';
    }
}
if(error){
    alert(message);
}
  }


formDom.addEventListener('submit', (event) => {
    event.preventDefault();
    let us = document.getElementById('user').value;
    let pass = document.getElementById('password').value;
    validate (us, pass)
});




function loginSuccessful(){
userList. innerHTML = currentAccount.user;
formDom. classList.add ('d-none');
menuContainer. classList.remove ('d-none');
}

function closeSession (){
    window.location.href = '/'
    console.log('hey')
}



function showOperations (){
   
    menuContainer.classList.add('d-none');
    operationsContainer.classList.remove('d-none');
    amountButton.classList.remove('d-none');
    returnButton.classList.remove('d-none');
    closeButton.classList.remove('d-none');
    currentBalance.classList.remove('d-none');
    operationsUser.innerHTML = currentAccount.user;
    currentBalance.innerHTML = currentAccount.balance;
}

function showBalance(){
    showOperations();
    opCuenta.innerHTML = 'Obtener saldo de la cuenta';
    amountUser.classList.remove('d-none');
    currentBalance.classList.remove('d-none');
}


function showIngreso (){
    showOperations();
    ingresoCuenta.innerHTML = 'Ingresar Monto'
    amountUser.classList.remove('d-none')
    amountButton.innerHTML = 'Ingresar'
}

function showRetiro (){
    showOperations();
    retiroCuenta.innerHTML = 'Retirar Monto'
    amountUser.classList.remove('d-none')
    amountButton.innerHTML = 'Retirar'
}

function regresoButton (){
    operationsContainer.classList.add('d-none')
    menuContainer.classList.remove('d-none')
}



function amountAction(){
      let amountInput = document.getElementById('user-op');
      let amount = parseFloat(amountInput.value);
      let amountMessage = 'hey';

if (amount <= 0 || Number.isNaN(amount)){
    amountMessage = 'Ingresar el valor correspondiente'
}
else{

    if(amountButton.innerHTML == 'Ingresar'){
        if((amount + currentAccount.balance)>990){
            amountMessage = 'Su cuenta no puede tener más de $990.00';
        }
        else{
            currentAccount.balance += amount;
            currentBalance.innerHTML = currentAccount.balance;
            amountMessage = `Monto ingresado: $${amount}`;
        }
    }

    if(amountButton.innerHTML == 'Retirar'){
        if ((currentAccount.balance - amount)<10){
            amountMessage = 'Su cuenta no puede tener menos de $10.00';
        }
        else {
            currentAccount.balance -= amount;
            currentBalance.innerHTML = currentAccount.balance;
            amountMessage= `Monto retirado: $${amount}`;
        }
    }
}
    amountInput.value = '';
    swal(amountMessage);
}

//const format = (num, decimals) => num.toLocalString('en-US', {
  // minimumFractionDigits : decimals,
   //maximumFractionDigits : decimals,
//});


//function hola (){
   // alert ('hola')
//}

opCuenta.onclick=function(){
    showBalance(); 
    regresoButton();
    operationsContainer.classList.remove('d-none');
    menuContainer.classList.add('d-none');
    amountButton.classList.add('d-none');
    swal('Tu balance');
}


ingresoCuenta.onclick=function(){
    showIngreso();
    amountAction();
    operationsUser.classList.remove('d-none');
}

retiroCuenta.onclick = function(){
    showRetiro();
    amountAction();
    operationsUser.classList.remove('d-none');    
}

amountButton.onclick = function (){
    amountAction();
}

returnButton.onclick = function(){
    regresoButton();
}

closeButton.onclick = function (){
   closeSession();
   alert('cerraste');
}


//function amountAction (){

//}

//function change=function(){

//}


