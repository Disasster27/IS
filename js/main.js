/*
let thumb ;
let rangeMax = document.querySelectorAll(".price_slider-max");
let span = document.getElementById( "iv" )
span.innerHTML=rangeMax[0].value;
rangeMax[0].oninput = qq;


function qq () {
	span.innerHTML=this.value;
//	console.log( span.innerHTML );
};



let inputs = document.querySelectorAll('.slide-container' );

inputs[0].addEventListener( "click", (e) => {
	console.log( e.target)
})



let ball = document.querySelector( ".range-min" );
*/


//ball.onmousedown = function(event) {
//

//let newX;
//
//ball.onmousedown = function(event) {
//	
//	let X = ball.getBoundingClientRect().left;
//	let shiftX = event.clientX - ball.getBoundingClientRect().left;
//	
//	console.log( X );
//	console.log( shiftX );
//  
////    ball.style.position = 'absolute';
////    ball.style.zIndex = 1000;
//	
//	
//    document.querySelector( ".price_slider-min" ).append(ball);
//  
//    moveAt(event.pageX);
//  
//    function moveAt(pageX) {
//        ball.style.left = pageX - X - shiftX +  'px';
//  	  	
//    }
//  
//    function onMouseMove(event) {
//  	  
//        moveAt(event.pageX);
//  	  
////  	    console.log( `${event.pageX}` );
//    }
//  
//    // (3) перемещать по экрану
//    document.addEventListener('mousemove', onMouseMove);
//  
//  
//    ball.onmouseup = function() {
//		newX = ball.style.left;
//  		console.log( newX );
//    	document.removeEventListener('mousemove', onMouseMove);
//        ball.onmouseup = null;
//    };
//  
//};


let step = document.querySelector( ".step" );
step.addEventListener( 'click', (e) => {
	let stepInfo = document.querySelector( ".step-info" );
	stepInfo.classList.toggle( "di-none" );
} )