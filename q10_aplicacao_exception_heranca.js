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
// Erro para valores inválidos (menor ou igual a zero)
var valorInvalidoError = /** @class */ (function (_super) {
    __extends(valorInvalidoError, _super);
    function valorInvalidoError(message) {
        if (message === void 0) { message = "Valor inválido. Deve ser maior do que zero."; }
        var _this = _super.call(this, message) || this;
        _this.name = "ValorInvalidoError";
        return _this;
    }
    return valorInvalidoError;
}(AplicacaoError));
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
// Classe Conta para verificação de métodos
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
    // Método para sacar o dinheiro da conta
    Conta.prototype.sacar = function (valor) {
        if (valor <= 0) {
            throw new valorInvalidoError("O valor do saque deve ser maior que zero!");
        }
        if (valor > this._saldo) {
            throw new AplicacaoError("Saldo insuficiente.");
        }
        this._saldo = this._saldo - valor;
    };
    // Método para depositar dinheiro na conta
    Conta.prototype.depositar = function (valor) {
        if (valor <= 0) {
            throw new valorInvalidoError(); // Lança erro se o valor for menor ou igual a 0.
        }
        this._saldo = this._saldo + valor;
    };
    // Método para render Juros
    Conta.prototype.renderJuros = function (taxa) {
        if (taxa <= 0) {
            throw new valorInvalidoError("A taxa de juros deve ser maior do que zero.");
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
            throw new ContaInexistenteError(); // Lança erro se a conta não for encontrada. 
        }
        return conta;
    };
    // Método depositar
    Banco.prototype.depositar = function (numero, valor) {
        var conta = this.consultar(numero);
        conta.depositar(valor); // Validação e depósito
    };
    // Método sacar
    Banco.prototype.sacar = function (numero, valor) {
        var conta = this.consultar(numero);
        conta.sacar(valor); // Validação e saque.
    };
    // Método transferir
    Banco.prototype.transferir = function (origemNumero, destinoNumero, valor) {
        var origem = this.consultar(origemNumero);
        var destino = this.consultar(destinoNumero);
        origem.sacar(valor); // Validação e saque da conta de origem.
        destino.depositar(valor); // Validação e depósito na conta de destino.
    };
    // Método Render Juros
    Banco.prototype.renderJuros = function (numero, taxa) {
        var conta = this.consultar(numero);
        conta.renderJuros(taxa); // Validação e aplicação de juros
    };
    return Banco;
}());
// Testando a aplicação
try {
    // Criando um banco e adicionando contas
    var banco = new Banco();
    var conta1 = new Conta("1", 100.0); // Saldo inicial válido
    var conta2 = new Conta("2", 500.0); // Saldo inicial válido
    banco.adicionarConta(conta1);
    banco.adicionarConta(conta2);
    // Testando o método depositar com valor inválido (menor ou igual a zero)
    console.log("\nTentando depositar valor inválido na conta 1: ");
    banco.depositar("1", -50); // Deve lançar erro ValorInvalidoError
}
catch (error) {
    console.log("Erro: ", error.message);
}
try {
    // Testando o método sacar com valor inválido
    console.log("\nTentando sacar valor inválido da conta 2: ");
    banco.sacar("2", 0); // Deve lançar erro ValorInvalidoError
}
catch (error) {
    console.log("Erro: ", error.message);
}
try {
    // Testando o método transferir com valor inválido
    console.log("\nTentando transferir valor inválido da conta 1 para a conta 2: ");
    banco.transferir("1", "2", -100); // Deve lançar erro ValorInvalidoError 
}
catch (error) {
    console.log("Erro: ", error.message);
}
try {
    // Testando o método renderJuros com valor inválido.
    console.log("\nTentando aplicar juros inválidos na conta 2: ");
    banco.renderJuros("2", -5); // Deve lançar erro ValorInvalidoError
}
catch (error) {
    console.log("Erro: ", error.message);
}
