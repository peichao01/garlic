var garlic = require('../garlic')
var filters = require('./filters')

var template = '今天天气{{ weather }}， 现在的温度是：{{ temperature | degree }}\n' +
				'今天是日期是：{{ timestamp | toPHPTS | formatTime("MM-dd-YYYY") }}'
var context = {
	weather: '非常好',
	temperature: 27,
	timestamp: new Date('2015-1-3').getTime()
}
var result = garlic(template, context, filters)
console.log(result)