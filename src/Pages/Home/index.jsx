import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import React from 'react'
import { ShoppingCartContext } from '../../Context'

const Home = () => {
  const {
    items,
    isLoading,
    error,
    searchByTitle,
    setSearchByTitle,
    filteredItems,
    searchByCategory
  } = React.useContext(ShoppingCartContext)

  const renderView = () => {
    if (searchByTitle?.length > 0 || searchByCategory?.length > 0) {
      if (filteredItems?.length > 0) {
        return filteredItems.map(item => (
          <Card key={item.id} data={item} />
        ))
      } else {
        return (
          <div className="col-span-full text-center">
            <p>We do not have anything matching your search</p>
          </div>
        )
      }
    }
    
    return items?.map(item => (
      <Card key={item.id} data={item} />
    ))
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-full">
          Loading products...
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500 text-center">
          Error: {error}
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>
          {searchByCategory ? `${searchByCategory.charAt(0).toUpperCase() + searchByCategory.slice(1)}` : 'Exclusive Products'}
        </h1>
      </div>
      <input
        type="text"
        placeholder='Search a product'
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={(event) => setSearchByTitle(event.target.value)} 
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-60 sm:max-w-lg md:max-w-screen-lg mx-auto my-8">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home