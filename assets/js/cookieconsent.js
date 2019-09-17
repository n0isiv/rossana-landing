import "cookieconsent";

function setGoogleTrackingActive(active) {
  window["ga-disable-UA-147336875-1"] = !active;
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
    },
    onStatusChange: function(status, chosenBefore) {
      setGoogleTrackingActive(this.hasConsented());
    }
  });
});
