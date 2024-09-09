/* Com o tratamento de erros, usando critério de herança de classes junto com
aplicações de erro descendentes, utilizamos uma classe base para todos os erros de uma
aplicação. */
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
        _this.name = "AplicacaoError"; // Define o nome da exceção
        return _this;
    }
    return AplicacaoError;
}(Error));
// Erro para quando a conta não for encontrada
var ContaInexistenteError = /** @class */ (function (_super) {
    __extends(ContaInexistenteError, _super);
    function ContaInexistenteError(message) {
        if (message === void 0) { message = "Conta inexistente"; }
        var _this = _super.call(this, message) || this;
        _this.name = "ContaInexistenteError"; // Define o nome da exceção
        return _this;
    }
    return ContaInexistenteError;
}(AplicacaoError));
// Erro para saldo insuficiente
var SaldoInsuficienteError = /** @class */ (function (_super) {
    __extends(SaldoInsuficienteError, _super);
    function SaldoInsuficienteError(message) {
        if (message === void 0) { message = "Saldo insuficiente para realizar a operação."; }
        var _this = _super.call(this, message) || this;
        _this.name = "SaldoInsuficienteError"; // Define o nome da exceção
        return _this;
    }
    return SaldoInsuficienteError;
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
            throw new SaldoInsuficienteError(); // lança erro específico na classe herdada.
        }
        this._saldo = this._saldo - valor;
        return true;
    };
    Conta.prototype.depositar = function (valor) {
        if (valor < 0) {
            throw new AplicacaoError("O valor do meu depósito não pode ser negativo!");
        }
        this._saldo = this._saldo + valor;
    };
    Conta.prototype.transferir = function (conta, valor) {
        try {
            conta.sacar(valor); // Tenta sacar da conta de origem
            this.depositar(valor); // Deposita na conta de destino
            return true; // transferência bem sucedida
        }
        catch (error) {
            if (error instanceof SaldoInsuficienteError) {
                console.log(error.message); // Exibe erro de saldo insuficiente.
            }
            else {
                console.log("Erro durante a transferência: ", error.message);
            }
            return false;
        }
    };
    return Conta;
}());
// Agora irei tratar minha classe Banco com exceções
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
    }
    Banco.prototype.adicionarConta = function (conta) {
        this.contas.push(conta);
    };
    Banco.prototype.buscarConta = function (numero) {
        var conta = this.contas.find(function (c) { return c["_numero"] === numero; });
        if (!conta) {
            throw new ContaInexistenteError(); // Lança erro de conta inexistente.
        }
        return conta;
    };
    Banco.prototype.transferir = function (numeroOrigem, numeroDestino, valor) {
        try {
            var origem = this.buscarConta(numeroOrigem);
            var destino = this.buscarConta(numeroDestino);
            var sucesso = origem.transferir(destino, valor);
            if (sucesso) {
                console.log("Tarnsfer\u00EAncia de ".concat(valor, " realizada com sucesso!"));
            }
            return sucesso;
        }
        catch (error) {
            if (error instanceof ContaInexistenteError) {
                console.log(error.message); // Conta não existe
            }
            else if (error instanceof SaldoInsuficienteError) {
                console.log(error.message); // Saldo insuficiente
            }
            else {
                console.log("Erro geral: ", error.message); // Outros erros
            }
            return false;
        }
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
    // Teste 1: Transferência com saldo insuficiente
    console.log("Teste 1: transferência com saldo insuficiente!");
    banco.transferir("1", "2", 200.0);
    // Teste 2: Conta Inexistente
    console.log("\nTeste 2: Conta inexistente!");
    banco.transferir("3", "2", 50.0); // Conta 3 não existe
    // Teste 3: Saque com valor negativo
    console.log("\nTeste 3: Saque com valor negativo!");
    conta1.sacar(-50);
}
catch (error) {
    console.log("Erro não tratado: ", error.message);
}
// Fim da questão.
