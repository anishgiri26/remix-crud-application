import { Link } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action = async ({request}) => {
    const form = await request.formData()
    const name = form.get('name')

    const fields = { name }

    const customer = await db.customer.create({data: fields})

    return redirect(`/customers/${customer.id}`)
}

function NewCustomer() {
  return (
    <>
        <div className="page-header">
        <h1>New customer</h1>
        <Link to='/customers' className="btn btn-reverse">Back</Link>
        </div>

        <div className="page-content">
            <form method="POST">
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <button type="submit" className="btn btn-block">
                    Create Customer
                </button>
            </form>
        </div>
    </>
  )
}

export default NewCustomer
