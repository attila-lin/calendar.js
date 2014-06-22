// module.exports = calendar;

var day = [ 
						[31,28,31,30,31,30,31,31,30,31,30,31],
 						[31,29,31,30,31,30,31,31,30,31,30,31]
					];

var month = [	"January(Jan.)一月", 
							"February(Feb.)二月", 
							"March(Mar.)三月", 
							"April(Apr.)四月", 
							"May(May)五月",
							"June(Jun.)六月",
							"July(Jul.)七月",
							"August(Aug.)八月",
							"September(Sept.)九月",
							"October(Oct.)十月",
							"November(Nov.)十一月", 
							"December(Dec.)十二月" ];

var week = ["Sun","Mon","Tue","Wen","Thu","Fri","Sat"];

var first = 4; // 1970/01/01 is Thursday

var isLeapYear = function(year) {
	if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) 
		return true;
	else 
		return false;
}

var calendar = module.exports = function(year, month){
	this.year = year;
	this.month = month;

	var passed = 0;
	if(year >= 1970) {
		for (var i = 1970; i < year; i++) {
			if (isLeapYear(i))
				passed += 366;
			else
				passed += 365;
		}
	} else {
		for (var i = year; i < 1970; i++) {
			if(isLeapYear(i))
				passed += 366;
			else
				passed += 365;
		}
	}
	// console.log(passed);
	if (month === 0) {
		// display all year
		
	} else {
		// display that month
		var row = (isLeapYear(year)) ? 1 : 0;	
			
		if(year >= 1970) {
			for(var i = 0; i < month - 1; i++) {
				passed += day[row][i];
				// console.log(passed);
			}
		} else {
			for(var i = 0; i < month - 1; i++) {
				passed -= day[row][i];
				// console.log(passed);
			}
		}
	}
	this.firstday = (year >= 1970) ? (first + passed) % 7 : (7 + (first - passed) % 7) % 7;
	// console.log(this.firstday);	
}

calendar.prototype.show = function() {
	console.log("\t\t\t\t" + this.year);
	var row = isLeapYear(this.year) ? 1 : 0;
	var firstday = this.firstday;
	var count = 0;
	if(this.month === 0) {
		for(var i = 0; i < 12; i++) {
			console.log(month[i]);
			console.log("\t" + week.join("\t"));
			count = firstday;
			// console.log(firstday);

			process.stdout.write("\t" + Array(firstday + 1).join("\t"));
			for(var d = 1; d <= day[row][i]; d++) {
				if(count === 7) {
					process.stdout.write('\n\t');
					count = 0;
				}
				process.stdout.write(d.toString());
				process.stdout.write('\t');
				count++;
			}
			firstday += day[row][i];
			firstday %= 7;
			process.stdout.write("\n\n"); 
		}
	} else {
		console.log(month[this.month - 1]);
		console.log("\t" + week.join("\t"));
		count = firstday;
		process.stdout.write("\t" + Array(firstday + 1).join("\t"));
		for(var d = 1; d <= day[row][this.month]; d++) {
			if(count === 7) {
				process.stdout.write('\n\t');
				count = 0;
			}
			process.stdout.write(d.toString());
			process.stdout.write('\t');
			count ++;
		}
		process.stdout.write("\n");
	}
}
