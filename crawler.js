const request = require('request');
const fs = require('fs');

class ToolData{
	constructor(name, model, price, rating, link) {
		this.name = name;
		this.model = model;
		this.price = price;
		this.rating = rating;
		this.link = link;
	}

	get allData() {
		return `${this.name} ${this.model} ${this.price} ${this.rating} ${this.link}`
	}
}


// const temp = new ToolData('saw', '2445', '199.00', '4.7', '249.99')

// console.log(temp.allData);

const toolListings = [];


function getToolListings(start = 0) {
	request({
		uri: "https://www.homedepot.com/b/Tools/N-5yc1vZc1xyZzv?experienceName=default&Nao=" + start +"&Ns=None",
	}, function (error, response, body) {
			let totalResults = body.substring(body.indexOf('<span class="product-count__title show" id="allProdCount">') + 58, (body.indexOf('</span>', body.indexOf('<span class="product-count__title show" id="allProdCount">') + 58)));
			totalResults = parseInt(totalResults.replace(',', ''));
			for (let i = 0; i < 24; i++) {
				let itemIndex = body.indexOf('<div class="plp-pod__info">', body.indexOf('data-pos="' + i + '"', body.indexOf('<div id="products"')));
				// console.log(itemIndex);
				let name = extractData(body, '<span class="pod-plp__brand-name">Milwaukee</span>', '</a>', itemIndex);
				let modelNo = extractData(body, 'Model# &nbsp;', '</div>', itemIndex);
				let price = extractData(body, '<span class="price__format">&#36;</span>', '<span', itemIndex);
				let rating = extractData(body, '<span class="stars" rel="', '"', itemIndex);
				let link = 'https://www.homedepot.com' + extractData(body, 'data-request-type="br" data-pod-type="pr" href="', '">', itemIndex);
				toolListings.push(new ToolData(name, modelNo, price, rating, link));
			}
			// console.log(totalResults , toolListings.length);
			if (totalResults > toolListings.length) {
				console.log(totalResults , toolListings.length);
				getToolListings(toolListings.length);
			}
			else{
				for (let i = 0; i < toolListings.length; i++) {
					console.log(toolListings[i].allData);
				}
			}
	})
}

function extractData(body, startString, endString, start = 0) {
	return body.substring(body.indexOf(startString, start) + startString.length, body.indexOf(endString, body.indexOf(startString, start) + startString.length));
}

getToolListings();




//<span class="pod-plp__brand-name">Milwaukee</span>

//https://www.homedepot.com/b/Tools/N-5yc1vZc1xyZzv?experienceName=default&Nao=0&Ns=None
//https://www.homedepot.com/b/Tools/N-5yc1vZc1xyZzv?experienceName=default&Nao=24&Ns=None
//https://www.homedepot.com/b/Tools/N-5yc1vZc1xyZzv?experienceName=default&Nao=48&Ns=None

// request({
// 	uri: "https://www.homedepot.com/b/Tools/Milwaukee/Special-Values/N-5yc1vZc1xyZ7Zzv",
// }, function (error, response, body) {
// 		fs.writeFile('data.html', body, function (err) {
// 			if (err) throw err;
// 			console.log('File is created successfully.');
// 		  });
// })

//<span class="pod-plp__brand-name">Milwaukee</span>