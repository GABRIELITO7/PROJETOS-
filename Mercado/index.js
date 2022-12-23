// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })
var itensNomes = ["arroz","frango","ovos","feijão","pão","batata doce"]
var itens =[{nome:"arroz", valor: 20.50},{nome:"frango",valor:24.50},{nome:"ovos",valor:15.00},{nome:"feijão",valor:7.00},{nome:"pão",valor:7.00},{nome:"batata doce",valor:5.00}]
var mercadoMaromba = "Mercado Maromba"
var carrinho = [];
//menu();

  function menu() {         
    
    console.log(`Olá, seja bem vindo ${mercadoMaromba}`)
    console.log("Esses são os itens disponiveis:")

    for (let index = 0; index < itens.length; index++) {
        console.log(`Produtos : ${itens[index].nome} Valor : ${itens[index].valor}`)

    } 
    perguntarItens();
  }

  function perguntarItens() {

    readline.question(`Deseja comprar quais itens?`, nome => {
        carrinho = nome.split(",");
        console.log(carrinho)
    
        let carrinhoEstaValido = validarCarrinho(carrinho);

        if (carrinhoEstaValido) {
            
            calcularCarrinho();
            readline.close() 
        }
        else {
    
            menu();
        
        }
       
        
    
      })
    
  }

  function validarCarrinho(carrinho) {
    let carrinhoEstaValido = true

    for (let index = 0; index < carrinho.length; index++) {
        const item = carrinho[index].trim();

        if (!itensNomes.includes(item)) {
            console.log("Item não disponivel " + item)
            carrinhoEstaValido = false
            break;
        
        }
        
    }

    return carrinhoEstaValido
  }

  function calcularCarrinho() {
    
    if (carrinho.length >= 2) {
            
        console.log("Itens adicionados")
    }
    else{

        console.log("Item adiconado")
    }
    calcularValorTotal();
  }

  function calcularValorTotal() {
     let valorTotal = 0
    for (let index = 0; index < carrinho.length; index++) {
        const itemCarrinho = carrinho[index].trim();
        let item = itens.find(x => x.nome== itemCarrinho);
        valorTotal += item.valor
    }
    console.log("O valor total do seu carrinho " + valorTotal)
  }

  function adicionarCarrinho(nome) {
    
    alert("ADICIONADO AO CARRINHO SULAMBINHO")
    alert(nome)
    montarCarrinho(nome);
  }
  
  function montarCarrinho(nome) {
     
    let item = itens.find(x => x.nome == nome)
    let itemCarrinho = carrinho.find(x => x.nome == nome)
    if (itemCarrinho == undefined) {

      let itemNovo = {nome:item.nome,valor:item.valor,quantidade:1}
      carrinho.push(itemNovo)
      
    }
    if (itemCarrinho != undefined) {
      
      itemCarrinho.quantidade += 1
      carrinho = carrinho.filter(x => x.nome != nome)
      carrinho.push(itemCarrinho)

    }
    desenharCarrinho()
    
  }

  function desenharCarrinho() {
    
    let table = document.getElementById("carrinho")
    deleteChild()
    desenharCabecalho()
    for (let index = 0; index < carrinho.length; index++) {
      const item = carrinho[index];
      
    var novoElemento = document.createElement("tr")
    var tableQuantidae = document.createElement("td")
    tableQuantidae.innerText = item.quantidade
    var tableNome = document.createElement("td")
    tableNome.innerText = item.nome
    var tablePreco = document.createElement("td")
    tablePreco.innerText = item.valor
    novoElemento.appendChild(tableQuantidae)
    novoElemento.appendChild(tableNome)
    novoElemento.appendChild(tablePreco)
    table.appendChild(novoElemento)
  
    }
    somarTotal()
  }

  function deleteChild() {
    var e =  document.getElementById("carrinho")
    var child = e.lastElementChild; 
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function desenharCabecalho() {

  var e =  document.getElementById("carrinho")
  var tablelinha = document.createElement("tr")
  var tableQuantidae = document.createElement("th")
  tableQuantidae.innerText = "Quantidade"
  var tableNome = document.createElement("th")
  tableNome.innerText = "Nome Item"
  var tablePreco = document.createElement("th")
  tablePreco.innerText = "Valor"
  tablelinha.appendChild(tableQuantidae)
  tablelinha.appendChild(tableNome)
  tablelinha.appendChild(tablePreco)
  e.appendChild(tablelinha)
  
}

function somarTotal() {

  let span = document.getElementById("valorTotal")
  var valorTotal = 0
  for (let index = 0; index < carrinho.length; index++) {
    const element = carrinho[index];
    valorTotal += (element.valor * element.quantidade)
  }
  span.innerText = " R$ " + valorTotal

}

