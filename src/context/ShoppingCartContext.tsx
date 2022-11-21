import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode
}
type CartItem = {
  id: number,
  quantity: number
}
type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[]
}


const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function UseShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart',[])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const cartQuantity = cartItems.reduce((quantity, item) => {
    return item.quantity + quantity
  }, 0)

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }
  function increaseQuantity (id: number) {
    setCartItems( currItems => {
        if(currItems.find((item) => item.id === id) == null) {
          return [...currItems, {id, quantity: 1}]
        } else {
          return currItems.map((item) => {
            if(item.id === id) {
              return {...item, quantity: item.quantity + 1}
            } else {
              return item
            }
          })
        }
      }
    )
  }
  function decreaseQuantity (id: number) {
    setCartItems( currItems => {
        if(currItems.find((item) => item.id === id)?.quantity === 1) {
          return currItems.filter(item => item.id !== id)
        } else {
          return currItems.map((item) => {
            if(item.id === id) {
              return {...item, quantity: item.quantity - 1}
            } else {
              return item
            }
          })
        }
      }
    )
  }
  function removeFromCart (id: number) {
   setCartItems(currItems => (currItems.filter(item => item.id !== id)) )
  }
 

  return <ShoppingCartContext.Provider value={{getItemQuantity, increaseQuantity, decreaseQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}}>
    {children}
    <ShoppingCart isOpen={isOpen} />
  </ShoppingCartContext.Provider>

}