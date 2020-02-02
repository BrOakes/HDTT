from bs4 import BeautifulSoup
import requests

data = requests.get("https://www.homedepot.com/b/Tools/Milwaukee/Special-Values/N-5yc1vZc1xyZ7Zzv")
print(data.text)

# soup = BeautifulSoup(html_doc, 'html.parser')

# print(soup.body)