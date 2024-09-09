type ResultadoDivisao = {
    sucesso: boolean
    resultado?: number  // Resultado será definido apenas em caso de sucesso  
    erro?: string  // Erro será definido em caso de falha
}

function dividir (a: number, b: number): ResultadoDivisao {
    if (b === 0) {
        return {
            sucesso: false
            erro: "Erro: divisão por zero!"
        }
    }

        return {
            sucesso: true
            resultado: a / b
        }
}

const resultado = dividir(10, 0)

    if (resultado.sucesso) {
        console.log("Resultado: ", resultado.resultado)
    } else {
        console.log("Resultado: ", resultado.erro)
    }


// Fim do caso especial Retornos de Um Erro em Exceções.