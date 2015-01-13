// Color Swatch and Size Boxes
	$(".Options").each(function checkForVideo(url) {
		var ProductCatOpt = $(this);
			ProductId = $(this).parent().parent().find('div.ProductImage').attr('data-product');
		function ajax1() {
		    return $.ajax('/content/Videos/'+ProductId+'.mp4')
			    .done(function() { 
			        ProductCatOpt.addClass('withVideo');
			    }).fail(function() { 
			    	return;
			    });
			}
			$.when(ajax1()).done(function(a1){
		        ProductCatOpt.closest('li').append('<span class="videoDemoBtn"><div class="triangle"></div></span>');
	        });
	    });


	$('.ProductList').on('click', '.videoDemoBtn', function () {
	        if ($(this).hasClass('videoPlaying')) {
	            $(this).removeClass('videoPlaying');
/* 	            $(this).parent().find('img').show(); */
	            $(this).parent().find('div.categoryDemoVideo').hide().html('');
	            }
	            else {
	                var ProductId = $(this).parent().find('div.ProductImage').attr('data-product');
	                $(this).addClass('videoPlaying');
/* 	                $(this).parent().find('img').hide();         */
	                $(this).parent().find('div.categoryDemoVideo').show().html(
	                	'<video id="demoVideo" class="video" preload autoplay loop autobuffer controls muted width="100%" height="100%" poster="/content/Videos/'+ProductId+'.jpg">'+
	                		'<source src="/content/Videos/'+ProductId+'.mp4">'+
	                		'<source src="/content/Videos/'+ProductId+'.ogv" type="video/ogg">'+
	                		'<p>Your browser does not support this video.  Please upgrade your browser!</p>'+
	                	'</video>');
	                        }
/*
                        	var video = document.getElementById('demoVideo');
							video.addEventListener('click',function(){
							  video.play();
							},false);
*/
	                });











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
