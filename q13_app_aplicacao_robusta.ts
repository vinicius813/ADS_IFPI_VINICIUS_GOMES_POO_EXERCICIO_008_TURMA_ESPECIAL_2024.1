// Classe base para todos os erros da aplicação
class AplicacaoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AplicacaoError";
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

// Exceção para contas que não são poupança
class PoupancaInvalidaError extends AplicacaoError {
    constructor(message: string = "A conta não é uma conta poupança.") {
        super(message);
        this.name = "PoupancaInvalidaError";
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

// Simulação de entrada (substituindo prompt)
const input = (mensagem: string): string => {
    const resposta = prompt(mensagem);
    return resposta ? resposta : "";
};

// Estrutura de Aplicação Robusta
function app(): void {
    const banco = new Banco();
    banco.adicionarConta(new Conta("1", 100));
    banco.adicionarConta(new Poupanca("2", 200));

    let opcao: string;
    do {
        try {
            console.log("\n=== MENU ===");
            console.log("1 - Consultar saldo");
            console.log("2 - Depositar");
            console.log("3 - Sacar");
            console.log("4 - Render Juros");
            console.log("0 - Sair");
            opcao = input("Escolha uma opção: ");

            switch (opcao) {
                case "1":
                    const numContaConsulta = input("Informe o número da conta: ");
                    let contaConsulta = banco.consultar(numContaConsulta);
                    console.log(`Saldo da conta ${contaConsulta.numero}: R$${contaConsulta.saldo}`);
                    break;

                case "2":
                    const numContaDeposito = input("Informe o número da conta: ");
                    const valorDeposito = parseFloat(input("Informe o valor do depósito: "));
                    banco.consultar(numContaDeposito).depositar(valorDeposito);
                    console.log("Depósito realizado com sucesso!");
                    break;

                case "3":
                    const numContaSaque = input("Informe o número da conta: ");
                    const valorSaque = parseFloat(input("Informe o valor do saque: "));
                    banco.consultar(numContaSaque).sacar(valorSaque);
                    console.log("Saque realizado com sucesso!");
                    break;

                case "4":
                    const numContaJuros = input("Informe o número da conta poupança: ");
                    const taxaJuros = parseFloat(input("Informe a taxa de juros (%): "));
                    banco.renderJuros(numContaJuros, taxaJuros);
                    console.log("Juros aplicados com sucesso!");
                    break;

                case "0":
                    console.log("Encerrando o programa...");
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        } catch (error) {
            if (error instanceof AplicacaoError) {
                console.log(`Erro: ${error.message}`);
            } else {
                console.log("Erro inesperado:", error);
            }
        }
    } while (opcao !== "0");
}

// Inicia a aplicação
app();
