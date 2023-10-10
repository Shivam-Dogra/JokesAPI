const auth = (req,res,next) => {
    const {user} = req.query
    if(user === 'shivam'){
        req.user = {name: 'shivam', id: 1}
        next()
    }
    else {
        res.status(401).send("Access Denied.")
    }
}

module.exports = auth