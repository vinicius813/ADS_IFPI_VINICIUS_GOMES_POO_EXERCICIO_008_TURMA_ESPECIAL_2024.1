// Classe base para todos os erros da aplicação
class AplicacaoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AplicacaoError";
    }
}

// Exceção para quando a conta não for uma poupança
class PoupancaInvalidaError extends AplicacaoError {
    constructor(message: string = "A conta não é uma conta poupança.") {
        super(message);
        this.name = "PoupancaInvalidaError";
    }
}

// Exceção para valores inválidos (menor ou igual a zero)
class ValorInvalidoError extends AplicacaoError {
    constructor(message: string = "Valor inválido. Deve ser maior que zero.") {
        super(message);
        this.name = "ValorInvalidoError";
    }
}

// Exceção para quando a conta não for encontrada
class ContaInexistenteError extends AplicacaoError {
    constructor(message: string = "Conta inexistente.") {
        super(message);
        this.name = "ContaInexistenteError";
    }
}

// Classe Conta
class Conta {
    private _numero: String;
    private _saldo: number = 0;

    constructor(numero: String, saldoInicial: number) {
        this._numero = numero;
        this.depositar(saldoInicial); // Usa o método depositar para atribuir o saldo inicial
    }

    get numero(): String {
        return this._numero;
    }

    get saldo(): number {
        return this._saldo;
    }

    // Método privado para validar valores
    protected validarValor(valor: number): void {
        if (valor <= 0) {
            throw new ValorInvalidoError(); // Lança erro se o valor for menor ou igual a zero
        }
    }

    // Método para sacar dinheiro da conta
    sacar(valor: number): void {
        this.validarValor(valor); // Chama o método de validação
        if (valor > this._saldo) {
            throw new AplicacaoError("Saldo insuficiente.");
        }
        this._saldo -= valor;
    }

    // Método para depositar dinheiro na conta
    depositar(valor: number): void {
        this.validarValor(valor); // Chama o método de validação
        this._saldo += valor;
    }

    // Método para render juros (para ser sobrescrito na poupança)
    renderJuros(taxa: number): void {
        throw new PoupancaInvalidaError(); // Lança erro se a conta não for poupança
    }
}

// Classe Poupanca, que herda de Conta
class Poupanca extends Conta {
    // Método para render juros na poupança
    renderJuros(taxa: number): void {
        this.validarValor(taxa); // Chama o método de validação
        this.depositar(this.saldo * (taxa / 100)); // Aplica os juros
    }
}

// Classe Banco com métodos simplificados
class Banco {
    private contas: Conta[] = [];

    adicionarConta(conta: Conta): void {
        this.contas.push(conta);
    }

    // Método para consultar conta por número
    consultar(numero: String): Conta {
        const conta = this.contas.find(c => c.numero === numero);
        if (!conta) {
            throw new ContaInexistenteError(); // Lança erro se a conta não for encontrada
        }
        return conta;
    }

    // Método para render juros (somente para poupanças)
    renderJuros(numero: string, taxa: number): void {
        let conta = this.consultar(numero);
        conta.renderJuros(taxa); // Verifica se a conta pode render juros (se for poupança)
    }
}

// Testando a aplicação

try {
    // Criando um banco e adicionando contas
    let banco: Banco = new Banco();
    let contaCorrente: Conta = new Conta("1", 100.0); // Conta corrente (não poupança)
    let contaPoupanca: Poupanca = new Poupanca("2", 500.0); // Conta poupança
    banco.adicionarConta(contaCorrente);
    banco.adicionarConta(contaPoupanca);

    // Tentando render juros em uma conta corrente (não poupança)
    console.log("\nTentando render juros em uma conta corrente:");
    banco.renderJuros("1", 5); // Deve lançar PoupancaInvalidaError
} catch (error) {
    console.log("Erro:", error.message);
}

try {
    // Tentando render juros em uma conta poupança
    console.log("\nTentando render juros em uma conta poupança:");
    let banco: Banco = new Banco();
    let contaPoupanca: Poupanca = new Poupanca("2", 500.0);
    banco.adicionarConta(contaPoupanca);
    banco.renderJuros("2", 5); // Deve aplicar os juros corretamente
    console.log("Novo saldo da conta poupança:", contaPoupanca.saldo);
} catch (error) {
    console.log("Erro:", error.message);
}
