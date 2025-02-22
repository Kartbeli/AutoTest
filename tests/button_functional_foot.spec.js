import { test, expect } from "@playwright/test";
import { exitCode } from "process";
// Создание списка кнопок который состоит из имени, пути к кнопке, ссылка на которую должна ввести кнопка
var testbuttons = [
  {
    name: "Footer Logo",
    locator1: ".footer",
    locator2: ".footer__bottom",
    locator3: ".logo",
    link: "https://polis812.github.io/vacuu/",
  },
  {
    name: "Product > Car insurance",
    locator1: ".footer__content",
    locator2: "div:nth-child(1)",
    locator3: "a:nth-child(2)",
    link: "https://polis812.github.io/vacuu/car_insurance",
  },
  {
    name: "Product > Home insurance",
    locator1: ".footer__content",
    locator2: "div:nth-child(1)",
    locator3: "a:nth-child(3)",
    link: "https://polis812.github.io/vacuu/home_insurance",
  },
  {
    name: "Product > Travel insurance",
    locator1: ".footer__content",
    locator2: "div:nth-child(1)",
    locator3: "a:nth-child(4)",
    link: "https://polis812.github.io/vacuu/travel_insurance",
  },
  {
    name: "Product > Pet insurance",
    locator1: ".footer__content",
    locator2: "div:nth-child(1)",
    locator3: "a:nth-child(5)",
    link: "https://polis812.github.io/vacuu/pet_insurance",
  },
  {
    name: "Resources > Blog",
    locator1: ".footer__content",
    locator2: "div:nth-child(2)",
    locator3: "a:nth-child(2)",
    link: "https://polis812.github.io/vacuu/blog",
  },
  {
    name: "Company > About us",
    locator1: ".footer__content",
    locator2: "div:nth-child(3)",
    locator3: "a:nth-child(2)",
    link: "https://polis812.github.io/vacuu/about_us",
  },
  {
    name: "Company > Partners",
    locator1: ".footer__content",
    locator2: "div:nth-child(3)",
    locator3: "a:nth-child(3)",
    link: "https://polis812.github.io/vacuu/partners",
  },
  {
    name: "Company > Review",
    locator1: ".footer__content",
    locator2: "div:nth-child(3)",
    locator3: "a:nth-child(4)",
    link: "https://polis812.github.io/vacuu/review",
  },
  {
    name: "Company > Contact us",
    locator1: ".footer__content",
    locator2: "div:nth-child(3)",
    locator3: "a:nth-child(5)",
    link: "https://polis812.github.io/vacuu/contact_us",
  },
  {
    name: "Subscribe button",
    locator1: ".footer__content",
    locator2: "div:nth-child(4)",
    locator3: ".submit-btn",
    link: "swal2-container swal2-center swal2-shown",
  },
  {
    name: "Footbottom > Terms",
    locator1: ".footer",
    locator2: ".links",
    locator3: "a:nth-child(1)",
    link: "https://polis812.github.io/vacuu/terms",
  },
  {
    name: "Footbottom > Privacy",
    locator1: ".footer",
    locator2: ".links",
    locator3: "a:nth-child(2)",
    link: "https://polis812.github.io/vacuu/privacy",
  },
  {
    name: "Footbottom > Cookies",
    locator1: ".footer",
    locator2: ".links",
    locator3: "a:nth-child(3)",
    link: "https://polis812.github.io/vacuu/cookies",
  },
  {
    name: "Metatag > Instagram",
    locator1: ".footer",
    locator2: ".social",
    locator3: "a:nth-child(1)",
    link: "https://www.instagram.com/vacuu/",
  },
  {
    name: "Metatag > Twitter",
    locator1: ".footer",
    locator2: ".social",
    locator3: "a:nth-child(2)",
    link: "https://twitter.com/vacuu",
  },
  {
    name: "Metatag > Facebook",
    locator1: ".footer",
    locator2: ".social",
    locator3: "a:nth-child(3)",
    link: "https://www.facebook.com/Vacuu/",
  },
  {
    name: "Metatag > Telegram",
    locator1: ".footer",
    locator2: ".social",
    locator3: "a:nth-child(4)",
    link: "https://t.me/vacuu",
  },
];
var status = true; // Создание переменной для хранения результата теста
test("Footbuttons", async ({ page }) => {
  for (let key in testbuttons) {
    // Цикл для проверки всех кнопок в футере сайта
    await page.goto("https://polis812.github.io/vacuu/"); // Переход на главную страницу
    try {
      // Проверка на ошибку кликабельности, в случае если у скрипта не получится найти кнопку или нажать нам напишет о том какая конкретно кнопка не имела клика
      await page
        .locator(testbuttons[key]["locator1"]) // Первая часть пути
        .locator(testbuttons[key]["locator2"]) // Вторая часть пути
        .locator(testbuttons[key]["locator3"]) // Третья часть пути
        .click(); // Клик на кнопку
      if (testbuttons[key]["locator3"] == ".submit-btn") {
        // Условие при котором проверяется была ли нажата кнопка со всплывающим окном
        try {
          // Проверка на ошибку всплывающего окна, если окна не будет скрипт выдаст об этом оповещение
          await expect(page.locator("swal2-container swal2-center swal2-shown"))
            .toBeVisible;
          console.log(
            testbuttons[key]["name"] + " - Объект кликабелен, ссылка достоверна" // Успешная проверка при которой появилось всплывающее окно после клика
          );
        } catch (err) {
          console.log(
            testbuttons[key]["name"] + " - Отсутствие всплывающего окна" // Провал проверки при котором не было появления всплывающего окна
          );
          status = false; // Отрицательный результат теста
        }
      } else {
        // В случае если мы тестируем кнопку которая ведет на страницу(ссылку) то при нажатии будет выполняться данный код
        try {
          // Проверка на достовернность ссылки
          await expect(page).toHaveURL(testbuttons[key]["link"]);
          console.log(
            testbuttons[key]["name"] + " - Объект кликабелен, ссылка достоверна" // В случае если объект кликается и ссылка соответствует скрипт сообщает об этом
          );
        } catch (err) {
          console.log(testbuttons[key]["name"] + " - ССЫЛКА НЕ ДОСТОВЕРНА!"); // В случае если ссылка не сходится скрипт сообщает об этом
          status = false; // Отрицательный результат теста
        }
      }
    } catch (err) {
      console.log(testbuttons[key]["name"] + " - ОБЪЕКТ НЕ КЛИКАБЕЛЕН!"); // Срабатывает если объекта который тестирует нет или он не нажимается
      status = false; // Отрицательный результат теста
      continue; // В случае ошибки вместо застревания цикла продолжаем его со следующего шага
    }
  }
  await expect(status).toBeTruthy(); // Проверка результата теста и её вывод для статистики
});
