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

function CustomerItems() {
  const {customers} = useLoaderData() // could also use const data = useLoaderData(), but we only need customers
  return (
    <>
      <div className="page-header">
        <h1>Customer List</h1>
        <Link to='/customers/new' className="btn">New Customer</Link>
      </div>
      <ul className="customers-list">
      {customers.map((customer) => (
        <li key={customer.id}>
            <Link to={customer.id}>
                <h3>{customer.name}</h3>
                {new Date(customer.createdAt).toLocaleString()}
            </Link>
        </li>
        ))}
      </ul>
    </>
  )
}

export default CustomerItems
