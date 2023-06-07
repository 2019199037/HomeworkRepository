const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('product.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  }
});

app.get('/', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          const html = `
          <!DOCTYPE html>
          <html>
              <head>
                  <meta charset="utf-8">
                  <link rel="stylesheet" type="text/css" href="main.css">
                  <title>J Shop</title>
              </head>
              <body>
                  <h1 id="header_animation">J shop!</h1>
                  <div class="navigator">
                      <a id="bd1" href="/">메인페이지</a>
                      <a class="navigator_item" href="login.html">로그인</a>
                      <a class="navigator_item" href="signup.html">회원가입</a>
                  </div>
                  <div id="sub_border"></div>
                  <div id="container_all">
                      <div class="vertical_header">
                          <div class = "maincontent_head">Books</div>
                          <div class="filter_container">
                              <label for="category">카테고리:</label>
                              <select id="category" onchange="filterByCategory()">
                                  <option value="">전체</option>
                                  <option value="foreign_novel">외국 소설</option>
                                  <option value="korean_novel">한국 소설</option>
                                  <option value="textbook">교재</option>
                              </select>
                              <label for="keyword">키워드:</label>
                              <input type="text" id="keyword" oninput="searchProducts()">
                              <label for="sort">정렬:</label>
                              <select id="sort" onchange="sortProducts()">
                                  <option value="alphabetical">가나다 순</option>
                                  <option value="alphabetical2">역 가나다 순</option>
                              </select>
                          </div>
                          <div id="image_container">
                              <div class="sub_image_container">
                                  <div id="maincontent_image1">
                                      <img class="image1" src="그리스인 조르바.jpg" alt="그리스인 조르바.jpg" onclick="showProductDetail(this.src)">
                                      <img class="image2" src="노르웨이의 숲.jpg" alt="노르웨이의 숲.jpg" onclick="showProductDetail(this.src)">
                                      <div class="maincontent_text">
                                          <p class="hide_text1" style="display: none;"></p>
                                          <p class="hide_text2" style="display: none;"></p>
                                      </div>
                                  </div>
                                  <div id="maincontent_image2">
                                      <img class="image1" src="무진기행.jpg" alt="무진기행.jpg" onclick="showProductDetail(this.src)">
                                      <img class="image2" src="삼국지.jpg" alt="삼국지.jpg" onclick="showProductDetail(this.src)">
                                      <div class="maincontent_text">
                                          <p class="hide_text1" style="display: none;"></p>
                                          <p class="hide_text2" style="display: none;"></p>
                                      </div>
                                  </div>
                              </div>
                              <div class="sub_image_container">
                                  <div id="maincontent_image3">
                                      <img class="image1" src="연금술사.jpg" alt="연금술사.jpg" onclick="showProductDetail(this.src)">
                                      <img class="image2" src="코스모스.jpg" alt="코스모스.jpg" onclick="showProductDetail(this.src)">
                                      <div class="maincontent_text">
                                          <p class="hide_text1" style="display: None"></p>
                                          <p class="hide_text2" style="display: None"></p>
                                      </div>
                                  </div>
                                  <div id="maincontent_image4">
                                      <img class="image1" src="파이썬 라이브러리를 활용한 데이터 분석.jpg" alt="파이썬 라이브러리를 활용한 데이터 분석.jpg" onclick="showProductDetail(this.src)">
                                      <img class="image2" src="프리드만의 선형대수학.jpg" alt="프리드만의 선형대수학.jpg" onclick = "showProductDetail(this.src)">
                                      <div class="maincontent_text">
                                          <p class="hide_text1" style="display: None"></p>
                                          <p class="hide_text2" style="display: None"></p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="vertical_header">
                          <div class = "maincontent_head">J shop 소개</div>
                          <div id="introduction">   J shop은 다양한 도서를 파는 온라인 서점입니다. J shop에는 대학교 교재, 고전소설, 한국소설, 외국소설, 비문학 책 등 다양한 분야의 책을 팔고 있습니다. 문의 사항은 Jshop@gamil.com을 통해 문의해주십시오. 항상 고객의 즐거운 독서를 위해 최선을 다하겠습니다. </div>
                      </div>
                  </div>
                  <script>
                  let products = ${JSON.stringify(rows)};

                  function initialize(){
                    let i=1;
                    let j=1;
                    let ic, im;
                    while(j!=5){
                    ic = "maincontent_image"+j;
                    im = "image"+i;
                    ht = "hide_text"+i;
                    var image1 = document.querySelector('#' + ic + ' .' + im);
                    image1.src = '';
                    image1.alt = '';
                    var hideText = document.querySelector('#' + ic + ' .' + ht);
                    hideText.style.display = "None";
                    i+=1;
                        if (i==3){
                            i=1;
                            j+=1;
                        }
                    }
                }

                function renderProducts(k,i,j) {
                    let ic = "maincontent_image"+j;
                    let im = "image"+i;
                    var image1 = document.querySelector('#' + ic + ' .' + im);
                    image1.src = products[k].product_image;
                    image1.alt = products[k].product_image;
                    }
                function filterByCategory() {
                    initialize();
                    var selectedCategory = document.getElementById("category").value;
                    let i =1;
                    let j =1;
                    for (var k = 0; k < products.length; k++){
                        if (products[k].product_category == selectedCategory){
                            renderProducts(k,i,j);
                            i+=1;
                            if (i==3){
                                i=1;
                                j+=1;
                            }
                        }
                    }
                    }
                function searchProducts(){
                    initialize();
                    let i =1;
                    let j =1;
                    var search = document.getElementById("keyword");
                    var pattern = new RegExp(search.value, "i");
                    for (var k = 0; k < products.length; k++){
                        str = products[k].product_description;
                        if(str.match(pattern)){
                            renderProducts(k,i,j);
                            i+=1;
                            if (i==3){
                                i=1;
                                j+=1;
                            }
                        }
                    }
                    }

                    function sortProducts(){
                    initialize();
                    let i =1;
                    let j =1;
                    var list=[];
                    var sort = document.getElementById("sort").value;
                    if(sort == "alphabetical"){
                        for (var p=0; p<products.length;p++){
                            renderProducts(p,i,j);
                            i+=1;
                            if (i==3){
                                i=1;
                                j+=1;
                            }
                        }
                    }
                    else{
                        for (var p=products.length-1; p>-1;p--){
                            renderProducts(p,i,j);
                            i+=1;
                            if (i==3){
                                i=1;
                                j+=1;
                            }
                        }
                    }
                            
                }
                    
                function showProductDetail(src) {
                    for (var k = 0; k < products.length; k++){
                        if(decodeURI(src)=== 'http://localhost:3000/'+products[k].product_image){
                            window.location.href = '/product/'+products[k].product_id;
                            break;
                        }
                    }
                  }

                </script>
              </body>
          </html>
          `;
          res.send(html);
        }
      });

});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const fs = require('fs');

