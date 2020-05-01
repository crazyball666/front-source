import "./scss/app.scss"


var particles = null;
var loading = false;
$(function name() {
  particles = new Particles('.login-box', {
    direction: "bottom",
    particlesAmountCoefficient: 20,
    oscillationCoefficient: 30,
    duration: 500,
    complete: handleComplete,
  });

  $(".account").focusin(function () {
    $(this).addClass("selected-input");
    $(".account-label").addClass("selected-label");
  });

  $(".account").focusout(function () {
    if ($(this).val() == "") {
      $(this).removeClass("selected-input");
      $(".account-label").removeClass("selected-label");
    }
  });

  $(".password").focusin(function () {
    $(this).addClass("selected-input");
    $(".password-label").addClass("selected-label");
  });

  $(".password").focusout(function () {
    if ($(this).val() == "") {
      $(this).removeClass("selected-input");
      $(".password-label").removeClass("selected-label");
    }
  });

  $(".login-btn").on("click", function () {
    let account = $(".account").val();
    let password = $(".password").val();
    if (account == "") {
      showError("account is empty")
      return
    }
    if (password == "") {
      showError("password is empty")
      return
    }
    particles.disintegrate();
  })

  $(document).keyup(function (event) {
    if (event.keyCode == 13) {
      $(".login-btn").trigger("click");
    }
  });
})

function showSuccess(message) {
  let e = $(`<div class="alert alert-success" role="alert" hidden>${message}</div>`);
  $("body").append(e)
  e.slideDown();
  setTimeout(() => {
    e.slideUp(function () {
      e.remove();
    })
  }, 3000);
}

function showError(message) {
  let e = $(`<div class="alert alert-danger" role="alert" hidden>${message}</div>`);
  $("body").append(e)
  e.slideDown();
  setTimeout(() => {
    e.slideUp(function () {
      e.remove();
    })
  }, 2000);
}

function handleComplete() {
  !loading && startLogin();
  loading = !loading;
}

function startLogin() {
  let account = $(".account").val();
  let password = $(".password").val();
  if (account == "") {
    showError("account is empty")
    return
  }
  if (password == "") {
    showError("password is empty")
    return
  }
  let data = JSON.stringify({
    account,
    password
  })
  $.ajax({
    contentType: 'application/json',
    type: 'POST',
    url: `/login${window.location.search}`,
    dataType: "json",
    data,
    success: function (data) {
      if (data.code == 200) {
        let redirectURL = data.data.redirectURL;
        if (!redirectURL) {
          particles.integrate();
          return showError("no redirect url");
        }
        location.href = redirectURL;
      } else {
        particles.integrate();
        showError(data.message)
      }
    },
    error: function (err) {
      particles.integrate();
      showError("error")
    }
  })
}