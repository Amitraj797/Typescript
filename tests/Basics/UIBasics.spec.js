import { test, expect } from '@playwright/test';

test('Browser first test', async ({browser})=>  // if need to input any proxy or cookies we use this fixture i.e. {browser}.
{
    // Step 1:open browser
    // Step 2:enter username password
    // Step 3: click submit button
    const context= await browser.newContext(); //to create the new context of the browser without any previous data like ingenito mode.
    const page= await context.newPage() // to create a new page/tab in the new context of the browser.
   await page.goto("https://google.com") // to redirect to the webpage.

})

test('page test', async ({page})=> // if our app doesnot requir any specific proxy or cookies. i.e. run in default mode , we can use {page} fixture. 
// while using this fixture we can avoid writing first two lines of code i.e. launching new context and page. this fixture antomatically do internally.
{
   await page.goto("https://amazon.in")
})

test('Rahulshettyacademy', async ({browser})=>
{
    const context= await browser.newContext()
    const page= await context.newPage()
    await page.goto("https://practicetestautomation.com/practice-test-login/")
    console.log(await page.title()) // title() to get the tittle of the page.
    await expect(page).toHaveTitle("Test Login | Practice Test Automation"); // asssertion to check the title is as expected or not.
    await page.locator("input#username").fill("student"); // locator() to locate the element from DOM.
    await page.locator("[type='password']").fill("Password123");
    await page.locator(".btn").click();


})


