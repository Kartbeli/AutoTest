import { test, expect } from "@playwright/test";
// Создание списка кнопок который состоит из имени, пути к кнопке, ссылка на которую должна ввести кнопка
var testbuttons = [
  {
    name: "Логотип",
    locate: ".main__header__logo",
    link: "https://polis812.github.io/vacuu/",
    locclass: "",
  },
  {
    name: "Insurance",
    locate: " Insurance ",
    link: "https://polis812.github.io/vacuu/insurance",
    locclass: ".main__header__item",
  },
  {
    name: "About us",
    locate: " About us ",
    link: "https://polis812.github.io/vacuu/about_us",
    locclass: ".main__header__item",
  },
  {
    name: "Blog",
    locate: " Blog ",
    link: "https://polis812.github.io/vacuu/blog",
    locclass: ".main__header__item",
  },
  {
    name: "Review",
    locate: " Review ",
    link: "https://polis812.github.io/vacuu/review",
    locclass: ".main__header__item",
  },
  {
    name: "Contact",
    locate: " Contact ",
    link: "https://polis812.github.io/vacuu/contact",
    locclass: ".main__header__item",
  },
  {
    name: "My account",
    locate: ".main__header__profile",
    link: "https://polis812.github.io/vacuu/my_account",
    locclass: "",
  },
  {
    name: "Get started",
    locate: "Get started",
    link: "https://polis812.github.io/vacuu/get_started",
    locclass: ".main__left",
  },
  {
    name: "Кнопка телефона",
    locate: ".header__phone",
    link: "tel:+7 (495) 606–36–02",
    locclass: "",
  },
];
var status = true; // Создание переменной для хранения результата теста
test("Headbuttons", async ({ page }) => {
  for (let key in testbuttons) {
    // Цикл для проверки всех кнопок в шапке сайта
    await page.goto("https://polis812.github.io/vacuu/"); // Переход на главную страницу
    try {
      // Проверка на ошибку кликабельности, в случае если у скрипта не получится найти кнопку или нажать нам напишет о том какая конкретно кнопка не имела клика
      if (testbuttons[key]["locclass"] == "") {
        // Условие при котором проверяется была ли нажата кнопка имеющая короткий путь
        await page.locator(testbuttons[key]["locate"]).click(); // Вычисление короткого пути до кнопки и осуществления нажатия
      } else {
        // В случае если у кнопки путь длинее
        await page
          .locator(testbuttons[key]["locclass"])
          .getByText(testbuttons[key]["locate"])
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
  await page.goto("https://polis812.github.io/vacuu/");
  try {
    // Проверка на ошибку кликабельности кнопки смены языка
    await page.locator(".header__lang").click(); // Поиск и нажатие кнопки смены языка
  } catch (err) {
    // Срабатывает если объекта который тестирует нет или он не нажимается
    console.log("Кнопка смены языка - ОБЪЕКТ НЕ КЛИКАБЕЛЕН!");
    status = false; // Отрицательный результат теста
  }
  try {
    // Проверка на функцию смены языка
    await page.locator(".header__lang").selectOption("fin"); // Выбор другого языка
    await expect(page).toHaveURL("https://polis812.github.io/vacuu/fin"); // Проверка достоверности ссылки
    console.log("Кнопка смены языка - Объект кликабелен, ссылка достоверна"); // Оповещение об успешном тесте
  } catch {
    console.log("Кнопка смены языка - ССЫЛКА НЕ ДОСТОВЕРНА!"); // Оповещение в случае когда выбор другого языка не работает
    status = false; // Отрицательный результат теста
  }
  await expect(status).toBeTruthy(); // Проверка результата теста и её вывод для статистики
});
