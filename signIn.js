let puppeteer=require("puppeteer");
const {answers}=require("./codes.js");
let browserStartPromises=puppeteer.launch({
    headless:false,
    //slow mo:1000
    defaultViewport:null,
    args:["--start-maximised","--disable-notifications"]

});
let page,browser;
browserStartPromises.then(function(browserObj){
    console.log("Browser opened");
    browser=browserObj;
  let browsernewTabOpen=  browserObj.newPage();
  return browsernewTabOpen;
}).then(function(newTab){
    page=newTab
    console.log("new tab opened");
    let gPageOpenPromise=newTab.goto("https://www.hackerrank.com/auth/login");
    return gPageOpenPromise;
}).then(function(){
    let typeUserMail=page.type("input[type='text']","xepifo7917@mi166.com",{delay:100});
    return typeUserMail;
})
.then(function(){
    let typePassword=page.type("input[type='password']","123456",{delay:50});
    return typePassword;
})
.then(function(){
    let loginClick=page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginClick;
})
.then(function(){
    let algorithms=waitAndClick(".track-card a[data-attr2='algorithms']",page);
    return algorithms;
})
.then(function(){
    let getToWarmUp = waitAndClick("input[value='warmup']", page);
        return getToWarmUp;
})
.then(function(){
    let waitFor3SecondsPromise=page.waitFor(3000);
    return waitFor3SecondsPromise;
})
// .then(function(){
//     let challengeClickPromise = page.click(".challenge-submit-btn", { delay: 100 });
//     return challengeClickPromise;
// })
.then(function(){
    let allChallengesArrPromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:100});
    return allChallengesArrPromise;
})
.then(function(questionsArr){
    //n number of question first
    console.log("number of questions",questionsArr.length);
    let qWillBeSolvdPromise=questionSolver(page,questionsArr[0],answers[0]);
    return qWillBeSolvdPromise;
})
.then(function () {
    console.log("question is solved");
})
function waitAndClick(selector,cPage){
    return new Promise(function (resolve,reject){
        let waitForModalPromise=cPage.waitForSelector(selector,{visible:true});
        waitForModalPromise
        .then(function(){
            let clickModal=cPage.click(selector,{delay:100});
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}
//return a promise that will submit a given question
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let qWillBeClickedPromise=question.click();
        //code read
        //hackerrank editor-> ctrl A + ctrl X
        //code type
        qWillBeClickedPromise
        //click on the input test case box
        //code type
        //ctrl A +ctrl X
        //click on editor
        // ctrl A + ctrl V
        //reached to the editor
        .then(function(){
            //focus
            let waitForEditorToBeInFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return waitForEditorToBeInFocus;
        })
        //click
        .then(function(){
            return waitAndClick(".checkbox-input", page);
        })
        .then(function(){
            return page.waitForSelector("textarea.custominput",{visible:true});
        })
        .then(function(){
            return page.type("textarea.custominput",answer,{delay:50});
        })
        .then(function(){
            let ctrlIsPressed=page.keyboard.down("Control");
            return ctrlIsPressed;
        })
        .then(function(){
            let AisPressed=page.keyboard.press("A",{delay:100});
            return AisPressed;
        })
        .then(function(){
            let XisPressed=page.keyboard.press("X",{delay:100});
            return XisPressed;
        })
        .then(function(){
            let ctrlIsPressed=page.keyboard.up("Control");
            return ctrlIsPressed;
        })
        .then(function(){
            //focus
            let waitForEditorToBeInFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return waitForEditorToBeInFocus;
        })
        .then(function(){
            let ctrlIsPressed=page.keyboard.down("Control");
            return ctrlIsPressed;
        })
        .then(function(){
            let AisPressed=page.keyboard.press("A",{delay:100});
            return AisPressed;
        })
        .then(function(){
            let VisPressed=page.keyboard.press("V",{delay:100});
            return VisPressed;
        })
        .then(function(){
            let ctrlIsPressed=page.keyboard.up("Control");
            return ctrlIsPressed;
        })
        .then(function(){
            // return page.click(".hr-monaco__run-code",{delay:10});
            return page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled",{delay:50});
        })
        // .then(function(){
        //     // auto complete feature of vsCode->monaco editor
        //     return page.keyboard.type(answer,{delay:50});
        // })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            console.log(err);
            reject(err);
        })
    })
}