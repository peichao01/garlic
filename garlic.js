// 一个极其简单的模板处理器
function tpl(str, ctx){
	return str.replace(/\{\{\s*([\w\d_]+)\s*\}\}/g, function(match, $1){
		return ctx[$1]
	})
}
module.exports = tpl