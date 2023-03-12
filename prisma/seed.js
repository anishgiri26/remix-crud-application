const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function seed() {
    await Promise.all(
        getCustomers().map(Customer => {
            return db.Customer.create({ data : Customer })
        })
    )
}

async function seed() {
    await Promise.all(
        getStockBlocks().map(StockBlock => {
            return db.StockBlock.create({ data : StockBlock })
        })
    )
}

seed()

function getCustomers () {
    return [
        {
           name: 'Aviato',
           createdAt: '2023-01-01T00:00:00.000Z'
        },
        {
            name: 'Hooli',
            createdAt: '2023-01-05T00:00:00.000Z'
        },
        {
            name: 'PiedPiper',
            createdAt: '2023-01-07T00:00:00.000Z'
        }
    ]
}

function getStockBlocks() {
    return [
        {
            name: 'Traffic',
            createdAt: '2023-01-06T00:00:00.000Z',
            customerId: 'ff913fdd-e825-44ac-923d-09ea7eacc547'
        },
        {
            name: 'Leads',
            createdAt: '2023-01-07T00:00:00.000Z',
            customerId: 'ff913fdd-e825-44ac-923d-09ea7eacc547'
        },
        {
            name: 'Opportunities',
            createdAt: '2023-01-06T00:00:00.000Z',
            customerId: '321a21f8-162d-400c-b9a0-19f8215b1799'
        },
        {
            name: 'New Revenue',
            createdAt: '2023-01-07T00:00:00.000Z',
            customerId: '321a21f8-162d-400c-b9a0-19f8215b1799'
        },
    ]
}