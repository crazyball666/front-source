import "./article-detail.scss"
import "./markdown.css"
import api from "../../common/api"

let commentPage = 0;
let loadCommentCount = 0;
let articleId = null;

// 模块主入口
export default async function setupModule() {
  articleId = location.pathname.replace("/t/", "");

  $(document).on("click", ".load-more", loadMoreComment)
  $(document).on("click", ".add-comment-btn", addComment)

  let content = $(".content").text();
  $(".content").html(content);

  // 代码高亮
  document.querySelectorAll('.w-e-text pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });

  // 加载评论
  loadComment(articleId, commentPage)
}

/**
 * 添加评论模版
 */
function addCommentTpl(name, content, parentId, parentName, parentContent, time, prepend = false) {
  let newTpl = $($("#comment-tpl").html());
  newTpl.find(".comment-name").text((name && name.length > 0 ? name : "游客") + ":");
  newTpl.find(".comment-content").text(content);
  newTpl.find(".comment-time").text(time)
  if (parentId && parentId.length > 0) {
    newTpl.find(".parent-comment-name").text((parentName && parentName.length > 0 ? parentName : "游客") + ":");
    newTpl.find(".parent-comment-content").text(parentContent);
  } else {
    newTpl.find(".parent-comment-box").remove()
  }
  if (prepend) {
    $(".comment-list").prepend(newTpl)
  } else {
    $(".comment-list").append(newTpl)
  }
}

/**
 * 设置评论文案
 */
function setCommentTips(tips) {
  $(".comment-tips").text(tips)
}

/**
 * 加载评论
 */
async function loadComment(articleId, commentPage) {
  let commentRes;
  try {
    setCommentTips("加载中...");
    $(".loading-bar").show();
    commentRes = await api.getCommentList(articleId, commentPage);
    $(".loading-bar").hide();
    loadCommentCount += commentRes.data.comments.length;
    commentRes.data.comments.forEach(comment => {
      addCommentTpl(comment.nick_name, comment.content, comment.parent_id, comment.parent_name, comment.parent_content, comment.created_at)
    });
    let h = document.querySelector('.comment-list').scrollHeight
    $(".comment-list").css("max-height", h + "px")
  } catch (err) {
    console.log(err)
    $(".loading-bar").hide();
  }
  if (loadCommentCount == 0) {
    setCommentTips("暂无评论")
  } else if (loadCommentCount < commentRes.data.count) {
    $(".load-more").show();
    setCommentTips("")
  } else {
    setCommentTips("已经到底啦～")
  }
}

/**
 * 加载更多评论
 */
function loadMoreComment() {
  $(".load-more").hide();
  loadComment(articleId, commentPage + 1)
}

/**
 * 添加评论
 */
async function addComment() {
  let nickName = $(".name-input").val()
  let email = $(".email-input").val()
  let content = $(".comment-input").val()

  if (nickName == "" || email == "" || content == "") {
    mdui.snackbar({
      message: "不能为空哦～",
      position: "right-top",
    });
    return;
  }

  $(".add-comment-btn").attr("disabled", true)
  $(".add-comment-btn").text("loading...")
  try {
    let commentRes = await api.addComment(articleId, nickName, email, content);
    if (commentRes.data.id.length > 0) {
      $(".comment-list").html("")
      $(".comment-list").css("max-height", "0px")
      loadCommentCount = 0;
      loadComment(articleId, commentPage)
      mdui.snackbar({
        message: "评论成功",
        position: "right-top",
      });
      $(".name-input").val("")
      $(".email-input").val("")
      $(".comment-input").val("")
    }
  } catch (err) {
    mdui.snackbar({
      message: err,
      position: "right-top",
    });
  }
  $(".add-comment-btn").removeAttr("disabled")
  $(".add-comment-btn").text("提交")
}