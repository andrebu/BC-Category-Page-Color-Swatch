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
	            colorBtnSrc = {};

	            var FunctionOne = $productPageProcessing.each(function() {

	                var listings = $(this);
	                prodColor = $(this).find('.name').text();
	                console.log(prodColor);

	                $(this).find('label').click();
	            });

	            var FunctionTwo = function() {
	                colorBtnSrc[prodColor] = $(this).parents().find('.ProductThumbImage a').attr('href');
	                console.log(colorBtnSrc[prodColor]);
	            };
	            console.log(colorBtnSrc[prodColor])

	            FunctionOne().done(FunctionTwo);

	        }).fail(function() {
	            return;
	        });
	});