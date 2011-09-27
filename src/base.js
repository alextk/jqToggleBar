(function($) {

  $.fn.toggleBar = function(options) {
    if (options == 'api') {
      return this.data('toggleBar');
    } else if(options == 'destroy'){
      this.data('toggleBar').destroy();
      this.removeData('toggleBar');
    } else{
      return this.each(function() {
        var $this = $(this);
        if ($.type(options) === "object") {
          var clazz = $.fn.toggleBar.classes.ToggleBar;
          $this.data('toggleBar', new clazz($this, $.extend(true, {}, $.fn.toggleBar.defaults, clazz.defaults || {}, options, {rtl: $this.css('direction') == 'rtl'})));
        }
      });
    }
  };

  $.fn.toggleBar.classes = {};

  $.fn.toggleBar.defaults = {
    radio: false,
    events: {},
    selectors: {
      button: '.bar_button'
    }
  };

})(jQuery);