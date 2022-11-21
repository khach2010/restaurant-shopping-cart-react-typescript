import { Button, Stack } from "react-bootstrap"
import { UseShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import storeItems from '../data/items.json'

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = UseShoppingCart()
  const item = storeItems.find(i => i.id === id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <div>
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
       
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
        <p>{item.name} - {formatCurrency(item.price)}</p>
          
        </div>
      </div>


      <div className="me-auto">
        <div>
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "1rem" }}>
              x{quantity}
            </span>
          )}
        </div>
      
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  )
}