import { useLoaderData, Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const customer = await db.customer.findUnique({
    where: { id: params.customerId },
  });

  if (!customer) throw new Error("Customer not found");

  const stockblocks = await db.stockBlock.findMany({
    where: { customerId: params.customerId },
  });

  if (!stockblocks) throw new Error("Stock Blocks not found");

  const data = { customer, stockblocks};

  return data;
}

export const action = async ({request, params}) => {
  
  const form = await request.formData()
  
  if(form.get('_method') === 'delete') {
    const customer = await db.customer.findUnique({
      where: { id: params.customerId },
    });
  
    if (!customer) throw new Error("Customer not found");

    await db.customer.delete({ where: { id: params.customerId } });

    return redirect('/')
  }
}


function Customer() {
  const { customer, stockblocks } = useLoaderData();

  return (
    <>
      <div className="page-header">
        <h1>{customer.name}</h1>
        <Link to= 'newStockBlock' className="btn btn-stock">
          New Stock Block
        </Link>
      </div>
      <div className="page-content">
        <p> Edit an existing stock block or create a new one </p>
      </div>
      <div>
      <ul>
        {stockblocks.map((stockblock) => (
          <li key={stockblock.id} style={{marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid gray'}}>
            <Link to={stockblock.id}>
              <h2>{stockblock.name}</h2>
              <div style={{fontSize: '12px'}}>
                <span>Created: {new Date(stockblock.createdAt).toLocaleString()}</span>
                <br />
                <span>Updated: {new Date(stockblock.updatedAt).toLocaleString()}</span>
              </div>
              <br />
              <div>
                <span>Type: {stockblock.type} </span>
                <br />
                <span>Dimensions: {stockblock.dimensions} </span>
                <br />
                <span>Calculate as: {stockblock.aggregateType}({stockblock.aggregateOn})</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="page-footer">
          <form method="POST">
            <input type="hidden" name="_method" value="delete" />
              <button className="btn btn-delete">
                Delete Customer and all Stock Blocks
              </button>
          </form>
      </div>
    </div>
    </>
  )
}

export default Customer
