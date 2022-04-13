import { useEffect, useMemo, useState } from "react"
// import useQuery from '../hooks/useQuery'
import { useQuery } from "react-query"
import { getData } from "../api/productAPI"
import Pagination from "../components/Pagination"
import Products from "../components/Products"
import Sorting from "../components/Sorting"
import { useMyContext } from "../context/store"

const Home = () => {
   const [products, setProducts] = useState([])
   const [limit, setLimit] = useState(5)

   const { page, sort, refetching } = useMyContext()

   const key = `http://localhost:5000/api/products?limit=${limit}&page=${page}&sort=${sort}`

   const { data, isLoading, error } = useQuery({
      queryKey: key,
      queryFn: getData,
   })

   useEffect(() => {
      if (data?.products) setProducts(data.products)
   }, [data?.products])

   const totalPages = useMemo(() => {
      if (!data?.count) return 0
      return Math.ceil(data.count / limit)
   }, [data?.count, limit])

   return (
      <main>
         <Sorting page={page} />
         <Products products={products} />
         {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
         {error && <p style={{ textAlign: "center" }}>{error}</p>}
         <Pagination totalPages={totalPages} />
      </main>
   )
}

export default Home
