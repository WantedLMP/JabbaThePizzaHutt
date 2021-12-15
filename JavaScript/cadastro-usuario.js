class validator {  
    constructor() {
        this.validations = [
            'data-min-length',
        ]
    }

    // iniciar a validação de todos os campos
    validate(form) {

        // criação do método que irá limpar as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //transformando uma HTMLCollection -> array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {

            // loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++) {
                // verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null) {
                    //limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '');
                    // valor do input
                    let value = input.getAttribute(this.validations[i]);
                    //invocar o método
                    this[method](input,value);  
                }
            }     
        }, this);          
    }

    //verifica se o input tem um número minimo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
        else {
            this.removeMessage(input);
        }
    }

        //metodo para imprimir mensagens de erro
        printMessage(input, msg) {

            let errorValidation= document.querySelector('.error-validation');
    
            if(errorValidation !== null && errorValidation !== undefined){
            let template = errorValidation.cloneNode(true);          
    
            template.textContent = msg;
    
            let inputParent = input.parentNode;
    
            template.classList.remove('template');
    
            inputParent.appendChild(template);
            }     
        }

    // limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");
let Validator = new validator();

// evento que dispara as validações
submit.addEventListener('click', function(e){
    e.preventDefault();
    Validator.validate(form);
});