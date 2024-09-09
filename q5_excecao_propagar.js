var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
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
        if (valor > this._saldo) {
            throw new Error("Saldo insuficiente para realizar o saque!");
        }
        this._saldo = this._saldo - valor;
        return true;
    };
    Conta.prototype.depositar = function (valor) {
        this._saldo = this._saldo + valor;
    };
    Conta.prototype.transferir = function (conta, valor) {
        try {
            conta.sacar(valor); // Tenta sacar da conta de origem
            this.depositar(valor); // Deposita na conta de destino
            return true;
        }
        catch (error) {
            console.log(error.message); // Exibe o erro (saldo insuficiente)
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
            var sucesso_1 = origem.transferir(destino, valor);
            if (sucesso_1) {
                console.log("Transfer\u00EAncia de ".concat(valor, " realizada com sucesso!"));
            }
            return sucesso_1;
        }
        catch (error) {
            console.log("Erro durante a transferência no banco! ", error.message);
            return false;
        }
    };
    return Banco;
}());
// Simulação no script principal (app)
var banco = new Banco();
var conta1 = new Conta("1", 100.0); // Conta de origem com saldo insuficiente.
var conta2 = new Conta("2", 500.0); // Conta de destino.
// Adicionando as contas ao Banco.
banco.adicionarConta(conta1);
banco.adicionarConta(conta2);
// Tentando transferir um valor maior do que o saldo de conta1
var sucesso = banco.transferir(conta1, conta2, 200);
console.log("A minha transfer\u00EAncia foi bem sucedida? ".concat(sucesso));
console.log("Saldo da conta1: ".concat(conta1.saldo));
console.log("Saldo da minha conta2: ".concat(conta2.saldo));
// Fim da questão
