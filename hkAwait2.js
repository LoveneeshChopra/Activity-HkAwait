let puppeteer=require("puppeteer");
const {answers}=require("./codes.js");
let browserStartPromises=puppeteer.launch({
    headless:false,
    //slow mo:1000
    defaultViewport:null,
    args:["--start-maximised","--disable-notifications"]

});
let page,browser;
(async function fn(){
    try{
    browser=await browserStartPromises;
    console.log("Browser opened");
    page=await browser.newPage();
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("input[type='text']","xepifo7917@mi166.com",{delay:100});
    await page.type("input[type='password']","123456",{delay:50});
    await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await waitAndClick(".track-card a[data-attr2='algorithms']",page);
    await waitAndClick("input[value='warmup']", page);
    await page.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
    let allChallengesArrPromise=await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:50});
    questionSolver(page,allChallengesArrPromise[0],answers[0]);
    }
    catch(err){
        console.log(err);
    }
})();

function waitAndClick(selector, cPage) {
        (async function fn(){
            try{
            await cPage.waitForSelector(selector,{visible:true});
            await cPage.click(selector,{delay:100});
            }
            catch(err){
                console.log(err);
            }
        })();        
    }
        
function questionSolver(page,question,answer){
    
        (async function fn(){
            try{
            await question.click();
            await page.waitFor(2000);
            await waitAndClick(".checkbox-input", page);
            await waitAndClick(".monaco-editor.no-user-select.vs",page);
            await page.waitForSelector("textarea.custominput",{visible:true});
            await page.type("textarea.custominput",answer,{delay:10});
            await page.keyboard.down("Control");
            await page.keyboard.press("A",{delay:50});
            await page.keyboard.press("X",{delay:50});
            await page.keyboard.up("Control");
            // await waitAndClick(".monaco-editor.no-user-select.vs",page);
            await page.click(".hr-monaco-editor-parent");
            await page.keyboard.down("Control",{delay:50});
            await page.keyboard.press("A",{delay:100});
            await page.keyboard.press("V",{delay:100});
            await page.keyboard.up("Control",{delay:50});
            await page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled");
            await page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled",{delay:50});
            }
            catch(err){
                console.log(err);
            }
        })();
}