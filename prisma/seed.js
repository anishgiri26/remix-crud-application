const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function seed() {
    await Promise.all(
        getCustomers().map(Customer => {
            return db.Customer.create({ data : Customer })
        })
    )
}

seed()

function getCustomers () {
    return [
        {
           name: 'Aviato' 
        },
        {
            name: 'Lokalise'
        },
        {
            name: 'Spectrm'
        }
    ]
}