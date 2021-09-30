$(document).ready(function () {
    var topContainer = $('.inputContainer')[0];
    $('.plus').click(function () {
        var newParent = $('.inputContainer>div:first-child').clone(true);
        var inputs = newParent.find('input[type=text]');
        for (var i = 0; i < inputs.length; i++)
            inputs[i].value = '';

        var delBtn = document.createElement('input');
        delBtn.type = "button";
        delBtn.value = "刪除項目";
        delBtn.className = "del";
        newParent.append(delBtn);
        newParent.appendTo(topContainer);

        newParent.find('.del').on("click",function(){
           newParent.remove();
        });
    });

});