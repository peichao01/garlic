
/**
 *
 * @param num
 * @param len
 * @param _char
 * @param right
 * @param neat 长度整齐，过长的话就把右侧切掉
 * @returns {*}
 */
function pad(num, len, _char, right, neat){
	len = len || 2
	_char = _char || '0'
	num = num.toString()
	if(len <= num.length) {
		if(neat) return num.substr(0, len)
		else return num
	}
	var m = (new Array((len - num.length) + 1)).join(_char)
	return right ? (num + m) : (m + num)
}

function formatTime(phpTimestamp, format){
	format = format || 'YYYY-MM-dd'
	var t = new Date(parseInt(phpTimestamp) * 1000)
	var formatted_time = format
		.replace(/YYYY/g, t.getFullYear())
		.replace(/YY/g, t.getFullYear().toString().substr(2))
		.replace(/MM/g, pad(t.getMonth() + 1))
		.replace(/M/g, t.getMonth() + 1)
		.replace(/dd/g, pad(t.getDate()))
		.replace(/d/g, t.getDate())
		.replace(/hh/g, pad(t.getHours()))
		.replace(/h/g, t.getHours())
		.replace(/mm/g, pad(t.getMinutes()))
		.replace(/m/g, t.getMinutes())
		.replace(/ss/g, pad(t.getSeconds()))
		.replace(/s/g, t.getSeconds())
	return formatted_time
}

var filters = {
	degree: function(temperature){
		return temperature + 'ºC'
	},
	toPHPTS: function(timestamp){
		return Math.round(timestamp / 1000)
	},
	formatTime: formatTime,
	pad: pad
}

module.exports = filters