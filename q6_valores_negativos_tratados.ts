class Conta {
    private _numero: String
    private _saldo: number

    constructor(numero: String, saldoInicial: number) {
        if (saldoInicial < 0) {
            throw new Error("O meu saldo inicial não pode ser negativo.")
        }
        this._numero = numero
        this._saldo = saldoInicial
    }

    get saldo(): number {
        return this._saldo
    }

    sacar(valor: number): boolean {
        if (valor < 0) {
            throw new Error("O valor do saque não pode ser negativo.")
        }
        if (valor > this._saldo) {
            throw new Error("Saldo insuficiente para realizar o saque.")
        }
        this._saldo = this._saldo - valor
        return true
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new Error("O valor do depósito não pode ser negativo.")
        }
        this._saldo = this._saldo + valor
    }

    transferir(conta: Conta, valor: number): boolean {
        try {
            conta.sacar(valor)  // Tenta sacar da conta de origem.
            this.depositar(valor)  // Deposita na conta de destino.
            return true
        } catch (error) {
            console.log(error.message)  // exibe o erro.
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
            console.log("Erro durante a transferência no banco: ", error.message)
            return false
        }
    }
}

// Simulação no Script Principal (app)

    try {
        // Criando agora duas contas com saldo positivo
        let banco: Banco = new Banco()
        let conta1: Conta = new Conta("1", 100.0)  // Conta com saldo suficiente.
        let conta2: Conta = new Conta("2", 500.0)  // Conta de destino.
    
        // Adicionando minhas contas ao Banco.
    banco.adicionarConta(conta1)
    banco.adicionarConta(conta2)

        // Testando a transferência de um valor maior do que o saldo
        console.log("Testando a transferência com saldo insuficiente: ")
        let sucesso: boolean = banco.transferir(conta1, conta2, 200)
        console.log(`A transferência foi bem sucedida? ${sucesso}`)
        console.log(`Saldo da conta1: ${conta1.saldo}`)
        console.log(`Saldo da conta2: ${conta2.saldo}`)

        // Testando saque com valor negativo
        console.log("\nTestando saque com valor negativo: ")
        conta1.sacar(-50)

    } catch (error) {
        console.log("Erro: ", error.message)
    }

    try {
        // Testando o depósito com valor negativo
        console.log("\nTestando depósito com valor negativo: ")
        let conta3: Conta = new Conta("3", 50)
        conta3.depositar(-20)
    } catch (error) {
        console.log("Erro: ", error.message)
    }

    try {
        // testando criação de conta com saldo inicial negativo
        console.log("\nTestando criação de conta com saldo inicial negativo: ")
        let conta4: Conta = new Conta("4", -100)
    } catch (error) {
        console.log("Erro: ", error.message)
    }