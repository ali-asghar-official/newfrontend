import './ProductList.css'
import { useEffect, useState } from 'react'
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { API_URL } from './config'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const getProducts = async () => {
    try {
  const response = await fetch(`${API_URL}/api/products/list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      if (!response.ok) throw new Error(`Server responded ${response.status}`)
      const result = await response.json()
      setProducts(result.list || [])
    } catch (err) {
      console.error('Failed to fetch products', err)
      toast.error('Failed to load products')
    }
  };

  useEffect(() => {
    getProducts()
  }, [])

  const deleteProduct = async (item) => {
  // call confirm via bracket notation to avoid eslint no-restricted-globals error
  if (!window['confirm']('Are you sure you want to delete this product?')) return

    try {
  const response = await fetch(`${API_URL}/api/products/delete?id=` + item._id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Delete failed')
      toast.success(result.message)
      // Remove from state without full reload
      setProducts(prev => prev.filter(p => p._id !== item._id))
    } catch (err) {
      console.error('Delete failed', err)
      toast.error(err.message || 'Delete failed')
    }
  }

  const updateHandler = (item) => {
    navigate("/contact?id=" + item._id)
  }

  return (
    <div className='product_list_main'>
      <div className='product_table'>
        <table>
          <thead className='table_head'>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => {
              const imageUrl = item?.image ? `${API_URL}/${item.image}` : null
              const categoryLabel = item?.category?.title || item?.category || '-'
              return (
                <tr className='table_row' key={item._id}>
                  <td>{item._id}</td>
                  <td className='product_table_image'>
                    {imageUrl ? (
                      <img alt={item.name || 'product'} src={imageUrl} />
                    ) : (
                      <div className='no-image'>No image</div>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>Rs.{item.price}</td>
                  <td>{categoryLabel}</td>
                  <td>{item.brand || '-'}</td>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</td>
                  <td className='product_actions'>
                    <button className='product_list_action' onClick={() => updateHandler(item)} aria-label="Edit">
                      <RxUpdate />
                    </button>
                    <button className='product_list_action' onClick={() => deleteProduct(item)} aria-label="Delete">
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList