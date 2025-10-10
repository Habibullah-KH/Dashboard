"use client"
export default function PortfolioCard({data}) {
  console.log(data);
  return (
    <>
        <div className="w-full ">
        <h2 className="font-bold text-2xl mb-7">My Work</h2>

        <section>
          <table >
          <thead className="text-center">
            <tr className="w-full">
              <th className="px-10">Project Name</th>
              <th className="px-10">Date</th>
              <th className="px-10">Update</th>
              <th className="px-10">Delete</th>
            </tr>
          </thead>

          <tbody>
          {data ? (
             <tr
                  className="hover:bg-gray-50 transition duration-200 bg-amber-100 rounded-md"
                >
                  <td className="px-10 py-3">{data?.title}</td>
                  <td className="px-10 py-3">{data?.date}</td>
                  <td className="px-10 py-3 cursor-pointer">
                    Update
                  </td>
                  <td className="px-10 py-3 text-red-500 cursor-pointer">
                    Delete
                  </td>
                </tr>
            )

           
           :
           (
            <tr>
              <td colSpan={4}   className="text-center py-6 text-red-500 italic">
                No projects found
              </td>
            </tr>
           )
           }
           </tbody>
          </table>
        </section>

        </div>
    </>
  )
}
