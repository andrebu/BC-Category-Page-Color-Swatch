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
