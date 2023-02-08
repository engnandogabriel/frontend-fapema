
//url da api
const url = 'https://fapema-api.herokuapp.com/fapema'
const access_token = sessionStorage.getItem('token')
var msgSucesso = document.querySelector('.msg-sucesso');
var msgErro = document.querySelector('.msg-erro');
var consultaErro = document.querySelector('.consulta-erro');
var msgErroNome = document.querySelector('.msg-erro-nome');
var tbody = document.querySelector('.tbody');
var id = 1

addEventListener('load', ()=>{
    carregaDados();
})

function limparDados(){
    tbody.innerHTML = ""
    id = 1
}

//carrega todos os alunos
async function carregaDados() {
    await axios.get(url, {
        headers: {
            'Authorization': `token ${access_token}`
          }
    }).then((response) => {
        const data = response.data;
        data.forEach(data => {
            
            if(data.nome == undefined || data.nome == "")
            data.nome = "Nâo Registrado"
            if(data.cpf== undefined || data.cpf == "")
                data.cpf = "Nâo Registrado"
            if(data.matricula == undefined || data.matricula == "")
                data.matricula = "Nâo Registrado"
            if(data.curso == undefined || data.curso == "")
                data.curso = "Nâo Registrado"
            tbody.innerHTML += `<tr><td>${id}</td><td>${data.nome}</td>
            <td>${data.cpf}</td><td>${data.matricula}</td>
            <td>${data.curso}</td>
            <td><button type='button' class='btn btn-danger' onclick="excluir('${data.matricula}')"><i class='bi bi-trash'>Excluir</button></td>
            <td><button type='button' class='btn btn-primary' onclick="alterar('${data.matricula}')"><i class='bi bi-pencil-fill'>Alterar</button></td>`
            id++
        });

    })
}

//filtar por nome


var pesquisaInput = document.querySelector('.pesquisa')
var formSearch = document.querySelector('.search-button')

formSearch.addEventListener('click', (e) => {
    e.preventDefault()
    var nome = pesquisaInput.value
    if(nome){
        carregarNome(nome)
    }else{
        limparDados()
        carregaDados()
    }
})

async function carregarNome(nome) {
    await axios.get(`${url}/name/${nome}`, {
        headers: {
            'Authorization': `token ${access_token}`
          }
    }).then((response) => {
        limparDados()
        var dados = response.data
        console.log(dados.length)
        if(dados.length == 0){
            msgErroNome.style.display = 'block'
            setInterval(() => {
                msgErroNome.style.display = 'nones'
            }, 2000)
            limparDados()
            carregaDados()
        }else{
            dados.forEach((data) => {
                console.log(data)
                if(data.nome == undefined || data.nome == "")
                data.nome = "Nâo Registrado"
                if(data.cpf== undefined || data.cpf == "")
                    data.cpf = "Nâo Registrado"
                if(data.matricula == undefined || data.matricula == "")
                    data.matricula = "Nâo Registrado"
                if(data.curso == undefined || data.curso == "")
                    data.curso = "Nâo Registrado"
                tbody.innerHTML += `<tr><td>${id}</td><td>${data.nome}</td>
                <td>${data.cpf}</td><td>${data.matricula}</td>
                <td>${data.curso}</td>
                <td><button type='button' class='btn btn-danger' onclick="excluir('${data.matricula}')"><i class='bi bi-trash'>Excluir</button></td>
                <td><button type='button' class='btn btn-primary' onclick="alterar('${data.matricula}')"><i class='bi bi-pencil-fill'>Alterar</button></td>`
                id++
            })
        }
        
    }).catch((err) => {
        console.log(err)
        
    })
} 


//excluir alunos
async function excluir(matricula){
    await axios.delete(`${url}/${matricula}`,{
        headers: {
            'Authorization': `token ${access_token}`
          }
    })
    .then((response) => {
        tbody.innerHTML = "";
        carregaDados();
        msgSucesso.style.display = "block";
        setTimeout(() => {
            msgSucesso.style.display = "none";
        }, 3000)
    }).catch((err) => {
        msgErro.style.display = "block";
        setTimeout(() => {
            msgErro.style.display = "none";
        }, 3000)
    });
    window.location.reload()
}
async function alterar(matricula){
    window.location.href = "info_aluno.html?matricula="+matricula;
}