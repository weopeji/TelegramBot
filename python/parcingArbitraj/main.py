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

def main(argv):

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

    _array = {}

    driver.get("https://kad.arbitr.ru/")

    driver.find_element(By.CSS_SELECTOR, 'textarea[class="g-ph"]').send_keys(argv)
    driver.find_element(By.CLASS_NAME, "js-promo_notification-popup-close").click()
    driver.find_element(By.ID, "b-form-submit").click()

    try:
        _array["many"] = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.b-found-total'))).get_attribute("innerHTML")

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

    driver.close()

    _response = json.dumps(_array, ensure_ascii=False).encode('utf8').decode()

    print(_response)

main(sys.argv[1])

