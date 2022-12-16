INSERT INTO status(id, name) values(1, 'Done');
INSERT INTO status(id, name) values(2, 'NotApproved');
INSERT INTO status(id, name) values(3, 'Accepted');
INSERT INTO status(id, name) values(4, 'Pending');


INSERT INTO category(id, name) values(1, 'Leather');
INSERT INTO category(id, name) values(2, 'Eco leather');
INSERT INTO category(id, name) values(3, 'Summer');
INSERT INTO category(id, name) values(4, 'Winter');
INSERT INTO category(id, name) values(5, 'Covered');
INSERT INTO category(id, name) values(6, 'Flip-flops');
INSERT INTO category(id, name) values(7, 'Covered');
INSERT INTO category(id, name) values(8, 'Desert boots');
INSERT INTO category(id, name) values(9, 'Street styles');
INSERT INTO category(id, name) values(10, 'Sport');


INSERT INTO product(id, name, description, brand, price, weight, img)
values(1, 'Jordan 1 Dark Mocha', 'Jordan Brand continued their Black Toe design theme in 2020 and released the Jordan 1 High Dark Mocha. The Dark Mocha 1 was one of the most anticipated releases in 2020 due to its familiar colorblocking that referenced two of the greatest Jordan 1s of all-time, the Jordan 1 Travis Scott and the Jordan 1 Black Toe.',
	  'Jordan', 170.00, 1.2, 'https://images.stockx.com/images/Air-Jordan-1-Retro-High-Dark-Mocha-2-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1616187367');

INSERT INTO product(id, name, description, brand, price, weight, img)
values(2, 'Yeezy Boost 350 V2 Zebra', 'Debuted in 2017, the adidas Yeezy Boost 350 V2 Zebra is known as one of the most renowned colorways in the Yeezy line. It features a white and black marbled Primeknit upper with a white side-stripe and red ""SPLY-350"" text. At the base, a cushioned Boost sole provides comfort and support.',
	  'Adidas', 220.00, 0.99, 'https://images.stockx.com/360/adidas-Yeezy-Boost-350-V2-Zebra/Images/adidas-Yeezy-Boost-350-V2-Zebra/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635342807&h=384&q=57');

INSERT INTO product(id, name, description, brand, price, weight, img)
values(3, 'Nike Dunk Low Coast', 'Nike paid homage to the West Coast with the womens Nike Dunk Low Coast (W). The Coast colorway is reminiscent of UCLA Bruin school colors, prominently featuring light blue, white, and yellow. White and light blue leather comprise the upper of the Nike Dunk Low Coast (W), with white on the vamp and medial panels and light blue on the overlay and Swoosh. Hits of yellow are present in the Nike Air branding on the tongue and heel.',
	  'Nike', 100.00, 0.8, 'https://images.stockx.com/360/Nike-Dunk-Low-Coast/Images/Nike-Dunk-Low-Coast/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1634936766&h=384&q=57');

INSERT INTO product(id, name, description, brand, price, weight, img)
values(4, 'Nike Dunk Low Retro White Black Panda', 'From the school-spirited College Colors Program to the vibrant Nike CO.JP collection, Nike Dunks have seen many colorways since the design’s inception in 1985. But with each new colorway, the Dunk’s classic color-blocking has remained in some capacity. Nike put its timeless color-blocking to work with the Nike Dunk Low Retro White Black.',
	 'Nike', 110.00, 0.8, 'https://images.stockx.com/360/Nike-Dunk-Low-Retro-White-Black-2021/Images/Nike-Dunk-Low-Retro-White-Black-2021/Lv2/img01.jpg?fm=avif&auto=compress&w=480&dpr=2&updated_at=1644250003&h=320&q=75');

