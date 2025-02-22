import { test, expect } from "@playwright/test";
//Создаем массив из значений почты
let invalid_numbers = [
  "kartmanbeilgmail.com",
  "kartmanbeil@.com",
  "kartmanbeil@gmail",
  "kartmanbeil@",
  "kartmanbeil!gmail.com",
  "kartmanbeil",
  "",
  "!#@$kartmanbeil@gmail.com",
  "kartmanbeil@#!&#%№gmail.com",
  "pfpdnfeenqkdbayrwxynsqqoxavnmuzaulkvknzhotrvojcqiumetxgwjdljfbxltyfozzyuqiafjjixqmoirzatfswwoynhhirkqmxdbtmvizfrbchyonoqzuxbzlbhdorsbwavwmszpbhiasgsawfrrbzqmdzrrvcxfqzvdliampaejtsuopmdlifkmhowpkpothfswnmfhcsjjigozvcobcrwmfjcowytkxekmftfpnuhwmakgzbwdtnaqkcwvdsflsdf@gmail.com",
];
var status = true; // Создание переменной для хранения результата теста
//Проверка на ввод валидных значений в поле, вводя почту kartmanbeil@gmail.com
test("Valid value", async ({ page }) => {
  await page.goto("https://polis812.github.io/vacuu/"); //Переход на сайт
  await page.getByPlaceholder("Email address").fill("kartmanbeil@gmail.com"); //Поиск строки для ввода и ввод валидных данных
  await page.click(".submit-btn"); //Подтверждение ввода
  try {
    await expect(page.locator(".swal2-title")).toHaveText("Successfully send"); //Проверка появления окна с ошибкой
    expect(page.locator("swal2-container swal2-center swal2-shown"))
      .toBeVisible;
    console.log("kartmanbeil@gmail.com" + " Успешно!"); //Вывод в случае успеха ввода валидных значений
  } catch (err) {
    console.log("kartmanbeil@gmail.com" + " ОШИБКА!"); //Вывод ошибки в случае ошибки ввода валидных значений
    status = false; // Отрицательный результат теста
  }
});

////Проверка на ввод невалидных значений в поле, вводя всю почту из массива
test("Invalid value", async ({ page }) => {
  for (let index = 0; index < invalid_numbers.length; index++) {
    //Условия цикла который нужен для прогона
    await page.goto("https://polis812.github.io/vacuu/"); //Переход на сайт
    await page.getByPlaceholder("Email address").fill(invalid_numbers[index]); //Поиск строки для ввода и далее при помощи .fill сам ввод
    await page.click(".submit-btn"); //Подтверждение ввода
    try {
      //проверка на ошибку чтобы при 1 провале цикл продолжался и выводил последующие ошибки
      await expect(page.locator(".swal2-title")).toHaveText("Error"); //проверка появления окна с ошибкой
      expect(page.locator("swal2-container swal2-center swal2-shown"))
        .toBeVisible;
      console.log(invalid_numbers[index] + " Успешно!"); //вывод успешной переменной
    } catch (err) {
      console.log(invalid_numbers[index] + " ОШИБКА!"); //вывод ошибочной переменной
      status = false; // Отрицательный результат теста
    }
  }
  await expect(status).toBeTruthy(); // Проверка результата теста и её вывод для статистики
});
