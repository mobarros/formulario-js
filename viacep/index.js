const cep = document.querySelector('#cep');
const endereço = document.querySelector('#endereço');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const estado = document.querySelector('#estado');
const mensagem = document.querySelector('#mensagem');


cep.addEventListener('focusout' , async ()=> {

try {
    const onlyNumbers = /^[0-9]+$/;
    const cepValid = /^[0-9]{8}$/;

    if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)){
        throw {cep_error:'Cep inválido'};
    }

    const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

    if (!response.ok){
        throw await response.json();
    }

    const responseCep = await response.json();

    endereço.value = responseCep.logradouro;
    bairro.value = responseCep.bairro;
    cidade.value = responseCep.localidade;
    estado.value = responseCep.uf;

    $(document).ready(function(){
        $('#cep').mask('00.000-000');
    });

} catch (error){
    if (error?.cep_error){
        mensagem.textContent = error.cep_error;
        setTimeout(() => {
            mensagem.textContent ='';
        }, 5000);
    
    }} 
})



