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
           id: 'ff913fdd-e825-44ac-923d-09ea7eacc547',     
           name: 'Aviato',
           createdAt: '2023-01-01T00:00:00.000Z'
        },
        {
            name: 'Hooli',
            createdAt: '2023-01-05T00:00:00.000Z'
        },
        {
            id: '321a21f8-162d-400c-b9a0-19f8215b1799',
            name: 'PiedPiper',
            createdAt: '2023-01-07T00:00:00.000Z'
        }
    ]
}

function getStockBlocks() {
    return [
        {
            name: 'Traffic',
            type: 'Volume',
            dimensions: 'region, attribution',
            aggregateType: 'sum',
            aggregateOn: 'value',
            createdAt: '2023-01-06T00:00:00.000Z',
            customerId: 'ff913fdd-e825-44ac-923d-09ea7eacc547'
        },
        {
            name: 'Leads',
            type: 'Volume',
            dimensions: 'region, attribution',
            aggregateType: 'count',
            aggregateOn: 'id',
            createdAt: '2023-01-07T00:00:00.000Z',
            customerId: 'ff913fdd-e825-44ac-923d-09ea7eacc547'
        },
        {
            name: 'Opportunities',
            type: 'Volume',
            dimensions: 'is_plg',
            aggregateType: 'count',
            aggregateOn: 'id',
            createdAt: '2023-01-06T00:00:00.000Z',
            customerId: '321a21f8-162d-400c-b9a0-19f8215b1799'
        },
        {
            name: 'New Revenue',
            type: 'Monetary',
            dimensions: 'is_plg',
            aggregateType: 'sum',
            aggregateOn: 'monetary_value',
            createdAt: '2023-01-07T00:00:00.000Z',
            customerId: '321a21f8-162d-400c-b9a0-19f8215b1799'
        },
    ]
}
