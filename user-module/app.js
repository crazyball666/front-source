import "./scss/app.scss"
import bg from "./util/bg";


$(function name() {
  let loading = false;

  // bg("bg", 60);

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
    let data = JSON.stringify({
      account,
      password
    })
    if (loading) {
      return
    }
    loading = true
    $.ajax({
      contentType: 'application/json',
      type: 'POST',
      url: `/login${window.location.search}`,
      dataType: "json",
      data,
      success: function (data) {
        loading = false
        if (data.code == 200) {
          let redirectURL = data.data.redirectURL;
          if (!redirectURL) return alert("no redirect url");
          location.href = redirectURL;
        } else {
          showError(data.message)
        }
      },
      error: function (err) {
        loading = false;
        showError("error")
      }
    })
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

function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}