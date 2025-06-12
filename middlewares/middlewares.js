module.exports = {

    // Middleware para proteger rotas acessíveis por Clientes (e também por Vendedores, se aplicável)
    sessionControlCliente(req, res, next) {
        // Verifica se o usuário logado tem perfil de 'cliente' ou 'vendedor'
        if (req.session.perfil === 'cliente' || req.session.perfil === 'vendedor') {
            // Torna as informações de login e perfil disponíveis nas views
            res.locals.login = req.session.login || req.session.vendedorLogin;
            res.locals.perfil = req.session.perfil;

            // Se for vendedor, define que é um admin
            if (req.session.perfil === 'vendedor') {
                res.locals.admin = true;
            }

            return next(); // Permite o acesso à rota
        }

        // Permite acesso à rota '/' via GET (usado para tela de login pública)
        if ((req.url === '/') && (req.method === 'GET')) return next();

        // Permite o envio de dados via POST na rota de login (autenticação)
        if ((req.url === '/login') && (req.method === 'POST')) return next();

        // Qualquer outra tentativa de acesso não autorizada redireciona para a página inicial
        return res.redirect('/');
    },

    // Middleware para proteger rotas exclusivas de Vendedores
    sessionControlVendedor(req, res, next) {
        // Verifica se o perfil da sessão é 'vendedor'
        if (req.session.perfil === 'vendedor') {
            // Torna as informações disponíveis nas views
            res.locals.login = req.session.vendedorLogin;
            res.locals.perfil = 'vendedor';
            res.locals.admin = true; // Vendedor sempre é considerado administrador

            return next(); // Permite o acesso à rota
        }

        // Permite o acesso às rotas de login do vendedor (ex.: /vendedor/login)
        if (req.originalUrl.startsWith('/vendedor/login')) {
            return next();
        }

        // Qualquer outra tentativa de acesso redireciona para a tela de login do vendedor
        return res.redirect('/vendedor/login');
    }
};
