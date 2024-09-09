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
            return true; // Transferência bem-sucedida
        }
        catch (error) {
            console.log(error.message); // Exibe o erro (saldo insuficiente)
            return false; // Tranferência falhou
        }
    };
    return Conta;
}());
// Agora irei criar duas contas como o da questão
var conta1 = new Conta("1", 100.0); // Conta de origem com saldo insuficiente
var conta2 = new Conta("2", 500.0); // Conta de destino com saldo suficiente
// Tentando transferir um valor maior do que o saldo da conta1
var sucesso = conta2.transferir(conta1, 200);
console.log("A transfer\u00EAncia foi bem sucedida? ".concat(sucesso)); // False
console.log("Saldo da minha conta1: ".concat(conta1.saldo)); // Saldo original da conta 1
console.log("E o saldo da minha conta2: ".concat(conta2.saldo)); // Saldo original da conta 2 (nenhuma mudança)
// Fim da análise em um tratamento de retorno de erro em TS.
