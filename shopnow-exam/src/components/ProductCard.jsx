import React from 'react'

const ProductCard = ({ title, price, discount, image }) => {
  const finalPrice = price - discount
  // fallback image if no prop is passed
  const imageUrl =
    image || 'https://via.placeholder.com/400x240?text=Product+Image'

  return (
    <div className="card product-card">
      <img src={"https://imgs.search.brave.com/XpUs_ZFqU2RBk_98HpwmHWqF-GLqooj89KUd8nsBOQk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/MDAyOTQwMzc2ODEt/YzgwYjRjYjViNDM0/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE1USjhmR1Zo/Y25Cb2IyNWxjM3hs/Ym53d2ZId3dmSHg4/TUE9PQ"} alt={title} className="product-image" />

      <h3>{title}</h3>
      <p>Price: ${price}</p>
      <p>Discount: ${discount}</p>
      <p>
        <strong>Final Price: ${finalPrice}</strong>
      </p>
    </div>
  )
}

export default ProductCard