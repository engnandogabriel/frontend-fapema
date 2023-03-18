const url = 'https://web-production-9f8c8.up.railway.app/fapema/limite/3';
const cardBody = document.querySelector('.alunos-recentes');

addEventListener('load', async () => {
    const msg = await sessionStorage.getItem('nome');
    //alert(msg)
    carregaDados();
})

async function carregaDados() {
    axios.get(url).then(response => {
        var data = response.data;
        data.forEach(element => {
            cardBody.innerHTML += `<p class="card-text">
            <ul>
              <li style="width: 100%; max-width:800px;">${element.nome}</li>
            </ul>
          </p><!--card-text-->`
        });
    }).catch((err) => {
        console.log(err)
    })
}

