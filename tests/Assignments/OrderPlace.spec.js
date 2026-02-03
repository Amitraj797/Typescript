const {test, expect}= require ('@playwright/test');



test.only ("OrderPlace", async ({browser})=>
{
    const email="amit1@xyz.com";
    const password="Amit@123";
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("[type='email']").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();
    const productList= page.locator(".card-body");
    await productList.first().waitFor();
    const count=await productList.count();
    console.log(count);
    const productName='iphone 13 pro'
    for(let i =0; i < count; ++i)
    {
        if(await productList.nth(i).locator("b").textContent() === productName)
        {
            // console.log(await productList.nth(i).locator("b").textContent());
            await productList.nth(i).locator(".fa-shopping-cart").click();
            break;
        }
    }
    await page.locator("[routerlink='/dashboard/cart']").click();
    const cartProduct=await page.locator("[class='cartSection'] h3").textContent();
    expect(cartProduct===productName);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.pause();


})