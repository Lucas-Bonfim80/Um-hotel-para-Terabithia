let nomeDoHotel = prompt("qual o nome do hotel?");
let nomeDoUsuario = prompt("Qual seu nome?");
alert(`O Nome do hotel é: ${nomeDoHotel}`);

let hospedes = [];

function inicio() {
    let senha = '2678'; 
    let senhaDigitada = prompt("Qual a senha?"); 

    if (senhaDigitada !== senha) { 
        alert("Senha está incorreta!");
    } else {
        alert(`Bem vindo ao Hotel ${nomeDoHotel}, ${nomeDoUsuario}. É um imenso prazer ter você por aqui!`);

        let escolha = parseInt(prompt('Selecione uma opção:\n' +
         '1.) Reserva de Quartos\n' +
         '2.) Cadastro de Hóspedes\n' +
         '3.) Abastecimento de Carros\n' +
         '4.) Buffet\n' +
         '5.) Auditório\n' +
         '6.) Reserva de restaurante\n' +
         '7.) Ar Condicionado\n' +
         '8.) Sair'
         ));


        if (escolha === 1) {
            reserva_quartos();
        } else if (escolha === 2) {
            cadastro_hospedes();
        } else if (escolha === 3) {
            abastecer_carros();
        } else if (escolha === 4) {
            horaDeComer();
        } else if (escolha === 5){
            verificarAuditorio();
        } else if (escolha === 6){
            reservaRestaurante()
        } else if (escolha === 7){
            arCondicionado()
        } else if (escolha === 8){
            sair()
        } else {
            erro();
        }
    }
}

function reserva_quartos() {
    let valorDiaria = parseFloat(prompt("Qual o valor da diária?"));
    let quantidadeDias = parseInt(prompt("Quantas diárias serão necessárias?"));
    let total = valorDiaria * quantidadeDias;
    alert(`O valor de ${quantidadeDias} dias é ${total}R$`);

    if (isNaN(valorDiaria) || valorDiaria <= 0 || isNaN(quantidadeDias) || quantidadeDias <= 0 || quantidadeDias > 30) {
        alert(`Valor inválido, ${nomeDoUsuario}`);
        inicio();
    } else {
        let nomeHospede = prompt("Qual o nome do hospede?");
        let valorDigitado = prompt(`${nomeDoUsuario} você confirma a hospedagem para ${nomeHospede} por 10 dias? S/N`).toUpperCase();

        if (valorDigitado === "S" || valorDigitado === "s") {
            alert(`${nomeDoUsuario}, reserva efetuada para ${nomeHospede}. O valor total é de ${total}R$`);
        } else {
            alert(`${nomeDoUsuario}, reserva não efetuada`);
        }
    }
}

function cadastro_hospedes() {
    let totalValorHospedagem = 0;
    let gratuidades = 0;
    let meias = 0;

    let opcao = parseInt(prompt("Selecione uma opção \n 1. Cadastrar \n 2. Pesquisar \n 3. Sair \n 4. Eventos "));

    if (opcao === 1) {
        let valordia = parseFloat(prompt("Qual o valor padrão da diária?"));
        while (hospedes.length < 15) {
            let nomeHospede = prompt("Qual o nome do hóspede? (Digite 'PARE' para encerrar)");
            if (nomeHospede.toUpperCase() === "PARE") {
                break;
            }
            let idadeHospede = parseInt(prompt(`Qual a idade de ${nomeHospede}?`));

            if (isNaN(idadeHospede)) {
                alert(`Idade inválida para ${nomeHospede}`);
                continue;
            }

            if (idadeHospede <= 6) {
                alert(`${nomeHospede} cadastrada(o) com sucesso. ${nomeHospede} possui gratuidade.`);
                gratuidades++;
            } else if (idadeHospede > 60) {
                alert(`${nomeHospede} cadastrada(o) com sucesso. ${nomeHospede} paga meia.`);
                meias++;
                totalValorHospedagem += valordia / 2;
            } else {
                alert(`${nomeHospede} cadastrada(o) com sucesso.`);
                totalValorHospedagem += valordia;
            }

            hospedes.push({ nome: nomeHospede, idade: idadeHospede });
        }
    } else if (opcao === 2) {
        let nomePesquisa = prompt("Qual o nome do Hóspede que deseja pesquisar?");
        let h = pesquisar_hospede(nomePesquisa);
        if (h) {
            alert(`Hóspede ${h.nome} foi encontrada(o)`);
            cadastro_hospedes()
        } else {
            alert(`Hóspede não encontrado`);
            cadastro_hospedes()
        }
    } else if (opcao === 3) {
        inicio();
        return;
    } else if (opcao == 4){
        reserva_evento()
    }

    alert(`${nomeDoUsuario}, o valor total das hospedagens é: R$${totalValorHospedagem}; ${gratuidades} gratuidade(s); ${meias} meia(s)`);
    inicio();
}

