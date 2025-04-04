//Listagem dos produtos________________________________________________________________________________________________

let vazio = [
    "vazio"
];

//AÇAI
let gas = [
    ["carrossel", "gas", "vazio"],
    ["Gás P-13", "Imagem meramente ilustrativa. Botijão P-13 equivale a: 13 quilogramas de gás", 100.0, 0],
    ["Gás P-20", "Imagem meramente ilustrativa. Botijão P-20 equivale a: 20 quilogramas de gás", 195.0, 0],
    ["Gás P-45", "Imagem meramente ilustrativa. Botijão P-45 equivale a: 45 quilogramas de gás", 430.0, 0],
    ["Registro completo", "Regulador aliança, Mangueira de 0,80m, Duas braçadeiras", 65.0, 0],
    ["Mangueira 1,25m", "Mangueira 1,25 metros de comprimento", 15.0, 0]
];
let agua = [
    ["carrossel", "agua", "vazio"],
    ["Água com gás nobre 500ml", "12 unidades de garrafas de 500ml de água com gás", 18.0, 0],
    ["Água sem gás nobre 500ml", "12 unidades de garrafas de 500ml de água", 15.0, 0],
    ["Água sem gás nobre 1.5L ", "6 unidades de garrafas de 1,5 litros  de água", 18.0, 0],
    ["Galão d'água nobre 20L", "Galão com 20 litros de água", 15.0, 0],
    ["Filtro decorado", "Filtro decorado para galão de água", 100.0, 0],
    ["Filtro inox", "Filtro para galão de água", 100.0, 0],
    ["Bomba de água elétrica", "Bomba de água automática", 50.0, 0],
];

//Lista geral
let PRODUTOS = [
    gas, agua
];

//Funções curinga______________________________________________________________________________________________________

//Retorna o elemento do id
function get(id) {
    return document.getElementById(id);
}

