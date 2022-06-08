const path = require('path')

exports.getErrorPage = (req,res,next) => {
    res.render(path.join(__dirname, '../', 'views', 'error'))
}