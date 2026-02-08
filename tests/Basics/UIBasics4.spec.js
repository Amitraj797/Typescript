const {test, expecet}= require('@playwright/test');

test.only('ui_basics_4', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").check();
    await page.getByPlaceholder("Password").fill("Amit@123");
    await page.getByRole('button', { name: 'Submit' }).click();
    const successMessage= await page.getByText("Success! The Form has been submitted successfully!.").textContent();
    console.log(successMessage);
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole('button', { name: 'Add' }).click();
    await page.getByText("Checkout").click();
    await page.pause();




});