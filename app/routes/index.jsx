import {Link, useLoaderData} from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
    const data = {
        customers: await db.customer.findMany({
            take: 20,
            select: { id: true, name: true, createdAt: true },
            orderBy: { createdAt: 'desc' }
        })
    }

    return data
}

function Home() {
  const {customers} = useLoaderData() // could also use const data = useLoaderData(), but we only need customers
  return (
    <>
      <div>
        <h1>A friendly UI to create blocks</h1>
        <p>Edit an existing customer or create a new one</p>
        <ul className="customers-list">
          {customers.map((customer) => (
            <li key={customer.id} style={{marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid gray'}}>
              <Link to= {customer.id}>
                <h3>{customer.name}</h3>
                <div style={{fontSize: '12px'}}>
                  <span>Created: {new Date(customer.createdAt).toLocaleString()}</span>
                  <br />
                  <span>Updated: {new Date(customer.updatedAt).toLocaleString()}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="page-header" style={{marginTop: '20px'}}>
          <Link to='/newcustomer' className="btn">New Customer</Link>
        </div>
      </div>
    </>
  )
}

export default Home
