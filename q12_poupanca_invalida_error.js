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
// Classe base para todos os erros da aplicação
var AplicacaoError = /** @class */ (function (_super) {
    __extends(AplicacaoError, _super);
    function AplicacaoError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "AplicacaoError";
        return _this;
    }
    return AplicacaoError;
}(Error));
// Exceção para quando a conta não for uma poupança
var PoupancaInvalidaError = /** @class */ (function (_super) {
    __extends(PoupancaInvalidaError, _super);
    function PoupancaInvalidaError(message) {
        if (message === void 0) { message = "A conta não é uma conta poupança."; }
        var _this = _super.call(this, message) || this;
        _this.name = "PoupancaInvalidaError";
        return _this;
    }
    return PoupancaInvalidaError;
}(AplicacaoError));
// Exceção para valores inválidos (menor ou igual a zero)
var ValorInvalidoError = /** @class */ (function (_super) {
    __extends(ValorInvalidoError, _super);
    function ValorInvalidoError(message) {
        if (message === void 0) { message = "Valor inválido. Deve ser maior que zero."; }
        var _this = _super.call(this, message) || this;
        _this.name = "ValorInvalidoError";
        return _this;
    }
    return ValorInvalidoError;
}(AplicacaoError));
// Exceção para quando a conta não for encontrada
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
        this._saldo = 0;
        this._numero = numero;
        this.depositar(saldoInicial); // Usa o método depositar para atribuir o saldo inicial
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
    // Método privado para validar valores
    Conta.prototype.validarValor = function (valor) {
        if (valor <= 0) {
            throw new ValorInvalidoError(); // Lança erro se o valor for menor ou igual a zero
        }
    };
    // Método para sacar dinheiro da conta
    Conta.prototype.sacar = function (valor) {
        this.validarValor(valor); // Chama o método de validação
        if (valor > this._saldo) {
            throw new AplicacaoError("Saldo insuficiente.");
        }
        this._saldo -= valor;
    };
    // Método para depositar dinheiro na conta
    Conta.prototype.depositar = function (valor) {
        this.validarValor(valor); // Chama o método de validação
        this._saldo += valor;
    };
    // Método para render juros (para ser sobrescrito na poupança)
    Conta.prototype.renderJuros = function (taxa) {
        throw new PoupancaInvalidaError(); // Lança erro se a conta não for poupança
    };
    return Conta;
}());
// Classe Poupanca, que herda de Conta
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Método para render juros na poupança
    Poupanca.prototype.renderJuros = function (taxa) {
        this.validarValor(taxa); // Chama o método de validação
        this.depositar(this.saldo * (taxa / 100)); // Aplica os juros
    };
    return Poupanca;
}(Conta));
// Classe Banco com métodos simplificados
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
            throw new ContaInexistenteError(); // Lança erro se a conta não for encontrada
        }
        return conta;
    };
    // Método para render juros (somente para poupanças)
    Banco.prototype.renderJuros = function (numero, taxa) {
        var conta = this.consultar(numero);
        conta.renderJuros(taxa); // Verifica se a conta pode render juros (se for poupança)
    };
    return Banco;
}());
// Testando a aplicação
try {
    // Criando um banco e adicionando contas
    var banco = new Banco();
    var contaCorrente = new Conta("1", 100.0); // Conta corrente (não poupança)
    var contaPoupanca = new Poupanca("2", 500.0); // Conta poupança
    banco.adicionarConta(contaCorrente);
    banco.adicionarConta(contaPoupanca);
    // Tentando render juros em uma conta corrente (não poupança)
    console.log("\nTentando render juros em uma conta corrente:");
    banco.renderJuros("1", 5); // Deve lançar PoupancaInvalidaError
}
catch (error) {
    console.log("Erro:", error.message);
}
try {
    // Tentando render juros em uma conta poupança
    console.log("\nTentando render juros em uma conta poupança:");
    var banco = new Banco();
    var contaPoupanca = new Poupanca("2", 500.0);
    banco.adicionarConta(contaPoupanca);
    banco.renderJuros("2", 5); // Deve aplicar os juros corretamente
    console.log("Novo saldo da conta poupança:", contaPoupanca.saldo);
}
catch (error) {
    console.log("Erro:", error.message);
}
