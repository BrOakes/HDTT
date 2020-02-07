const request = require('request');
const fs = require('fs');


const toolListings = [];

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

	get getName() {
		return this.name;
	}

	get getModel() {
		return this.model;
	}

	get getPrice() {
		return this.price;
	}

	get getLink() {
		return this.link;
	}
}


function getToolListings(brand, start = 0) {

	let urlLink;

	switch(brand){
		case 'Milwaukee':
			urlLink = 'https://www.homedepot.com/b/Tools/Milwaukee/N-5yc1vZc1xyZzv'
			break;
		case 'Makita':
			urlLink = 'https://www.homedepot.com/b/Tools/Makita/N-5yc1vZc1xyZyg';
			break;
		case 'Dewalt':
			urlLink = 'https://www.homedepot.com/b/Tools/DEWALT/N-5yc1vZc1xyZ4j2';
			break;
		case 'Hilti':
			urlLink = 'https://www.homedepot.com/b/Tools/Hilti/N-5yc1vZc1xyZpx';
			break;
		case 'Bosch':
			urlLink = 'https://www.homedepot.com/b/Tools/Bosch/N-5yc1vZc1xyZ9u';
			break;
	}

	request({
		uri: urlLink + "?Nao=" + start +"&Ns=None",
	}, function (error, response, body) {
			let totalResults = extractData(body, '<span class="product-count__title show" id="allProdCount">', '</span>');
			totalResults = parseInt(totalResults.replace(',', ''));
			for (let i = 0; i < 24; i++) {
				let itemIndex = body.indexOf('<div class="plp-pod__info">', body.indexOf('data-pos="' + i + '"', body.indexOf('<div id="products"')));
				let name = extractData(body, '<span class="pod-plp__brand-name">' + brand +'</span>', '</a>', itemIndex);
				let modelNo = extractData(body, 'Model# &nbsp;', '</div>', itemIndex);
				let price = extractData(body, '<span class="price__format">&#36;</span>', '<span', itemIndex);
				let rating = extractData(body, '<span class="stars" rel="', '"', itemIndex);
				let link = 'https://www.homedepot.com' + extractData(body, 'data-request-type="br" data-pod-type="pr" href="', '">', itemIndex);
				toolListings.push(new ToolData(name, modelNo, price, rating, link));
			}
			// console.log(totalResults , toolListings.length);
			if (totalResults > toolListings.length) {
				getToolListings(brand, toolListings.length);
			}
			else{
				for (let i = 0; i < toolListings.length; i++) {
					console.log(toolListings[i].getName);
				}
			}
	})
}

function extractData(body, startString, endString, start = 0) {
	return body.substring(body.indexOf(startString, start) + startString.length, body.indexOf(endString, body.indexOf(startString, start) + startString.length));
}

getToolListings('Milwaukee');