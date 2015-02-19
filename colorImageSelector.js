$(".withColorSwatch").each(function () {
	var productDiv = $(this).parent().parent();
	var productColorSwatch = productDiv.find('.catColorSwatch');
	var productName = productDiv.find('.pname').text();
	var images = [];
	var productId = productDiv.find('div.ProductImage').attr('data-product');
	
	// We can pull the color values from the DOM! :)
	var colors = [];
	productColorSwatch.find("input.validation").each(function() {
		colors.push({
			value: $(this).val(),
			name: $(this).parent().find("span.swatchColours").attr("title"),
			url: ''
		});
	});
	
	var queue = Array.prototype.concat.call(colors); // Make a copy of the array
	function poll(cb) {
		// Is queue finished ?
		if ( !queue.length ) {
			cb();
			return;
		}
	
		// Next color in queue
		var color = queue.pop();
		var attributeValue = productColorSwatch.find('.validation').attr('name').replace(/\D/g,'');
		var args = {action:"add", w: "getProductAttributeDetails", product_id:productId, attribute: []};
		args.attribute[attributeValue] = color.value;
		
		$.post("/remote.php", args, function(response) {
			if ( response && response.details && response.details.image ) {
				result[color.name] = response.details.image;
				color.url = response.details.image;
			}
			poll(cb); // Next in queue
		});

		var productImage = productDiv.find('.ProductImage a img');
		var colorSwatchBox = productColorSwatch.find('.validation[value=' + color.value + ']').parent().parent();
		var activeImage = productImage.attr('src');
	    colorSwatchBox.on({        
	            click: function (event) {
					productImage.attr('src', color.url);
					console.log(color.url);
					var activeImage = $(this).parents().eq(2).find('.ProductImage a img').attr('src');
					console.log(activeImage);
//					also set border and selected class
	            },
	            mouseenter: function (event) {
					productImage.attr('src', color.url);
	            },
	            mouseleave: function (event) {
					productImage.attr('src', activeImage);
	            }
	        }
	    );
	}
	
	poll(function() {
			console.log('Why do I need this?');
	});	
	
});
