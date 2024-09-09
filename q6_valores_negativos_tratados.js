var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
        if (saldoInicial < 0) {
            throw new Error("O meu saldo inicial não pode ser negativo.");
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
            throw new Error("O valor do saque não pode ser negativo.");
        }
        if (valor > this._saldo) {
            throw new Error("Saldo insuficiente para realizar o saque.");
        }
        this._saldo = this._saldo - valor;
        return true;
    };
    Conta.prototype.depositar = function (valor) {
        if (valor < 0) {
            throw new Error("O valor do depósito não pode ser negativo.");
        }
        this._saldo = this._saldo + valor;
    };
    Conta.prototype.transferir = function (conta, valor) {
        try {
            conta.sacar(valor); // Tenta sacar da conta de origem.
            this.depositar(valor); // Deposita na conta de destino.
            return true;
        }
        catch (error) {
            console.log(error.message); // exibe o erro.
            return false;
        }
    };
    return Conta;
}());
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
    }
    Banco.prototype.adicionarConta = function (conta) {
        this.contas.push(conta);
    };
    Banco.prototype.transferir = function (origem, destino, valor) {
        try {
            var sucesso = origem.transferir(destino, valor);
            if (sucesso) {
                console.log("Transfer\u00EAncia de ".concat(valor, " realizada com sucesso!"));
            }
            return sucesso;
        }
        catch (error) {
            console.log("Erro durante a transferência no banco: ", error.message);
            return false;
        }
    };
    return Banco;
}());
// Simulação no Script Principal (app)
try {
    // Criando agora duas contas com saldo positivo
    var banco = new Banco();
    var conta1 = new Conta("1", 100.0); // Conta com saldo suficiente.
    var conta2 = new Conta("2", 500.0); // Conta de destino.
    // Adicionando minhas contas ao Banco.
    banco.adicionarConta(conta1);
    banco.adicionarConta(conta2);
    // Testando a transferência de um valor maior do que o saldo
    console.log("Testando a transferência com saldo insuficiente: ");
    var sucesso = banco.transferir(conta1, conta2, 200);
    console.log("A transfer\u00EAncia foi bem sucedida? ".concat(sucesso));
    console.log("Saldo da conta1: ".concat(conta1.saldo));
    console.log("Saldo da conta2: ".concat(conta2.saldo));
    // Testando saque com valor negativo
    console.log("\nTestando saque com valor negativo: ");
    conta1.sacar(-50);
}
catch (error) {
    console.log("Erro: ", error.message);
}
try {
    // Testando o depósito com valor negativo
    console.log("\nTestando depósito com valor negativo: ");
    var conta3 = new Conta("3", 50);
    conta3.depositar(-20);
}
catch (error) {
    console.log("Erro: ", error.message);
}
try {
    // testando criação de conta com saldo inicial negativo
    console.log("\nTestando criação de conta com saldo inicial negativo: ");
    var conta4 = new Conta("4", -100);
}
catch (error) {
    console.log("Erro: ", error.message);
}
