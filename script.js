const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sValor = document.querySelector('#m-valor')
const sTipo = document.querySelector('#tipo')
const btnSalvar = document.querySelector('#btnSalvar')
const entrada = document.querySelector('.entrada')
const saida = document.querySelector('.saida')
const saldo = document.querySelector('.saldo')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sValor.value = itens[index].valor
    sTipo.value = itens[index].tipo
    id = index
  } else {
    sNome.value = ''
    sValor.value = ''
    sTipo.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')
  if(item.tipo == "Entrada"){
tr.style.color = "green"
tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.valor}</td>
    <td>${item.tipo}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}else {
tr.style.color = "red"
tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.valor}</td>
    <td>${item.tipo}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}}
  

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sValor.value == '' || sTipo.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].valor = sValor.value
    itens[id].tipo = sTipo.value
  } else {
    itens.push({'nome': sNome.value, 'valor': sValor.value, 'tipo': sTipo.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

let resultEntrada = 0
let resultSaida = 0
let resultSaldo = 0
function loadItens() {
  resultEntrada = 0
  resultSaida = 0
  resultSaldo = 0
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    if(item.tipo === "Entrada"){
      resultEntrada += +item.valor
  } else if(item.tipo === "Saída"){
      resultSaida += +item.valor
  }  insertItem(item, index)
    resultSaldo = resultEntrada
    resultSaldo = resultSaldo - resultSaida
  })
  entrada.innerText = "€" + resultEntrada
  saida.innerText = "€" +resultSaida
  saldo.innerText = "€" +resultSaldo
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))


loadItens()