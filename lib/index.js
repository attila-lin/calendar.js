var calendar = require("./calendar");


module.exports = function() {
	var argv = process.argv;
	var args = argv.length;
	
	var year = 0;
	var month = 0;

	// console.log(args);
	if(args === 2) {
		var d = new Date();
		year = d.getFullYear();
	} else if(argv[2] === "-y" && parseInt(argv[3])){
		// console.log(argv[3]);
		year = parseInt(argv[3]);
		if (argv[4] === "-m" && parseInt(argv[5])) {
			month = parseInt(argv[5]);	
			if(month > 12) {
				month %= 12;
				if (month === 0) {
					month = 12;
				}
			} else if (month < 0) {
				month %= 12;
				month += 12;
				month %= 12;
				if (month === 0)
					month = 12;
			}
			// console.log(month);
		}
	} 
	var cal = new calendar(year, month);
	cal.show();
}
