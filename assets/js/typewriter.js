var TypewriterAnimation = function(el, rotatingText) {
  this.el = el;
  this.rotatingText = rotatingText;
  this.currentLoop = 0;
  this.isReverting = false;
  this.period = 100;
  this.text = "";
  this.animate();
};

TypewriterAnimation.prototype.animate = function() {
  var visibleTextIndex = this.currentLoop % this.rotatingText.length;
  var fullText = this.rotatingText[visibleTextIndex];

  this.period = 100;
  if (this.isReverting) {
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    this.text = fullText.substring(0, this.text.length + 1);
  }

  this.el.text(this.text);
  this.el.css("transition", "")
  this.el.css("max-width", this.el[0].scrollWidth)

  if (!this.isReverting && this.text === fullText) {
    this.isReverting = true;
    this.period = 1500;
    this.text = ""
    this.el.css("animation", "animated-cursor 600ms ease-in-out infinite")
  } else if (this.isReverting && this.text === "") {
    this.isReverting = false;
    this.currentLoop++;
    this.el.css("animation", "none")
    this.el.css("transition", "none")
    this.el.css("max-width", "0")
  }

  setTimeout(
    function() {
      this.animate();
    }.bind(this),
    this.period
  );
};

(function($) {
  var $window = $(window);
  var $typewriterElms = $(".typewriter-animation");

  // initialize the typewriter animation
  $window.on("load", function() {
    for (var i = 0; i < $typewriterElms.length; i++) {
      var $typewriterElm = $($typewriterElms[i]);
      var rotatingText = $typewriterElm.data("rotate");
      
      
      new TypewriterAnimation($typewriterElm.find('.typewriter'), rotatingText);
    }
  });
})(jQuery);
