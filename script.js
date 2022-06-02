

// shopping cart

let data = localStorage.getItem('products'),
    form = document.querySelector('form'),
    btnsubmit = document.querySelector('form .form__btn'),
    cancel = document.querySelector('form .cancel'),
    title = document.querySelector('.name'),
    price = document.querySelector('.price'),
    description = document.querySelector('.description');
    // id = Math.floor(Math.random() * 100);

const saveProduct = () => {
      data = data ?? [];
      if(data.findIndex(product => product.title === title.value) < 0){
          data = [...data, { title: title.value, price: price.value, description: description.value,id: Math.floor(Math.random() * 100) }];
          localStorage.setItem('products', JSON.stringify(data));
          fetchProducts();
          resetForm();
          alert('Product Added Successfully');
      } 
      else {
          alert('Product already exists');
          title.focus();
      }
};

resetForm = () => {
    form.reset();
    title.focus();
    location.reload();
  };

fetchProducts = () => {
  data = JSON.parse(localStorage.getItem('products'));
    let products = document.querySelector('.products');
    products.innerHTML = '';
    if(data !== null && data.length > 0){
      data.map((product, i) => {
        products.innerHTML += `
          <div class="card">
            <img class="card__img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdimGnCWNU2-gdLP4UG5DROdId6M1fV957UA&usqp=CAU" alt="${product.title}"/>
            <section>
              <div class="product__title">
              <span>${product.title}</span>
              <span>$${product.price}</span>
              </div>
              <div class="product__text">
              <span>${product.description}</span>
              </div>
            </section>
            <button type="button" onclick="addToCart(${i});" class="AddToCard">&plus;</button>
            <div class="icon__wrapper">
              <button type="button" class="editCard"  onclick="previewUpdate(${i});" ><i class="fa-solid fa-pencil"></i></button>
              <button type="button" class="deleteCard" onclick="deleteProduct(${i});" ><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
      });
    }
    else{
      products.innerHTML = `
        <div class="alert">
            <p>No Products found ! <br>
              
            </p>
        </div>
      `;
    }
};
fetchProducts();


previewUpdate = (i) => {
    let product = data[i];
    title.value = product.title;
    price.value = product.price;
    description.value = product.description;
    btnsubmit.innerHTML = 'Update';
    btnsubmit.setAttribute('onclick', `updateProduct(${i});`);
    cancel.setAttribute('onclick', `resetForm();`);
    title.focus();
    alert('Back to Add Product Page');

};

updateProduct = (i) => {
    data[i].title = title.value;
    data[i].price = price.value;
    data[i].description = description.value;
    localStorage.setItem('products', JSON.stringify(data));
    alert('Product Updated Successfully');
    fetchProducts();
    resetForm();
};


deleteProduct = (i) => {
    if(confirm('Do you want to delete this product ?')){
      data.splice(i, 1);
      localStorage.setItem('products', JSON.stringify(data));
      fetchProducts();
    }
};

const getIndex = (id) => {
  if(cart !== null && cart.length > 0){
    return cart.findIndex(item => item.id === id);
  }
};

let cart = localStorage.getItem('cart');
cart = cart ? JSON.parse(cart) : [];

const popCart = () => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if(cart !== null && cart.length > 0){
    $(".cart__items").html(
      cart.reduce((accu, item, i) => accu += `
        <div class="card">
          <img class="card__img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdimGnCWNU2-gdLP4UG5DROdId6M1fV957UA&usqp=CAU" alt="${item.title}"/>
          <section>
            <div class="card__text">
            <span>Name: ${item.title}</span>
            <span>Price: $${item.price}</span>

            </div>
            </section>
            <div class="card__amount">
            <span>Amount : ${item.qty}</span>
            </div>
            <div class="card__btn-wrapper">
              <button type="button" onclick="removeCartItem(${i});" class="AddToCard card__btn">&times;</button>
            </div>
        </div>
      `, '')
    );
  }
  else{
    $(".cart__items").html(`
      <div class="alert">
          <p>No Products found !</p>
      </div>
    `);
  }

  
  // 

  localStorage.setItem('cart', JSON.stringify(cart));

  console.log(cart);

  

  if(cart !== null && cart.length > 0){
 
    cart.reduce((accu, item) => accu += item.qty, 0) < 1 ? $("header nav .card__count").find("sup").css('background', 'gray').text(cart.reduce((accu, item) => accu += item.qty, 0)) : $("header nav .card__count sup").css('background', 'green').text(cart.reduce((accu, item) => accu += item.qty, 0))
   
  }
  else{
    $("header nav .card__count sup").css('background', 'gray').text(0);
  }
  if(cart !== null && cart.length > 0){
    $(".total").html(
      cart.reduce((accu, item) => accu += item.price * item.qty, 0)
    );
  }
  else{
    $(".total").html(0);
  }
  
  
};
popCart();


resetCart = () => {
  if(confirm('Do you want CLEAR your cart ?')){
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    popCart();
  }
};


removeCartItem = (i) => {
  cart.splice(i, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  popCart();
};


const addToCart = (id,rate) => {  
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart !== null && cart.length > 0){
      if(cart.findIndex(product => product.id === id) > -1){
        cart[getIndex(id)].qty += 1;
      }
      else{
        cart = [...cart, { id: id, qty: 1, title: data[id].title, price: data[id].price, description: data[id].description, rate: rate }];
        location.reload();
      }
    }
    else{
      cart = [{ id: id, qty: 1, title: data[id].title, price: data[id].price, description: data[id].description }];
      location.reload();
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    popCart();
};

  
form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveProduct();
});

cancel.addEventListener('click', e=> resetForm());

