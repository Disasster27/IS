let productColorSelected = document.querySelector( ".product-color-selected" );
let productColorInfo = document.querySelector( ".product-color-info" );
productColorSelected.addEventListener( 'click', ( e ) => {
	productColorInfo.classList.toggle( "di-none" );
} );