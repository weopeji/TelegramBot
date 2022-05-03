import time

from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium_stealth import stealth
import json
from pyvirtualdisplay import Display
import sys


def ActionDealData(dataPathArray):
    try:
        errorPush = True

        if 'case' in dataPathArray:
            driver.find_element(By.CSS_SELECTOR, 'div[id="sug-cases"]').find_element(By.CSS_SELECTOR, 'input').send_keys(
                dataPathArray["case"])
            time.sleep(1)
            errorPush = False

        if not errorPush:

            time.sleep(1)
            driver.find_element(By.CSS_SELECTOR, 'body').click()
            time.sleep(1)

            _array = {}

            driver.find_element(By.ID, "b-form-submit").click()

            wait.until(EC.visibility_of_element_located((By.XPATH, '//table/colgroup')))

            header_table = driver.find_element(By.ID, "table")

            all_children = header_table.find_elements(By.TAG_NAME, "tr")

            errorFor = True

            for i in all_children:
                errorFor = False
                id_url = i.find_element(By.CLASS_NAME, "num").find_element(By.TAG_NAME, "a").get_attribute("href")
                driver.get(id_url)
                WebDriverWait(driver, 10)

                try:
                    _array["Term"]    = driver.find_element(By.CLASS_NAME, "case-dur").text
                except:
                    False

                try:
                    _array["Date"]    = driver.find_element(By.CLASS_NAME, "case-date").text
                except:
                    False

                try:
                    _array["Status"]  = driver.find_element(By.CLASS_NAME, "b-case-header-desc").text
                except:
                    False

                try:
                    _array["next"]    = driver.find_element(By.CLASS_NAME, "b-instanceAdditional").text
                except:
                    False

                _array["last"] = {}

                try:
                    driver.find_element(By.CSS_SELECTOR, 'div[class="b-collapse js-collapse"]').click()
                    time.sleep(0.5)

                    globalElement   = driver.find_element(By.CSS_SELECTOR, 'div[class="js-chrono-items-wrapper"]')
                    itemElemet      = globalElement.find_element(By.CLASS_NAME, 'b-chrono-item')

                    try:
                        _array["last"]["data"] = itemElemet.find_element(By.CLASS_NAME, 'l-col').find_element(By.CLASS_NAME, 'case-date').text
                    except:
                        False

                    try:
                        _array["last"]["type"] = itemElemet.find_element(By.CLASS_NAME, 'l-col').find_element(By.CLASS_NAME, 'case-date').text
                    except:
                        False

                    try:
                        _array["last"]["name"] = itemElemet.find_element(By.CLASS_NAME, 'r-col').find_element(By.CLASS_NAME, 'case-subject').text
                    except:
                        False

                    try:
                        _array["last"]["result"] = itemElemet.find_element(By.CLASS_NAME, 'r-col').find_element(By.CLASS_NAME, 'b-case-result').text
                    except:
                        False

                    try:
                        _array["last"]["href"] = itemElemet.find_element(By.CLASS_NAME, 'r-col').find_element(By.TAG_NAME, 'a').get_attribute("href")
                    except:
                        False

                    try:
                        _array["last"]["public"] = itemElemet.find_element(By.CLASS_NAME, 'r-col').find_element(By.CLASS_NAME, 'b-case-publish_info').text
                    except:
                        False

                except:
                    False

                print(json.dumps(_array, ensure_ascii=False).encode('utf8').decode())

            if errorFor:
                print('{"error": "Дело не найдено!"}')
        else:
            print('{"error": "Переданные данные не верны!"}')
    except ValueError:
        print('{"error": "Ошибка парсинга!!"}')
        print(ValueError)