function reserva_evento() {
    let duracaoEvento = parseFloat(prompt("Qual a duração do evento em horas?"));
    let garconsNecessarios = parseInt(prompt("Quantos garçons serão necessários?"));

    let custoTotal = duracaoEvento * garconsNecessarios * 10.50;

    alert(`Custo total: R$ ${custoTotal.toFixed(2)}`);
    
    let confirmacao = prompt(`${nomeDoUsuario}, gostaria de efetuar a reserva? S/N`).toUpperCase();
    
    if (confirmacao === "S") {
        alert(`${nomeDoUsuario}, reserva efetuada com sucesso.`);
    } else {
        alert(`Reserva não efetuada, ${nomeDoUsuario}.`);
    }
}


function pesquisar_hospede(nome) {
    for (let i = 0; i < hospedes.length; i++) {
        if (hospedes[i].nome.toLowerCase() === nome.toLowerCase()) {
            return hospedes[i];
        }
    }
    return null;
}

function horaDeComer (){

    let numeroConvidados = parseInt(prompt("Qual o número de convidados para o evento?"));

    if (numeroConvidados > 350) {
        alert("Quantidade de convidados superior à capacidade máxima.");
    } else {
        let cafeLitros = numeroConvidados * 0.2;
        let aguaLitros = numeroConvidados * 0.5;
        let salgados = numeroConvidados * 7;

        let custoCafe = cafeLitros * 0.8;
        let custoAgua = aguaLitros * 0.4;
        let custoSalgados = (salgados / 100) * 34;

        let custoTotal = custoCafe + custoAgua + custoSalgados;

        console.log(`O evento precisará de ${cafeLitros} litros de café, ${aguaLitros} litros de água, ${salgados} salgados. O custo total do evento será de R$ ${custoTotal.toFixed(2)}`);

        let confirmacao = prompt(`${nomeDoUsuario}, gostaria de efetuar a reserva? S/N`).toUpperCase();

        if (confirmacao === "S") {
            console.log(`${nomeDoUsuario}, reserva efetuada com sucesso.`);
        } else {
            console.log("Reserva não efetuada.");
        }
    }
}

function reservaRestaurante() {
    let diaSemana = prompt("Qual o dia do seu evento?").toLowerCase();
    let hora = parseInt(prompt("Qual a hora do seu evento?"));

    if ((diaSemana === "segunda" || diaSemana === "terca" || diaSemana === "quarta" || diaSemana === "quinta" || diaSemana === "sexta") && (hora >= 7 && hora < 23)) {
        let nomeEmpresa = prompt("Qual o nome da empresa?");
        alert(`Restaurante reservado para ${nomeEmpresa}: ${diaSemana} às ${hora}hs.`);
    } else if ((diaSemana === "sabado" || diaSemana === "domingo") && (hora >= 7 && hora < 15)) {
        let nomeEmpresa = prompt("Qual o nome da empresa?");
        alert(`Restaurante reservado para ${nomeEmpresa}: ${diaSemana} às ${hora}hs.`);
    } else {
        alert("Restaurante indisponível");
    }
}


