"use client"

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PortfolioCard({data}) {

  const router = useRouter()
  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolioID/${id}`, {
      method: "DELETE"
    })
    const data = await res.json();
    if (data.success) {
    toast.success("Deleted successfully!");
    router.refresh(); // refresh page to show new data
  } else {
    toast.error(data.message || "Failed to delete");
  }
}


  return (
    <>
        <div>

        <section className="overflow-x-scroll">
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
                  <td className="px-10 py-3 cursor-pointer text-center">
                    Edit
                  </td>
                  <td 
                  onClick = {() => handleDelete(data?._id)}
                  className="px-10 py-3 text-red-500 cursor-pointer">
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
