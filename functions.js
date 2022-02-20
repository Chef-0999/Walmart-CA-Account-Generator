const faker = require('faker')
const playwright = require('playwright')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function getPage(proxy) {

    try {

        console.log('Getting Page...')

        const browser = await playwright.firefox.launch({
            args: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--disable-dev-shm-usage",
              "--disable-accelerated-2d-canvas",
              "--no-first-run",
              "--no-zygote",
              "--disable-gpu",
            ],
            headless: true,
            server: proxy,
          });
    
          const page = await browser.newPage();

          return page;

    }
    catch (err) {

        console.log('Error Getting Page...')

        await sleep(5500)

        getPage(proxy)

    }
}


async function getName() {

    try {

        firstName = `${faker.fake(
            "{{name.firstName}}"
          )}`;
  
          lastName = `${faker.fake(
            "{{name.lastName}}"
          )}`;

          const outcome = `${firstName} ${lastName}`

          return outcome;
        
    }
    catch (err) {

        console.log('Error Getting Name...')

        await sleep(5500)

        getName() 

    }
}


async function getEmail(name, catchall) {

    try {

        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]

        const number1 = Math.round(Math.random()*250)
        const number2 = Math.round(Math.random()*100000)
        const email = `${number1}${firstName}${lastName}${number2}@${catchall}`
        
        return email;

    }
    catch (err) {

        console.log('Error Getting Email...')

        await sleep(5500)

        getEmail(name, catchall)

    }
}


async function getPassword() {

    const letters = 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
    
    const letters2 = 'Ahuas,Basf,Cfddsf,Dgrw,Egrw,Fgrwq,Gfdw,Hrwq,Iyud,Jfgd,Kjty,Ljku,Mjywq,Nrtra,Ovsfde,PgfdtA,QSDF,Rcvsdfew,Skliu,Tdsafrdt,Ubvdfgr,Vdassdfg,Wgdfgx,Xewrreth,Yghdftr,Zsadw'
    
    var letterString = letters.split(",");
    var letter2String = letters2.split(",");
    
    const letter1 = Math.round(Math.random()*25)
    const letter2 = Math.round(Math.random()*25)
    
    const id1 = Math.round(Math.random()*10)
    const id2 = letterString[letter1]
    const id3 = Math.round(Math.random()*10)
    const id4 = letter2String[letter2]
    const id5 = Math.round(Math.random()*10)

    const password = `${id1}${id2}${id3}${id4}${id5}!`

    return password;
    
}


async function generate(page, name, email, password) {

    try {

        await page.goto("https://www.walmart.ca/create-account")

        console.log('Submitting Account Details...')

        const firstName = name.split(' ')[0]
        const lastName = name.split(' ')[1]

        await page.type('#firstName', firstName)
        await page.type('#lastName', lastName)
        await page.type('#email', email)
        await page.type('#password', password)

        await page.click('#TAndC')
    
        await page.click('#create-account-form > div > div.css-jd7gpz.e17nj3uo3 > button')

        await sleep(4500)

        await page.goto("https://www.walmart.ca/ws/secure/en/sign-out")

        return true;


    }
    catch (err) {

        return false;

    }
}


module.exports = {
    getPage,
    getName,
    getEmail,
    getPassword,
    generate,
}