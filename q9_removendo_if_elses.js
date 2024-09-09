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
            throw new AplicacaoError("O valor do saque não pode ser negativo.");
        }
        if (valor > this._saldo) {
            throw new AplicacaoError("Saldo insuficiente.");
        }
        this._saldo = this._saldo - valor;
    };
    Conta.prototype.depositar = function (valor) {
        if (valor < 0) {
            throw new AplicacaoError("O valor do depósito não pode ser negativo.");
        }
        this._saldo = this._saldo + valor;
    };
    Conta.prototype.renderJuros = function (taxa) {
        if (taxa < 0) {
            throw new AplicacaoError("A taxa de juros não pode ser negativa.");
        }
        this._saldo = this._saldo + this._saldo * (taxa / 100);
    };
    return Conta;
}());
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
    // Método alterar (exemplo de um método fictício)
    Banco.prototype.alterar = function (numero, novoNumero) {
        var conta = this.consultar(numero); // Consultar já garante que a conta existe ou lança exceção
        conta["_numero"] = novoNumero;
    };
    // Método depositar
    Banco.prototype.depositar = function (numero, valor) {
        var conta = this.consultar(numero); // Consultar já garante que a conta existe ou lança exceção
        conta.depositar(valor);
    };
    // Método sacar
    Banco.prototype.sacar = function (numero, valor) {
        var conta = this.consultar(numero); // Consultar já garante que a conta existe ou lança exceção
        conta.sacar(valor);
    };
    // Método transferir
    Banco.prototype.transferir = function (origemNumero, destinoNumero, valor) {
        var origem = this.consultar(origemNumero); // Consultar já garante que a conta existe ou lança exceção
        var destino = this.consultar(destinoNumero); // Consultar já garante que a conta existe ou lança exceção
        origem.sacar(valor);
        destino.depositar(valor);
    };
    // Método renderJuros
    Banco.prototype.renderJuros = function (numero, taxa) {
        var conta = this.consultar(numero); // Consultar já garante que a conta existe ou lança exceção
        conta.renderJuros(taxa);
    };
    return Banco;
}());
// Testando a aplicação
try {
    // Criando um banco e adicionando contas
    var banco = new Banco();
    var conta1 = new Conta("1", 100.0);
    var conta2 = new Conta("2", 500.0);
    banco.adicionarConta(conta1);
    banco.adicionarConta(conta2);
    // Testando o método depositar
    console.log("\nDepositando 50 na conta 1:");
    banco.depositar("1", 50);
    console.log("Saldo da conta 1: ".concat(banco.consultar("1").saldo));
    // Testando o método sacar
    console.log("\nSacando 30 da conta 2:");
    banco.sacar("2", 30);
    console.log("Saldo da conta 2: ".concat(banco.consultar("2").saldo));
    // Testando o método transferir
    console.log("\nTransferindo 70 da conta 1 para a conta 2:");
    banco.transferir("1", "2", 70);
    console.log("Saldo da conta 1: ".concat(banco.consultar("1").saldo));
    console.log("Saldo da conta 2: ".concat(banco.consultar("2").saldo));
    // Testando o método renderJuros
    console.log("\nAplicando juros de 10% na conta 2:");
    banco.renderJuros("2", 10);
    console.log("Saldo da conta 2 ap\u00F3s aplicar juros: ".concat(banco.consultar("2").saldo));
}
catch (error) {
    console.log("Erro:", error.message);
}
