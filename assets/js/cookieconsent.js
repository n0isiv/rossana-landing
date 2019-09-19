import "cookieconsent";

function setGoogleTrackingActive(active) {
  window["ga-disable-UA-147336875-1"] = !active;
}

function deleteAllCookies() {
  var cookies = document.cookie.split("; ");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var [name, value] = cookie.split("=");

    if (name != "cookieconsent_status") {
      document.cookie = cookie + "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }
}

window.addEventListener("load", function() {
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
    type: "opt-in",
    position: "bottom-right",
    content: {
      dismiss: "Okay"
    },
    onInitialise: function(status) {
      setGoogleTrackingActive(this.hasConsented());

      if (!this.hasConsented()) {
        deleteAllCookies();
      }
    },
    onStatusChange: function(status, chosenBefore) {
      setGoogleTrackingActive(this.hasConsented());

      if (!this.hasConsented()) {
        deleteAllCookies();
      }
    }
  });
});
