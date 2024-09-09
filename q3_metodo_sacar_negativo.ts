class Conta {
    private _numero: String
    private _saldo: number

    constructor(numero: String, saldo: number) {
        this._numero = numero
        this._saldo = saldo
    }

    get saldo() {
        return this._saldo
    }

    sacar(valor: number): void {
        if (valor > this._saldo) {
            throw new Error ("Saldo insuficiente para realizar o saque!")
        }
        this._saldo = this._saldo - valor
    }
}

// Testando o lançamento da exceção
let conta: Conta = new Conta("44", 100.00)

try {
    conta.sacar(200) // Isto é uma tentativa de sacar mais do que tem disponível.
} catch (error) {
    console.log(error.message) // Exibe "Saldo insuficiente para realizat o saque!"
}

console.log(conta.saldo)  // Neste caso agora, exibe o saldo atual (que não foi alterado) 
