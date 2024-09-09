// Exceção base para todas as exceções de entrada inválida
class EntradaInvalidaError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EntradaInvalidaError";
    }
}

// Exceção para valores vazios
class ValorVazioError extends EntradaInvalidaError {
    constructor(message: string = "Entrada não pode ser vazia.") {
        super(message);
        this.name = "ValorVazioError";
    }
}

// Exceção para números inválidos
class NumeroInvalidoError extends EntradaInvalidaError {
    constructor(message: string = "Número inválido. Deve ser um valor numérico válido.") {
        super(message);
        this.name = "NumeroInvalidoError";
    }
}

// Função para validar se a entrada não está vazia
function validarEntradaVazia(valor: string): void {
    if (!valor || valor.trim() === "") {
        throw new ValorVazioError();
    }
}

// Função para validar se o valor é um número válido
function validarNumero(valor: string): void {
    if (isNaN(Number(valor)) || valor.trim() === "") {
        throw new NumeroInvalidoError();
    }
}

// Simulação de entrada (substituindo prompt)
const input = (mensagem: string): string => {
    const resposta = prompt(mensagem);
    return resposta ? resposta : "";
};

// Estrutura de Aplicação Robusta
function app(): void {
    let opcao: string;
    do {
        try {
            console.log("\n=== MENU ===");
            console.log("1 - Digitar um número válido");
            console.log("2 - Digitar uma string não vazia");
            console.log("0 - Sair");
            opcao = input("Escolha uma opção: ");

            switch (opcao) {
                case "1":
                    const numero = input("Informe um número: ");
                    validarEntradaVazia(numero);  // Valida se não está vazio
                    validarNumero(numero);        // Valida se é um número válido
                    console.log(`Número digitado: ${numero}`);
                    break;

                case "2":
                    const texto = input("Informe um texto: ");
                    validarEntradaVazia(texto);  // Valida se não está vazio
                    console.log(`Texto digitado: ${texto}`);
                    break;

                case "0":
                    console.log("Encerrando o programa...");
                    break;

                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        } catch (error) {
            if (error instanceof EntradaInvalidaError) {
                console.log(`Erro: ${error.message}`);
            } else {
                console.log("Erro inesperado:", error);
            }
        }
    } while (opcao !== "0");
}

// Inicia a aplicação
app();
