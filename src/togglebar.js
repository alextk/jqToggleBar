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
      this.selectors = {
        inputs: 'input:' + (options.radio ? 'radio' : 'checkbox')
      };
      this.items = $(options.selectors.button, this.el);

      this._initClasses();
      this._initEvents();
    },

    changeInputsSelection: function(func){
      var self = this;
      var changed = false;
      this.inputs().each(function(){
        var input = $(this);
        var selected = func(input);
        if(selected != self.isInputSelected(input)) changed = true;
        if(selected){
          input.attr('checked', 'checked');
        } else {
          input.removeAttr('checked');
        }
        self._syncLabelSelection(input);
      });
      if(changed) this.el.trigger('selectionChanged');
    },

    name: function(){
      return this.inputs().first().attr('name');
    },

    inputs: function(){
      return this.el.find(this.selectors.inputs);
    },

    selectedInputs: function(){
      return this.inputs().filter(":checked");
    },

    hasSelected: function(){
      return this.selectedInputs().length > 0;
    },

    labelFor: function(input){
      var id = input.attr('id');
      return this.el.find('label[for='+id+']');
    },

    isInputSelected: function(input){
      return input.is(':checked');
    },

    //this method works for radio togglebar. for checkbox toggle bar, it sets/gets the first input
    //if no parameters is passed --> returns currently selected value
    //if parameter is passed --> changes the selected value to given value. if value is not found, exception is raised
    selectedValue: function(newValue){
      if(arguments.length == 0){ //getter
        var selectedInputs = this.selectedInputs();
        return selectedInputs.length > 0 ? selectedInputs.first().val() : null;
      } else { //setter
        var input = this.inputs().filter('[value='+newValue+']');
        if(input.length == 0) throw 'No input found with value: ' + newValue;
        input.attr('checked', 'checked');
        this._onInputSelectionChanged();
        return this;
      }
    },

    /**
     * Return hash of items selection. By default:
     *  The key by will be the item's value
     *  The value will be selection state (boolean)
     *
     * If key transformator function is given, the key will be what the function has returned.
     * If value transformator function is given, the value will be what the function has returned.
     */
    selectionHash: function(options){
      var self = this;

      options = $.extend({}, {keyFunc: function(input){ return input.val(); }, valueFunc: function(input){ return self.isInputSelected(input) } }, options || {});
      var hash = {};
      this.inputs().each(function(){
        var item = $(this);
        hash[options.keyFunc(item)] = options.valueFunc(item);
      });
      return hash;
    },

    _onInputSelectionChanged: function(){
      var self = this;
      this.inputs().each(function(){
        self._syncLabelSelection($(this));
      });
      this.el.trigger('selectionChanged');
    },

    _syncLabelSelection: function(input){
      var label = this.labelFor(input);
      label.toggleClass('selected', this.isInputSelected(input));
    },

    _initClasses: function(){
      this.el.addClass('togglebar').toggleClass('rtl', this.options.rtl);
      this.items.first().addClass('first');
      this.items.last().addClass('last');

      var inputs = this.inputs();
      this.labelFor(inputs.first()).addClass('first');
      this.labelFor(inputs.last()).addClass('last');
      this._onInputSelectionChanged();
    },

    _initEvents: function(){
      var self = this;
      this.items.click(function(){
        self.selectItemAt($(this).index());
      });

      this.inputs().change(function(){
        self._onInputSelectionChanged();
      });
    }

  });

  ToggleBarClass.defaults = {

  };

  $.fn.toggleBar.classes.ToggleBar = ToggleBarClass;

})(jQuery);