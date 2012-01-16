(function($) {
  var APIKey = 'toggleBar';

  $.fn.toggleBar = function(options) {
    if (options == 'api') {
      return this.data(APIKey);
    } else if(options == 'destroy'){
      this.data(APIKey).destroy();
      this.removeData(APIKey);
    } else{
      return this.each(function() {
        var $this = $(this);
        if ($.type(options) === "object") {
          var clazz = $.fn.toggleBar.classes.ToggleBar;
          new clazz($this, $.extend(true, {}, $.fn.toggleBar.defaults, clazz.defaults || {}, options, {rtl: $this.css('direction') == 'rtl'}));
        }
      });
    }
  };

  $.fn.toggleBar.apiKey = APIKey;
  $.fn.toggleBar.classes = {};

  $.fn.toggleBar.defaults = {
    radio: false,
    events: {},
    selectors: {
      button: '.bar_button'
    }
  };

})(jQuery);
