	            var colorSpan = $(".name:contains('Color')");
	            	console.log(colorSpan);
	            var	colorSwatchWrapper = colorSpan.parents().eq(2).find('.productAttributeValue');
	            	console.log(attrValueRow);
	            var colorBoxes = colorSwatchWrapper.find('li');
	            	console.log(colorBoxes);
	            


	            var $productPageProcessing = $(productPage).find("span:contains('Color')").parents().eq(2).find('.productAttributeValue li');
	            var colorBtnSrc = {};

	            var clickTheSwatch = $productPageProcessing.each(function() {
	                var r = $.Deferred();
	                var listings = $(this);
	                prodColor = $(this).find('.name').text();
	                console.log(prodColor);

	                $(this).find('label').click();
	                return r;
	            });

	            var storeImgSrc = function() {
	                colorBtnSrc[prodColor] = $(this).parents().find('.ProductThumbImage a').attr('href');
	                console.log(colorBtnSrc[prodColor]);
	            };
	            console.log(colorBtnSrc[prodColor]);

	            clickTheSwatch().done(storeImgSrc);


/*
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
	            var $productPageProcessing = $(productPage).find("span:contains('Color')").parents().eq(2).find('.productAttributeValue li');
	            var colorBtnSrc = {};

	            var clickTheSwatch = $productPageProcessing.each(function() {
	                var r = $.Deferred();
	                var listings = $(this);
	                prodColor = $(this).find('.name').text();
	                console.log(prodColor);

	                $(this).find('label').click();
	                return r;
	            });

	            var storeImgSrc = function() {
	                colorBtnSrc[prodColor] = $(this).parents().find('.ProductThumbImage a').attr('href');
	                console.log(colorBtnSrc[prodColor]);
	            };
	            console.log(colorBtnSrc[prodColor]);

	            clickTheSwatch().done(storeImgSrc);

	        }).fail(function() {
	            return;
	        });
	});
*/