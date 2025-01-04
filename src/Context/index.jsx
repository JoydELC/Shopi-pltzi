import { createContext } from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';


const ShoppingCartContext = createContext()

const initializeLocalStorage = () => {
  try {
    const accountInLocalStorage = localStorage.getItem('account')
    const signOutInLocalStorage = localStorage.getItem('sign-out')

    return {
      account: accountInLocalStorage ? JSON.parse(accountInLocalStorage) : {},
      signOut: signOutInLocalStorage ? JSON.parse(signOutInLocalStorage) : false
    }

  } catch (error) {
    console.error('Error parsing localStorage:', error)
    return { account: {}, signOut: false }

  }

}

const ShoppingCartProvider = ({children}) => {
  // Initialize state from localStorage
  const initialState = initializeLocalStorage()
  const [account, setAccount] = useState(initialState.account)
  const [signOut, setSignOut] = useState(initialState.signOut)

  // Get products
const [items, setItems] = useState(null)
const [filteredItems, setFilteredItems] = useState(null)
const [isLoading, setIsLoading] = useState(true)
const [error, setError] = useState(null)
const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

    // Checkout Side Menu · Open/Close
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Product Detail · Show product
    const [productToShow, setProductToShow] = useState({})
  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([])
  const onAdd = (product) => {
    setCount(count + 1)
    // Buscar si el producto ya existe en el carrito
    const existingProductIndex = cartProducts.findIndex(item => item.id === product.id)
    
    if (existingProductIndex > -1) {
      // Si el producto existe, incrementar su cantidad
      const updatedCartProducts = [...cartProducts]
      updatedCartProducts[existingProductIndex] = {
        ...updatedCartProducts[existingProductIndex],
        quantity: (updatedCartProducts[existingProductIndex].quantity || 0) + 1
      }
      setCartProducts(updatedCartProducts)
    } else {
      // Si el producto no existe, agregarlo con cantidad 1
      setCartProducts([...cartProducts, { ...product, quantity: 1 }])
    }
  }
    // Shopping Cart · Order
    const [order, setOrder] = useState([])
      // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)
    // Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)
  
    const filteredItemsByTitle = (items, searchByTitle) => {
      return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }
  
    const filteredItemsByCategory = (items, searchByCategory) => {
      return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
    }
  
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
      if (searchType === 'BY_TITLE') {
        return filteredItemsByTitle(items, searchByTitle)
      }
  
      if (searchType === 'BY_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory)
      }
  
      if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
  
      if (!searchType) {
        return items
      }
    }
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://api.escuelajs.co/api/v1/products')
      
      if (!response.ok) {
        throw new Error(`Error de HTTP: ${response.status}`)
      }
      
      const data = await response.json()
      setItems(data)
      setError(null)
    } catch (err) {
      setError(err.message || 'Ocurrió un error al cargar los productos')
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }

  fetchProducts()
}, [])

useEffect(() => {
  if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
  if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
  if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
  if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
}, [items, searchByTitle, searchByCategory])

console.log(filteredItems)

  return (
    <ShoppingCartContext.Provider value={{
        items,
        isLoading,
        error,
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        setIsCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        onAdd,
        order,
        setOrder,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
        account,
        setAccount,
        signOut,
        setSignOut


    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export {initializeLocalStorage , ShoppingCartContext , ShoppingCartProvider}