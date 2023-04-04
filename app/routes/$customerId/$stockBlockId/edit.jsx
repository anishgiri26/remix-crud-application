import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

// export const loader = async ({ params }) => {
//   const stockblock = await db.stockBlock.findUnique({
//     where: { id: params.stockBlockId },
//   });

//   if (!stockblock) throw new Error("Stock Block not found");

//   const data = { stockblock };

//   return data;
// };

function EditStockBlock () {
  return(
    <>
      <div className="page-header">
        <h1>Edit Stock Block</h1>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="hidden" name="name" id="name" value={stockblock.name} />
          </div>
          </form>
        </div>
      </>
  )
}