function verificarAuditorio() {
    let numeroConvidados = parseInt(prompt("Qual o número de convidados para o seu evento?"));

    if (numeroConvidados > 350 || numeroConvidados < 0) {
        alert("Quantidade de convidados superior à capacidade máxima");
    } else if (numeroConvidados <= 220) {
        let cadeirasAdicionais = 0;
        if (numeroConvidados > 150) {
            cadeirasAdicionais = numeroConvidados - 150;
            if (cadeirasAdicionais > 70) {
                cadeirasAdicionais = 70;
            }
        }
        alert(`Use o auditório Laranja (inclua mais ${cadeirasAdicionais} cadeiras)`);
        let confirmacao = prompt("Gostaria de efetuar a reserva? S/N").toUpperCase();
        if (confirmacao === "S") {
            alert(`${nomeDoUsuario}, reserva efetuada com sucesso.`);
        } else {
            alert("Reserva não efetuada.");
        }
    } else {
        alert("Use o auditório Colorado");
        let confirmacao = prompt("Gostaria de efetuar a reserva? S/N").toUpperCase();
        if (confirmacao === "S") {
            alert(`${nomeDoUsuario}, reserva efetuada com sucesso.`);
        } else {
            alert("Reserva não efetuada.");
        }
    }
}


function abastecer_carros(){
    let valorAlcoolWayneOil = parseFloat(prompt("Qual o valor do álcool no posto Wayne Oil?"));
    let valorGasolinaWayneOil = parseFloat(prompt("Qual o valor da gasolina no posto Wayne Oil?"));
    let valorAlcoolStarkPetrol = parseFloat(prompt("Qual o valor do álcool no posto Stark Petrol?"));
    let valorGasolinaStarkPetrol = parseFloat(prompt("Qual o valor da gasolina no posto Stark Petrol?"));

    let custoAlcoolWayneOil = valorAlcoolWayneOil * 0.7;
    let custoGasolinaWayneOil = valorGasolinaWayneOil;
    let custoAlcoolStarkPetrol = valorAlcoolStarkPetrol * 0.7;
    let custoGasolinaStarkPetrol = valorGasolinaStarkPetrol;

    if (custoAlcoolWayneOil < custoGasolinaWayneOil) {
        alert(`${nomeDoUsuario}, é mais barato abastecer com álcool no posto Wayne Oil`);
    } else {
        alert(`${nomeDoUsuario}, é mais barato abastecer com gasolina no posto Wayne Oil`);
    }

    if (custoAlcoolStarkPetrol < custoGasolinaStarkPetrol) {
        alert(`${nomeDoUsuario}, é mais barato abastecer com álcool no posto Stark Petrol`);
    } else {
        alert(`${nomeDoUsuario}, é mais barato abastecer com gasolina no posto Stark Petrol`);
    }
}

function arCondicionado() {
    let empresas = [];
    let menorp = Infinity;
    let empresaMenorValor = "";

    while (true) {
        let nomeEmpresa = prompt("Qual o nome da empresa?");
        let valorPorAparelho = parseFloat(prompt("Qual o valor por aparelho?"));
        let quantidadeAparelhos = parseInt(prompt("Qual a quantidade de aparelhos?"));
        let percentualDesconto = parseFloat(prompt("Qual a porcentagem de desconto?"));
        let quantidadeMinimaDesconto = parseInt(prompt("Qual o número mínimo de aparelhos para conseguir o desconto?"));

        let valorTotal = valorPorAparelho * quantidadeAparelhos;
        if (quantidadeAparelhos > quantidadeMinimaDesconto) {
            let desconto = (percentualDesconto / 100) * valorTotal;
            valorTotal -= desconto;
        }

        if (valorTotal < menorp) {
            menorp = valorTotal;
            empresaMenorValor = nomeEmpresa;
        }

        empresas.push({ nome: nomeEmpresa, valor: valorTotal });

        let resposta = prompt("Deseja informar novos dados? (S/N)").toUpperCase();
        if (resposta === "N") {
            break;
        }
    }

    alert(`O orçamento de menor valor é o de ${empresaMenorValor} por R$ ${menorp}`);
}


function erro() {
    alert('Por favor, informe um número entre 1 e 4');
    inicio();
}

function sair() {
    const confirma = confirm(`Muito obrigado e até logo, ${nomeDoUsuario}. Deseja realmente sair?`);
    if (confirma) {
        window.close();
    } else {
        inicio();
    }
}

inicio();
