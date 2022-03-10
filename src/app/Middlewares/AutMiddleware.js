const jwt = require('jsonwebtoken');
const config = require('../../config/authentication');
const { promisify } = require('util');


module.exports = async (req, res, next) => {

    const authmid = req.headers.authorization;

    if(!authmid){       // verificando se o usuário enviou o token
        return res.status(401).json({
            código: 130,
            msg: "token de autenticação não enviado."
        })
    }

    const [splitBearer, token] = authmid.split(' ');

    try {
        const uncode = await promisify(jwt.verify)(token, config.secret);

        if(!uncode){
            return res.status(401).json({
                código: 130,
                msg: "token expirado."
            })
        } else {
            req.aluno_id = uncode.id;
            next();
        }
    } catch {
        return res.status(401).json({
            código: 130,
            msg: "token expirado."
        })
    }
}
