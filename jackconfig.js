var File = require('file')
require('jimmel')
exports.app = function(env) {
    var path = env.PATH_INFO
    print('path: ' + path)
    if (path == '/')
        path = '/index'
    var response = {
        headers : {"Content-Type" : "text/html"}
    };
    var initCode = File.read('public/_init.js')
    var code = File.read('public' + path + '.js')
    var text = Jimmel.render(initCode + '\n' + code, {
            Env: env,
            Response: response
        }
    )
    response.body = [text]
    response.headers['Content-Length'] = String(text.length)
    
    if (!('status' in response))
        response.status = 200
    print(JSON.stringify(response))
    return response
}