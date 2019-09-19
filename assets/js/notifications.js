function queryParam(name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );

  if (results !== null) {
    return results[1];
  }
}

(function($) {
  var $window = $(window);

  function hideNotification($notification) {
    $notification.removeClass("notification--visible");
  }

  $window.on("load", function() {
    var notificationType = queryParam("notification");

    if (notificationType) {
      var $notification = $(`.notifications [data-type="${notificationType}"]`);
      var $notificationClose = $notification.find(".notification__close");
      var hrefWithoutQuery = window.location.href.split("?")[0];

      $notification.addClass("notification--visible");
      $notificationClose.on("click", function(ev) {
        ev.preventDefault();
        hideNotification($notification);

        window.location = hrefWithoutQuery;
      });

      setTimeout(function() {
        hideNotification($notification);
      }, 5000);
    }
  });
})(jQuery);
