import requests
import json

key = "er77gLcQvTO5"

headers = {
    'Content-Type': 'application/json',
}

response = json.loads(requests.get('https://api-ip.fssp.gov.ru/api/v1.0/search/physical?token=er77gLcQvTO5&region=23&firstname=%D0%9A%D0%B8%D1%80%D0%B8%D0%BB%D0%BB&secondname=%D0%90%D0%BD%D1%82%D0%BE%D0%BD%D0%BE%D0%B2%D0%B8%D1%87&lastname=%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%D0%BE%D0%B2&birthdate=25.10.2001', headers=headers).text)

if(response["status"] == "success"):
    responseResult = json.loads(requests.get('https://api-ip.fssp.gov.ru/api/v1.0/result?token=er77gLcQvTO5&task=' + response["response"]["task"],headers=headers).text)
    print(responseResult)
else:
    print("error")