def ActionFullData(dataPathArray):

    try:
        errorPush = True

        if 'inn' in dataPathArray:
            driver.find_element(By.CSS_SELECTOR, 'textarea[class="g-ph"]').send_keys(dataPathArray["inn"])
            time.sleep(1)
            errorPush = False

        if 'judge' in dataPathArray:
            driver.find_element(By.CSS_SELECTOR, 'div[id="sug-judges"]').find_element(By.CSS_SELECTOR, 'input').send_keys(dataPathArray["judge"])
            time.sleep(1)
            errorPush = False

        if 'court' in dataPathArray:
            driver.find_element(By.CSS_SELECTOR, 'div[id="caseCourt"]').find_element(By.CSS_SELECTOR, 'input').send_keys(dataPathArray["court"])
            time.sleep(1)
            errorPush = False

        if 'date_first' in dataPathArray:
            driver.find_element(By.CSS_SELECTOR, 'div[id="sug-dates"]').find_elements(By.CSS_SELECTOR, 'input')[0].click()
            time.sleep(1)
            driver.find_element(By.CSS_SELECTOR, 'div[id="sug-dates"]').find_elements(By.CSS_SELECTOR, 'input')[0].send_keys(dataPathArray["date_first"])
            time.sleep(1)
            errorPush = False

        if 'date_second' in dataPathArray:
            driver.find_element(By.CSS_SELECTOR, 'div[id="sug-dates"]').find_elements(By.CSS_SELECTOR, 'input')[1].click()
            time.sleep(1)
            driver.find_element(By.CSS_SELECTOR, 'div[id="sug-dates"]').find_elements(By.CSS_SELECTOR, 'input')[1].send_keys(dataPathArray["date_second"])
            time.sleep(1)
            errorPush = False

        if not errorPush:
            time.sleep(1)
            driver.find_element(By.CSS_SELECTOR, 'body').click()
            time.sleep(1)

            _array = {}

            driver.screenshot("screenshot_full.png")
            driver.find_element(By.ID, "b-form-submit").click()

            try:
                _array["many"] = wait.until(
                    EC.visibility_of_element_located((By.CSS_SELECTOR, '.b-found-total'))).get_attribute("innerHTML")

                wait.until(EC.visibility_of_element_located((By.XPATH, '//table/colgroup')))

                header_table = driver.find_element(By.ID, "table")

                all_children = header_table.find_elements(By.TAG_NAME, "tr")

                all_children_data = []

                for i in all_children:

                    def sity():
                        need_data = ""
                        try:
                            need_data = i.find_element(By.CLASS_NAME, "court").find_element(By.CLASS_NAME,
                                                                                            "b-container").find_element(
                                By.XPATH, ".//div[2]").text
                        except:
                            need_data = "Null"
                        return need_data

                    def respondent():
                        need_data = ""
                        try:
                            need_data = i.find_element(By.CLASS_NAME, "respondent").find_element(By.CLASS_NAME,
                                                                                                 "b-newRollover").text
                        except:
                            need_data = "Null"
                        return need_data

                    def judge():
                        need_data = ""
                        try:
                            need_data = i.find_element(By.CLASS_NAME, "court").find_element(By.CLASS_NAME,
                                                                                            "b-container").find_element(
                                By.XPATH, ".//div[1]").text
                        except:
                            need_data = "Null"
                        return need_data

                    def id_url():
                        need_data = ""
                        try:
                            need_data = i.find_element(By.CLASS_NAME, "num").find_element(By.TAG_NAME, "a").get_attribute(
                                "href")
                        except:
                            need_data = "Null"
                        return need_data

                    def id():
                        need_data = ""
                        try:
                            need_data = i.find_element(By.CLASS_NAME, "num").find_element(By.TAG_NAME, "a").text
                        except:
                            need_data = "Null"
                        return need_data

                    def data():
                        need_data = ""
                        try:
                            need_data = i.find_element(By.CLASS_NAME, "num").find_element(By.TAG_NAME, "span").get_attribute(
                                "innerHTML")
                        except:
                            need_data = "Null"
                        return need_data

                    def plaintiff():
                        need_data = ""
                        try:
                            need_data = i.find_element(By.CLASS_NAME, "plaintiff").find_element(By.CLASS_NAME,
                                                                                                "b-newRollover").text
                        except:
                            need_data = "Null"
                        return need_data

                    elementJSON = {
                        "data": data(),
                        "id": id(),
                        "id_url": id_url(),
                        "judge": judge(),
                        "sity": sity(),
                        "plaintiff": plaintiff(),
                        "respondent": respondent(),
                    }

                    all_children_data.append(elementJSON)

                _array["response"] = all_children_data

            except:
                _array["many"] = "Найдено 0 элементов"
                _array["response"] = "Null"

            print(json.dumps(_array, ensure_ascii=False).encode('utf8').decode())
        else:
            print('{"error": "Переданные данные не верны!"}')

        driver.close()
    except ValueError:
        print('{"error": "Ошибка парсинга!!"}')
        print(ValueError)


dataPathArray   = json.loads(sys.argv[1])

display = Display(visible=0, size=(800, 600))
display.start()

s = Service(ChromeDriverManager().install())

chrome_options = Options()
chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
chrome_options.add_experimental_option('useAutomationExtension', False)
chrome_options.add_argument('start-maximized')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(executable_path=ChromeDriverManager().install(), chrome_options=chrome_options)

stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
        )

wait = WebDriverWait(driver, 10)

driver.get("https://kad.arbitr.ru/")
wait = WebDriverWait(driver, 10)
driver.find_element(By.CLASS_NAME, "b-promo_notification-popup-close").click()

if 'case' in dataPathArray:
    ActionDealData(dataPathArray)
else:
    ActionFullData(dataPathArray)
