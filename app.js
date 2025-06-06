const express = require("express");
const app = express();
const session = require("express-session");
const handlebars = require("express-handlebars");

const middlewares = require("./middlewares/middlewares");
const routes = require("./routers/route");
const carrinhoRoutes = require("./routers/carrinhoRoutes");

// Configura o Handlebars com helpers customizados
app.engine("handlebars", handlebars.engine({
  defaultLayout: "main",
  helpers: {
    multiply: (a, b) => (a * b).toFixed(2),
    eq: (a, b) => a == b
  }
}));
app.set("view engine", "handlebars");

// Middleware de sessão
app.use(
  session({
    secret: "textosecreto",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 minutos
  })
);

// Leitura do corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessão logada (debug - pode remover depois se quiser)
app.use((req, res, next) => {
  console.log("Sessão:", req.session);
  next();
});

// Protege rotas por tipo de perfil
app.use('/cliente', middlewares.sessionControlCliente);
app.use('/vendedor', middlewares.sessionControlVendedor);

// Rotas específicas
app.use("/carrinho", carrinhoRoutes);

// Demais rotas (login, home, crud, etc.)
app.use(routes);

// Inicia o servidor
app.listen(8081, () => {
  console.log("Servidor no http://localhost:8081");
});
