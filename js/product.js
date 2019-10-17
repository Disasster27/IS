let thumb ;
let rangeMax = document.querySelectorAll(".price_slider-max");
let span = document.getElementById( "iv" )
span.innerHTML=rangeMax[0].value;
rangeMax[0].oninput = obj;
function obj () {
	span.innerHTML=this.value;
};

let inputs = document.querySelectorAll('.slide-container' );
inputs[0].addEventListener( "click", (e) => {
	console.log( e.target)
let ball = document.querySelector( ".range-min" ); })