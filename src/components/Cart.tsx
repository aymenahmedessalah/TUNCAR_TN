import React from 'react';

const Cart = ({ cart, setCart }: { cart: any[], setCart: any }) => {
  return (
    <div style={{ padding: '40px' }}>
      <h2>🛒 سلة المشتريات</h2>
      {cart.length === 0 ? <p>السلة فارغة.</p> : <p>لديك {cart.length} قطع.</p>}
    </div>
  );
};

export default Cart;