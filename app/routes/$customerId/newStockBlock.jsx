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

                <div className="form-control">
                    <label htmlFor="type">Type</label>
                    <select name="type" id="type">
                        <option value="volume" selected>Volume</option>
                        <option value="monetary">Monetary</option>
                        <option value="headcount">Headcount</option>
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="dimensions">Dimensions</label>
                    <input type="text" name="dimensions" id="dimensions" />
                </div>

                <div className="form-control">
                    <label htmlFor="aggregate-type">Aggregate Type</label>
                    <select name="aggregate-type" id="aggregate-type">
                        <option value="count" selected>Count</option>
                        <option value="sum">Sum</option>
                    </select>
                </div>

                <div className="form-control">
                    <label htmlFor="aggregate-on">Aggregate On</label>
                    <select name="aggregate-on" id="aggregate-on">
                        <option value="id" selected>id</option>
                        <option value="value">value</option>
                    </select>
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
