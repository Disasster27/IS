let step = document.querySelector( ".step" );
step.addEventListener( 'click', (e) => {
	let stepInfo = document.querySelector( ".step-info" );
	stepInfo.classList.toggle( "di-none" );})
let hintComEl = document.querySelectorAll( ".hint-com-el" );
function tog ( el ) {
	el.addEventListener( 'click', ( e ) => {
		hintComEl.forEach( ( i ) => { if ( i.classList.contains( "selected" ) )  { i.classList.toggle( "selected" ) } } )
		el.classList.toggle( "selected" );
	} )
}
hintComEl.forEach( tog );