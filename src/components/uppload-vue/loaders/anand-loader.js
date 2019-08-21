/**
 * A special loader to remove any tabs, spaces, etc.
 * Made to minify template strings in code
 * @param {String} source
 * @returns {String}
 */
module.exports = function(source) {
	return source
		.replace(/ +(?= )/g, "")
		.replace(/"\n\t"/g, "")
		.replace(/\t/g, "");
};
