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

    sacar(valor: number): void {
        if (valor < 0) {
            throw new AplicacaoError("O valor do saque não pode ser negativo.")
        }
        if (valor > this._saldo) {
            throw new AplicacaoError("Saldo insuficiente.")
        }
        this._saldo = this._saldo - valor
    }

    depositar(valor: number): void {
        if (valor < 0) {
            throw new AplicacaoError("O valor do depósito não pode ser negativo.")
        }
        this._saldo = this._saldo + valor
    }

    renderJuros(taxa: number): void {
        if (taxa < 0) {
            throw new AplicacaoError("A taxa de juros não pode ser negativa.")
        }
        this._saldo = this._saldo + this._saldo * (taxa / 100)
    }
}

// Classe Banco com métodos simplificados
class Banco {
    private contas: Conta[] = []

    adicionarConta(conta: Conta): void {
        this.contas.push(conta)
    }

    // Método para consultar conta por número
    consultar(numero: String): Conta {
        const conta = this.contas.find(c => c.numero === numero)
        if (!conta) {
            throw new ContaInexistenteError(); // Lança erro se a conta não for encontrada
        }
        return conta
    }

    // Método alterar (exemplo de um método fictício)
    alterar(numero: string, novoNumero: string): void {
        let conta = this.consultar(numero); // Consultar já garante que a conta existe ou lança exceção
        conta["_numero"] = novoNumero
    }

    // Método depositar
    depositar(numero: string, valor: number): void {
        let conta = this.consultar(numero); // Consultar já garante que a conta existe ou lança exceção
        conta.depositar(valor)
    }

    // Método sacar
    sacar(numero: string, valor: number): void {
        let conta = this.consultar(numero); // Consultar já garante que a conta existe ou lança exceção
        conta.sacar(valor)
    }

    // Método transferir
    transferir(origemNumero: string, destinoNumero: string, valor: number): void {
        let origem = this.consultar(origemNumero); // Consultar já garante que a conta existe ou lança exceção
        let destino = this.consultar(destinoNumero); // Consultar já garante que a conta existe ou lança exceção
        origem.sacar(valor)
        destino.depositar(valor)
    }

    // Método renderJuros
    renderJuros(numero: string, taxa: number): void {
        let conta = this.consultar(numero)  // Consultar já garante que a conta existe ou lança exceção
        conta.renderJuros(taxa)
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

    // Testando o método depositar
    console.log("\nDepositando 50 na conta 1:")
    banco.depositar("1", 50)
    console.log(`Saldo da conta 1: ${banco.consultar("1").saldo}`)

    // Testando o método sacar
    console.log("\nSacando 30 da conta 2:")
    banco.sacar("2", 30)
    console.log(`Saldo da conta 2: ${banco.consultar("2").saldo}`)

    // Testando o método transferir
    console.log("\nTransferindo 70 da conta 1 para a conta 2:")
    banco.transferir("1", "2", 70)
    console.log(`Saldo da conta 1: ${banco.consultar("1").saldo}`)
    console.log(`Saldo da conta 2: ${banco.consultar("2").saldo}`)

    // Testando o método renderJuros
    console.log("\nAplicando juros de 10% na conta 2:")
    banco.renderJuros("2", 10)
    console.log(`Saldo da conta 2 após aplicar juros: ${banco.consultar("2").saldo}`)

} catch (error) {
    console.log("Erro:", error.message)
}
