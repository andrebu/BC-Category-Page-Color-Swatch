/* try to combine this with category videos! */
// Swatches - Color and Size options swatches 
	$(".Options").each(function checkForColorSwatch() {
		var productListing = $(this).closest('em.p-price').html() ;
			productLink = $(this).parent().parent().find('div.ProductImage a').attr('href');
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
				$productPageProcessing = $( productPage ).find('.productAttributeList');				
				colorSwatch = $productPageProcessing.find( "span:contains('Color')" ).parents().eq(2).find('.productAttributeValue div').html();
				sizeSwatch = $productPageProcessing.find( "span:contains('Size')" ).parents().eq(2).find('.productAttributeValue div').html();
//				colorSwatch = $productPageProcessing.find('.productOptionPickListSwatch').html() ;
//				sizeSwatch = $productPageProcessing.find('.productOptionViewRectangle').html() ;
//				colorSwatch = $productPageProcessing.find( "span:contains('Color')" ).closest('.productAttributeValue').html() ;
//				sizeSwatch = $productPageProcessing.find( "span:contains('Size')" ).closest('.productAttributeValue').html() ;
				if(colorSwatch != null) {
					$(this).parent().parent().find('em.p-price').before('<div class="catColorSwatch optionSwatch">'+colorSwatch+'</div>');
					};
				if(sizeSwatch != null) {
					$(this).parent().parent().find('em.p-price').before('<div class="catSizeSwatch optionSwatch">'+sizeSwatch+'</div>');
					};
	    });
</script>

<!--
<script language="javascript" type="text/javascript">
// Overlays - True/False Size and Color Options
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
	    
