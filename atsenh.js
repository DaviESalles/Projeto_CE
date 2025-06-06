const bcrypt = require('bcrypt');
const db = require('./config/db_sequelize'); // ajuste o caminho se necessário

(async () => {
  const hash = await bcrypt.hash('123', 10);
  await db.Cliente.update(
    { senha: hash },
    { where: { login: 'cliente@cliente.com' } }
  );
  console.log("Senha atualizada com hash.");
})();
