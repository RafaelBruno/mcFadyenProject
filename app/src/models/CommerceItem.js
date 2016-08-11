/**
* @namespace CommerceItem
*/

function CommerceItem(product, quantity){
  this.id = new Date().getTime();
  this.product_id = product.id;
  this.quantity = quantity;
  this.amount = quantity * product.price;
}
