function queryParam(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)')
                    .exec(window.location.href);

  if (results !== null) {
    return results[1];
  }
}

(function($) {
  var $window = $(window);

  $window.on("load", function() {
    var notificationType = queryParam("notification");

    if (notificationType) {
      var $notification = $(`.notifications [data-type="${notificationType}"]`)

      $notification.addClass("notification--visible");
    }
  });
})(jQuery)
