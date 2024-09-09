// Função para simular uma chamada de API que pode retornar dados inválidos
function buscarUsuarioDaAPI() {
    // Dados simulando uma resposta inválida da API
    return {
        id: 1,
        nome: "João" // Email está faltando
    };
}
// Função para validar os dados recebidos
function validarUsuario(dados) {
    try {
        // Verificando se as propriedades essenciais estão presentes
        if (typeof dados.id !== 'number') {
            throw new Error("ID do usuário é inválido ou ausente!");
        }
        if (typeof dados.nome !== 'string') {
            throw new Error("Nome do usuário é inválido ou ausente!");
        }
        if (typeof dados.email !== 'string') {
            throw new Error("Email do usuário é inválido ou ausente!");
        }
        // Retorna o objeto validado se tudo estiver correto
        return {
            id: dados.id,
            nome: dados.nome,
            email: dados.email
        };
    }
    catch (erro) {
        console.error("Erro ao validar usuário: ", erro.message);
        return null;
    }
}
var usuario = validarUsuario(buscarUsuarioDaAPI());
if (usuario) {
    console.log("Usuário válido: ", usuario);
}
else {
    console.log("Erro: dados de usuário inválidos!");
}
