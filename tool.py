class Tool:
	def __init__(self, brand, name, model, price, rating, desc, url, imageurl, sku):
		self.brand = brand
		self.name = name
		self.model = model
		self.price = price
		self.rating = rating
		self.url = url
		self.imageurl = imageurl
		self.desc = desc
		self.sku = sku 

	def get_all_data(self):
		return '{} {} {} {} {} {} {} {} {}'.format(self.brand, self.name, self.model, self.price, self.rating, self.desc, self.url, self.imageurl, self.sku)

# temp = Tool('Milwaukee', 'saw', '2453-23', '199.99', '4.7', 'www.homedepot.com')

# print(temp.get_all_data())

