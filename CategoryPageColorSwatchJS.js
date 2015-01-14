/* try to combine this with category videos! */

// Swatches - Color and Size options swatches 
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


// Overlays - True/False Size and Color Options
/*
	$(".Options").each(function checkForColorSwatch(url) {
		var productListing = $(this); 
			productLink = $(this).parent().parent().find('div.ProductImage a').attr('href'); 
		function ajax2() {
		    return $.ajax({
			            url: productLink,
			            type: 'GET',
			            dataType: 'html',
			            async: false,
			            success: function(data) {
			                result = data;
			            }
			        })
			    .done(function() { 
			    	if($(result).find( "span:contains('Color:')" ).length) {
				        productListing.addClass('withColorOptions');
				        }
			    	if($(result).find( "span:contains('Size:')" ).length) {
				        productListing.addClass('withSizeOptions');
				        }				     
			    }).fail(function() { 
			    	return;
			    });
			}
			$.when(ajax2()).done(function(a2){
				if($(productListing).hasClass('withColorOptions')){
			        productListing.closest('li')
			        	.append('<div class="colorOptionsContainer"> \
						            <div class="colorOptionsOverlay"> \
						                <span> \
						                    Available In Multiple Colors \
						                </span> \
						            </div> \
						        </div>')};
				if($(productListing).hasClass('withSizeOptions')){
			        productListing.closest('li')
			        	.append('<div class="sizeOptionsContainer"> \
						            <div class="sizeOptionsOverlay"> \
						                <span> \
						                    Available In Multiple Sizes \
						                </span> \
						            </div> \
						        </div>')};
//				if($(productListing).hasClass('withVideo')){
//			        };
	        });
	    });
*/
