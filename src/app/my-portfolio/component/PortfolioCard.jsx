"use client"
export default function PortfolioCard({data}) {
  return (
    <>
        <div className="border-2 border-amber-500 w-full ">
        <h2 className="font-bold text-2xl mb-7">My Work</h2>

        <section>
          <table >
          <thead><
            <tr className="w-full">
              <th className="px-10">Project Name</th>
              <th className="px-10">Date</th>
              <th className="px-10">Update</th>
              <th className="px-10">Delete</th>
            </tr>
          </thead>

          <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => {
             <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3 border-b">{item.title}</td>
                  <td className="px-4 py-3 border-b">{item.date}</td>
                  <td className="px-4 py-3 border-b text-blue-600 cursor-pointer hover:underline">
                    Update
                  </td>
                  <td className="px-4 py-3 border-b text-red-500 cursor-pointer hover:underline">
                    Delete
                  </td>
                </tr>
            })
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