INSERT INTO product(id, name, description, brand, price, weight, img)
values(5, 'Crocs Classic Clog Lightning McQueen', 'The Crocs Classic Clog Lightning McQueen is an official collaboration with Disney Pixars Cars franchise. These Lightning McQueen Crocs pay homage to the movies lead character, who is voiced by Owen Wilson. The Crocs look is loosely based on the Chevrolet Corvette C1, a racing car produced between 1953 and 1962.',
	 'Crocs', 50.00, 0.4, 'https://images.stockx.com/360/Crocs-Classic-Clog-Lightning-McQueen/Images/Crocs-Classic-Clog-Lightning-McQueen/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1635308105&h=384&q=57');

INSERT INTO product(id, name, description, brand, price, weight, img)
values(6, 'Jordan 4 Retro Red Thunder', 'Following similar color blocking as the Air Jordan 4 Thunder, the Air Jordan 4 Red Thunder features an all-black Durabuck upper with red netted underlays and eyelets. On the tongue, a signature Air Jordan Flight patch is stitched. A vibrant red midsole and Jumpman heel tab complete the retro design.',
	 'Jordan', 190.00, 1.5, 'https://images.stockx.com/360/Air-Jordan-4-Retro-Red-Thunder/Images/Air-Jordan-4-Retro-Red-Thunder/Lv2/img01.jpg?fm=avif&auto=compress&w=576&dpr=1&updated_at=1641395120&h=384&q=57');


INSERT INTO product_categories_category VALUES(1, 9);
INSERT INTO product_categories_category VALUES(5, 9);
INSERT INTO product_categories_category VALUES(4, 9);
INSERT INTO product_categories_category VALUES(1, 5);
INSERT INTO product_categories_category VALUES(2, 5);
INSERT INTO product_categories_category VALUES(3, 5);
INSERT INTO product_categories_category VALUES(4, 6);
INSERT INTO product_categories_category VALUES(5, 6);
INSERT INTO product_categories_category VALUES(6, 6);
INSERT INTO product_categories_category VALUES(6, 3);
INSERT INTO product_categories_category VALUES(4, 3);
INSERT INTO product_categories_category VALUES(3, 3);
INSERT INTO product_categories_category VALUES(2, 2);
INSERT INTO product_categories_category VALUES(4, 2);
INSERT INTO product_categories_category VALUES(2, 10);


INSERT INTO "public".order VALUES(1, '21-12-2022', 'bobbob@gmail.com', 4, 'Bob', '579365412', 320.00);
INSERT INTO "public".order VALUES(2, '22-12-2022', 'shariaA563@gmail.com', 4, 'Sharia', '879365412', 220.00);

INSERT INTO "public".order VALUES(3, '23-12-2022', 'thomas123@gmail.com', 3, 'Thomas', '379365412', 50.00);
INSERT INTO "public".order VALUES(4, '24-12-2022', 'lili@gmail.com', 3, 'Lila', '279365412', 170.00);

INSERT INTO "public".order VALUES(5, '25-12-2022', 'rebeca321@gmail.com', 2, 'Rebeca', '979365412', 340.00);
INSERT INTO "public".order VALUES(6, '26-12-2022', 'noe@gmail.com', 2, 'Noe', '529365412', 190.00);

INSERT INTO "public".order VALUES(7, '27-12-2022', 'ania@gmail.com', 1, 'Ania', '679365412', 240.00);
INSERT INTO "public".order VALUES(8, '28-12-2022', 'damian@gmail.com', 1, 'Damian', '235365412', 160.00);

INSERT INTO "public".order_products_product VALUES(1, 2);
INSERT INTO "public".order_products_product VALUES(1, 3);

INSERT INTO "public".order_products_product VALUES(2, 2);

INSERT INTO "public".order_products_product VALUES(3, 5);

INSERT INTO "public".order_products_product VALUES(4, 1);

INSERT INTO "public".order_products_product VALUES(5, 3);
INSERT INTO "public".order_products_product VALUES(5, 5);
INSERT INTO "public".order_products_product VALUES(5, 6);

INSERT INTO "public".order_products_product VALUES(7, 6);
INSERT INTO "public".order_products_product VALUES(7, 5);

INSERT INTO "public".order_products_product VALUES(8, 4);
INSERT INTO "public".order_products_product VALUES(8, 5);