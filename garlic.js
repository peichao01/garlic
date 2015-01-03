// 一个极其简单的模板处理器
function tpl(str, ctx, filters){
	return str.replace(/\{\{\s*([^\}]+)\s*\}\}/g, function(match, $1){
		// 没有使用 filter
		if($1.indexOf('|') == -1){
//			return ctx[$1]
			return getVal($1, ctx)
		}
		// 使用 filter
		else{
			var vals = $1.split('|').map(function(s){return s.trim()})
			// 最初的值
			var val = getVal(vals.shift(), ctx)

			vals.forEach(function(filterExpression){
				var match = filterExpression.match(/^([^\(]+)(?:\((.+)\))?/)
				var filterName = match[1]
				var args = match[2]
				if(args){
					// 上一次的值永远是下一个filter执行时的第一个参数
					args = [val].concat(getVal('[' + match[2] + ']', ctx))//JSON.parse('[' + match[2] + ']'))
				}
				else args = [val]
				var filter = filters[filterName]
				val = filter.apply(null, args)
			})
			return val
		}
	})

	// getVal('[aa.name, bb, 2, "ccc"]', {aa:{name:'pei chao'}, 'bb':'bbb'})
	// ==>>
	// ["pei chao", "bbb", 2, "ccc"]
	function getVal(val, ctx){
		var fnBody = ''
		for(var key in ctx){
			fnBody += 'var '+key+'=ctx["'+key+'"];'
		}
		fnBody += 'return '+val+';'
		return new Function("ctx",fnBody)(ctx)
	}
}
module.exports = tpl