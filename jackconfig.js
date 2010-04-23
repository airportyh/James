var File = require('file')
require('jimmel')
exports.app = function(env) {
    var path = env.PATH_INFO
    print('path: ' + path)
    if (path == '/')
        path = '/index'
    var initCode = File.read('public/_init.js')
    var code = File.read('public' + path + '.js')
    var text = Jimmel.render(initCode + '\n' + code, env)
    return {
        status : 200,
        headers : { "Content-Type" : "text/html", "Content-Length" : String(text.length) },
        body : [text]
    };
}