/**
 * @name		jQuery cvImageLoader Plugin
 * @author		Christopher Varakliotis
 * @version		1.0.1
 * @url			https://github.com/TheT0dd/cvImageLoader/blob/master/jquery.cvImageLoader.js
 * @licence		CC BY (http://creativecommons.org/licenses/by/3.0/)
 * 
 */

(function($, undefined) {
	
	$.fn.cvImageLoader = function(options) {
		
	    var opts = $.extend({}, $.fn.cvImageLoader.defaults, options);
	         
		// Find image elements inside the given context
		var imageElements = $(this).find('[style*="background-image"]');
		
		if(opts.clever) {
			imageElements = imageElements.not('.cv-loaded');
		}
		
		if(opts.filter) {
			imageElements = imageElements.filter(opts.filter);
		}
		
		if(opts.graceful) {
			imageElements.css({'visibility':'hidden', 'opacity':'0'});
		}
		
		var	imageCount = imageElements.length;
		
		// If images exist inside the context
		if(imageCount > 0) {
			
			var imagesLoaded = 0;
			
			// ...force browser to fetch them
			imageElements.each(function() {
				
				var currentImageElement = $(this);
				var src = currentImageElement.css('background-image').replace(/(^url\()|(\)$|[\"\'])/g, '');
				
				// For each image loaded
				$('<img/>').attr('src', src).load(function() {
					
					// ...mark it with the 'cv-loaded' class
					currentImageElement.addClass('cv-loaded');
					
					// If graceful presentation is on, show it with a fade in effect
					if(opts.graceful) {
						currentImageElement.css({'visibility':'visible'}).animate({'opacity':'1'}, opts.showDelay);
					}
					
					// If all images have been fetched
					if( ++imagesLoaded == imageCount && $.isFunction(opts.ready)) {
						// ...call given callback function
						opts.ready.call();
					}
				});
			});				
		}
		// If no images exist inside the context
		else if($.isFunction(opts.ready)) {
			
			// ...call given callback function
			opts.ready.call();			
		}	    
	};

	$.fn.cvImageLoader.defaults = {
		graceful: true,
		showDelay: 900,
		filter: false,
		ready: null,
		clever: true
	};	
	
})(jQuery);