//Liga ou desliga o elemento 
function dijuntor(id) {
    if (get(id).style.display == 'flex') {
        get(id).style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    else {
        get(id).style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

//Retorna true no horário de funcionamento
let agora = new Date();
let horas = agora.getHours();
let minutos = agora.getMinutes();
let dia = agora.getDay();
let fechar;
let retorno = true;
function aberto() {
    switch (dia) {
        case 0:
            fechar = 11;
            if ((horas == fechar) && (minutos > 45)) {
                retorno = false;
            }
            break;
        case 1:
            fechar = 19;
            break;
        case 2:
            fechar = 19;
            break;
        case 3:
            fechar = 19;
            break;
        case 4:
            fechar = 19;
            break;
        case 5:
            fechar = 19;
            break;
        case 6:
            fechar = 19;
            break;
    }
    if ((horas < 8) && (horas >= fechar)) {
        retorno = false;
    }
    return retorno;
}

//Funções auxiliares____________________________________________________________________________________________________

//Responsavel por montar a lista selecionada (PRODUTOS[x]) em um campo "produtos"+ x específico
let id = 0;
function montarItem(list) {
    let lista = PRODUTOS[list];
    let org = lista[0];
    let tip = org[1];
    let ext = org[2];
    let inclusos = org[3];
    for (let item = 1; item < lista.length; item++) {
        id++;
        let info = lista[item];
        get("produtos" + list).innerHTML += definirOrg(org[0], info[0], info[1], info[2], info[3], (tip + item), id, ext, inclusos);
    }
}

//Atualiza a lista de pedidos
function mostrarPedido() {
    get('listaPedido').innerHTML = ``;
    for (let i = 0; i < pedido.length; i++) {

        let itemMontado = pedido[i];

        //Listando os extras do pedido
        let extrasMontados = itemMontado[3];
        let totalItem = parseFloat(itemMontado[2]);
        let listExtras = `<h3>R$ <i>${itemMontado[2]}</i></h3>`;
        for (let j = 0; j < extrasMontados.length; j++) {
            let adicional = extrasMontados[j];
            totalItem += parseFloat(adicional[1]);
            listExtras += `
                <p class="adicional">${adicional[0]} <span>+ R$ <i>${adicional[1]}</i></span></p>
            `;
        }

        get('listaPedido').innerHTML += `
            <li>
                <h3>${itemMontado[0]}</h3>
                <h4>${itemMontado[1]}</h4>
                <h5>Lembrete: <br> ${itemMontado[4]}</h5>
                ${listExtras}
                <span>Total: R$ <i>${totalItem.toFixed(2)}</i></span>
                <button onclick="retirarItem(${i})">Retirar</button>
            </li>
        `
    }
    if (pedido.length == 0) {
        get('verPedido').style.display = 'none';
        get('finalizar').style.display = 'none';
    }
    else {
        get('verPedido').style.display = 'flex';
    }
}

//Montar link
let totalPedido = 0.0

//Link 
let link = "https://wa.me/5516991774715?text=Novo%20pedido%0A%0A";
function montarLink() {

    //Reiciando o total
    totalPedido = 0.0;

    //Nome
    link += "Para:%20" + get('nome').value;

    for (let i = 0; i < pedido.length; i++) {
        link += "%0A%0A_____________________________";
        let adicionado = pedido[i];

        //Separando informações
        let titulo = adicionado[0];
        let descricao = adicionado[1];
        let valor = parseFloat(adicionado[2]);
        let adicionais = adicionado[3];
        let lembrete = adicionado[4];

        //Montando item do pedido
        link += "%0A%0A" + titulo;
        link += "%0A%0A" + descricao + "%0A";

        //Adicionando extras
        for (let j = 0; j < adicionais.length; j++) {
            let add = adicionais[j];
            link += "%0A%2B%20" + add[0] + "%20(%2B%20R$%20" + add[1] + ")"
            valor += parseFloat(add[1]);
        }
        link += "%0A%0ATotal%20do%20item:%20R$" + valor.toFixed(2);

        //Lembrete
        link += "%0A%0ALembrete:" + lembrete;

        totalPedido += valor;
    }

    moldarInfo();

    //Forma de recebimento
    link += "%0A%0A_____________________________%0A%0A" + info1;

    //Forma de pagamento
    link += "%0A%0A" + info2;
    link += "%0A%0ATotal%20do%20pedido:%20R$%20" + totalPedido.toFixed(2);
}

//Seleciona informações para o link
let info1;
let info2;
let taxaEntrega = 0;
get('taxaEntrega').innerHTML = taxaEntrega.toFixed(2);
function moldarInfo() {
    let cartao = get('cartao').checked;
    let pix = get('pix').checked;
    let dinheiro = get('dinheiro').checked;

    info1 = "Para%20entrega%20(taxa:%20R$%20" + taxaEntrega.toFixed(2) + ")%0A%0A";
    totalPedido += taxaEntrega;
    for (let i = 1; i <= 4; i++) {
        info1 += get('end' + i).value + "%0A";
    }
    
    if (cartao) {
        info2 = "Cartão"
    }
    if (pix) {
        info2 = "Pix%0A(envie%20para%20chave%20:%20128.249.89/0001-37)%0AFavor%20enviar%20o%20comprovante"
    }
    if (dinheiro) {
        let troco = parseFloat(get('troco').value) - totalPedido;
        info2 = "Dinheiro%0A%0ATroco%20para%20R$%20" + (parseFloat(get('troco').value)).toFixed(2) + "%0ATroco=%20R$%20" + troco.toFixed(2);
    }
}

//Retira itens e atualiza o pedido
function retirarItem(posicao) {
    pedido.splice(posicao, 1);
    mostrarPedido();
}

//Adiciona extras a lista do pedido
let extras = [];
function interagirExtra(posicao, inclusos) {
    let listaAdicionais = ADICIONAIS[posicao];
    extras = [];
    let preco;
    let naoInclusos = 0;
    for (let i = 1; i < listaAdicionais.length; i++) {
        if (get("extra" + i).checked) {
            if ((get('nomeExtra' + i).innerHTML).slice(-13) == "(NÃO INCLUSO)") {
                naoInclusos++;
            }
            if (((extras.length) - naoInclusos) < inclusos && (get('nomeExtra' + i).innerHTML).slice(-13) != "(NÃO INCLUSO)") {
                preco = 0.0;
            }
            else {
                preco = get("valExtra" + i).innerHTML;
            }
            let novo = [
                get("nomeExtra" + i).innerHTML,
                preco
            ]
            extras.push(novo)
        }
    }
}

//Verifica se está tudo pronto para gerar o link

function verifica() {
    let cartao = get('cartao').checked;
    let pix = get('pix').checked;
    let dinheiro = get('dinheiro').checked;

    verificado = true;

    //Verificando o campo nome
    if (get('nome').value == "") {
        verificado = false;
        alert("Informe seu nome")
    }

    //Verificando endereço
    for (let i = 1; i <= 3; i++) {
        if (get('end' + i).value == "") {
            verificado = false;
            alert("Informações de endereço faltando")
        }
    }
        

    //Verificando pagamento
    if (cartao || pix || dinheiro) {
        if (dinheiro) {
            if (get('troco').value == "" || parseFloat(get('troco').value) < totalPedido) {
                verificado = false;
                alert("Valor para troco inferior ao total pedido.");
            }
        }
    }
    else {
        verificado = false;
        alert("Informe o método de pagamento")
    }

}

//Contrutores html______________________________________________________________________________________________________

//Monta o item no cardápio com a organização prevista
function definirOrg(org, tit, desc, val, incl, posi, id, ext) {
    switch (org) {
        case "carrossel":
            return `
                <li>
                    <img src="Assets/Imagens/${posi}.jpg" alt="imagem ilustrativa do produto">
                    <h3 id="tit${id}">${tit}</h3>
                    <p id="desc${id}">${desc}</p>
                    <span>R$ <i id="val${id}">${val.toFixed(2)}</i></span>
                    <button onclick="pedir(${id}, ${ext}, ${incl})">Pedir</button>
                </li>
            `;
        case "lista":
            return `
                <li>
                    <h3 id="tit${id}">${tit}</h3>
                    <img src="Assets/Imagens/logo.jpg" alt="icone logo empório do açai">
                    <p id="desc${id}">${desc}</p>
                    <span>R$ <i id="val${id}">${val.toFixed(2)}</i></span>
                    <button onclick="pedir(${id}, ${ext}, ${incl})">Pedir</button>
                </li>
            `;
        case "grande":
            return `
               <li>
                    <img class="grandeImg" src="Assets/Imagens/${posi}.jpg" alt="imagem ilustrativa do produto">
                    <div class="grandeInfo">
                        <h3 id="tit${id}">${tit}</h3>
                        <p id="desc${id}">${desc}</p>
                        <span>R$ <i id="val${id}">${val.toFixed(2)}</i></span>
                        <button onclick="pedir(${id}, ${ext}, ${incl})">Pedir</button>
                        <img src="Assets/Imagens/logo.jpg" alt="icone logo empório do açai">
                    </div>
                </li>
            `;
        case "metade":
            return `
                <li>
                    <div class="metade">
                        <ul class="listaOpc" id="opcoesMetade">
                            ${doisSab(doisSaboresPizza, id)}
                        </ul>
                        <div id="metadeFinal" class="metadeFinal grandeInfo">
                            <h3 id="tit${id}">${tit}</h3>
                            <p id="desc${id}"></p>
                            <span>R$ <i id="val${id}"></i></span>
                            <button onclick="pedir(${id}, ${ext}, ${incl})">Pedir</button>
                            <img src="Assets/Imagens/logo.jpg" alt="icone logo empório do açai">
                        </div>
                    </div>
                </li>
            `;
    }
}

//Monta os sabores da pizza de 2 sabores
function montarSabores(id) {
    let contagem = 0;
    let sabor1 = [];
    let sabor2 = [];
    for (let j = 0; j < doisSaboresPizza.length; j++) {
        if (get("opc" + j).checked) {
            contagem++;
            if (contagem > 2) {
                get("opc" + j).checked = false;
                alert("Não é possível marcar mais de 2 sabores")
            }
            if (contagem == 1) {
                sabor1.push(get('opcTit' + j).innerHTML);
                sabor1.push(get('opcVal' + j).innerHTML);
            }
            if (contagem == 2) {
                get('metadeFinal').style.display = 'flex';
                sabor2.push(get('opcTit' + j).innerHTML);
                sabor2.push(get('opcVal' + j).innerHTML);

                if (sabor2[1] >= sabor1[1]) {
                    get('val' + id).innerHTML = sabor2[1];
                }
                else {
                    get('val' + id).innerHTML = sabor1[1];
                }

                get('desc' + id).innerHTML = sabor1[0] + " / " + sabor2[0];
            }
            else {
                get('metadeFinal').style.display = 'none';
            }
        }
    }
}

//Monta uma lista com opções para 2 sabores
function doisSab(lista, id) {
    let opc = ``;
    for (let i = 0; i < lista.length; i++) {
        let list = lista[i];
        opc += `
            <li>
                <div class="opcTit">
                    <input type="checkbox" id="opc${i}" onchange="montarSabores(${id})">
                    <label id="opcTit${i}" for="opc${i}">${list[0]}</label>
                </div>
                <p id="opcDesc${i}">${list[1]}</p>
                <span>R$ <i id="opcVal${i}">${list[2].toFixed(2)}</i></span>
            </li>
        `
    }
    return opc;
}

//Adiciona extras no modal de montar item
function montarExtras(tipo, inclusos) {
    if (tipo[0] != "vazio") {
        get('extras').innerHTML = ``;
        let atributo = tipo[0];
        for (let i = 1; i < tipo.length; i++) {
            let extraOrg = tipo[i]
            get('extras').innerHTML += `
                <li class="extra">
                    <input onchange="interagirExtra(${atributo[1]}, ${inclusos})" type="${atributo[0]}" name="extras" id="extra${i}">
                    <label for="extra${i}" id="nomeExtra${i}">${extraOrg[0]}</label>
                    <span>R$ <i id="valExtra${i}">${extraOrg[1].toFixed(2)}</i></span>
                </li>
            `
        }
    }
    else {
        get('btnAbrirExtras').style.display = 'none';
    }
}

//Funções principais_____________________________________________________________________________________________________

//Abre o modal para personalizar o item desejado
function pedir(id, ext, inclusos) {
    if(aberto()){
        dijuntor('montar');
        extras = [];
        get('montar').innerHTML = `

            <div class="fundoPedido"></div>
            <h2>BOA ESCOLHA</h2>
        
            <div class="montarInfo">
                
                <button class="voltar" onclick="dijuntor('montar')">
                    <img src="Assets/icons/voltar.png" alt="icone voltar">
                    Voltar
                </button>
                
                <h3 id="novoTit">${get('tit' + id).innerHTML}</h3>
                <p id="novoDesc">${get('desc' + id).innerHTML}</p>
                
                <input class="abrirListaEscondida" id="listaExtras" type="checkbox">
                <label id="btnAbrirExtras" class="abrirExtra" for="listaExtras">Adicionais</label>
                <ul id="extras" class="listaEscondida"></ul>
                <input id="campoLembrete" class="lembrete" placeholder="Lembrete">
                
                <span>R$ <i id="novoVal">${get('val' + id).innerHTML}</i></span>
                <button onclick="adicionarPedido()" class="btnMontar">+ Adicionar ao pedido</button>
            </div> 
        `;
        montarExtras(ext, inclusos);
    }
    else {
        alert("Agradecemos a preferência, abriremos as 08h00");
    }
}

//Adiciona o item desejado ao pedido
let pedido = [];
function adicionarPedido() {

    //Fecha o modal de montar itens
    dijuntor('montar');

    //Coleta o novo produto e o adiciona
    let novoProduto = [
        get('novoTit').innerHTML,
        get('novoDesc').innerHTML,
        get('novoVal').innerHTML,
        extras,
        get('campoLembrete').value
    ];
    pedido.push(novoProduto);

    mostrarPedido();
}

//Gera o link de enviar pedido

let verificado = true;
function gerarLink() {

    //Verificações necessárias
    link = "https://wa.me/5516991774715?text=Novo%20pedido%0A%0A";
    montarLink()
    verifica();

    if (verificado) {

        //Fechando tudo e deixando apenas o link
        get('sairPedido').style.display = 'none';
        get('formulario').style.display = 'none';
        get('listaPedido').style.display = 'none';
        get('linkFinal').style.display = 'flex';
        get('linkFinal').innerHTML += `<a href="${link}">Enviar Pedido</a>`
    }
}

//Script geral___________________________________________________________________________________________________________

//Adicionando todos os itens em seus respectivos lugares 
for (let i = 0; i < PRODUTOS.length; i++) {
    montarItem(i);
}

//Atualiza o status de funcionamento
if(aberto()){
    get('status').innerHTML="Aberto";
}
else{
    get('status').innerHTML="Fechado";
}