class Conta {
    private _numero: String
    private _saldo: number

    constructor(numero: String, saldoInicial: number) {
        this._numero = numero
        this._saldo = saldoInicial
    }

    get saldo() {
        return this._saldo
    }

    sacar(valor: number): boolean {
        if (valor > this._saldo) {
            throw new Error("Saldo insuficiente para realizar o saque!")
        }
        this._saldo = this._saldo - valor
        return true
    }

    depositar(valor: number): void {
        this._saldo = this._saldo + valor
    }

    transferir(conta: Conta, valor: number): boolean {
        try {
            conta.sacar(valor)  // Tenta sacar da conta de origem
            this.depositar(valor)  // Deposita na conta de destino
            return true  // Transferência bem-sucedida
        } catch (error) {
            console.log(error.message)  // Exibe o erro (saldo insuficiente)
            return false  // Tranferência falhou
        }
    }
}

// Agora irei criar duas contas como o da questão
let conta1: Conta = new Conta("1", 100.0)  // Conta de origem com saldo insuficiente
let conta2: Conta = new Conta("2", 500.0)  // Conta de destino com saldo suficiente

// Tentando transferir um valor maior do que o saldo da conta1
let sucesso: boolean = conta2.transferir(conta1, 200)

console.log(`A transferência foi bem sucedida? ${sucesso}`)  // False
console.log(`Saldo da minha conta1: ${conta1.saldo}`)  // Saldo original da conta 1
console.log(`E o saldo da minha conta2: ${conta2.saldo}`)  // Saldo original da conta 2 (nenhuma mudança)

// Fim da análise em um tratamento de retorno de erro em TS.