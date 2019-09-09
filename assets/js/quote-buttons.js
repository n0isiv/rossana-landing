(function($) {
  var $window = $(window);

  $window.on("load", function() {
    var $elements = $(".quote-button");

    $elements.on("click", function(ev) {
      var $target = $(ev.target);

      for (var i = 0; i < $elements.length; i++) {
        var $el = $($elements[i]);
        var $hide = $el.data("hide-after-click");
  
        if ($hide === true) {
          $el.hide();
        }
      }

      $("#quote-form").removeClass("multi-step-form--hidden");
    });
  });
})(jQuery);
