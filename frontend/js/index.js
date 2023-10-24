const table = $("#myTable").DataTable();

function formUserEyeClick() {
  const input = $(document).find("#password-input");
  const icon = $(document).find("#password i");
  if (input.attr("type") === "password") {
    input.attr("type", "text");
    icon.removeClass("fa-eye");
    icon.addClass("fa-eye-slash");
  } else {
    input.attr("type", "password");
    icon.removeClass("fa-eye-slash");
    icon.addClass("fa-eye");
  }
}
