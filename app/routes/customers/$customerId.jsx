import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const customer = await db.customer.findUnique({
    where: { id: params.customerId },
  });

  if (!customer) throw new Error("Customer not found");

  const data = { customer }
  return data;
}

function Customer() {
    const {customer} = useLoaderData()

  return (
    <>
      <div className="page-header">
        <h1>{customer.name}</h1>
        <Link to='/customers' className="btn btn-reverse">Back</Link>
      </div>
      <div className="page-content">
        <Link to='/customers/' className="btn btn-stock">Create Stock Block</Link>
      </div>
    </>
  )
}

export default Customer
