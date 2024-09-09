/* Com o tratamento de erros, usando critério de herança de classes junto com
aplicações de erro descendentes, utilizamos uma classe base para todos os erros de uma
aplicação. */

class AplicacaoError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "AplicacaoError"  // Define o nome da exceção
    }
}

// Erro para quando a conta não for encontrada
class ContaInexistenteError extends AplicacaoError {
    constructor(message: string = "Conta inexistente") {
        super(message)
        this.name = "ContaInexistenteError"  // Define o nome da exceção
    }
}

// Erro para saldo insuficiente
class SaldoInsuficienteError extends AplicacaoError {
    constructor(message: string = "Saldo insuficiente para realizar a operação.") {
        super(message)
        this.name = "SaldoInsuficienteError"  // Define o nome da exceção
    }
}

// Classe Conta
class Conta {
    private _numero: String
    private _saldo: number

    constructor(numero: String, saldoInicial: number) {
        if (saldoInicial < 0) {
            throw new AplicacaoError("O saldo inicial não pode ser negativo!")
        }
        this._numero = numero
        this._saldo = saldoInicial
    }

    get saldo(): number {
        return this._saldo
    }

    sacar(valor: number): boolean {
        if (valor < 0) {
            throw new AplicacaoError("O valor do saque não pode ser negativo!")
        }
        if (valor > this._saldo) {
            throw new SaldoInsuficienteError()  // lança erro específico na classe herdada.
        }
        this._saldo = this._saldo - valor
        return true
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new AplicacaoError("O valor do meu depósito não pode ser negativo!")
        }
        this._saldo = this._saldo + valor
    }

    transferir(conta: Conta, valor: number): boolean {
        try {
            conta.sacar(valor)  // Tenta sacar da conta de origem
            this.depositar(valor)  // Deposita na conta de destino
            return true  // transferência bem sucedida
        } catch (error) {
            if (error instanceof SaldoInsuficienteError) {
                console.log(error.message)  // Exibe erro de saldo insuficiente.
            } else {
                console.log("Erro durante a transferência: ",error.message)
            }
            return false
        }
    }
}

// Agora irei tratar minha classe Banco com exceções
class Banco {
    private contas: Conta[] = []

    adicionarConta(conta: Conta): void {
        this.contas.push(conta)
    }

    buscarConta(numero: String): Conta {
        const conta = this.contas.find(c => c["_numero"] === numero)
        if (!conta) {
            throw new ContaInexistenteError()  // Lança erro de conta inexistente.
        }
        return conta
    }

    transferir(numeroOrigem: String, numeroDestino: String, valor: number): boolean {
        try {
            const origem = this.buscarConta(numeroOrigem)
            const destino = this.buscarConta(numeroDestino)
            const sucesso = origem.transferir(destino, valor)
            if (sucesso) {
                console.log(`Tarnsferência de ${valor} realizada com sucesso!`)
            }
            return sucesso
        } catch (error) {
            if (error instanceof ContaInexistenteError) {
                console.log(error.message)  // Conta não existe
            } else if (error instanceof SaldoInsuficienteError) {
                console.log(error.message)  // Saldo insuficiente
            } else {
                console.log("Erro geral: ", error.message)  // Outros erros
            }
            return false
        }
    }
}

// Testando a aplicação

    try {
        // Criando um banco e adicionando contas
        let banco: Banco = new Banco()
        let conta1: Conta = new Conta("1", 100.0)
        let conta2: Conta = new Conta("2", 500.0)

        banco.adicionarConta(conta1)
        banco.adicionarConta(conta2)

        // Teste 1: Transferência com saldo insuficiente
        console.log("Teste 1: transferência com saldo insuficiente!")
        banco.transferir("1", "2", 200.0)

        // Teste 2: Conta Inexistente
        console.log("\nTeste 2: Conta inexistente!")
        banco.transferir("3", "2", 50.0)  // Conta 3 não existe

        // Teste 3: Saque com valor negativo
        console.log("\nTeste 3: Saque com valor negativo!")
        conta1.sacar(-50)
    } catch (error) {
        console.log("Erro não tratado: ", error.message)
    }

// Fim da questão.