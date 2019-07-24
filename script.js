$(function() {
  // Get the form.
  var form = $("#mc-embedded-subscribe-form");
  // Set up an event listener for the contact form.
  $(form).submit(function(event) {
    // Stop the browser from submitting the form.
    event.preventDefault();

    // Disable submit button
    $("#mailchimp-signup-form-submit").disabled = true;

    // Serialize the form data.
    var formData = $(form).serialize();
    console.log("⌛ Signing you up...");

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData
    })
      .done(function(response) {
        // Set the message text.
        console.log(response);

        console.log("🔥 You're on the list. Thank you!");
      })
      .fail(function(data) {
        console.log(data);
      });

    // Enable submit button
    $("#mailchimp-signup-form-submit").disabled = false;
  });
});
