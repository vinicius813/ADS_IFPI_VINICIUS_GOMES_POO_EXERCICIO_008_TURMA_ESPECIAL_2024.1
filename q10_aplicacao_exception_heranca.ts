// Classe base para todos os erros da aplicação
class AplicacaoError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "AplicacaoError"
    }
}

// Erro para valores inválidos (menor ou igual a zero)
class valorInvalidoError extends AplicacaoError {
    constructor(message: string = "Valor inválido. Deve ser maior do que zero.") {
        super(message)
        this.name = "ValorInvalidoError"
    }
}

// Erro para quando a conta não for encontrada
class ContaInexistenteError extends AplicacaoError {
    constructor(message: string = "Conta inexistente.") {
        super(message)
        this.name = "ContaInexistenteError"
    }
}

// Classe Conta para verificação de métodos
class Conta {
    private _numero: String
    private _saldo: number = 0

    constructor(numero: String, saldoInicial: number) {
        this._numero = numero
        this.depositar(saldoInicial)  // Usa o método depositar para atribuir o saldo inicial 
    }

    get numero(): String {
        return this._numero
    }

    get saldo(): number {
        return this._saldo
    }

// Método para sacar o dinheiro da conta
        sacar(valor: number): void {
            if (valor <= 0) {
                throw new valorInvalidoError("O valor do saque deve ser maior que zero!")
            }
            if (valor > this._saldo) {
                throw new AplicacaoError("Saldo insuficiente.")
            }
            this._saldo = this._saldo - valor
        }
// Método para depositar dinheiro na conta
        depositar(valor: number): void {
            if (valor <= 0) {
                throw new valorInvalidoError()  // Lança erro se o valor for menor ou igual a 0.
            }
            this._saldo = this._saldo + valor
        }

// Método para render Juros
        renderJuros(taxa: number): void {
            if (taxa <= 0) {
                throw new valorInvalidoError("A taxa de juros deve ser maior do que zero.")
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
            throw new ContaInexistenteError()  // Lança erro se a conta não for encontrada. 
        }
        return conta
    }

    // Método depositar
    depositar(numero: string, valor: number): void {
        let conta = this.consultar(numero)
        conta.depositar(valor)  // Validação e depósito
    }

    // Método sacar
    sacar(numero: string, valor: number): void {
        let conta = this.consultar(numero)
        conta.sacar(valor)  // Validação e saque.
    }

    // Método transferir
    transferir(origemNumero: string, destinoNumero: string, valor: number): void {
        let origem = this.consultar(origemNumero)
        let destino = this.consultar(destinoNumero)
        origem.sacar(valor)  // Validação e saque da conta de origem.
        destino.depositar(valor)  // Validação e depósito na conta de destino.
    }

    // Método Render Juros
    renderJuros(numero: string, taxa: number): void {
        let conta = this.consultar(numero)
        conta.renderJuros(taxa)  // Validação e aplicação de juros
    }
}

// Testando a aplicação

        try {
            // Criando um banco e adicionando contas
            let banco: Banco = new Banco()
            let conta1: Conta = new Conta("1", 100.0)  // Saldo inicial válido
            let conta2: Conta = new Conta("2", 500.0)  // Saldo inicial válido
            banco.adicionarConta(conta1)
            banco.adicionarConta(conta2)

        // Testando o método depositar com valor inválido (menor ou igual a zero)
        console.log("\nTentando depositar valor inválido na conta 1: ")
        banco.depositar("1", -50)  // Deve lançar erro ValorInvalidoError
        } catch (error) {
            console.log("Erro: ", error.message)
        }

        try {
            // Testando o método sacar com valor inválido
            console.log("\nTentando sacar valor inválido da conta 2: ")
            banco.sacar("2", 0)  // Deve lançar erro ValorInvalidoError
        } catch (error) {
            console.log("Erro: ", error.message)
        }

        try {
            // Testando o método transferir com valor inválido
            console.log("\nTentando transferir valor inválido da conta 1 para a conta 2: ")
            banco.transferir("1", "2", -100)  // Deve lançar erro ValorInvalidoError 
        } catch (error) {
            console.log("Erro: ", error.message)
        }

        try {
            // Testando o método renderJuros com valor inválido.
            console.log("\nTentando aplicar juros inválidos na conta 2: ")
            banco.renderJuros("2", -5)  // Deve lançar erro ValorInvalidoError
        } catch (error) {
            console.log("Erro: ", error.message)
        }


