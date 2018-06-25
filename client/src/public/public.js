export const jsonToForm = function(obj) { //对象转为字符串
	let str = ''
	for (let key in obj) {
		if (str == '') {
			str = `${key}=${obj[key]}`;
		}
		else {
			str += `&${key}=${obj[key]}`;
		}
	}
	return str
}