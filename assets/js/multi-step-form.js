(function($) {
  var MultiStepForm = function(el) {
    this.form = el;
    this.$groups = el.children(".group");
    this.$steps = el.find(".steps > .step");
    this.$activeGroup = el.children(".group--active").first();
    this.currentStep = 1;
    this.initButtonEvents();
  };
  
  MultiStepForm.prototype.initButtonEvents = function() {
    var $nextButtons = $('a[data-next=""]');
    var $previousButtons = $('a[data-previous=""]')
  
    $nextButtons.on("click", this.showNextGroup.bind(this));
    $previousButtons.on("click", this.showPreviousGroup.bind(this));
  };
  
  MultiStepForm.prototype.showNextGroup = function() {
    this.$activeGroup.removeClass("group--active");
  
    this.currentStep += 1;
    this.$activeGroup = $(this.$groups[this.currentStep - 1]);
    
    var activeStep = $(this.$steps[this.currentStep - 1]);
    activeStep.addClass("step--completed");
  
    this.$activeGroup.addClass("group--active");
  };

  MultiStepForm.prototype.showPreviousGroup = function() {
    this.$activeGroup.removeClass("group--active");
  
    this.currentStep -= 1;
    this.$activeGroup = $(this.$groups[this.currentStep - 1]);
    
    var activeStep = $(this.$steps[this.currentStep]);
    activeStep.removeClass("step--completed");
  
    this.$activeGroup.addClass("group--active");
  };

  var $window = $(window);
  var $forms = $(".multi-step-form");

  $window.on("load", function() {
    for (var i = 0; i < $forms.length; i++) {
      var $form = $($forms[i]);
      new MultiStepForm($form);
    }
  });
})(jQuery);
