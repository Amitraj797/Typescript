const {test, expect}= require('@playwright/test');

test('ui_basics_4', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();
    await page.getByPlaceholder("Password").fill("Amit@123");
    await page.getByRole('button', { name: 'Submit' }).click();
    const successMessage= await page.getByText("Success! The Form has been submitted successfully!.").textContent();
    console.log(successMessage);
    // await page.getByRole("link", { name: "Shop" }).click();
    // await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole('button', { name: 'Add' }).click();
    // await page.getByText("Checkout").click();
    await page.locator("[type='date']").fill("2050-06-30");
    await page.pause();

});


test.only("calender autoamtion", async ({page})=>
{
    const date="24";
    const month="06";
    const year="2040";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div.react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__next-button").click();
    await page.locator(".react-calendar__decade-view__years").locator(".react-calendar__tile").nth(9).click();
    await page.locator(".react-calendar__year-view__months").locator(".react-calendar__tile").nth(Number(month)-1).click();
    await page.locator(".react-calendar__month-view__days").locator(".react-calendar__tile").nth(Number(date)-1).click();

    await page.locator("input[name='date']").evaluate((el) => {
    el.value = '2040-06-24';
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    const dateInputted = await page.locator("input[name='date']").inputValue();
    console.log(dateInputted);
    expect(dateInputted).toBe('2040-06-24');

    // const dateInput = page.locator("input[name='date']");
    // const dateInputted = await dateInput.inputValue();
    // console.log(dateInputted);
    // expect(dateInputted).toBe(`${year}-${month}-${date}`);
    await page.pause();

});