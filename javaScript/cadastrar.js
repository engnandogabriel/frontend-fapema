
const url = 'https://fapema-api.herokuapp.com/fapema';
var access_token = sessionStorage.getItem('token')
var cadastrar = document.querySelector('.cadastrar');
var msgSucesso = document.querySelector('.msg-sucesso');
var msgErro = document.querySelector('.msg-erro');
var valid = '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]';
var validCurso = '[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]';
var validCpf = '[0-9]'

var nomeInput = document.querySelector('input[name=nome]')
var cpfInput = document.querySelector('input[name=cpf]')
var matriculaInput = document.querySelector('input[name=matricula]')
var cursoInput = document.querySelector('input[name=curso]')

//validar nome
nomeInput.addEventListener('keypress', (e)=>{
    if(!checkNome(e)){
        e.preventDefault();
        document.getElementById("alerta").style.display = "block";
    }
    if(checkNome(e)){
        document.getElementById("alerta").style.display = "none";
    }
})
function checkNome(e){
    var nomeIN =  String.fromCharCode(e.keyCode)
    
    if(nomeIN.match(valid)){
        return true;
    }
}
//validar cpf
cpfInput.addEventListener('keypress', (e) => {
    var cpfvalidar = cpfInput.value;
    if(cpfvalidar.length == 3 || cpfvalidar.length == 7)
        cpfInput.value += '.'
    if(cpfvalidar.length == 11)
        cpfInput.value += '-'
    if(cpfvalidar.length > 13)
        e.preventDefault();
    if(!checkCpf(e)){
        e.preventDefault();
        document.getElementById("alerta").style.display = "block";
    }else{
        document.getElementById("alerta").style.display = "none";
    }
        
})
//validar curso
cursoInput.addEventListener('keypress', (e)=>{
    if(!checkCurso(e)){
        e.preventDefault();
        document.getElementById("alerta").style.display = "block";
    }
    if(checkCurso(e)){
        document.getElementById("alerta").style.display = "none";
    }
})
function checkCpf(e){
    var cpfIn = String.fromCharCode(e.keyCode);
    if(cpfIn.match(validCpf))
        return true
}
function checkCurso(e){
    var cursoIN =  String.fromCharCode(e.keyCode)
    
    if(cursoIN.match(validCurso)){
        //console.log(cursoIN)
        return true;
    }
}

cadastrar.addEventListener('click', async ()=>{ 
    var nome = nomeInput.value;
    var cpf = cpfInput.value;
    var matricula = matriculaInput.value;
    var curso = cursoInput.value;

    console.log(nome)    

    var data = {
        nome,
        cpf,
        matricula,
        curso
    }
    
    console.log(data)
    await axios.post(url,data, {
        headers: {
            'Authorization': `token ${access_token}`
          }
    })
    .then((response) => {
        msgSucesso.style.display = "block";
        setTimeout(() => {
            msgSucesso.style.display = "none";
        }, 3000)
        limpaInput();
    }).catch((err) => {
        msgErro.style.display = "block";
        setTimeout(() => {
            msgErro.style.display = "none";
        }, 3000)
    });
    
})
function limpaInput(){
    nomeInput.value = "";
    cpfInput.value = "";
    matriculaInput.value = "";
    cursoInput.value = "";
}