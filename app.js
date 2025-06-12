// Importa o framework Express
const express = require("express");
// Cria uma instância do app
const app = express();

// Importa o gerenciador de sessões
const session = require("express-session");

// Importa o motor de templates Handlebars
const handlebars = require("express-handlebars");

// Importa middlewares customizados para controle de sessão
const middlewares = require("./middlewares/middlewares");

// Importa as rotas gerais e do carrinho
const routes = require("./routers/route");
const carrinhoRoutes = require("./routers/carrinhoRoutes");

// Configura o Handlebars como motor de views, com layout padrão "main"
// Adiciona dois helpers: multiply (para multiplicar valores no template) e eq (para comparar valores)
app.engine("handlebars", handlebars.engine({
  defaultLayout: "main",
  helpers: {
    multiply: (a, b) => (a * b).toFixed(2), // usado para calcular subtotal de produto no carrinho, por ex.
    eq: (a, b) => a == b // usado para verificar igualdade (ex.: tipo de usuário)
  }
}));
app.set("view engine", "handlebars"); // Define o motor de views como handlebars

// Configura a sessão para os usuários
app.use(
  session({
    secret: "textosecreto", // chave secreta para criptografar a sessão
    resave: false,          // não salva novamente se nada foi modificado
    saveUninitialized: false, // não cria sessão até que algo seja salvo nela
    cookie: { maxAge: 30 * 60 * 1000 } // tempo de vida do cookie: 30 minutos
  })
);

// Permite que o app interprete dados em JSON e em formulários (urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de debug para mostrar dados da sessão no console a cada requisição
app.use((req, res, next) => {
  console.log("Sessão:", req.session);
  next();
});

// Middleware que protege rotas com base no tipo de perfil logado
app.use('/cliente', middlewares.sessionControlCliente);   // apenas clientes autenticados
app.use('/vendedor', middlewares.sessionControlVendedor); // apenas vendedores autenticados

// Aponta as rotas do carrinho (ex.: /carrinho/adicionar)
app.use("/carrinho", carrinhoRoutes);

// Aponta as demais rotas do sistema (login, home, CRUDs, etc.)
app.use(routes);

// Inicia o servidor e escuta na porta 8081
app.listen(8081, () => {
  console.log("Servidor no http://localhost:8081");
});
