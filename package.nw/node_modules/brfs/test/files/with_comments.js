var
    /**
     * Dependencies.
     */
    fs = require('fs'),

    /**
     * Local variables.
     */
    style = fs.readFileSync(__dirname + '/robot.html', 'utf8');


module.exports = function () {
    var
        tag = document.createElement('style'),
        content = document.createTextNode(style);

    tag.appendChild(content);
    document.body.appendChild(tag);
};
