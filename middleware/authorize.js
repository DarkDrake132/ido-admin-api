
const authorizeSuperAdmin = (req, res, next) => {
    const admin = req.headers.user;
    if( admin == undefined ){
        return res.status(403).json({ message: 'User has to be an admin' });
    }
    if(admin === 'admin')
        next();
    else
        return res.status(403).json({ message: 'User is not the super admin' })
}

const authorizeAdmin = (req, res, next) => {
    const admin = req.headers.user;
    if( admin == undefined ){
        return res.status(403).json({ message: 'User has to be an admin' });
    }
    if(admin !== 'admin')
        next();
    else
        return res.status(403).json({ message: 'User is not the admin' })
}

module.exports = {
    authorizeSuperAdmin,
    authorizeAdmin,
}