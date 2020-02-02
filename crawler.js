const request = require('request');
const fs = require('fs');

class ToolData{
	constructor(name, model, price, rating, originalprice) {
		this.name = name;
		this.model = model;
		this.price = price;
		this.rating = rating;
		this.originalprice = originalprice;
	}

	get allData() {
		return `${this.name} ${this.model} ${this.price} ${this.rating} ${this.originalprice}`
	}
}


const temp = new ToolData('saw', '2445', '199.00', '4.7', '249.99')

console.log(temp.allData);

const 

// request({
// 	uri: "https://www.homedepot.com/b/Tools/Milwaukee/Special-Values/N-5yc1vZc1xyZ7Zzv",
// }, function (error, response, body) {
// 		fs.writeFile('data.html', body, function (err) {
// 			if (err) throw err;
// 			console.log('File is created successfully.');
// 		  });
// })

