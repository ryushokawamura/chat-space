$(function () {
  function buildHTML(message) {

    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";

    var html = `<div class="message" data-message-id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    console.log(html)
    $('.messages').append(html);
    $('.main__center').animate({ scrollTop: $('.messages')[0].scrollHeight});
    $('form')[0].reset();
    $('input').prop('disabled', false);
  })
   .fail(function(){
     alert('error');
   });
  //  return false;
 });


var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
    });
    $('.messages').append(insertHTML);

    $('.main__center').animate({ scrollTop: $('.messages')[0].scrollHeight});
  }
  })
  .fail(function() {
      alert('自動更新に失敗しました');
  });
};

if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }

});