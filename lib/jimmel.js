/*
Copyright (c) 2010, Toby Ho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function iterMap(map, func){
  for (var key in map) func(key, map[key]);
}
function mapMap(map, func){
  var ret = [];
  for (var key in map)
    ret.push(func(key, map[key]));
  return ret;
}
function dasherize(camel){
  return camel.replace( /([A-Z])/g, "-$1" ).toLowerCase()
}
function flatten(arr){
  return arr.reduce(function(curr, item){
    return item && item.constructor === Array ?
      curr.concat(item) :
      curr.concat([item])
  }, [])
}
function indent(str){
  return '\n' + str.split('\n').map(function(line){
    return '\t' + line
  }).join('\n') + '\n'
}
function toArray(na){
  var arr = []
  for (var i = 0; i < na.length; i++)
    arr.push(na[i])
  return arr
}

function _tag(){
  var opts = this.opts || {}
  var args = toArray(arguments)
  var selfclose = args[0]
  args = args.slice(1)
  var tag = args[0]
  var arg1 = args[1]
  var attrs = arg1 && arg1.constructor === Object && !(arg1[0] instanceof String) ?
    arg1 : null
  var contents = flatten(args.slice(attrs ? 2 : 1))
  attrs = attrs || {}
  var markup
  var insides = [tag].concat(
    mapMap(attrs, function(name, value){
      return name + '="' + value + '"';
    })).join(' ')
  
  
  if (contents.length == 0)
    contents = ''
  else if (contents.length == 1)
    contents = contents[0]
  else{
    contents = contents.join('')
  }
  markup = 
    selfclose ? 
      '<' + insides + '/>'
      : '<' + insides + '>' + contents + '</' + tag + '>'
  return markup
}

Jimmel = {
  doctype: '<!DOCTYPE html>'
}

Jimmel.url = function _url(url, params){
  function keys(obj){
    var ret = []
    for (var key in obj)
        ret.push(key)
    return ret
  }
  function encodeQS(params){
    return keys(params).filter(function(key){
      return params[key] !== undefined
    }).map(function(key){return key + '=' +
      encodeURI(params[key])}).join('&')
  }
  params = encodeQS(params)
  if (params)
    url += '?' + params
  return url
}

var tags =
'a abbracronym address applet area b base basefont bdo big blockquote body button caption center cite code col colgroup dd del dir div dfn dl dt em fieldset font form frame frameset h1 h2 h3 h4 h5 head html i iframe ins isindex kbd label legend li link map menu meta noframes noscript object ol optgroup option p param pre q s samp script select small span strike strong style sub sup table tbody td textarea tfoot th thead title tr tt u ul'.split(' ')
tags.forEach(function(tag){
  Jimmel[tag] = function(){
    return _tag.apply(this, [false, tag].concat(toArray(arguments)))
  }
})

var selfcloseTags = "input br hr img".split(' ')
selfcloseTags.forEach(function(tag){
  Jimmel[tag] = function(){
    return _tag.apply(this, [true, tag].concat(toArray(arguments)))
  }
})

Jimmel.render = function render(markup, params){
  params = params || {}
  with(params){
    with(this){
      var markup = eval(markup)
      var doctypeAppend = markup.substring(0, 5) == '<html' ? doctype : ''
      return doctypeAppend + markup
    }
  }
}

if (exports)
  exports.render = function(markup, params){
    return Jimmel.render(markup, params)
  }