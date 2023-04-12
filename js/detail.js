
let string = window.location.href;
let id = string.split("id=").pop();

// fetch(`https://64036281302b5d671c4e05dc.mockapi.io/book/${id}`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });
const renderProductDetail = async (id) => {
  await fetch(`https://64036281302b5d671c4e05dc.mockapi.io/book/${id}`)
    .then((response) => response.json())
    .then((product) => {
      // Render dữ liệu sản phẩm lên trang detail
      const productDetail = document.querySelector(".book-detail");
      productDetail.innerHTML = `
        <section class="detail-section">
            <div class="detail-essential">
              <div class="produc-media">
                <div class="book-image">
                <img src=${product.cover_url} alt="${product.title}">
                </div>
              </div>
              <div class="produc-detail">
                <div class="book-info">
                  <h2 class="book-title">${product.title}</h2>
                  <div class="book-author">
                    <span>Tác giả : </span>
                    <span class="span-2">${product.author}</span>
                  </div>
                  <div class="book-publisher">
                    <span>NXB :</span>
                    <span class="span-2">${product.NXB}</span>
                  </div>
                  <div class="book-publication-date">
                    <span>Năm XB:</span>
                    <span class="span-2">${product.NamXB}</span>
                  </div>
                </div>
                <div class="book-price-detail">
                  <span>${product.price}</span>
                </div>
                <div class="product-quantity">
                    <label class="number-qty" for="qty">Số lượng:</label>
                    <div class="input-group">
                        <button class="decrease-btn">-</button>
                        <input type="number" class="quantity-input"  value="1">
                        <button class="increase-btn">+</button>
                    </div>
                </div>
                    <div class="book-actions">
                      <button class="add-to-cart-button"  name="${product.title} " onclick=addCart(${product.price},${product.id},"${product.cover_url}")>Thêm vào giỏ hàng</button>
                    </div>
              </div>
            </div>
          </section>
          
          <!-- Hiển thị các thuộc tính khác của sản phẩm -->

          <section class="product-info">
            <div id="product_view_info" class="content product_view_content">
              <div class="product_view_content-title">Thông tin sản phẩm</div>
            <div class="product_view_tab_content_additional">
              <table class="data-table table-additional">
              <tbody>
                <tr>
                  <th class="table-label">
                      Mã hàng
                  </th>
                  <td class="data_sku">
                      ${product.MaHang}
                    </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Tên Nhà Cung Cấp
                  </th>
                  <td class="data_supplier">
                    ${product.TenNhaCungCap}
                  </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Tác giả				
                  </th>
                  <td class="data_author">
                    ${product.author}		
                  </td>
                </tr>
                </tr>
                <tr>
                  <th class="table-label">
                      NXB				
                  </th>
                  <td  class="data_publisher">
                    ${product.NXB}				
                  </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Năm XB
                  </th>
                  <td class="data_publish_year">
                   ${product.NamXB}				
                  </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Ngôn Ngữ				
                  </th>
                  <td class="data_languages">
                    ${product.NgonNgu}				
                  </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Trọng lượng (gr)				
                  </th>
                  <td class="data_weight">
                    ${product.TrongluongGr}				
                  </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Kích Thước Bao Bì				
                  </th>
                  <td class="data_size">
                    ${product.KichThuoc}				
                  </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Số trang				
                  </th>
                  <td class="data_qty_of_page">
                    ${product.SoTrang}				
                  </td>
                </tr>
                <tr>
                  <th class="table-label">
                      Loại bìa				
                  </th>
                  <td class="data_book_layout">
                    ${product.LoaiBia}				
                  </td>
                </tr>
                
              </tbody>
            </table>
            </div>
            <div class="content-description">
              <div id="product_tabs_description_contents">
                <div id="desc_content" class="std">
                    <p style="text-align: justify;"><span>${product.description}</span></p>
                     <div class="clear"></div>
                </div>
              </div>
            </div>
          </section>
        `;
    })
    // số lượng
    .then(() => {
      let decreaseBtn = document.querySelector(".decrease-btn");
      let increaseBtn = document.querySelector(".increase-btn");
      let quantityInput = document.querySelector(".quantity-input");
      decreaseBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
          quantityInput.value--;
        }
      });

      increaseBtn.addEventListener("click", () => {
        quantityInput.value++;
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
renderProductDetail(id);
// add giỏ hàng

const btnAddCart = document.querySelector(".add-to-cart-button");

function addProductCart(data, callback) {
  fetch("https://64036281302b5d671c4e05dc.mockapi.io/cartProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      response.json();
      console.log("success");
    })
    .then(callback);
}

function handleCreatePrdCart() {
  console.log(id);
}
btnAddCart.addEventListener("click", () => {
  // console.log('check');
  let formData = {
    idProduct: id,
  };
  addProductCart(formData, function () {});
});
handleCreatePrdCart();


  function addCart(price , id, img) {
    let  name = document.querySelector(".add-to-cart-button").name;
    shoppingCart.addItemToCart(name, price, 1, id, img);
    displayCart();
  }

