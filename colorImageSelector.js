/*
for each li 
	color = find span color --- this.text
	url = find main prod image -- this.url
	category Swatch Color Button = matching color.url
end

on click 
*/
	

var colorBtnSrc = {};
	
$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').each( function (){

	var listings = $(this);
		prodColor = $(this).find('.name').text();
	console.log(prodColor);

	$.when(
		$(this).find('label').click()
	)
	.then( function() {
		colorBtnSrc[prodColor] = $(document).find('.ProductThumbImage a').attr('href');
		console.log(colorBtnSrc[prodColor])		
	});
console.log(colorBtnSrc[prodColor])
})

//$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').removeClass('selectedValue').find('.radio span').removeClass('checked'); 
//$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).addClass('selectedValue').find('.radio span').addClass('checked'); 

$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).find('label').click();




