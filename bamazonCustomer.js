var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bamazon_db',
  port: 3308

})

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  productList();
});
function productList(){
  var data = []
  //prints the items for sale and their details
  connection.query('SELECT * FROM products', function(err, data){
    if(err) throw err;
    console.log('')
    console.log('Welcome to Bamazon')
    console.log('--------------------------------------------------------------------------------------------------')
  
    for(var i = 0; i<data.length;i++){

  
      
      console.log("ID: " + data[i].item_id + " | " + "Product: " + data[i].product_name + " | " + "Department: " + data[i].department_name + " | " + "Price: " + data[i].price + " | " + "QTY: " + data[i].stock_quantity)
      /* console.log('--------------------------------------------------------------------------------------------------') */
    }
    promptUser();
  })
}

// ask user for item id and quantity
function promptUser() {

	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID of the item you wish to purchase',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'Please enter quantity',
			validate: validateInput,
			filter: Number
    }
  ])
  .then(function(input) {

  var item = input.item_id;
		var quantity = input.quantity;

    var check_db = 'SELECT * FROM products WHERE ?';

    connection.query(check_db, {item_id: item}, function(err, data) {
      if (err) throw err;
      
      if (data.length === 0) {
				console.log('Invalid Item ID. Please select a valid Item ID.');
				productList();

			} else {
        var productData = data[0];
        
        if (quantity <= productData.stock_quantity) {

          var update_db = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;


          connection.query(update_db, function(err, data) {
						if (err) throw err;

            console.log('Your total is $' + productData.price * quantity);
            console.log('Thank you for shopping with us!');
				// End the database connection
            //connection.end();
            productList();
					})
				} else {
          console.log('Sorry, the quantity you requested is not in stock.')
          console.log('Please modify your search and try again')
					productList();
				}
			}
		})
	})
}




  