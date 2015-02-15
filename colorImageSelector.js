//http://cdn3.bigcommerce.com/r-0a0a8d1b7360352bf8b4ebebdd674726dd042734/javascript/product.attributes.js[1] ? line 268 or so
$.post("/remote.php", {action:"add", w: "getProductAttributeDetails", product_id:166}, function(response) {
        console.log(response.details.image);
    });


-------


	/**
	* This plugin implements behaviours applicable to all option types which can trigger sku / rule effects (change of
	* price, weight, image, etc.)
	*/
	$.fn.productOptionRuleCondition = function (options) {
		return this.each(function(){
			$(this)
				.addClass('productAttributeRuleCondition')
				.find(':input')
				.change(function(){
					// ask the server for any updated product information based on current options - can't use
					// ajaxSubmit here because it will try to send files too so use serializeArray and put our custom
					// 'w' parameter into it

                    // we want to enable out-of-stock notification for all 3 (product detail, quickview and cart) pages
                    // and for some historical reasons they all have different html structure
                    // (eg, cart page dosn't have #productDetailsAddToCartFrom form)
                    // therefore we need to find the correct form to serialize
                    // rather than doing massive template upgrades
                    var data = null;
                    if($('#productDetailsAddToCartForm').length) {
                        data = $('#productDetailsAddToCartForm').serializeArray();
                    } else {
                        data = $('.productAttributeList:first').closest('form').serializeArray();
                    }

					data.push({
						name: 'w',
						value: 'getProductAttributeDetails'
					});

					data = $.param(data);

					$.ajax({
						url: '/remote.php',
						type: 'POST',
						dataType: 'json',
						data: data,
						success: function (response) {
							if (response.success && response.details) {
                                if($('#ProductDetails').length) {
                                    $('#ProductDetails').updateProductDetails(response.details);
                                }
                                else {
                                    $('.productAttributeList:first').updateProductDetails(response.details);
                                }
							}
						}
					});
				});
		});
	};




------------


	            var colorSpan = $(".name:contains('Color')");
	            	console.log(colorSpan);
	            var	colorSwatchWrapper = colorSpan.closest('.productAttributeList');
	            	console.log(colorSwatchWrapper);
	            var	colorBoxesList = colorSpan.parents().eq(2).find('.productAttributeValue');
	            	console.log(colorBoxesList);
	            var colorBoxes = colorBoxesList.find('li');
	            	console.log(colorBoxes);
	            var prodColor = colorBoxes.find('.name').text();
	            	console.log(prodColor);
	            var colorProdPgBtn = colorBoxes.find('label')
	            	console.log(colorProdPgBtn); 
	            var imgContainer = $('.ProductThumbImage a');
	            	console.log(imgContainer); 
	            var selectedColorImgUrl = imgContainer.attr('href');
	            	console.log(selectedColorImgUrl); 

					colorProdPgBtn.eq(0).click();	            
	            var selectedColorImgUrl = imgContainer.attr('href');
	            	console.log(selectedColorImgUrl); 
					colorProdPgBtn.eq(1).click();	            
	            var selectedColorImgUrl = imgContainer.attr('href');
	            	console.log(selectedColorImgUrl); 
					colorProdPgBtn.eq(2).click();	            
	            var selectedColorImgUrl = imgContainer.attr('href');
	            	console.log(selectedColorImgUrl); 
					colorProdPgBtn.eq(3).click();	            
	            var selectedColorImgUrl = imgContainer.attr('href');
	            	console.log(selectedColorImgUrl); 


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