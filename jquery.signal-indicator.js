;(function($){

	'use strict';

	var defaultOptions = {
		bars			: 4,
		barWidth		: 3,
		barSeparation	: 2,
		percentage		: 1,
	};

	var si = {};

	si.init = function(opts) {
		var options = $.extend(defaultOptions, opts);

		return this.each(function() {

			var $this = $(this);
			$this.attr('data-bar-width', options.barWidth);
			var width = $this.width();
			var height = $this.height();

			for(var i = 0; i < options.bars; i++) {

				$this.append(
					$('<div></div>')
					.addClass('bar bar-on bar' + ( i + 1 ))
					.height(height * ( ( i + 1 ) / options.bars ) + 'px')
					.width(options.barWidth + 'px')
					.css({
						'margin-right': options.barSeparation + 'px'
					})
				);

			}

		});
	};

	si.percentage = function(perc) {

		return this.each(function() {

			var
				$this = $(this),
				barWidth = $this.attr('data-bar-width'),
				$bars = $('.bar', $this),
				barsLen = $bars.length,
				barsOnLen = barsLen * perc,
				barsOnLenLow = Math.floor(barsOnLen),
				diff = 0;
			
			//remove class and subbar
			$bars.removeClass('bar-on bar-off').width(barWidth);

			for(var i = 0; i < barsOnLenLow; i++)
				$('.bar' + (i + 1), $this).addClass('bar-on');

			//we need to add a subbar to a bar to display the decimal
			if((diff = barsOnLen - barsOnLenLow) != 0) {

				var bar = $('.bar' + (i + 1), $this);

				bar.addClass('bar-on').width($this.attr('data-bar-width') * diff);
			}

		});
	};

	$.fn.signalIndicator = function(opts) {

		if ( si[opts] ) {
			return si[ opts ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof opts === 'object' || ! opts ) {
			// Default to "init"
			return si.init.apply( this, arguments );
		}

	};

})(jQuery);
