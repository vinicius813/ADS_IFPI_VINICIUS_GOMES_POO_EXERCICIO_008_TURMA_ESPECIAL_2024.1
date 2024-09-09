function dividir (a: number, b: number): number {
    try {
        if (b === 0) {
        throw new Error ("Divisão por zero não permitida!")
        }
    } return a / b
    } catch (error) {
        console.error(error.message)
        return 0
    }

console.log(dividir(10, 0))  // Exibe para mim a resposta do throw new Error: Divisão por zero não permitida.