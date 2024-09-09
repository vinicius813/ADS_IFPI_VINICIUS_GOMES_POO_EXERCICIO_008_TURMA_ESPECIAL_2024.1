function dividir(a, b) {
    if (b === 0) {
        return {
            sucesso: false,
            erro: "Erro: divisão por zero!"
        };
    }
    return {
        sucesso: true,
        resultado: a / b
    };
}
var resultado = dividir(10, 0);
if (resultado.sucesso) {
    console.log("Resultado: ", resultado.resultado);
}
else {
    console.log("Resultado: ", resultado.erro);
}
// Fim do caso especial Retornos de Um Erro em Exceções.
