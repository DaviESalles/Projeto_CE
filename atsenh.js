// Importa o módulo 'bcrypt' para gerar hash seguro da senha
const bcrypt = require('bcrypt');

// Importa a configuração de conexão com o banco de dados Sequelize
const db = require('./config/db_sequelize');

// Função assíncrona
(async () => {
  // Gera um hash da senha '123' com 10 rounds de salt
  const hash = await bcrypt.hash('123', 10);

  // Atualiza a senha do cliente com login 'cliente@cliente.com' no banco de dados
  await db.Cliente.update(
    { senha: hash }, // Substitui a senha pela versão criptografada
    { where: { login: 'cliente@cliente.com' } } // Filtro para localizar o cliente
  );

  // Mensagem de confirmação no terminal
  console.log("Senha atualizada com hash.");
})();
