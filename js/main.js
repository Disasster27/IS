let url = 'https://api.myjson.com/bins/19478a';

const productBox = document.querySelector( '.product-box' );

class List {
	constructor( url ){
		this.url = url;
		this.goods = [];
		this.addEvent();
	}

	addEvent() {
		return null;
	}

	getJson ( url ) {
		return fetch( url )
			.then( result => result.json() )
			.catch( error => {
				console.log( error );
			})
	}	

	collectData ( data ) {
		for ( let prop in data ) {
			data[prop].prop = prop;
			this.goods.push( data[prop] );
		};
		this.render();
		this.setDescription();
		this.cart.checkCart();
	}

	setDescription() {
		if ( getPathname ( 'Single_page.html' ) ) {
		let item = localStorage.getItem( 'article' );
		let prod = this.goods.find( el => el.prop === item );
		document.querySelector( '.name-item' ).textContent = prod.name;
		document.querySelector( '.about' ).textContent = prod.description;
		document.querySelector( '.price-item' ).textContent = `$ ${prod.price}`;
		document.querySelector( '.photo-slider' ).querySelector( 'IMG' ).setAttribute( 'src', prod.image );
		}
	}

	render () {
		for( let prop = 0; prop < this.count; prop++) {
			productBox.insertAdjacentHTML( 'beforeend', this.renderProduct(  this.goods[prop] ) ) };
	}
}

let article = null;

class ProductsList extends List {
	constructor( url, count, cart ){
		super( url )
		this.count = count;
		this.cart = cart;
		this.getJson( url ).then( data =>  this.collectData ( data ) );
	}

	addEvent() {
		productBox.addEventListener( 'click', e => {
			if ( e.target.closest('.item') ) {
				article = e.target.closest('.item').getAttribute( 'data-article' );
				localStorage.setItem( 'article', article );
				if ( e.target.classList.contains( 'add' ) ) {
					this.cart.setGoods( article, this.goods );
				}
			}
		} ) ;
	}

	renderProduct( el ) {
		return `<div class="item" data-article="${ el.prop }">
		<a href="Single_page.html" class="product">
			<img src="${ el.image }" alt="" class="item-img">
			<div class="named-footer">
				<p class="named">${ el.name }</p>
				<p class="prise rose-word">$ ${ el.price }</p>
			</div>
		</a>
		<div class="box-add">
			<div href="#" class="add"><img src="img/Forma%201%20copy.svg" alt="">Add to Cart</div>
		</div>
	</div>`;
	}
}


class CartList extends List {
	constructor() {
		super( url )
		this.cartProduct = {};
		this.priceTotal = 0;
		this.prodEl = [];
	}

	addEvent() {
		let cartUp = document.querySelector( '.cart-up' );
		cartUp.addEventListener( 'click', e => {
			if ( e.target.classList.contains( 'cart_del' ) ) {
				this.removeProduct( e.target );
			}
		}  );
	}

	setGoods( article, goods ) {
		this.goods = goods;
		this.addToCart( article ); 
	}

	renderCart( article ) {
		let prod = this.goods.find( el => el.prop === article );
		return `
		<div class="cart_product">
			<div class="cart_product-img">
				<a href="Single_page.html"><img src="${ prod.image }" alt="Product photo"></a>
			</div>
			<div class="cart_product-info">
				<p>${ prod.name }</p>
				<p>stars **</p>
				<p><span class="quantity">${ this.cartProduct[article] }</span>  x   <span>$ ${ prod.price }</span></p>
			</div>
			<div class="cart_del" data-id="${prod.prop}">
			
			</div>
		</div>`
	}

	removeProduct( element ) {
		let productId = +element.dataset['id'];
		for( let prod in this.cartProduct ){
			if ( prod == productId ) {
				if ( this.cartProduct[prod] > 1 ){
					this.cartProduct[prod]--;
					this.addQuantity(prod);
					this.minTotal(prod);
					localStorage.setItem( 'product', JSON.stringify( this.cartProduct ) );
				} else {
					delete this.cartProduct[prod];
					this.minTotal(prod);
					this.prodEl.splice( this.prodEl.indexOf(this.prodEl.find( el => el.prop === prod )), 1 );
					localStorage.setItem( 'productElem', JSON.stringify( this.prodEl ) );
					localStorage.setItem( 'product', JSON.stringify( this.cartProduct ) );
					document.querySelector( `[data-id="${productId}"]` ).closest('.cart_product').remove();
				}
			} 
		}
	}

	addToCart( article ) {
		let prod = this.goods.find( el => el.prop === article );
		if ( this.cartProduct[article] ) {
			this.cartProduct[article]++;
			this.addQuantity( article );
		} else {
			this.cartProduct[article] = 1;
			this.prodEl.push( prod );
			localStorage.setItem( 'productElem', JSON.stringify( this.prodEl ) );
			let cartUp = document.querySelector( '.cart-up' );
			cartUp.insertAdjacentHTML( 'beforeend', this.renderCart( article ) );
		}
		this.countTotal( prod )
		localStorage.setItem( 'product', JSON.stringify( this.cartProduct ) );
	}

	countTotal( prod ) {
		if ( !this.cartProduct.total ) {
			this.cartProduct.total = 0;
		};
		this.cartProduct.total += prod.price ;
		document.querySelector( '.price-total' ).textContent = `$ ${ this.cartProduct.total }`;
	}

	minTotal( article ) {
		let prod = this.goods.find( el => el.prop === article );
		this.cartProduct.total -= prod.price ;
		document.querySelector( '.price-total' ).textContent = `$ ${ this.cartProduct.total }`;
	}

	addQuantity( article ) {
		document.querySelector( `[data-id="${ article }"]` ).closest( '.cart_product' ).querySelector( ".quantity" ).textContent = this.cartProduct[article] ;
	}

	checkCart() {
		if ( JSON.parse( localStorage.getItem( 'product' ) ) ) {
			this.cartProduct = JSON.parse( localStorage.getItem( 'product' ) );
			this.prodEl = JSON.parse( localStorage.getItem( 'productElem' ) );
			this.goods = this.prodEl;
		}
		if ( this.cartProduct ) {
			for( let prop in this.cartProduct ) {
				let cartUp = document.querySelector( '.cart-up' );
				cartUp.insertAdjacentHTML( 'beforeend', this.renderCart( prop ) );
				document.querySelector( '.price-total' ).textContent = `$ ${ this.cartProduct.total }`;
			}
		}
	}
}

function getPathname ( path ) {
	let realPath = window.location.pathname;
	if ( realPath.split('/').lastIndexOf( path ) !== -1 ) {
		return true
	}
}

function givCount () {
	let cart = new CartList();
	if (  getPathname ( 'Single_page.html' ) ) {
		new ProductsList( url, 4, cart );
	} else if ( getPathname ( 'index.html' || '' ) ) {
		new ProductsList( url, 8, cart );
	} else if (  getPathname ( 'Product.html' ) ) { 
		new ProductsList( url, 9, cart );
	}  else {
		cart.checkCart()
	}
} 

givCount()
