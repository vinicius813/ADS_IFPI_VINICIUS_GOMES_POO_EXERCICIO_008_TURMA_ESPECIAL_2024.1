var Conta = /** @class */ (function () {
    function Conta(numero, saldo) {
        this._numero = numero;
        this._saldo = saldo;
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
    };
    return Conta;
}());
// Testando o lançamento da exceção
var conta = new Conta("44", 100.00);
try {
    conta.sacar(200); // Isto é uma tentativa de sacar mais do que tem disponível.
}
catch (error) {
    console.log(error.message); // Exibe "Saldo insuficiente para realizar o saque!"
}
console.log(conta.saldo); // Neste caso agora, exibe o saldo atual (que não foi alterado) 
