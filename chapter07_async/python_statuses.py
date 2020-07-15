import requests

r = requests.get('http://www.uts.edu.au/')
print("UTS has status code:", r.status_code)

r = requests.get('http://www.google.com/')
print("Google has status code:", r.status_code)