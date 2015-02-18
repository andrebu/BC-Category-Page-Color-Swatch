$(".withColorSwatch").each(function () {
	var productDiv = $(this).parent().parent();
	var productColorSwatch = productDiv.find('.catColorSwatch');
	var productName = productDiv.find('.pname').text();
	var images = [];
	
	//var productId = $("input[name=product_id]").val();
	//var productId = $('div.ProductImage').attr('data-product');
	var productId = productDiv.find('div.ProductImage').attr('data-product');
	
	// We can pull the color values from the DOM! :)
	//var allColorNumbers = [];
	//var allColorNames = [];
	var colors = [];
	productColorSwatch.find("input.validation").each(function() {
		colors.push({
			value: $(this).val(),
			name: $(this).parent().find("span.swatchColours").attr("title"),
			url: ''
      //allColorNumbers.push($(this).val());
	  //allColorNames.push($(this).parent().find('.name').text());
		});
	});
		//console.log(colors);
	
	
	var queue = Array.prototype.concat.call(colors); // Make a copy of the array
	//var currentColor = Array.prototype.concat.call(allColorNames);
	function poll(cb) {
	  // Is queue finished ?
	  if ( !queue.length ) {
	    cb();
	    return;
	  }
	
	  // Next color in queue
	  var color = queue.pop();
	  //var colorNumber = queue.pop(); 
	  //var colorName = currentColor.pop();
	  var attributeValue = productColorSwatch.find('.validation').attr('name').replace(/\D/g,'');
	  var args = {action:"add", w: "getProductAttributeDetails", product_id:productId, attribute: []};
	  //console.log('color value is ' + color.value);
	  args.attribute[attributeValue] = color.value;
	
	  //console.log("Getting color #" + colorNumber, "-", colorName + ", for ***" + productName + "***");
	  //console.log("Getting \"color\"", color);
	  $.post("/remote.php", args, function(response) {
	    if ( response && response.details && response.details.image ) {
	      //console.log("Got", colorName, "image #" + colorNumber, "at URL", response.details.image, "for ***" + productName + "***");
	      //images.push(response.details.image);
	      //console.log("Got image", response.details.image);
	      result[color.name] = response.details.image;
	      color.url = response.details.image;
	    }
	    //console.log("result color name is ----", color.name);
		console.log(productName, color, color.url);
	    poll(cb); // Next in queue
	  });
	}
	
	poll(function() {
		//console.log("For", productName + ", these are all the images I found:", images);
		console.log("I am finished");
		//console.log("this is the result", result);
	});
	
	var productImage = this links product image;
	$(color swatch link color boxes).click({
		this-number-product change productImage to color.url;
	})
	
});
