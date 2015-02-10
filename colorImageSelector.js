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
		colorBtnSrc[prodColor] = $(this).parents().find('.ProductThumbImage a').attr('href');
console.log(colorBtnSrc[prodColor])		
	});
console.log(colorBtnSrc[prodColor])
})

//$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').removeClass('selectedValue').find('.radio span').removeClass('checked'); 
//$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).addClass('selectedValue').find('.radio span').addClass('checked'); 

$("span:contains('Color')").parents().eq(2).find('.productAttributeValue li').eq(2).find('label').click();





	$(".Options").each(function checkForOptionSwatches(url) {
	    var productListing = $(this).closest('em.p-price').html();
	    productLink = $(this).parent().parent().find('div.ProductImage a').attr('href');
	    var $this = $(this);

	    function getOptionSwatches() {
	        return $.ajax({
	            url: productLink,
	            type: 'GET',
	            dataType: 'html',
	            //async: false
	        });
	    }
	    getOptionSwatches()
	        .done(function(data) {

	            result = data;
	            var productPage = result;
	            $productPageProcessing = $(productPage).find("span:contains('Color')").parents().eq(2).find('.productAttributeValue li');

	            var colorBtnSrc = {};

	            $productPageProcessing.each(function() {

	                var listings = $(this);
	                prodColor = $(this).find('.name').text();
	                console.log(prodColor);

	                $.when(
	                        $(this).find('label').click()
	                    )
	                    .then(function() {
	                        colorBtnSrc[prodColor] = $(this).parents().find('.ProductThumbImage a').attr('href');
	                        console.log(colorBtnSrc[prodColor])
	                    });
	                console.log(colorBtnSrc[prodColor])
	            })

	        }).fail(function() {
	            return;
	        });
	});


