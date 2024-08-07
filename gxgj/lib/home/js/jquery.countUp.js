/*!
* jquery.countup.js 1.0.3
*
* Copyright 2016, Adri喔｀竵n Guerra Marrero http://agmstudio.io @AGMStudio_io
* Released under the MIT License
*
* Date: Oct 27, 2016
*/
(function( $ ){
  "use strict";

  $.fn.countUp = function( options ) {

    // Defaults
    var settings = $.extend({
        'time': 2000,
        'delay': 10
    }, options);

    return this.each(function(){

        // Store the object
        var $this = $(this);
        var $settings = settings;

        var counterUpper = function() {
            if(!$this.data('counterupTo')) {
                $this.data('counterupTo',$this.text());
            }
            var time = parseInt($this.data("counter-time")) > 0 ? parseInt($this.data("counter-time")) : $settings.time;
            var delay = parseInt($this.data("counter-delay")) > 0 ? parseInt($this.data("counter-delay")) : $settings.delay;
            var divisions = time / delay;
            var num = $this.data('counterupTo');
            var nums = [num];
            var isComma = /[0-9]+,[0-9]+/.test(num);
            num = num.replace(/,/g, '');
            var isInt = /^[0-9]+$/.test(num);
            var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
            var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

            // Generate list of incremental numbers to display
            for (var i = divisions; i >= 1; i--) {

                // Preserve as int if input was int
                var newNum = parseInt(Math.round(num / divisions * i));

                // Preserve float if input was float
                if (isFloat) {
                    newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                }

                // Preserve commas if input had commas
                if (isComma) {
                    while (/(\d+)(\d{3})/.test(newNum.toString())) {
                        newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                    }
                }

                nums.unshift(newNum);
            }

            $this.data('counterup-nums', nums);
            $this.text('0');

            // Updates the number until we're done
            var f = function() {
                if ($this.data('counterup-nums')) { //鍔犱釜杩欎釜鍒ゆ柇
                    $this.text($this.data('counterup-nums').shift());
                    if ($this.data('counterup-nums').length) {
                        setTimeout($this.data('counterup-func'), delay);
                    } else {
                        $this.data('counterup-nums');
                        $this.data('counterup-nums', null);
                        $this.data('counterup-func', null);
                    }
                }
            };
            $this.data('counterup-func', f);

            // Start the count up
            setTimeout($this.data('counterup-func'),delay);
        };

        // Perform counts when the element gets into view
        // 姣忔鍑鸿婊氬姩
        // $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
        // 鍙粴鍔ㄤ竴娆�
        var scrollBool = true;
        $(window).on('scroll', function() {
            if ($(window).height() + $(document).scrollTop() >= $this.offset().top && scrollBool) {
                scrollBool = false
                counterUpper();
                setTimeout(function(){
                    $(".counter-end").addClass('on');
                },settings.time);
            }
        });
    });

  };

})( jQuery );