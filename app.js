// Importa o framework Express
const express = require("express");
const app = express();

// Importa o módulo express-session
const session = require("express-session");

// Importa o módulo do Express Handlebars (template engine)
const handlebars = require("express-handlebars");

// Importa os middlewares
const middlewares = require("./middlewares/middlewares");

// Importa o arquivo de rotas principal e o carrinho
const routes = require("./routers/route");
const carrinhoRoutes = require("./routers/carrinhoRoutes");

// Configura o Handlebars como mecanismo de template da aplicação, com helper 'multiply'
app.engine("handlebars", handlebars.engine({
  defaultLayout: "main",
  helpers: {
    multiply: (a, b) => (a * b).toFixed(2)
  }
}));
app.set("view engine", "handlebars");

// Middleware de sessão
app.use(
  session({
    secret: "textosecreto",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }
  })
);

// Middlewares para leitura do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Protege rotas específicas
app.use('/cliente', middlewares.sessionControlCliente);
app.use('/vendedor', middlewares.sessionControlVendedor);

// Rotas do carrinho
app.use("/carrinho", carrinhoRoutes);

// Demais rotas da aplicação
app.use(routes);

// Inicia o servidor Express
app.listen(8081, function () {
  console.log("Servidor no http://localhost:8081");
});
