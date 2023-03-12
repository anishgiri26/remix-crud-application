import { Link, useSearchParams } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

// create a new stock block in the table StockBlock with name  from the form and customerId from the URL
export const action = async ({request, params}) => {
    const form = await request.formData()
    const name = form.get('name')
    
    const customer = await db.customer.findUnique({where: {id: params.customerId}})
    const stockblock = await db.stockBlock.create({data: {name, customer: {connect: {id: customer.id}}}})

    return redirect(`/${customer.id}`)

}


function NewStockBlock() {
  return (
    <>
        <div className="page-header">
        <h1>New Stock Block</h1>
        </div>

        <div className="page-content">
            <form method="POST">
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <button type="submit" className="btn btn-stock">
                    Create Stock Block
                </button>
            </form>
        </div>
    </>
  )
}

export default NewStockBlock
