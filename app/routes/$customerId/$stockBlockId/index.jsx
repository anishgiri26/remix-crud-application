import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
    const stockblock = await db.stockBlock.findUnique({
        where: { id: params.stockBlockId },
    });

    if (!stockblock) throw new Error("Stock Block not found");

    const data = { stockblock };
    
    return data;
}

export const action = async ({request, params}) => {

  const customerId = params.customerId
  
  const form = await request.formData()
  
  if(form.get('_method') === 'delete') {
    const stockblock = await db.stockBlock.findUnique({
      where: { id: params.stockBlockId },
    });

    if (!stockblock) throw new Error("Stock Block not found");

    await db.stockBlock.delete({ where: { id: params.stockBlockId } });

    return redirect(`/${customerId}`)
  }
}


function StockBlock() {

  const { stockblock } = useLoaderData();

  return (
    <>
    <div>
      <h1>{stockblock.name}</h1>
    </div>
    <div>
      <p> {stockblock.type} </p>
    </div>
    <div className="page-footer">
      <form method="POST">
        <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">
            Delete Stock Block
          </button>
      </form>
    </div>
    </>
  )
}

export default StockBlock
