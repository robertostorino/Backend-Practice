import jwt from 'jsonwebtoken';

// creo mi clae privada
const PRIVATE_KEY = "shhhhhhhhhhhhhhhhhhhhhhhh";

// recibo una info y devuelvo el token
export function generateAuthToken(nombre) {
    return jwt.sign({ nombre: nombre}, PRIVATE_KEY, { expiresIn: '60s'})
};

// middleware
export function auth(req, res, next) {
    const authHeader = req.headers["authorization"] || eq.headers["Authorization"];

    if(!authHeader) {
        return res.status(401).json({
            error: 'no autorizado',
            detalle: 'no te permito que ingresos'
        })
    };

    // extraigo el token
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(401).json({
            error: 'no autorizado',
            detalle: 'no te permito que ingreses'
        })
    };

    try {
        req.user = jwt.verify(token, PRIVATE_KEY)
    } catch (error) {
        return res.status(401).json({
            error: 'no autorizado',
            detalle: 'no te permito que ingreses'
        })
    };

    next();
};
