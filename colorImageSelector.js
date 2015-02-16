$(".withColorSwatch").each(function () {
	var productDiv = $(this).parent().parent();
	var productColorSwatch = productDiv.find('.catColorSwatch');
	var productName = productDiv.find('.pname').text();
	var images = [];
	
	//var productId = $("input[name=product_id]").val();
	//var productId = $('div.ProductImage').attr('data-product');
	var productId = productDiv.find('div.ProductImage').attr('data-product');
	
	// We can pull the color values from the DOM! :)
	var allColorNumbers = [];
	var allColorNames = [];
	productColorSwatch.find("input.validation").each(function() {
	  allColorNumbers.push($(this).val());
	  allColorNames.push($(this).parent().find('.name').text());
	});
	
	
	var queue = Array.prototype.concat.call(allColorNumbers); // Make a copy of the array
	var currentColor = Array.prototype.concat.call(allColorNames);
	function poll(cb) {
	  // Is queue finished ?
	  if ( !queue.length ) {
	    cb();
	    return;
	  }
	
	  // Next color in queue
	  var colorNumber = queue.pop(); 
	  var colorName = currentColor.pop();
	  var attributeValue = productColorSwatch.find('.validation').attr('name').replace(/\D/g,'');
	  var args = {action:"add", w: "getProductAttributeDetails", product_id:productId, attribute: []};
	  args.attribute[attributeValue] = colorNumber;
	
	  console.log("Getting color #" + colorNumber, "-", colorName + ", for ***" + productName + "***");
	  $.post("/remote.php", args, function(response) {
	    if ( response && response.details && response.details.image ) {
	      console.log("Got", colorName, "image #" + colorNumber, "at URL", response.details.image, "for ***" + productName + "***");
	      images.push(response.details.image);
	    }
	    poll(cb); // Next in queue
	  });
	}
	
	poll(function() {
	  console.log("For", productName + ", these are all the images I found:", images);
	});
});

-----------------

var images = [];

var productId = $("input[name=product_id]").val();

// We can pull the color values from the DOM! :)
var allColorNumbers = [];
var allColorNames = [];
$("input.validation").each(function() {
  allColorNumbers.push($(this).val());
  allColorNames.push($(this).parent().find('.name').text());
});


var queue = Array.prototype.concat.call(allColorNumbers); // Make a copy of the array
var currentColor = Array.prototype.concat.call(allColorNames);
function poll(cb) {
  // Is queue finished ?
  if ( !queue.length ) {
    cb();
    return;
  }

  // Next color in queue
  var colorNumber = queue.pop(); 
  var colorName = currentColor.pop();
  var attributeValue = $('.validation').attr('name').replace(/\D/g,'');
  var args = {action:"add", w: "getProductAttributeDetails", product_id:productId, attribute: []};
  args.attribute[attributeValue] = colorNumber;

  console.log("Getting \"color\"", colorName);
  $.post("/remote.php", args, function(response) {
    if ( response && response.details && response.details.image ) {
      console.log("Got " + colorName + " image # " + colorNumber + " at URL " + response.details.image);
      images.push(response.details.image);
    }
    poll(cb); // Next in queue
  });
}

poll(function() {
  console.log("This is all the images I found", images);
});



----------




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

