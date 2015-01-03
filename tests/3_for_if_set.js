var fs = require('fs')
var _path = require('path')
var garlic = require('../garlic')
var filters = require('./filters')
var template = fs.readFileSync(_path.join(__dirname, './3_for_if_set.tpl'), {encoding: 'utf8'})
var fileOutput = _path.join(__dirname, './3_for_if_set.output.js')

var context = {
	students:{
		peichao: {
			number: '0022334455',
			nick: '超2真神/龙魁',
			birth: new Date('1987-5-30').getTime()
		},
		'M猫线团': {
			number: '01223242342',
			nick: '喵小姐',
			birth: new Date('1989-12-13').getTime()
		}
	},
	today: 1
}


garlic.addFilter('upper', function(str){
	return str.toUpperCase()
})
garlic.addFilter('split', function(str){
	return str.split.apply(str, Array.prototype.slice.call(arguments, 1))
})
garlic.addFilter('toString', function(o){
	return o.toString()
})
garlic.addFilter('toPHPTS', filters.toPHPTS)
garlic.addFilter('formatTime', filters.formatTime)

function test1(){
	var tplFn = garlic(template)
	var result = tplFn(context)
	console.log(result)
}

function test2(){
	// precompile and output the precompiled function
	var precompiled = garlic.precompile(template)
	fs.writeFileSync(fileOutput, precompiled, {encoding:'utf8'})


	// read the function
	var tplFn = require(fileOutput)
	var result = tplFn(context)
	console.log(result)
}

console.log('===============================================')
test1()
console.log('===============================================')
test2()