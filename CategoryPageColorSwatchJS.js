/* 	Existance checker function */
/*
	$.fn.exists = function(callback) {
		var args = [].slice.call(arguments, 1);
		if (this.length) {
			callback.call(this, args);
		}
		return this;
	};
*/

/* 	Using ECF to check for Video Option Trigger, hiding it, and adding buttons */
/*
	$(function () {
		$("span:contains('HasDemoVideo')").exists(function() {
			$(this).closest('.productAttributeRow').hide();
			var ProductThumb = $('.ProductThumb');
				ProductTinyImageList = $('.ProductTinyImageList ul');
			ProductThumb.append('<span id="videoDemoBtn" class=""><div class="triangle"></div></span>');
			ProductTinyImageList.append('<li id="videoDemoThumb" class="" style="height:%%GLOBAL_ProductTinyBoxHeight%%px; width:%%GLOBAL_ProductTinyBoxWidth%%px;"><div class="ProdVideoPlayBtn"><div class="triangle"></div></div></li>');
			});    
		});
*/






/*
	$(".Options").each(function checkForColorSwatch(url) {
		var productListing = $(this).closest('em.p-price');
			    console.log(productListing);
			productLink = $(this).parent().parent().find('div.ProductImage a').attr('href');
			    console.log(productLink);
		function ajax2() {
	    return $.ajax({
				url: productLink,
				success: function(swatch) {
				    swatch = $(swatch).find("span:contains('Color')");
//				    $(productListing).before(swatch);
				    alert('Done.');
				 }
				});
			}
			$.when(ajax2()).done(function(a2){
				    $(productListing).before(swatch);
	        });
	    });
*/



	$(".Options").each(function checkForColorSwatch(url) {
		var productListing = $(this).closest('em.p-price');
			    console.log(productListing);
			productLink = $(this).parent().parent().find('div.ProductImage a').attr('href');
			    console.log(productLink);

				var colorSwatchStore = (function(){
				    var colorSwatch;
				
				    $.ajax({
				      type: "GET",
				      url: productLink,
				      dataType: "html",
				      success : function(data) {
				                    colorSwatch = $(data).("span:contains('Color')");
				                }
				    });
							    console.log(colorSwatch);

				    return {getColorSwatch : function()
				    {
				        if (colorSwatch) return colorSwatch;
				        // else show some error that it isn't loaded yet;
				    }};
				})();

				$(productListing).before(colorSwatchStore.getColorSwatch());

	    });









	$(".Options").each(function checkForColorSwatch(url) {
		var productListing = $(this).closest('em.p-price');
// console.log(productListing);
			productLink = $(this).parent().parent().find('div.ProductImage a').attr('href');
// console.log(productLink);

			$.extend({
			    getValues: function(url) {
			        var result = null;
			        $.ajax({
			            url: productLink,
			            type: 'GET',
			            dataType: 'html',
			            async: false,
			            success: function(data) {
			                result = data;
			            }
			        });
			       return result;
			    }
			});

//			Then to access it, create the variable like so:
			
			var results = $.getValues("url string");
//console.log(results);
			    colorSwatch = $(results).find("span:contains('Color')");
console.log(colorSwatch);
				$(results).closest('.productAttributeRow').before(productListing);

	    });




// latest js for actual color swatch on page
// Are commits on branches recorded in the commit log and count?
	$(".Options").each(function checkForColorSwatch() {
		var productListing = $(this).closest('em.p-price').html() ;
// console.log(productListing);
			productLink = $(this).parent().parent().find('div.ProductImage a').attr('href');
// console.log(productLink);

			$.extend({
			    getValues: function(productLink) {
			        var result = null;
			        $.ajax({
			            url: productLink,
			            type: 'GET',
			            dataType: 'html',
			            async: false,
			            success: function(data) {
			                result = data;
			            }
			        });
			       return result;
			    }
			});

			var productPage = $.getValues(productLink);
				$productPageProcessing = $( productPage );
//				colorSwatch = $productPageProcessing.find( "span:contains('Color')" ).closest('.productAttributeRow').html() ;
				colorSwatch = $productPageProcessing.find('.productOptionPickListSwatch').html() ;
//console.log(colorSwatch);
//console.log(colorSwatchExistence);
//console.log(this);
                $(this).parent().parent().find('.ProductImage').append('<div class="catColorSwatch">'+colorSwatch+'</div>');

	    });








/*
		function ajax1() {
		    return $.ajax(productLink)
			    .done(function() { 
			        $(ProductCatOpt).addClass('withVideo');
			    }).fail(function() { 
			    	return;
			    });
			}
			$.when(ajax1()).done(function(a1){
		        $('.withVideo').closest('li').append('<span class="videoDemoBtn"><div class="triangle"></div></span>');
	        });
*/
