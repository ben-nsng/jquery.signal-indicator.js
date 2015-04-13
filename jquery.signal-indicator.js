;(function($){

	'use strict';

	var defaultOptions = {
		bars			: 5,
		barWidth		: 3,
		barSeparation	: 2,
		percentage		: 1,
		classes: {
			default: 'bar-on',
			boundaries: [{
				min: 0,
				max: 0.45,
				class: 'bar-red'
			}]
		}
	};

	var si = {};
	var options = {};

	si.init = function(opts) {
		options = $.extend(defaultOptions, opts);

		return this.each(function() {

			var $this = $(this);
			$this.attr('data-bar-width', options.barWidth).attr('data-percentage', options.percentage);
			var width = $this.width();
			var height = $this.height();

			for(var i = 0; i < options.bars; i++) {

				$this.append(
					$('<div></div>')
					.addClass('bar ' + options.classes.default + ' bar' + ( i + 1 ))
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
		var classes = [];

		return this.each(function() {

			var
				$this = $(this),
				barWidth = $this.attr('data-bar-width'),
				currPerc = $this.attr('data-percentage'),
				$bars = $('.bar', $this),
				barsLen = $bars.length,
				barsOnLen = barsLen * perc,
				barsOnLenLow = Math.floor(barsOnLen),
				diff = 0,
				activeClass = options.classes.default;

			for(var i in options.classes.boundaries) {
				var boundary = options.classes.boundaries[i];
				if(boundary.min <= perc && perc < boundary.max)
					activeClass = boundary.class;
			}

			//set percentage
			
			//remove class and subbar
			$bars.removeClass('bar-on bar-off bar-red').width(barWidth);

			for(var i = 0; i < barsOnLenLow; i++)
				$('.bar' + (i + 1), $this).addClass(activeClass);

			//we need to add a subbar to a bar to display the decimal
			if((diff = barsOnLen - barsOnLenLow) != 0) {

				var bar = $('.bar' + (i + 1), $this);

				bar.addClass(activeClass).width($this.attr('data-bar-width') * diff);
			}

			//update the percentage
			$this.attr('data-percentage', perc);

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