// POST 요청 처리
app.post('/product/:product_id', (req, res) => {
  const productId = req.params.product_id;
  const rating = parseInt(req.body.rating); // 별점 값 가져오기
  const comment = req.body.comment; // 리뷰 내용 가져오기

  // comment.json 파일 읽기
  fs.readFile('comment.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    let commentData = JSON.parse(data);
    // 해당 상품의 별점 개수 1 증가
    if (commentData.hasOwnProperty(productId)) {
      const starCount = commentData[productId][`${rating}_star`];
      commentData[productId][`${rating}_star`] = starCount + 1;
    }

    commentData[productId]["review"].push(comment);
    // comment.json 파일 업데이트
    fs.writeFile('comment.json', JSON.stringify(commentData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.redirect(`/product/${productId}`);
    });
  });
});
  

// Handle product detail page
app.get('/product/:product_id', (req, res) => {
    const productId = req.params.product_id;
  
    // Retrieve product from the database
    db.get('SELECT * FROM products WHERE product_id = ?', productId, (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (row) {
        fs.readFile('comment.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Internal Server Error' });
              return;
            }
            let commentData = JSON.parse(data);
            let ratings = {};
            if (commentData.hasOwnProperty(productId)) {
              ratings = commentData[productId];
            }
            const reviews = commentData[productId]["review"];
            rv = " ";
            reviews.forEach((review) => {
              rv += `<div>${review}</div><br>`;
            });
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <link rel="stylesheet" type="text/css" href="/main.css">
            <title>J Shop</title>
          </head>
            <body>
            <h1 id="header_animation">J shop!</h1>
            <div class="navigator">
                <a id="bd1" href="/">메인페이지</a>
                <a class="navigator_item" href="/login.html">로그인</a>
                <a class="navigator_item" href="/signup.html">회원가입</a>
            </div>
            <div id="sub_border"></div>
            <div id="container_all">
                <div id="product_info">
                  <img src="/${row.product_image}" alt=""${row.product_title}">
                  <div id="product_details">
                    <h2 id="product_details_sub">${row.product_title}</h2>
                    <p>prodcuctID: ${row.product_id}</p>
                    <p>Price: ${row.product_price}</p>
                    <p>Category: ${row.product_category}</p>
                  </div>
                </div>
            <div id="review_section">
              <h2>Leave a Review</h2>
            <form id="reviewForm" method="POST">
              <input type="hidden" name="product_id" value="{product_id}">
              <label for="ratio">별점:</label>
              <select id="ratio" name="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select><br><br><br>
              <label for="comment">리뷰:</label>
              <textarea id="comment" name="comment" rows="4" cols="50"></textarea>
              <button type="submit">리뷰 작성</button>
            </form>

            <h2>Ratings</h2>
            <table>
              <thead>
                <tr>
                  <th>별점</th>
                  <th>개수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>rating_1: </td>
                  <td>${ratings['1_star'] || 0}</td>
                </tr>
                <tr>
                  <td>rating_2: </td>
                  <td>${ratings['2_star'] || 0}</td>
                </tr>
                <tr>
                  <td>rating_3: </td>
                  <td>${ratings['3_star'] || 0}</td>
                </tr>
                <tr>
                  <td>rating_4: </td>
                  <td>${ratings['4_star'] || 0}</td>
                </tr>
                <tr>
                  <td>rating_5: </td>
                  <td>${ratings['5_star'] || 0}</td>
                </tr>
              </tbody>
            </table>
            <h2>Reviews</h2>
            ${rv};
            <div>
            </div>
        </div>
            </body>
          </html>
        `;
        res.send(html);
        });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    });
  });

