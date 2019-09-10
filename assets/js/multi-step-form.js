(function($) {
  var MultiStepForm = function(el) {
    this.$form = el;
    this.$groups = el.children(".group");
    this.$steps = el.find(".steps > .step");
    this.$activeGroup = el.children(".group--active").first();
    this.currentStep = 1;
    this.initButtonEvents();
    this.initFieldEvents();
    this.updateFieldVisibility();
  };

  MultiStepForm.prototype.initButtonEvents = function() {
    var $nextButtons = this.$form.find('a[data-next=""]');
    var $previousButtons = this.$form.find('a[data-previous=""]');

    $nextButtons.on("click", this.showNextGroup.bind(this));
    $previousButtons.on("click", this.showPreviousGroup.bind(this));
  };

  MultiStepForm.prototype.initFieldEvents = function() {
    var $fields = this.$form.find("input, select, textarea");

    $fields.change(this.updateFieldVisibility.bind(this));
  };

  MultiStepForm.prototype.showNextGroup = function() {
    if (!this.checkFormGroupValidity()) {
      // use click instead of submit to trigger browser form validation
      $('input[type="submit"]').trigger("click");
      return;
    }
    this.$activeGroup.removeClass("group--active");

    this.currentStep += 1;
    this.$activeGroup = $(this.$groups[this.currentStep - 1]);

    var activeStep = this.$steps[this.currentStep - 1];
    if (activeStep != undefined) {
      $(activeStep).addClass("step--completed");
    }

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

  MultiStepForm.prototype.checkFormGroupValidity = function() {
    var $groupInputs = this.$activeGroup.find(
      "input[required],select[required]"
    );

    for (var i = 0; i < $groupInputs.length; i++) {
      var $field = $groupInputs[i];

      if (!$field.checkValidity()) {
        // focus invalid field
        $field.focus();
        return false;
      }
    }

    return true;
  };

  MultiStepForm.prototype.updateFieldVisibility = function() {
    var $relationalFields = this.$form.find("[data-rel]");

    for (var i = 0; i < $relationalFields.length; i++) {
      var $field = $($relationalFields[i]);
      var $depedency = $("#" + $field.data("rel"));
      var expextedValue = $field.data("visible-when");
      var required = $field.data("required");

      if ($depedency.val() == expextedValue) {
        if (required === true) {
          $field.attr("required", "true");
        }
        $field.parent().show();
      } else {
        $field.removeAttr("required");
        $field.parent().hide();
      }
    }
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
