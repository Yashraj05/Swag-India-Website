let productsListUrl = "/products.json";
async function loadProducts(productsListUrl) {
  fetch(productsListUrl)
    .then((response) => response.json())
    .then((data) => {
      const products = data.Products;
      let cards = "";
      products.forEach((product) => {
        let isNewDiv = "";
        if (product.isNew === "TRUE") {
          isNewDiv = `<div class="new-product"><span>New</span></div>`;
        }
        let stars = "";
        const ratings = Math.floor(+product.ratings);
        for (let i = 1; i <= 5; i++) {
          if (i <= ratings) {
            stars = stars + '<i class="fa fa-star checked"></i>';
          } else {
            stars = stars + '<i class="fa fa-star-o"></i>';
          }
        }
        cards =
          cards +
          `
          <div class="card-deck" >
          
            <div class="subject" id="${product.id}">
            
            ${isNewDiv}
           
              <div class="card">
                <img
                  class="card-img-top"
                  src="images/${product.imageName}.png"
                  alt="Card image cap"
                />
                
                <div class="functions">
                  <div class="cartx">
                    <div class="icons">
                      <img onclick="addToWishlist(${product.id})" class="wishlist" src="./images/wishlist.png" alt="" />
                      <img class="view" src="./images/view.png" alt="" />
                      <img onclick="addToCart(${product.id})" class="cart" id="cart" src="./images/cart.png" alt="" />
                    </div>
                  </div>
                </div>
  
                <div class="product-rating">
                  ${stars}
                </div>
                  <h4><a href="#">${product.name}</a></h4>
                <div class="price">
                  <ul>
                  <li>$${product.priceAfterDiscount}
                 </li>
                  <li
                 class="discount">$${product.price}</li>
                  </ul>
                </div>
              </div>
  
              
            </div>
          </div>`;
        
      });
      document.querySelector("#productsListArea").innerHTML = cards;
    });
}
loadProducts(productsListUrl);


fetch(productsListUrl)
.then((response) => response.json())
.then((data) => {
  const products = data.Products;
  localStorage.setItem("products",JSON.stringify(products));
  if(!localStorage.getItem("carts"))
  {
    localStorage.setItem("carts","[]");
  }
  if(!localStorage.getItem('wishlists'))
  {
    localStorage.setItem('wishlists',"[]")
  }
  
})
let totalProducts = JSON.parse(localStorage.getItem("products"));
let cart  =JSON.parse(localStorage.getItem('carts'));
let wishlist  =JSON.parse(localStorage.getItem('wishlists'));
let newqty;
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

