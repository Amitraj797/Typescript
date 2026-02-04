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
    await productList.first().waitFor();  //used for make playwright execution to wait till first element to appear in the DOM.
    const count=await productList.count(); // to count the number of element present in the list 
    console.log(count);
    const productName='iphone 13 pro'
    for(let i =0; i < count; ++i)  //loop to itrate the list to match the product name with the list
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
    const produtStatus=cartProduct===productName;
    console.log(produtStatus);
    expect(produtStatus).toBeTruthy();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator(".text-validated").first().fill("1234567890123456");
    const expiryMonth=page.locator("select.ddl").first();
    const expiryYear=page.locator("select.ddl").nth(1);
    await expiryMonth.selectOption('06');
    await expiryYear.selectOption('31');
    await page.locator("input.txt").nth(1).fill("123");
    await page.locator("input.txt").nth(2).fill("Amit");
    await page.locator("input.txt").nth(3).fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();
    const coupon=await page.locator("[style='color: green;']").textContent();
    const couponStatus= (coupon==="* Coupon Applied");
    console.log(couponStatus);
    expect(couponStatus).toBeTruthy();
    const userEmail=await page.locator("input.txt").nth(4).inputValue();
    const emailStatus=userEmail===email;
    // expect(emailStatus).toBeTruthy();
    await expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
    const countrySelect=page.locator("[placeholder='Select Country']");
    await countrySelect.pressSequentially("ind", {delay: 100});
    const countryDropdown=page.locator("section.ta-results");
    await countryDropdown.waitFor();
    const optionsCount=await countryDropdown.locator("button").count();
    console.log(optionsCount);
    for(let i=0; i<optionsCount; ++i)
    {
        const countryName=await countryDropdown.locator("button").nth(i).textContent();
        console.log(countryName);
        if( countryName === " India")
        {
            await countryDropdown.locator("button").nth(i).click();
            console.log(await countrySelect.inputValue());
            break;
        }
    }

    await page.locator("a.action__submit").click();
    const orderMessage=await page.locator("h1.hero-primary").textContent();
    expect(orderMessage.includes("Thankyou for the order.")).toBeTruthy();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.locator("label[routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const orderList= page.locator("tr.ng-star-inserted");
    const orderIdCount=await orderList.count();
    console.log(orderIdCount);

    for(let i=0; i<orderIdCount; ++i)
    {
        const orderid=await orderList.nth(i).locator("th").textContent();
        if(orderId.includes(orderid))
        {
            await orderList.nth(i).locator('button:has-text("View")').click();
            break;
        }
    }
    const orderSummaryPageid=await page.locator(".col-text").textContent();
     expect(orderId.includes(orderSummaryPageid)).toBeTruthy();
   await expect(page.locator(".title")).toHaveText(productName);
   await page.pause();


})