const {test,expect}= require('@playwright/test');



test('checkUncheckConcept', async ({page})=>
{
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 await page.locator('#username').fill("rahulshettyacademy");
 await page.locator('#password').fill("Learning@830$3mK2");
 await page.locator("[value='user']").click();
 await page.locator("#okayBtn").click();
 await expect(page.locator("[value='user']")).toBeChecked();
 console.log(await page.locator("[value='user']").isChecked());
 const dropdown= page.locator("select.form-control");
 await dropdown.selectOption('consult');
 await expect(dropdown).toHaveValue("consult");
 const checkbox= page.locator("[type='checkbox']");
 await checkbox.click();
 await expect(checkbox).toBeChecked();
 console.log(await checkbox.isChecked());
 await checkbox.uncheck();
 console.log(await checkbox.isChecked());
 await expect(checkbox).not.toBeChecked();
 await page.pause();
})

test('child window handling', async ({browser})=>
{
  const context= await browser.newContext();
  const page= await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator('#username').fill("rahulshettyacademy");
  const pageLink=page.locator("[href*='documents-request']");
  const [childPage]=await Promise.all(
    [
      context.waitForEvent('page'), //listen for for the new page/tab open event. promise can be pending,rejected and fullfilled.
      // promise status will be pending untill the both statement executed and both promises status changed to fullfilled.
      pageLink.click(),  // new child tab/page will opened.
    ]
  );
  const text= await childPage.locator(".red").textContent();
  console.log(text);
  const text1 =text.split('@');
  const domain= text1[1].split(" ")[0];
  // console.log(domain);
  await page.locator('#username').fill(domain);
  await page.pause();
  console.log(await page.locator('#username').inputValue()); //inputValue() to get the inputted values in the input text field.

})