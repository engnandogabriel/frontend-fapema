
const urlAPI = 'https://fapema-api.herokuapp.com/account/login'

const entrar = document.querySelector('button[name=entrar]')
entrar.addEventListener('click', async (e) => {
    e.preventDefault();
    var email = document.querySelector('input[name=email]').value;
    var senha = document.querySelector('input[name=senha]').value;
    const data = {
        email,
        senha
    }
    await axios.post(urlAPI, data).then((result) => {
        console.log(result.data.msg)
        console.log(result.status)
        sessionStorage.setItem('token', result.data.token)
        sessionStorage.setItem('nome', result.data.msg)
        if(result.status == 200){
            window.location.href = "index.html"
        }
    }).catch((err) => {
        var status = err.response.status
        console.log(status)
        var conatinerLogin = document.querySelector('.conatiner-login');
        if(status !== '200'){
            alert('Email ou senha inválido');
        conatinerLogin.appendChild(erro)
        }     
    });
})
