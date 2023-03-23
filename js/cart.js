let cart = JSON.parse(localStorage.getItem("carts"));
console.log(cart);


function showCart()
{
  let totalPrice=0;
  let bagDist =0;
  let actualTotalPrice=0;
  let carts = "";
  cart.forEach((cart_item)=>
  {
    let price = cart_item.qty * cart_item.priceAfterDiscount;
    let actualPrice = cart_item.qty * cart_item.price;
    totalPrice = totalPrice + price;
    bagDist = bagDist + actualPrice - price;
    actualTotalPrice = actualTotalPrice + actualPrice;

    carts = carts + `<div class="cart-item">
    <div class="img-des-price">
    <div class="image-name">
      <img src="images/${cart_item.imageName}.png" alt="$" width="130px" height="130px"  />
    </div>
    <div class="des">
      <p style="font-weight: bold; font-size: large">${cart_item.name}</p>
      <p style="font-weight: bold;color: gray;font-size: 14px;">Color : White </p>
      <p style="font-weight: bold;color: gray;font-size: 14px;">Sold By : Yash Private Limited</p>
      <div class="cart-select-qty">
          <p style="font-size: 20px;">Size:&nbsp;</p>
        <select id="cart-select">
         
          <option selected>M</option>
          <option>XL</option>
          <option>L</option>
        </select>
        <div class="product-qty">
          <p style="font-size: 20px;">QTY:&nbsp;&nbsp;</p>
          <input type="text" name="quantity" value="${cart_item.qty}" class="qty" />
           
          
        </div>
      </div>
    </div>
    <div class="product-price">
      <p style="font-weight: bold; font-size: large">$${price}</p>
      <p>
          <del>$${actualPrice}</del><span style="color: orangered; font-weight: bold"
      >&nbsp;(60% Off)</span>
      </p>
      <p style="font-size: small;">Delivery in 4-6 days</p>
      
    </div>
  </div>
  <hr style="margin: 0px -30px;">
  <div class="remove-wish">
      <p style="font-weight: bold; font-size: large">
        <button onclick="nrem(${cart_item.id})"; style="text-decoration: none;color: black;" >
            Remove
        </button>
      </p>
      <p style="font-weight: bold; font-size: large">
        <button onclick="addToWishlist(${cart_item.id})" style="text-decoration: none;color: black;" >
            Wishlist
        </button>
      </p>
  </div>
  </div>`;
  });
  let bagDistAns = bagDist.toFixed(2);
  let actualTotalPriceAns = actualTotalPrice.toFixed(2)
  document.querySelector("#cart-item").innerHTML = carts;
  document.querySelector("#total-cart-price").innerHTML = `Total :$${totalPrice} `;
  document.querySelector('#total-cart-items').innerHTML=`( ${cart.length} items)`;
  document.querySelector('#total-actual-price').innerHTML=`$${actualTotalPriceAns}`;
  document.querySelector('#bag-discount').innerHTML=`$${bagDistAns}`;
  document.querySelector('.final-price').innerHTML=`$${totalPrice}`;
  document.querySelector('.final-price-total').innerHTML=`$${totalPrice}`;
  

}
showCart();

let totalProducts = JSON.parse(localStorage.getItem("products"));
let wishlist  =JSON.parse(localStorage.getItem('wishlists'));
function addToWishlist(productId)
{
  let listItem = totalProducts.find((item) =>{
    return item.id == productId;
  })
  if(wishlist.length==0)
  {
    wishlist.push(listItem);
  }
  else
  {

    let prodqty = wishlist.find((item)=>
    {
      return item.id == listItem.id;
    })
    if(prodqty!=undefined)
    {
      newqty = ++listItem.qty;
      prodqty['qty']=newqty;
    }
    else{
      wishlist.push(listItem)
    }

  }
  localStorage.setItem('wishlists',JSON.stringify(wishlist));

}

// function remove(productID)
// {
//     let remCart = cart.filter((item)=>
//     {
//         return item.id != productID;
//     })
//     localStorage.setItem('carts',JSON.stringify(remCart));
// }

// function newrem(productID)
// {
//   let item = cart.find((ele)=>
//   {
//     ele.id == productID;
//   })
//   console.log(JSON.stringify(item));
//   let index = cart.indexOf(item);
//   console.log(index);
//   cart.splice(index);
//   localStorage.setItem('carts',JSON.stringify(cart));

// }
function nrem(productID)
{
  for(var i in cart)
  {
    console.log(i);
    if(cart[i].id==productID)
    {
      console.log(cart[i]);
      cart.splice(i,1);
    }
  }
  localStorage.setItem('carts',JSON.stringify(cart));
  showCart();
}

if(!localStorage.getItem("orders"))
  {
    localStorage.setItem("orders","[]");
  }
let order = JSON.parse(localStorage.getItem("orders"));

function placeOrder()
{
    if(order.length==0)
    {
      localStorage.setItem("orders",JSON.stringify(cart))
    }
    else{
      cart.forEach((item)=>
      {
        order.push(item);
      })
      localStorage.setItem("orders",JSON.stringify(order));
    }
    
    localStorage.setItem('carts',"[]");
    showCart();
    document.getElementById("cart-item").innerHTML =`<h1 id="order-placed-success">Order is Placed</h1>`

}


