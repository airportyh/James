function keys(obj){
    var ret = []
    for (var key in obj)
        ret.push(key)
    return ret
}

function onClick(){
    alert('You clicked me!')
}

function layout(Title){
    var elems = Array.prototype.slice.call(arguments, 1)
    return html(
        head(title(Title),
            script({type: 'text/javascript'}, onClick)
        ),
        body(elems)
    )
}