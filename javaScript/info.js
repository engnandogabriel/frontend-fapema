
const url = 'https://api-fapema.herokuapp.com/fapema'
const access_token = sessionStorage.getItem('token')
const urlParams = new URLSearchParams(window.location.search);
const matricula = urlParams.get('matricula');


async function carregarApi(){
    await axios.get(`${url}/${matricula}`)
    .then(response => {
        const data = response.data;
        return data;
    }).catch(err => {
        alert("Erro no servidor! Tente novamente mais tarde");
    })
}

//dados dos alunos
var nomeAluno = document.querySelector('#nome-aluno');
var cpfAluno = document.querySelector('#cpf-aluno');
var matAluno = document.querySelector('#mat-aluno');
var cursoAluno = document.querySelector('#curso-aluno');

//dados frequencia
var tbody = document.querySelector('.tbody');

//modal
var atualizaDadosClass = document.querySelector('.btn-atualiza '); //abrir modal de atualização
var btnAtualiza = document.querySelector('.atualizar-dados'); //atualizar dados no banco de dados
var formFoto = document.querySelector('.form-cadastro-foto');
var cadastrarFoto = document.querySelector('.btn-cadastra-foto');
var submitFoto = document.querySelector('.cadastrar-foto ');
var previewFoto = document.querySelector('.preview');

//nome nos inputs
var nomeValue = document.querySelector('input[name=nome]');
var matriculaValue = document.querySelector('input[name=matricula]');
var cpfValue = document.querySelector('input[name=cpf]');
var cursoValue = document.querySelector('input[name=curso]');
var fotoAluno = document.querySelector('#foto-aluno')

//menssagem de atualizado
var msgSucesso = document.querySelector('.msg-sucesso')
//menssagem de atualizado
var msgErro = document.querySelector('.msg-erro')

addEventListener('load', ()=>{
    carregaDados();
    carregarFrequencia();
})

//busca dados da API
async function carregaDados(){
    await axios.get(`${url}/${matricula}`)
    .then(response => {
        const dados = response.data;
        nomeAluno.innerHTML += dados.nome;
        cpfAluno.innerHTML += dados.cpf;
        matAluno.innerHTML += dados.matricula;
        cursoAluno.innerHTML += dados.curso;

        if(dados.foto === "")
            fotoAluno.setAttribute('src', 'img/semfoto.jpg');
        else
            fotoAluno.setAttribute('src', dados.foto);
    }).catch(err => {
        alert(err)
    })
}

//buscar frequencia
async function carregarFrequencia(){

    await axios.get(`${url}/${matricula}`)
    .then(response => {
        const dados = response.data;
        var frequenias = dados.frequencia;
        frequenias.forEach(frequencia => {

            
            //apresentar a data por extenso
            let data = frequencia.split('T')[0]; // recuperar apenas a data
            var diaExtenso = diaDaSemana(data);


            let hora = frequencia.split('T')[1]; // recuperar apenas a hora
            hora = hora.replace(':','h')
            let dataFormatada = data.split('-').reverse().join('/');

            tbody.innerHTML += `
             <tr>
                <td>${dataFormatada}</td>
                <td>${diaExtenso}</td>
                <td>${hora}</td>
                <td>Presente</td>
            </tr>`
        });

    })
}

//retornar o dia da semana por extenso
function diaDaSemana(frequencia){
    dayName = new Array ("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado");

    var now = new Date(frequencia);
    var indexDay = now.getDay() + 1;

    if(indexDay == 7) indexDay = 0;

    console.log(indexDay);

    return dayName[indexDay]
}

atualizaDadosClass.addEventListener('click', () => {
    exibirValueForm();
})

function exibirValueForm() {
    nomeValue.value = nomeAluno.textContent
    cpfValue.value = cpfAluno.textContent
    matriculaValue.value = matAluno.textContent
    cursoValue.value = cursoAluno.textContent
}
//abiri modal atulizar dados
btnAtualiza.addEventListener('click', async () => {
    await atualizaDados();
    
    setTimeout(() => {
         window.location.reload();
    },1000);
    
})



//abiri modal cadastra foto

//function atualiza dados na api
async function atualizaDados(){
    var nome = nomeValidacao.value;
    var cpf = cpfvalidacao.value;
    var matricula = matriculaValidacao.value;
    var curso = cursoValidacao.value;
    var data = {
        nome,
        cpf,
        matricula,
        curso,
    }
   
   
    await axios.patch(`${url}/${matricula}`, data,{
        headers: {
            'Authorization': `token ${access_token}`
          }
    }).then((response) => {
        msgSucesso.style.display = 'block'
    }).catch((err) => {
        msgErro.style.display = 'block'
    })
    
}

formFoto.addEventListener('change', (e) => {
    var event = e.target || window.event.srcElement;
    
    const files = event.files

    const fr = new FileReader();

    fr.onload = () => {
        document.querySelector('.preview-image').src = fr.result
    }

    fr.readAsDataURL(files[0]);
    previewFoto.style.display = 'block'
})

submitFoto.addEventListener('click', (e) => {
    e.preventDefault()
    var data = new FormData();
    var imageFile = document.querySelector('#fileimagem');


    data.append('file', imageFile.files[0]);

    axios.patch(`${url}/cadastroFoto/${matricula}`, data, {
        // headers: {
        //     "Content-Type": `multipart/form-data; boundary=${data._boundary}`
        // }
    })

    setTimeout(() => {
        window.location.reload();
   },1000);

})

//validação de formulário
    
var valid = '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]';
var validCurso = '[A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]';
var validNumber = '[0-9]'

var nomeValidacao = document.querySelector('#nome');
var cpfvalidacao = document.querySelector('#cpf');
var matriculaValidacao = document.querySelector('#matricula');
var cursoValidacao = document.querySelector('#curso');

//validação nome

nomeValidacao.addEventListener('keypress', (e) => {
    if(!validaNome(e)){
        e.preventDefault();
        document.getElementById("alerta").style.display = "block";
    }else{
        document.getElementById("alerta").style.display = "none";
    }
})

function validaNome(e){
    var name = String.fromCharCode(e.keyCode);
    if(name.match(valid))
        return true;
}

//valiação cpf
cpfvalidacao.addEventListener('keypress', (e) => {
    var exedido = document.createAttribute('div');
    exedido.ape
    //var cpfValidar = cpfvalidacao.value;
    if(cpfvalidacao.value.length == 3 || cpfvalidacao.value.length == 7)
        cpfvalidacao.value += '.'
    if(cpfvalidacao.value.length == 11)
        cpfvalidacao.value += '-'
    if(cpfvalidacao.value.length > 13)
        e.preventDefault();
    if(!validaCpf(e)){
        e.preventDefault();
    }else{
        document.getElementById("alerta").style.display = "none";
    }
})
function validaCpf(e){
    var cpfV = String.fromCharCode(e.keyCode);
    if(cpfV.match(validNumber))
        return true    
}
var btnFecharForm = document.querySelector('.btn-fechar')

btnFecharForm.addEventListener('click', () => {
    document.getElementById("alerta").style.display = "none";
})
