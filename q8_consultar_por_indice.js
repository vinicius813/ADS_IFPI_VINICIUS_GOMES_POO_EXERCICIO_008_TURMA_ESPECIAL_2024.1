// Classe base para todos os erros da aplicação
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
var AplicacaoError = /** @class */ (function (_super) {
    __extends(AplicacaoError, _super);
    function AplicacaoError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "AplicacaoError";
        return _this;
    }
    return AplicacaoError;
}(Error));
// Erro para quando a conta não for encontrada
var ContaInexistenteError = /** @class */ (function (_super) {
    __extends(ContaInexistenteError, _super);
    function ContaInexistenteError(message) {
        if (message === void 0) { message = "Conta inexistente."; }
        var _this = _super.call(this, message) || this;
        _this.name = "ContaInexistenteError";
        return _this;
    }
    return ContaInexistenteError;
}(AplicacaoError));
// Classe Conta
var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
        if (saldoInicial < 0) {
            throw new AplicacaoError("O saldo inicial não pode ser negativo!");
        }
        this._numero = numero;
        this._saldo = saldoInicial;
    }
    Object.defineProperty(Conta.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        enumerable: false,
        configurable: true
    });
    Conta.prototype.sacar = function (valor) {
        if (valor < 0) {
            throw new AplicacaoError("O valor do saque não pode ser negativo!");
        }
        if (valor > this._saldo) {
            throw new AplicacaoError("Saldo insuficiente");
        }
        this._saldo = this._saldo - valor;
        return true;
    };
    Conta.prototype.depositar = function (valor) {
        if (valor < 0) {
            throw new AplicacaoError("O valor do depósito não pode ser negativo!");
        }
        this._saldo = this._saldo + valor;
    };
    return Conta;
}());
// Classe Banco com tratamento de exceções
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
    }
    Banco.prototype.adicionarConta = function (conta) {
        this.contas.push(conta);
    };
    // Método para consultar conta por número
    Banco.prototype.consultar = function (numero) {
        var conta = this.contas.find(function (c) { return c.numero === numero; });
        if (!conta) {
            throw new ContaInexistenteError(); // Lança um erro se a conta não for encontrada.
        }
        return conta;
    };
    // Método para consultar conta por índice
    Banco.prototype.consultarPorIndice = function (indice) {
        if (indice < 0 || indice >= this.contas.length) {
            throw new ContaInexistenteError("Índice inválido. Conta inexistente!");
        }
        return this.contas[indice];
    };
    Banco.prototype.transferir = function (origemNumero, destinoNumero, valor) {
        try {
            var origem = this.consultar(origemNumero);
            var destino = this.consultar(destinoNumero);
            origem.sacar(valor);
            destino.depositar(valor);
            console.log("Transfer\u00EAncia de ".concat(valor, " realizada com sucesso!"));
            return true;
        }
        catch (error) {
            if (error instanceof ContaInexistenteError) {
                console.log(error.message); // Conta não existe.
            }
            else {
                console.log("Erro geral: ", error.message); // Outros erros
            }
            return false;
        }
    };
    return Banco;
}());
// Testando a minha aplicação
try {
    // Criando um banco e adicionando contas
    var banco = new Banco();
    var conta1 = new Conta("1", 100.0);
    var conta2 = new Conta("2", 500.0);
    banco.adicionarConta(conta1);
    banco.adicionarConta(conta2);
    // Testando o método consultar por conta existente
    console.log("Testando consultar o método consultar conta existente.");
    var conta = banco.consultar("1");
    console.log("Conta encontrada: N\u00FAmero ".concat(conta.numero, ", Saldo: ").concat(conta.saldo));
    // Testando o método consultar por conta inexistente
    console.log("\nTestando consultar conta inexistente.");
    banco.consultar("3"); // Conta não encontrada ou inexistente.
}
catch (error) {
    console.log("Erro: ", error.message);
}
try {
    // Testando ConsultarPorIndice com índice válido
    console.log("\nTestando consultarPorIndice com índice válido.");
    var contaPorIndice = banco.consultarPorIndice(0);
    console.log("Conta encontrada por \u00EDndice: N\u00FAmero ".concat(contaPorIndice.numero, ", Saldo: ").concat(contaPorIndice.saldo));
    // Testando ConsultarPorIndice com índice inválido
    console.log("\nTestando consultarPorIndice com índice inválido.");
    banco.consultarPorIndice(5); // Índice fora do limite permitido.
}
catch (error) {
    console.log("Erro: ", error.message);
}
