let wishlist = JSON.parse(localStorage.getItem("wishlists"));
function showCart()
{

  let carts = "";
  
  wishlist.forEach((wishlist_item)=>
  {

    let stars = "";
        const ratings = Math.floor(wishlist_item.ratings);
        for (let i = 1; i <= 5; i++) {
          if (i <= ratings) {
            stars = stars + '<i class="fa fa-star checked"></i>';
          } else {
            stars = stars + '<i class="fa fa-star-o"></i>';
          }
        }

    carts = carts + `<div class="cart-item-wishlist">
    <div class="img-des-price">
      <div class="image-name">
        <img
          src="images/${wishlist_item.imageName}.png"
          alt="$"
          width="150px"
          height="170px"
        />
      </div>
      <div class="des">
        <p style="font-weight: bold; font-size: large">
          ${wishlist_item.name}
        </p>
        <div class="stars">
         ${stars}
          <span
            style="
              color: darkgreen;
              font-weight: bold;
              font-size: small;
              margin-bottom: 25px;
            "
            >&nbsp;&nbsp;(39,122)</span
          >
        </div>
        <p>
          <span style="font-weight: bold">$${wishlist_item.priceAfterDiscount}</span>
          <del>$${wishlist_item.price}</del
          ><span style="color: orangered; font-weight: bold"
            >&nbsp;(60% Off)</span
          >
        </p>
        <select class="select-pack-of">
          <option selected>Select Pack Of</option>
          <option>XL</option>
          <option>L</option>
        </select>
        <div>
          <button onclick="addToCart(${wishlist_item.id})"  class="wishlist-cart">Add to Cart</button>
          <span style="font-size: large">&nbsp;&nbsp;| </span>
          <button onclick="nrem(${wishlist_item.id})" class="remove-wishlist">Remove from Wishlist</button>
        </div>
      </div>
    </div>
  </div>`;
  });
  document.querySelector("#wishlist-item").innerHTML = carts;
  document.querySelector("#wishlist-total-items").innerHTML = `(${wishlist.length} items)`
  

}

showCart();


let totalProducts = JSON.parse(localStorage.getItem("products"));
let cart  =JSON.parse(localStorage.getItem('carts'));
function addToCart(productId)
{
  let cartItem = totalProducts.find(function(item){
    return item.id == productId;
  })
  if(cart.length==0)
  {
    cart.push(cartItem);
  }
  else
  {
    let ans = cart.find(function(item)
    {
       return item.id == cartItem.id;
    })
    if(ans!=undefined)
    {
       newqty = ++ans.qty;
       ans['qty'] = newqty;

    }
    else{
        cart.push(cartItem);
    }

  }
  localStorage.setItem('carts',JSON.stringify(cart));
}

function remove(productID)
{

    let remlist = wishlist.filter((item)=>
    {
        return item.id != productID;
    })
    localStorage.setItem('wishlists',JSON.stringify(remlist));

}

function newrem(productID)
{
  let item = wishlist.find((ele)=>
  {
    ele.id == productID;
  })

  let index = wishlist.indexOf(item);
  wishlist.splice(index,1);
  localStorage.setItem('wishlists',JSON.stringify(wishlist));

}
function nrem(productID)
{
  for(var i in wishlist)
  {
    console.log(i);
    if(wishlist[i].id==productID)
    {
      console.log(wishlist[i]);
      wishlist.splice(i,1);
    }
  }
  localStorage.setItem('wishlists',JSON.stringify(wishlist));
  showCart();
}


