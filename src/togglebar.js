(function($) {

  /**
   * Progress bar class api
   */
  var ToggleBarClass = function() {
    this.initialize.apply(this, arguments);
  };

  $.extend(ToggleBarClass.prototype, {

    initialize: function(target, options) {
      this.options = options;
      this.el = target;
      this.items = $(options.selectors.button, this.el);

      this._initClasses();
      this._initEvents();
    },

    getItems: function(){
      return this.items;
    },

    hasSelected: function(){
      return this.getSelected().length > 0;
    },

    getSelected: function(){
      return this.getItems().filter('.selected');
    },

    changeItemsSelection: function(func){
      var changed = false;
      this.items.each(function(){
        var selected = func($(this));
        if(selected != $(this).hasClass('selected')) changed = true;
        $(this).toggleClass('selected', selected);
      });
      if(changed) this.el.trigger('selectionChanged');
    },

    selectItemAt: function(index){
      if(index < 0 || index >= this.items.length) return;
      var item = this.items.eq(index);
      if(this.options.radio) {
        if(item.hasClass('selected')) return; //the item is already selected, no need to reselect it
        this.items.removeClass('selected');
      }
      item.toggleClass('selected');
      this.el.trigger('selectionChanged');
    },

    _initClasses: function(){
      this.el.addClass('togglebar');
      this.items.first().addClass('first');
      this.items.last().addClass('last');
    },

    _initEvents: function(){
      var self = this;
      this.items.click(function(){
        self.selectItemAt($(this).index());
      });
    }

  });

  ToggleBarClass.defaults = {

  };

  $.fn.toggleBar.classes.ToggleBar = ToggleBarClass;

})(jQuery);