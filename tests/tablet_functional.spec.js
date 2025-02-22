import { test, expect } from "@playwright/test";
import { exitCode } from "process";
var status = true; // Создание переменной для хранения результата теста
test("FunctionalTablet", async ({ browser }) => {
  // Эмулируем браузер Mozzila планшета IPad
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1",
    viewport: { width: 375, height: 667 }, // Выбор размера экрана
  });
  const page = await context.newPage();
  await page.goto("https://polis812.github.io/vacuu/"); // Переход на сайт
  try {
    // Проверка на работоспособность функции выпадающего меню
    await page.locator(".menu").selectOption("1"); //Попытка обратиться к выпадающему меню
    console.log("Функция выпадающего меню планшетов исправно работает."); // Сообщение в случае успешного теста
  } catch (err) {
    // В случае ошибки программа сообщает о ней
    console.log(
      "ФУНКЦИЯ ВЫПАДАЮЩЕГО МЕНЮ НА ПЛАНШЕТНЫХ УСТРОЙСТВАХ НЕ РАБОТАЕТ!"
    );
    status = false;
    await expect(status).toBeTruthy();
  }
});
