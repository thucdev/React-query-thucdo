import React from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { getData } from "../api/productAPI"
import ProductInfo from "../components/ProductInfo"

const ProductDetail = () => {
   const { id } = useParams()

   const key = `/products/${id}`

   const {
      data: product,
      isLoading,
      error,
   } = useQuery(key, getData, {
      enabled: !!id,
   })

   return (
      <main>
         {product && <ProductInfo product={product} />}
         {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
         {error && <p style={{ textAlign: "center" }}>{error}</p>}
      </main>
   )
}

export default ProductDetail
