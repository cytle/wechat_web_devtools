module.exports = function(req, res) {
    console.log('mock:', req.url)
    if (req.url === '/mock/200ok') {
        res.statusCode = 200
        res.end('')
    } else if (req.url.substr(0,16) === '/mock/no-content') {
        res.statusCode = parseInt(req.url.substring(17), 10)
        res.end('')
    } else if (req.url === '/mock/echo') {
        res.statusCode = 200
        req.pipe(res)
    } else if (req.url === '/mock/timeout') {
        setTimeout(function() {
            res.statusCode = 200
            res.end()
        }, 100)
    }
}
