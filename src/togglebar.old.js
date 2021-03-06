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

    isSelected: function(item){
      return item.hasClass('selected');
    },

    hasSelected: function(){
      return this.getSelected().length > 0;
    },

    getSelected: function(){
      return this.getItems().filter('.selected');
    },

    getSelectedValue: function(){
      var selected = this.getSelected();
      return selected.first() ? selected.first().data('value') : null;
    },

    /**
     * Return hash of items selection. By default:
     *  The key by will be the item's value
     *  The value will be selection state (boolean)
     *
     * If key transformator function is given, the key will be what the function has returned.
     * If value transformator function is given, the value will be what the function has returned.
     */
    getSelectionHash: function(options){
      var self = this;

      options = $.extend({}, {keyFunc: function(item){ return item.data('value'); }, valueFunc: function(item){ return self.isSelected(item) } }, options || {});
      var hash = {};
      this.items.each(function(){
        var item = $(this);
        hash[options.keyFunc(item)] = options.valueFunc(item);
      });
      return hash;
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
      this.el.addClass('togglebar').toggleClass('rtl', this.options.rtl);
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