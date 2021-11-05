from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
from selenium_stealth import stealth
import json

options = webdriver.ChromeOptions()
options.add_argument("start-maximized")

options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option('useAutomationExtension', False)
driver = webdriver.Chrome(options=options, executable_path=ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install())

stealth(driver,
        languages=["en-US", "en"],
        vendor="Google Inc.",
        platform="Win32",
        webgl_vendor="Intel Inc.",
        renderer="Intel Iris OpenGL Engine",
        fix_hairline=True,
        )

my_json_string = """{}"""
to_python = json.loads(my_json_string)

wait = WebDriverWait(driver, 10)

driver.get("https://kad.arbitr.ru/")

driver.find_element(By.ID, "sug-participants").find_element(By.TAG_NAME, "textarea").send_keys("7704582421")
driver.find_element(By.ID, "b-form-submit").click()

try:
    to_python["many"] = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, '.b-found-total'))).get_attribute("innerHTML")

    wait.until(EC.visibility_of_element_located((By.XPATH, '//table/colgroup')))

    header_table = driver.find_element(By.ID, "table")

    all_children = header_table.find_elements(By.TAG_NAME, "tr")

    all_children_data = []

    for i in all_children:

        def sity():
            need_data = ""
            try:
                need_data = i.find_element(By.CLASS_NAME, "court").find_element(By.CLASS_NAME, "b-container").find_element(By.XPATH, ".//div[2]").text
            except:
                need_data = "Null"
            return need_data

        def respondent():
            need_data = ""
            try:
                need_data = i.find_element(By.CLASS_NAME, "respondent").find_element(By.CLASS_NAME, "b-newRollover").text
            except:
                need_data = "Null"
            return need_data

        def judge():
            need_data = ""
            try:
                need_data = i.find_element(By.CLASS_NAME, "court").find_element(By.CLASS_NAME, "b-container").find_element(By.XPATH, ".//div[1]").text
            except:
                need_data = "Null"
            return need_data

        def id_url():
            need_data = ""
            try:
                need_data = i.find_element(By.CLASS_NAME, "num").find_element(By.TAG_NAME, "a").get_attribute("href")
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
                need_data = i.find_element(By.CLASS_NAME, "num").find_element(By.TAG_NAME, "span").get_attribute("innerHTML")
            except:
                need_data = "Null"
            return need_data

        def plaintiff():
            need_data = ""
            try:
                need_data = i.find_element(By.CLASS_NAME, "plaintiff").find_element(By.CLASS_NAME, "b-newRollover").text
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

    to_python["response"] = json.dumps(all_children_data, ensure_ascii=False).encode('utf8').decode()

except:
    to_python["many"] = "Найдено 0 элементов"
    to_python["response"] = "Null"

print(to_python)