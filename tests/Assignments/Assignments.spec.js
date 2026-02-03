const {test,expect}= require ('@playwright/test');
const { promises } = require('node:dns');


test('Assignment1', async ({browser})=>
{
    const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 }
});
    const page= await context.newPage();
    const passwordField=page.locator("[type='password']");
    const emailField=page.locator("[type='email']");
    const registerButton=page.locator("[value='Register']");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page.locator("[class='btn1']")).toBeEnabled();
    await page.locator("[class='btn1']").click();
    // await console.log(page.locator("[class='login-title']").textContent());
    await expect(page.locator("[class='login-title']")).toContainText("Register");

    await page.locator('#firstName').fill("Amit");
    await page.locator('#lastName').fill("Singh");
    await emailField.fill("amit615@example.com");
    await page.locator('#userMobile').fill("1234567890");
    await passwordField.first().fill("Amit@123");
    await passwordField.nth(1).fill("Amit@123");
    await page.locator("[type='checkbox']").click();
    await registerButton.click();
    // await expect(page.locator("[role='alert']")).toContainText("User");
    // await emailField.fill("");
    // await emailField.fill("amitsingh@xyx.com");
    // await registerButton.click();
    await expect(page.locator("[class='headcolor']")).toHaveText("Account Created Successfully");
    await page.locator('.btn.btn-primary').click();
    await page.locator('#userEmail').fill("amit619@example.com");
    await page.locator('#userPassword').fill("Amit@123");
    await page.locator('#login').click();
    // console.log(await page.locator('.card-body b').first().textContent());
    await page.locator('.card-body b').first().waitFor();
    console.log(await page.locator('.card-body b').allTextContents());
})    


