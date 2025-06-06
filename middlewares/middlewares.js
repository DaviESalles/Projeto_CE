module.exports = {

    // Middleware para proteger rotas de Cliente
    sessionControlCliente(req, res, next) {
        if (req.session.perfil === 'cliente' || req.session.perfil === 'vendedor') {
            res.locals.login = req.session.login || req.session.vendedorLogin;
            res.locals.perfil = req.session.perfil;

            // ✅ Ajuste aqui: se for vendedor, seta admin = true
            if (req.session.perfil === 'vendedor') {
                res.locals.admin = true;
            }

            return next();
        }

        // Permite GET na rota de login
        if ((req.url === '/') && (req.method === 'GET')) return next();
        // Permite POST de login
        if ((req.url === '/login') && (req.method === 'POST')) return next();

        // Caso contrário, redireciona para a raiz, que é a tela de login
        return res.redirect('/');
    },

    // Middleware para proteger rotas de Vendedor
    sessionControlVendedor(req, res, next) {
        if (req.session.perfil === 'vendedor') {
            res.locals.login = req.session.vendedorLogin;
            res.locals.perfil = 'vendedor';
            res.locals.admin = true;  // Vendedor sempre é admin
            return next();
        }

        // Corrigido: checar pela rota completa original
        if (req.originalUrl.startsWith('/vendedor/login')) {
            return next();
        }

        return res.redirect('/vendedor/login');
    }
};
