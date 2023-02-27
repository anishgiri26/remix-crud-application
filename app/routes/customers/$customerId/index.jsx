import { Link } from "@remix-run/react";

function NewStockBlock() {
  return (
    <>
        <div className="page-header">
        <h1>New Stock Block</h1>
        <Link to='/customers' className="btn btn-reverse">Back</Link>
        </div>

        <div className="page-content">
            <form method="POST">
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <button type="submit" className="btn btn-block">
                    Create
                </button>
            </form>
        </div>
    </>
  )
}

export default NewStockBlock
