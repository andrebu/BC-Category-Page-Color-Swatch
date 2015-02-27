    $('<style type="text/css">\
			/* Color and Size Options on Category Pages */\
			/*.catSizeSwatch {\
				display: none;\
			}*/\
			.catColorSwatch {\
				display: inline-block;\
			}\
			.catColorSwatch li {\
				padding: 0 4px;\
			}\
			.catColorSwatch .swatchOneColour .validation,\
			.catColorSwatch .swatchOneColour .name,\
			.catSizeSwatch .validation/*,\
			.catSizeSwatch .name*/ {\
				display: none;\
			}\
			.catColorSwatch li .validation {\
				display: none;\
			}\
			.catColorSwatch .swatchColour {\
				display: inline-block;\
				width: 17px !important;\
				height: 17px !important;\
				border: 1px solid #fff;\
			}\
			.catColorSwatch li,\
			.catColorSwatch li.swatch.swatchOneColour {\
				display: inline-block;\
				float: left;\
				width: auto !important;\
				padding: 0;\
				border: 1px solid #d5d5d5;\
				margin: 5px 4px 1px 1px;\
			}\
			.catColorSwatch li.swatch.swatchOneColour.selectedColorBox {\
				padding: 0;\
			}\
			.catColorSwatch li label {\
				margin: 0;\
				line-height: normal;\
			}\
			.catColorSwatch li.swatch.swatchOneColour label span.swatchColours.swatchOneColour {\
				line-height: inherit;\
			}\
			.catColorSwatch .name {\
				line-height: 19px;\
				padding: 0 4px;\
			}\
			.catSizeSwatch {\
				background-size: auto 100%;\
				position: absolute;\
				top: 253px;\
				right: 0px;\
				padding: 3px 0;\
				width: 45px;\
			}\
			.catSizeSwatch .list-horizontal {\
				margin: 0;\
			}\
			.catSizeSwatch .list-horizontal .option {\
				display: inline-block;\
				width: 45px;\
				padding: 0;\
				background: none;\
			}\
			.catSizeSwatch .list-horizontal .option label {\
				margin: 0;\
			}\
			.catSizeSwatch .list-horizontal .option label .name {\
			    font-weight: bold;\
			    color: black;\
			    display: block;\
			    font-size: 8px;\
			}\
			.sizeOptionsOverlay {\
				/* background: url("%%ASSET_images/JointSizesL.png%%") center center no-repeat; */\
				background-size: auto 100%;\
				position: absolute;\
				top: 253px;\
				right: 0px;\
				padding: 3px 0;\
				width: 45px;\
			}\
			.catSizeSwatch .jointTitle,\
			.sizeOptionsOverlay .jointTitle {\
			    font-weight: bold;\
				display: inline-block;\
			    line-height: 9px;\
			    font-size: 8px;\
			}\
			.sizeOptionsOverlay .jointSize {\
			    display: inline-block;\
			    text-align: center;\
			    color: #BBB;\
			    vertical-align: bottom;\
			}\
			.catSizeSwatch img,\
			.sizeOptionsOverlay .jointSize img {\
			    width: 14px;\
			    display: block;\
			    margin: 0 auto;\
			}\
			.sizeOptionsOverlay .jointSize span {\
			    font-weight: bold;\
			    color: black;\
			    display: block;\
			    font-size: 8px;\
			}\
			.sizeOptionsOverlay .jointSize i {\
			    display: block;\
			}\
			.catSizeSwatch img.small,\
			.sizeOptionsOverlay .jointSize.small img {\
			    width: 10px;\
			}\
			.catSizeSwatch img.big,\
			.sizeOptionsOverlay .jointSize.big img {\
			    width: 18px;\
			}\
			</style>')
        .appendTo('head');
    jQuery.expr[':'].icontains = function(a, i, m) {
	  return jQuery(a).text().toUpperCase()
	      .indexOf(m[3].toUpperCase()) >= 0;
	};   
    /* try to combine this with category videos! */
    $(document).ready(function() {
        // Swatches - Color and Size options swatches 
        $(".Options").each(function checkForOptionSwatches(url) {
            var productListing = $(this).closest('em.p-price').html();
            var productLink = $(this).parent().parent().find('div.ProductImage a').attr('href');
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
                    var $productPageProcessing = $(productPage).find('.productAttributeList');
                    var jointSizeAndGender = $(productPage).find('.JointSizeHeightContainer .Label:icontains("Joint Type:")').parent().find('.Value').text();
                    var maleOrFemale = $.trim(jointSizeAndGender).split(' ')[1];
                    var colorSwatch = $productPageProcessing.find("span:icontains('Color')").parents().eq(2).find('.productAttributeValue div').html();
                    var sizeSwatch = $productPageProcessing.find("span:icontains('Size')").parents().eq(2).find('.productAttributeValue div').html();
                    var sizeOptionsOverlay = '<div class="catSizeSwatch optionSwatch"><span class="jointTitle">Fits these joint sizes:</span>' + sizeSwatch + '</div>';
                    if (colorSwatch != null) {
                        $this.parent().parent().find('.ProductDetails').before('<div class="catColorSwatch optionSwatch">' + colorSwatch + '</div>');
                        $this.addClass('withColorSwatch');
                        // Color swatch clickability Starts here
                        $(".withColorSwatch").each(function() {
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
                                if (!queue.length) {
                                    cb();
                                    return;
                                }

                                // Next color in queue
                                var color = queue.pop();
                                var attributeValue = productColorSwatch.find('.validation').attr('name').replace(/\D/g, '');
                                var args = {
                                    action: "add",
                                    w: "getProductAttributeDetails",
                                    product_id: productId,
                                    attribute: []
                                };
                                args.attribute[attributeValue] = color.value;

                                $.post("/remote.php", args, function(response) {
                                    if (response && response.details && response.details.image) {
                                        result[color.name] = response.details.image;
                                        color.url = response.details.image;
                                    }
                                    poll(cb); // Next in queue
                                });

                                var productImage = productDiv.find('.ProductImage a img');
                                var colorSwatchBox = productColorSwatch.find('.validation[value=' + color.value + ']').parent().parent();
                                var activeImage = productImage.attr('src');
                                productImage.attr('data-original', activeImage);
                                var originalImage = productImage.attr('data-original');
                                colorSwatchBox.on({
                                    mouseenter: function(event) {
                                        originalImage = $(this).parents().eq(2).find('.ProductImage a img').attr('data-original');
                                        $(this).parents().eq(2).find('.ProductImage a img').attr('src', color.url);
                                        if (!$(this).hasClass('selectedColorBox')) {
                                            $(this).css({
                                                'border': '2px solid #666',
                                                'margin': '4px 3px 0 0'
                                            });
                                        }
                                    },
                                    mouseleave: function(event) {
                                        if (!$(this).hasClass('selectedColorBox')) {
                                            $(this).css({
                                                'border': '1px solid #d5d5d5',
                                                'margin': '5px 4px 1px 1px'
                                            });
                                            //productImage.attr('src', activeImage);
                                            $(this).parents().eq(2).find('.ProductImage a img').attr('src', originalImage);
                                        }
                                    },
                                    click: function(event) {
                                        $(this).parent().find('li').removeClass('selectedColorBox');
                                        $(this).addClass('selectedColorBox');
                                        $(this).parents().eq(2).find('.ProductImage a img').attr('src', color.url);
                                        $(this).parents().eq(2).find('.ProductImage a img').attr('data-original', color.url);
                                        $(this).parent().find('li').css({
                                            'border': '1px solid #d5d5d5',
                                            'margin': '5px 4px 1px 1px'
                                        });
                                        $(this).css({
                                            'border': '2px solid #39b54a',
                                            'margin': '4px 3px 0 0'
                                        });
                                        //activeImage = $(this).parents().eq(2).find('.ProductImage a img').attr('src');
                                    }
                                });
                            }

                            poll(function() {
                                console.log('Why do I need this?');
                            });

                        });
                        // Color swatch clickability ends here
                    };
                    if (sizeSwatch != null) {
	                    var thisProductListing = $this.parent().parent();
	                    if (maleOrFemale == 'Female') {
	                        thisProductListing.find('.ProductDetails').before(sizeOptionsOverlay);
	                        thisProductListing.find('.name:icontains("10mm")').after('<img class="small" src="%%ASSET_images/malejoint.png%%" />');
	                        thisProductListing.find('.name:icontains("14mm")').after('<img src="%%ASSET_images/malejoint.png%%" />');
	                        thisProductListing.find('.name:icontains("18mm")').after('<img class="big" src="%%ASSET_images/malejoint.png%%" />');
	                    };
	                    if (maleOrFemale == 'Male') {
	                        thisProductListing.find('.ProductDetails').before(sizeOptionsOverlay);
	                        thisProductListing.find('.name:icontains("10mm")').after('<img class="small" src="%%ASSET_images/femalejoint.png%%" />');
	                        thisProductListing.find('.name:icontains("14mm")').after('<img src="%%ASSET_images/femalejoint.png%%" />');
	                        thisProductListing.find('.name:icontains("18mm")').after('<img class="big" src="%%ASSET_images/femalejoint.png%%" />');
	                    };
                    };
                }).fail(function() {
                    return;
                });
        });

    });