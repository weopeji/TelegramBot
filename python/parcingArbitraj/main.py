from selenium import webdriver
from selenium.webdriver.common.by import By

# chromedriver = 'chromedriver'
# options = webdriver.ChromeOptions()
# options.add_argument("--js-flags=--noexpose_wasm")

driver = webdriver.Chrome()
driver.get("https://kad.arbitr.ru/")

search_box = driver.find_element(By.ID, "sug-participants")
search_box.find_element(By.TAG_NAME, "textarea").send_keys("5029069967")
next_button = driver.find_element(By.ID, "b-form-submit").click()
# driver.close()