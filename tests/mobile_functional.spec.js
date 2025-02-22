import { test, expect } from "@playwright/test";
import { exitCode } from "process";
var status = true; // Создание переменной для хранения результата теста
test("FunctionalMobile", async ({ browser }) => {
  // Эмулируем браузер Mozzila мобильного устройства IPhone
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 375, height: 667 }, // Выбор размера экрана
  });
  const page = await context.newPage();
  await page.goto("https://polis812.github.io/vacuu/"); // Переход на сайт
  try {
    // Проверка на работоспособность функции выпадающего меню
    await page.locator(".menu").selectOption("1"); // Попытка обратиться к выпадающему меню
    console.log(
      "Функция выпадающего меню мобильных устройств исправно работает." // Сообщение в случае успешного теста
    );
  } catch (err) {
    // В случае ошибки программа сообщает о ней
    console.log(
      "ФУНКЦИЯ ВЫПАДАЮЩЕГО МЕНЮ НА МОБИЛЬНЫХ УСТРОЙСТВАХ НЕ РАБОТАЕТ!"
    );
    status = false; // Отрицательный результат теста
    await expect(status).toBeTruthy(); // Проверка результата теста и её вывод для статистики
  }
});
