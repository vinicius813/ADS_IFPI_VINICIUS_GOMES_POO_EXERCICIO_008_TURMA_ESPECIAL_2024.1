var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Exceção base para todas as exceções de entrada inválida
var EntradaInvalidaError = /** @class */ (function (_super) {
    __extends(EntradaInvalidaError, _super);
    function EntradaInvalidaError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "EntradaInvalidaError";
        return _this;
    }
    return EntradaInvalidaError;
}(Error));
// Exceção para valores vazios
var ValorVazioError = /** @class */ (function (_super) {
    __extends(ValorVazioError, _super);
    function ValorVazioError(message) {
        if (message === void 0) { message = "Entrada não pode ser vazia."; }
        var _this = _super.call(this, message) || this;
        _this.name = "ValorVazioError";
        return _this;
    }
    return ValorVazioError;
}(EntradaInvalidaError));
// Exceção para números inválidos
var NumeroInvalidoError = /** @class */ (function (_super) {
    __extends(NumeroInvalidoError, _super);
    function NumeroInvalidoError(message) {
        if (message === void 0) { message = "Número inválido. Deve ser um valor numérico válido."; }
        var _this = _super.call(this, message) || this;
        _this.name = "NumeroInvalidoError";
        return _this;
    }
    return NumeroInvalidoError;
}(EntradaInvalidaError));
// Função para validar se a entrada não está vazia
function validarEntradaVazia(valor) {
    if (!valor || valor.trim() === "") {
        throw new ValorVazioError();
    }
}
// Função para validar se o valor é um número válido
function validarNumero(valor) {
    if (isNaN(Number(valor)) || valor.trim() === "") {
        throw new NumeroInvalidoError();
    }
}
// Simulação de entrada (substituindo prompt)
var input = function (mensagem) {
    var resposta = prompt(mensagem);
    return resposta ? resposta : "";
};
// Estrutura de Aplicação Robusta
function app() {
    var opcao;
    do {
        try {
            console.log("\n=== MENU ===");
            console.log("1 - Digitar um número válido");
            console.log("2 - Digitar uma string não vazia");
            console.log("0 - Sair");
            opcao = input("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    var numero = input("Informe um número: ");
                    validarEntradaVazia(numero); // Valida se não está vazio
                    validarNumero(numero); // Valida se é um número válido
                    console.log("N\u00FAmero digitado: ".concat(numero));
                    break;
                case "2":
                    var texto = input("Informe um texto: ");
                    validarEntradaVazia(texto); // Valida se não está vazio
                    console.log("Texto digitado: ".concat(texto));
                    break;
                case "0":
                    console.log("Encerrando o programa...");
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        }
        catch (error) {
            if (error instanceof EntradaInvalidaError) {
                console.log("Erro: ".concat(error.message));
            }
            else {
                console.log("Erro inesperado:", error);
            }
        }
    } while (opcao !== "0");
}
// Inicia a aplicação
app();
