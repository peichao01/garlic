var garlic = require('../garlic')

var template = '今天天气{{ weather }}'
var context = {
	weather: '非常好'
}
var result = garlic(template, context)
console.log(result)