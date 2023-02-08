
const urlAPI = 'http://localhost:8080/account/register'

const nomeInput = document.querySelector('#nome');
const cpfInput = document.querySelector('#cpf');
const emailInput = document.querySelector('#email');
const senhaInput = document.querySelector('#senha');
const confirmaSenha = document.querySelector('#confirmSenha');
const registrarButton = document.querySelector('#registrar');

var validCpf = '[0-9]'

cpfInput.addEventListener('keypress', (e) => {
    var cpfvalidar = cpfInput.value;
    if(cpfvalidar.length == 3 || cpfvalidar.length == 7)
        cpfInput.value += '.'
    if(cpfvalidar.length == 11)
        cpfInput.value += '-'
    if(cpfvalidar.length > 13)
        e.preventDefault();
    if(!checkCpf(e))
        e.preventDefault();
        
})
function checkCpf(e){
    var cpfIn = String.fromCharCode(e.keyCode);
    if(cpfIn.match(validCpf))
        return true
}

registrar.addEventListener('click', async(e) => {
    e.preventDefault();

    const nome = nomeInput.value;
    const cpf = cpfInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const confirmSenha = confirmaSenha.value;
    console.log(senha)
    if(senha === confirmSenha) {
        const data = {
            nome,
            cpf,
            email,
            senha,
            confirmSenha
        }
    await axios.post(urlAPI, data)
    .then(response => alert(response.data))
    .catch(err => console.log(err))
    window.location.href = "home.html"
    }else{
        alert('Senha Inválida')
    }
    
});