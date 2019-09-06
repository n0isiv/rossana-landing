import "cookieconsent";

(function($) {
  var $window = $(window);

  $window.on("load", function() {
    cookieconsent.initialise({
      palette: {
        popup: {
          background: "#666666"
        },
        button: {
          background: "#14a7d0"
        }
      },
      showLink: false,
      theme: "edgeless",
      position: "bottom-right",
      content: {
        dismiss: "Okay"
      }
    });
  });
})(jQuery);
