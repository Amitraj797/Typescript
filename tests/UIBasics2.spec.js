const {test, expect}= require ('@playwright/test');


// Autowait feature, removing inputted data , printing text from a single/list of elements 

test('UI_Basics_2' , async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    const userName=page.locator('#username');
    const signinButton=page.locator("[class='btn btn-info btn-md']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await page.locator('#password').fill("Learning@830$3mK2");
    await signinButton.click();
    console.log(await page.locator("[class='alert alert-danger col-md-12']").textContent()); //extContent() to fetch the text .
    await expect(page.locator("[class='alert alert-danger col-md-12']")).toContainText("Incorrect"); // assertion to check the error message.
    await userName.fill(""); // to clear the inputed value.
    await userName.fill("rahulshettyacademy");
    await signinButton.click();
    // console.log(await page.locator('.card-body a').textContent()); //this line will failed because it will return list of element. 
                                                                  // but textContent() expect single element.
    // to avoid this error we use
    console.log(await page.locator('.card-body a').first().textContent()); // to get text from 1st element.
    console.log(await page.locator('.card-body a').nth(1).textContent()); // to get text from nth element  index start from 0.
    console.log(await page.locator('.card-body a').allTextContents()); // it will print text from lst of elements.

    // if we run above last line only it will return list of element with o element. because above line doesnot wait for DOM to load whereas while printing 
    // single element playwright expecting an element and if not found still waiting for DOM to load playwright have feature of autowait.




})