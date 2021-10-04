$(document).ready(function () {
    var topContainer = $('.inputContainer')[0];
    $('.plus').click(function () {
        var newParent = $('.inputContainer>div:first-child').clone(true);
        var inputs = newParent.find('input[type=text]');
        for (var i = 0; i < inputs.length; i++)
            inputs[i].value = '';
        var typeBtn = newParent.find('.typeBtn')[0];
        // typeBtn.data('type', 0);
        typeBtn.value = "回報類型：" + types[0];
        typeBtn.setAttribute('data-type', '0');

        var typeInput = newParent.find('.ttype')[0];
        typeInput.value = types[0];

        var delBtn = document.createElement('input');
        delBtn.type = "button";
        delBtn.value = "刪除項目";
        delBtn.className = "del";
        newParent.append(delBtn);
        newParent.appendTo(topContainer);

        newParent.find('.del').on("click", function () {
            newParent.remove();
        });
    });

    var types = ['新增題目', '答案錯誤'];
    var type;
    $('.typeBtn').click(function () {
        var btn = $(this);
        type = parseInt(btn.data("type"));

        btn.data('type', type = (type + 1) % types.length);
        btn.prop('value', '回報類型：' + types[type]);

        var parent = btn.parent();
        var typeInput = parent.find('.ttype')[0];
        typeInput.value = types[type];
    });

});