class Conta {
    private _numero: String
    private _saldo: number

    constructor(numero: string, saldoInicial: String) {
        this._numero = numero
        this._saldo = saldoInicial
    }

    get saldo(): number {
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
            return true
        } catch (error) {
            console.log(error.message)  // Exibe o erro (saldo insuficiente)
            return false
        }
    }
}

class Banco {
    private contas: Conta[] = []

    adicionarConta(conta: Conta): void {
        this.contas.push(conta)
    }

    transferir(origem: Conta, destino: Conta, valor: number): boolean {
        try {
            const sucesso = origem.transferir(destino, valor)
            if (sucesso) {
                console.log(`Transferência de ${valor} realizada com sucesso!`)
            }
            return sucesso
        } catch (error) {
            console.log("Erro durante a transferência no banco! ", error.message)
            return false
        }
    }
}

// Simulação no script principal (app)

let banco: Banco = new Banco()
let conta1: Conta = new Conta("1", 100.0)  // Conta de origem com saldo insuficiente.
let conta2: Conta = new Conta("2", 500.0)  // Conta de destino.

// Adicionando as contas ao Banco.
banco.adicionarConta(conta1)
banco.adicionarConta(conta2)

// Tentando transferir um valor maior do que o saldo de conta1
let sucesso: boolean = banco.transferir(conta1, conta2, 200)

console.log(`A minha transferência foi bem sucedida? ${sucesso}`)
console.log(`Saldo da conta1: ${conta1.saldo}`)
console.log(`Saldo da minha conta2: ${conta2.saldo}`)

// Fim da questão
