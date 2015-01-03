var buildin_filters = {
}
function getFilter(name){
	return buildin_filters[name]
}
function _garlic(str){
	var regSplit = /(\{\%[^\}]+\%\})/g
	var regSplitExpression = /(\{\{[^\}]+\}\})/g
	var regBlock = /\{\%\s*(endif|endfor|else|if|elif|for|set)\s+(.+?)?\s*\%\}/
	var regExpression = /\{\{\s*([^\}]+?)\s*\}\}/
	var expressions = str.split(regSplit)
	var forStack = []

	var tplStr = 'var __str="";\n'
	expressions.forEach(function(expression){
		var m = expression.match(regBlock)
		if(m){
			tplStr += dealBlock(m[1], m[2])
		}
		else{
			expression.split(regSplitExpression).forEach(function(exp){
				var m = exp.match(regExpression)
				if(m){
					tplStr += dealExpression(m[1])
				}
				else{
					tplStr += dealStaticString(exp)
				}
			})
		}
	})
	tplStr += ';return __str\n'//+'})();\n'
	return tplStr

	function dealStaticString(str){
		return '__str+="' + newLine1(safeString(str)) + '";\n'
	}
	function dealExpression(expression){
		if(expression.indexOf('|') === -1){
			return '__str+=' + expression + ';\n'
		}
		else{
			var vals = expression.split('|').map(function(s){return s.trim()})
			// 最初的值
			var val = vals.shift()
			vals.forEach(function(filterExpression){
				var match = filterExpression.match(/^([^\(]+)(?:\((.+)\))?/)
				var filterName = match[1]
				var args = match[2]
				val = '__g.getFilter("' + filterName + '").call(__ctx, ' + val + (args ? (', ' + args) : '') + ')'
			})
			return '__str+=' + val + ';\n'
		}
	}
	function dealBlock(tag, expression){
		if(['for','endfor'].indexOf(tag) >= 0){
			return dealFor(tag, expression)
		}
		else if(['if','elif','else','endif'].indexOf(tag)>=0){
			return dealIf(tag, expression)
		}
		else if(tag === 'set'){
			return dealSet(expression)
		}
	}
	function dealIf(tag, expression){
		if(tag === 'endif'){
			return '}\n'
		}
		else if(tag === 'else'){
			return '}else{\n'
		}
		else{
			return (tag === 'if' ? tag : '}else if')+'('+expression.replace(/\bor\b/g,'||').replace(/\band\b/g,'&&').replace(/\bnot\b\s+/g, '!')+'){\n'
		}
	}
	function dealFor(tag, expression){
		if(tag == 'for'){
			var m = expression.match(/^\s*([^\,]+)\,?\s*(.+)?\s+in\s+(.+?)\s*$/)
			var str =   ';(function(){\n'+
				'var keys = Object.keys('+m[3]+');\n' +
				'var loop = {length: keys.length};\n' +
				'for(var i = 0, len = keys.length; i<len; i++){\n' +
				'loop.index0 = i;\n'+
				'loop.index = i+1;\n' +
				'loop.first = i === 0;\n' +
				'loop.last = i === len-1;\n' +
				'loop.revindex = len - i;\n' +
				'loop.revindex0 = len - 1 - i;\n' +
				'var key = keys[i];\n' +
				'var val = '+m[3]+'[key];\n' +
				(m[2] ? ('var ' + m[2] + ' = key;\n') : '') +
				'var ' + m[1] + ' = val;\n'
			forStack.push(str)
			return str
		}
		else{
			var str =       '}\n' +
				'})();\n'
			forStack.pop()
			return str
		}
	}
	function dealSet(express){
		return 'var ' + express + ';\n'
	}
}

function garlic(str){
	var tplStr = _garlic(str)
	return function(ctx){
		var fnBody = ''
		for(var key in ctx){
			if(ctx.hasOwnProperty(key)) fnBody += 'var ' + key + '=__ctx["'+key+'"];\n'
		}
		return new Function('__ctx', '__g',fnBody + tplStr)(ctx, garlic.context)
	}
}
garlic.context = {
	getFilter: getFilter
}

garlic.precompile = function(str){
	var tplStr = _garlic(str)
	var _tplStr = newLine2(safeString(tplStr))
	return 'module.exports = function(ctx){\n'+
		'var __tplStr=\'' + _tplStr + '\'\n' +
		'var fnBody = "";\n'+
		'for(var key in ctx){\n'+
		'if(ctx.hasOwnProperty(key)) fnBody += \'var \' + key + \'=__ctx["\'+key+\'"];\';\n'+
		'}\n'+
		'return new Function(\'__ctx\', \'__g\',fnBody + __tplStr)(ctx, garlic.context)'+
		'}'
}

garlic.addFilter = function(name, fn){
	buildin_filters[name] = fn
}

function safeString(str){
	return str.replace(/('|")/g,'\\$1')
}
function newLine1(str){
	return str.replace(/\n/g,'\\n\\\n')
}
function newLine2(str){
	// 先处理被 newLine1 处理过的字符串
	var dealNewLine1 = str.replace(/\\n\\/g, '\\\\n')
	return dealNewLine1.replace(/\n/g, '\\\n')
}

var G = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {}
module.exports = G.garlic = garlic