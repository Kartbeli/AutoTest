import { test, expect } from "@playwright/test";
import { exitCode } from "process";

var testbuttons = [
  // Создание списка кнопок который состоит из имени, пути к кнопке, роль кнопки, ссылка на которую должна ввести кнопка
  {
    name: "Car insurance",
    locate1: ".insurances__list",
    locate2: "div:nth-child(1)",
    role: "link",
    link: "https://polis812.github.io/vacuu/car_insurance",
  },
  {
    name: "Home insurance",
    locate1: ".insurances__list",
    locate2: "div:nth-child(2)",
    role: "link",
    link: "https://polis812.github.io/vacuu/home_insurance",
  },
  {
    name: "Travel insurance",
    locate1: ".insurances__list",
    locate2: "div:nth-child(3)",
    role: "link",
    link: "https://polis812.github.io/vacuu/travel_insurance",
  },
  {
    name: "Pet insurance",
    locate1: ".insurances__list",
    locate2: "div:nth-child(4)",
    role: "link",
    link: "https://polis812.github.io/vacuu/pet_insurance",
  },
  {
    name: "Сhoose insurance",
    locate1: ".choose",
    locate2: "",
    role: "button",
    link: "https://polis812.github.io/vacuu/insurance",
  },
  {
    name: "Кнопка следующего комментария",
    locate1: ".arrow-right arrow-enable",
    locate2: "",
    role: "button",
    link: "https://polis812.github.io/vacuu/",
  },
];
var status = true; // Создание переменной для хранения результата теста
test("bodybuttons", async ({ page }) => {
  for (let key in testbuttons) {
    // Цикл для проверки всех кнопок в теле сайта
    await page.goto("https://polis812.github.io/vacuu/"); // Переход на главную страницу сайта
    try {
      // Проверка на ошибку кликабельности, в случае если у скрипта не получится найти кнопку или нажать нам напишет о том какая конкретно кнопка не имела клика
      if (testbuttons[key]["locate2"] == "") {
        // Условие при котором проверяется была ли нажата кнопка имеющая короткий путь
        await page
          .locator(testbuttons[key]["locate1"])
          .getByRole(testbuttons[key]["role"])
          .click(); // Вычисление короткого пути до кнопки и осуществления нажатия
      } else {
        // В случае если у кнопки путь длинее
        await page
          .locator(testbuttons[key]["locate1"])
          .locator(testbuttons[key]["locate2"])
          .getByRole(testbuttons[key]["role"])
          .click(); // Вычисление более длинного пути до кнопки и осуществления нажатия
      }
    } catch (err) {
      // Срабатывает если объекта который тестирует нет или он не нажимается
      console.log(testbuttons[key]["name"] + " - ОБЪЕКТ НЕ КЛИКАБЕЛЕН!");
      status = false; // Отрицательный результат теста
      continue; // В случае ошибки вместо застревания цикла продолжаем его со следующего шага
    }
    try {
      // Проверка на достоверность ссылки и в случае достоверности ссылки программа сообщает об этом
      await expect(page).toHaveURL(testbuttons[key]["link"]);
      console.log(
        testbuttons[key]["name"] + " - Объект кликабелен, ссылка достоверна"
      );
    } catch (err) {
      // В случае если ссылка не достоверна программа сообщает об этом
      console.log(testbuttons[key]["name"] + " - ССЫЛКА НЕ ДОСТОВЕРНА!");
      status = false; // Отрицательный результат теста
    }
  }
  await expect(status).toBeTruthy(); // Проверка результата теста и её вывод для статистики
});
