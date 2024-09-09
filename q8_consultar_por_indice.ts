// Classe base para todos os erros da aplicação

class AplicacaoError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "AplicacaoError"
    }
}

// Erro para quando a conta não for encontrada
class ContaInexistenteError extends AplicacaoError {
    constructor(message: string = "Conta inexistente.") {
        super(message)
        this.name = "ContaInexistenteError"
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

    get numero(): String {
        return this._numero
    }

    get saldo(): number {
        return this._saldo
    }

    sacar(valor: number): boolean {
        if (valor < 0) {
            throw new AplicacaoError("O valor do saque não pode ser negativo!")
        }
        if (valor > this._saldo) {
            throw new AplicacaoError("Saldo insuficiente")
        }
        this._saldo = this._saldo - valor
        return true
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new AplicacaoError("O valor do depósito não pode ser negativo!")
        }
        this._saldo = this._saldo + valor
    }
}

// Classe Banco com tratamento de exceções
class Banco {
    private contas: Conta[] = []

    adicionarConta(conta: Conta): void {
        this.contas.push(conta)
    }

    // Método para consultar conta por número
    consultar(numero: String): Conta {
        const conta = this.contas.find(c => c.numero === numero)
            if (!conta) {
                throw new ContaInexistenteError()  // Lança um erro se a conta não for encontrada.
            }
            return conta
    }

    // Método para consultar conta por índice
    consultarPorIndice(indice: number): Conta {
        if (indice < 0 || indice >= this.contas.length) {
            throw new ContaInexistenteError("Índice inválido. Conta inexistente!")
        }
        return this.contas[indice]
    }

    transferir(origemNumero: String, destinoNumero: String, valor: number): boolean {
        try {
            const origem = this.consultar(origemNumero)
            const destino = this.consultar(destinoNumero)
            origem.sacar(valor)
            destino.depositar(valor)
            console.log(`Transferência de ${valor} realizada com sucesso!`)
            return true
        } catch (error) {
            if (error instanceof ContaInexistenteError) {
                console.log(error.message)  // Conta não existe.
            } else {
                console.log("Erro geral: ", error.message)  // Outros erros
            }
            return false
        }
    }
}

// Testando a minha aplicação
        try {
            // Criando um banco e adicionando contas
            let banco: Banco = new Banco()
            let conta1: Conta = new Conta("1", 100.0)
            let conta2: Conta = new Conta("2", 500.0)
            banco.adicionarConta(conta1)
            banco.adicionarConta(conta2)

    // Testando o método consultar por conta existente
    console.log("Testando consultar o método consultar conta existente.")
    let conta = banco.consultar("1")
    console.log(`Conta encontrada: Número ${conta.numero}, Saldo: ${conta.saldo}`)

    // Testando o método consultar por conta inexistente
    console.log("\nTestando consultar conta inexistente.")
    banco.consultar("3")  // Conta não encontrada ou inexistente.
        } catch (error) {
            console.log("Erro: ", error.message)
        }

        try {
            // Testando ConsultarPorIndice com índice válido
            console.log("\nTestando consultarPorIndice com índice válido.")
            let contaPorIndice = banco.consultarPorIndice(0)
            console.log(`Conta encontrada por índice: Número ${contaPorIndice.numero}, Saldo: ${contaPorIndice.saldo}`)

            // Testando ConsultarPorIndice com índice inválido
            console.log("\nTestando consultarPorIndice com índice inválido.")
            banco.consultarPorIndice(5)  // Índice fora do limite permitido.

        } catch (error) {
            console.log("Erro: ", error.message)
        }