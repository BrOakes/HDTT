import tool
import requests
import json
from bs4 import BeautifulSoup

result = requests.get('https://www.homedepot.com/b/Tools/Milwaukee/N-5yc1vZc1xyZzvZbwo4z', headers={'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'})

print(result.status_code)

soup = BeautifulSoup(result.content, 'lxml')

data = json.loads(soup.find('script', type='application/ld+json').text)

modelNums = soup.find_all('div', {'class': 'pod-plp__model'})

for item in data['mainEntity']['offers']['itemOffered']:
	modelNo = 'DUMBOHOMEBO'
	for model in modelNums:
		if (model.text.split(' ')[7].strip() in item['url']):
			modelNo = model.text.split(' ')[7].strip()
	t = tool.Tool(item['brand'], item['name'], modelNo, item['offers']['price'], item['aggregateRating']['ratingValue'], item['description'], item['url'], item['image'], item['sku'])
	print(t.get_all_data() + '\n\n')

