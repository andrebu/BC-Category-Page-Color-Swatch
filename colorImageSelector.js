/*
for each li 
	color = find span color --- this.text
	url = find main prod image -- this.url
	category Swatch Color Button = matching color.url
end

on click 
*/
	

var colorBtnSrc = {};
	
$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').each( function getColorPhotosSrcs(){

	var listings = $(this);
		prodColor = $(this).find('.name').text();
	console.log(prodColor);
	$(this).find('label').click( function() {
		colorBtnSrc[prodColor] = $(document).find('.MagicZoomPlus').attr('href'); 		
console.log(prodColor + colorBtnSrc);
	});

})


//$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').removeClass('selectedValue').find('.radio span').removeClass('checked'); 
//$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).addClass('selectedValue').find('.radio span').addClass('checked'); 

$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).find('label').click();




