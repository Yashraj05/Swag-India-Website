let order = JSON.parse(localStorage.getItem('orders'));
let carts="";
order.forEach(order_item => 
{
    let price = order_item.priceAfterDiscount;
    carts = carts + `<div class="cart-item">
    <div class="img-des-price">
    <div class="image-name">
      <img src="images/${order_item.imageName}.png" alt="$" width="100px" height="100px"  />
    </div>
    <div class="des">
      <p style="font-weight: bold; font-size: large;padding-bottom: 20px;">${order_item.name}</p>
      <p style="font-weight: bold;color: gray;font-size: 14px;padding-bottom: 10px;">Color : White </p>
      <p style="font-weight: bold;color: gray;font-size: 14px;">Sold By : Yash Private Limited</p>
    </div>
    <div class="order-pd-price">
        <p style="font-weight: bold;" id="order-pd-price">$${order_item.priceAfterDiscount}</p>
    </div>
    <div class="delivery-date">
     
        <div class="form-check">
            <input  class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
            <label style="font-weight: 500;" class="form-check-label" for="flexRadioDefault1">
              Delivery expected by Jul 5
            </label>
        </div>
        <p style="color: rgb(161, 158, 158);">Your order has been placed</p>
        <a style="font-weight: bold;" href="">TRACK YOUR ORDER</a>
      
    </div>
  </div>
</div>`;

    document.getElementById("order-items").innerHTML=carts;
    
});