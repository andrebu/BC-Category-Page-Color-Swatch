/*
for each li 
	color = find span color --- this.text
	url = find main prod image -- this.url
	category Swatch Color Button = matching color.url
end

on click 
*/
	
	
$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').each( function getColorPhotosSrcs(){
//console.log(this); 
	// add .selectedValue class to li 
	$(this).addClass('selectedValue'); 
	// add .checked class to li 
	$(this).find('.radio span').addClass('checked'); 
//console.log(this);
	// find url of img when this li is checked and store it
	var colorImgSrc = $(document).find('.MagicZoomPlus img').attr('src'); 
console.log(colorImgSrc); 
//	console.log(this);
	$(this).removeClass('selectedValue'); 
	$(this).find('.radio span').removeClass('checked'); 
})


$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').removeClass('selectedValue').find('.radio span').removeClass('checked'); 
$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).addClass('selectedValue').find('.radio span').addClass('checked'); 

$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).find().click();