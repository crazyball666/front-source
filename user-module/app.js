import "./scss/app.scss"
import bg from "./util/bg";


$(function name() {
  let loading = false;

  bg("bg", 60);

  $(".account").focusin(function () {
    $(".account-label").addClass("selected");
  });

  $(".account").focusout(function () {
    if ($(this).val() == "") {
      $(".account-label").removeClass("selected");
    }
  });

  $(".password").focusin(function () {
    $(".password-label").addClass("selected");
  });

  $(".password").focusout(function () {
    if ($(this).val() == "") {
      $(".password-label").removeClass("selected");
    }
  });

  $(".login-btn").on("click", function () {
    let account = $(".account").val();
    let password = $(".password").val();
    if (account == "") {
      alert("account is empty")
      return
    }
    if (password == "") {
      alert("password is empty")
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
      url: "/login",
      dataType: "json",
      data,
      success: function (data) {
        loading = false
        if (data.code == 200) {
          let redirectURL = GetQueryString("redirectURL")
          if (!redirectURL) return alert("no redirect url")
          location.href = `//${redirectURL}?sessionToken=${data.data.sessionToken}`
        } else {
          alert(data.message)
        }
      },
      error: function (err) {
        loading = false;
        alert(err)
      }
    })
  })
})


function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return (r[2]); return null;
}