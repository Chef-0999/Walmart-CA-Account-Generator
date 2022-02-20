const fs = require('fs-extra')

const functions = require('./functions.js')
const config = require('./config.js')

const file = require('./accounts.json')

async function run() {

    try {

        const page = await functions.getPage(config.proxy)

        const name = await functions.getName()

        const email = await functions.getEmail(name, config.catchall)
        
        const password = await functions.getPassword()

        const generate = await functions.generate(page, name, email, password)

        if(generate == true) {
            console.log('Generated Account')
            await page.close()
        }
        else {
            console.log('Error Generating Account')
            await page.close()
            process.exit()
        }

        let dest = `accounts.json`
          
        let handle;
        let target;
          handle = file.accounts
          target = file
    
          handle.push({
            email: email,
            password: password,
            name: name,
            timestamp: new Date()
          })

        fs.writeFileSync(dest, JSON.stringify(target))

        console.log('Saved Account Details')

        process.exit()

    }
    catch (err) {

        console.log('Error Generating Account...')
        
    }
}


run()