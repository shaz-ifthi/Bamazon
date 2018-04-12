CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
   item_id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
   product_name VARCHAR(50) NOT NULL,
   department_name VARCHAR(50) NOT NULL,
   price INTEGER(11) NOT NULL,
   stock_quantity INTEGER(11) NOT NULL
)

select * from products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9999, 'legos', 'toys', 7, 200);


