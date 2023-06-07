const sqlite3 = require('sqlite3').verbose();

// 데이터베이스에 연결
const db = new sqlite3.Database('product.db');

// 데이터 추가
const products= [
  {
    product_image: '그리스인 조르바.jpg',
    product_title: '그리스인 조르바',
    product_price: 10000,
    product_category: 'foreign_novel',
    product_description: '니코스 카잔차키스의 소설입니다.'
  },
  {
    product_image: "노르웨이의 숲.jpg",
    product_title: "노르웨이의 숲",
    product_price: 15000,
    product_category: "foreign_novel",
    product_description: "무라카미 하루키의 소설입니다."
  },
  {
    product_image: "무진기행.jpg",
    product_title: "무진기행",
    product_price: 12000,
    product_category: "korean_novel",
    product_description: "김승옥의 소설입니다."
  },
  {
    product_image: "삼국지.jpg",
    product_title: "삼국지",
    product_price: 18000,
    product_category: "foreign_novel",
    product_description: "중국 고대의 역사 소설입니다."
  },
  {
    product_image: "연금술사.jpg",
    product_title: "연금술사",
    product_price: 20000,
    product_category: "foreign_novel",
    product_description: "파울로 코엘료의 소설입니다."
  },
  {
    product_image: "코스모스.jpg",
    product_title: "코스모스",
    product_price: 25000,
    product_category: "textbook",
    product_description: "칼 세이건의 과학서입니다."
  },
  {
    product_image: "파이썬 라이브러리를 활용한 데이터 분석.jpg",
    product_title: "파이썬 라이브러리를 활용한 데이터 분석",
    product_price: 30000,
    product_category: "textbook",
    product_description: "웨스 맥키니의 데이터 분석서입니다."
  },
  {
    product_image: "프리드만의 선형대수학.jpg",
    product_title: "프리드만의 선형대수학",
    product_price: 28000,
    product_category: "textbook",
    product_description: "게오르그 프리드만의 선형대수학 교재입니다."
  }
];

// 데이터베이스에 데이터 추가
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS products (product_title TEXT, product_price INTEGER, product_category TEXT, product_image TEXT, product_description TEXT)');

  products.forEach(product => {
    const { product_image, product_title, product_price, product_category, product_description } = product;
    db.run('INSERT INTO products (product_image, product_title, product_price, product_category, product_description) VALUES (?, ?, ?, ?, ?)',
      [product_image, product_title, product_price, product_category, product_description],
      function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log(`Inserted product: ${product_title}`);
        }
      });
  });
});

// 데이터베이스 연결 종료
db.close();
