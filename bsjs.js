$(document).ready(function () {

    var loading = new bootstrap.Modal(document.getElementById('loading-mask'), {});
    loading.show();

    //讀取題庫
    $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbyiZeCCuyKTXQJXL3QiRcc7h0Ph6DfwFK4RtCi06zhGJ420f51-yxv1_9pcV35kFY9t4w/exec',
        success: function (rp) {
            var response = JSON.parse(rp);

            var ques = response[0];
            var koi = response[1];
            var tp = response[2]
            var guwan = response[3];
            var buqhai = response[4];

            var icon = '<i class="material-icons copyBtn" title="複製答案">content_copy</i>';
            //讀取答題
            let text = '';
            for (var i = 1; i < ques.length; i++)
                //     // text += '<tr class="qq"><td class="tg-1">' + ques[i][0] + '</td><td class="tg-2">' + ques[i][1] + icon + "</td></tr>";
                text += '<tr class="qq"><td class="tg-1">' + ques[i][0] + '</td><td class="tg-2 align-middle">' + ques[i][1] + "</td></tr>";
            for (var i = 1; i < koi.length; i++)
                text += '<tr class="ko"><td class="tg-1">' + koi[i][0] + '</td><td class="tg-2 align-middle">' + koi[i][1] + "</td></tr>";
            for (var i = 1; i < tp.length; i++)
                text += '<tr class="tp"><td class="tg-1">' + tp[i][0] + '</td><td class="tg-2 align-middle">' + tp[i][1] + "</td></tr>";
            document.getElementsByClassName('ques-body')[0].innerHTML = text;

            //讀取古玩
            let text2 = "";
            for (var i = 1; i < guwan.length; i++) {
                text2 += '<tr class="gu"><td>' + guwan[i][0] + "</td><td>" + guwan[i][1] + "</td></tr>";
            }
            document.getElementsByClassName('guwan-body')[0].innerHTML = text2;

            //讀取捕快
            let text3 = ""
            for (var i = 1; i < buqhai.length; i++) {
                text3 += '<tr class="bu"><td>' + buqhai[i][0] + "</td><td>" + buqhai[i][1] + "</td></tr>";
            }
            document.getElementsByClassName('buqhai-body')[0].innerHTML = text3;

            loading.hide();

            // $('.table').on('click', '.copyBtn', function () {
            //     var parent = $(this).parent();
            //     var str = parent.html().replace(icon, '');
            //     navigator.clipboard.writeText(str);

            //     var copied = $('.copied');
            //     copied.css("opacity", 1);
            //     copied.animate({ opacity: 1 }, 1000).animate({ opacity: 0 }, 300);
            // });
        }
    });

    var inputs = [];
    var table = $('.table');
    var searchType = ['.qq,.ko,.tp,.gu,.bu', '.qq', '.tp', '.ko', '.gu', '.bu'];
    //input搜尋
    $('#search').keyup(function () {
        var val = $('#search').val();
        if (val.length == 0)
            table.css("display", "none");
        else {
            table.css("display", "");
            inputs = val.split(' ');
        }
        search();
    });


    var alert = document.getElementById('none-search');
    var bsAlert = new bootstrap.Alert(alert);
    //搜尋
    function search() {

        //答題,古玩,捕快 搜尋數
        var counts = [0, 0, 0, 0, 0];

        var tr = $(searchType[parseInt($('#search-type').val())]);
        for (var i = 0; i < tr.length; i++) {
            //只搜尋標題
            var td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (multiSearch(txtValue)) {
                    tr[i].style.display = "";
                    var parentName = td.parentNode.className;
                    if (parentName == 'qq')
                        counts[0]++;
                    if (parentName == 'tp')
                        counts[1]++;
                    if (parentName == 'ko')
                        counts[2]++;
                    if (parentName == 'gu')
                        counts[3]++;
                    if (parentName == 'bu')
                        counts[4]++;
                    // if (parentName.indexOf('ques-body') > -1)
                    //     counts[0]++;
                    // if (parentName.indexOf('guwan-body') > -1)
                    //     counts[1]++;
                    // if (parentName.indexOf('buqhai-body') > -1)
                    //     counts[2]++;
                }
                else
                    tr[i].style.display = "none";
            }
        }
        if (counts[0] == 0)
            $('.qq').css('display', 'none');
        if (counts[1] == 0)
            $('.tp').css('display', 'none');
        if (counts[2] == 0)
            $('.ko').css('display', 'none');
        if (counts[0] + counts[1] + counts[2] == 0)
            $('.ques').css('display', 'none');
        if (counts[3] == 0)
            $('.guwan').css('display', 'none');
        if (counts[4] == 0)
            $('.buqhai').css('display', 'none');

        if (counts[0] + counts[1] + counts[2] + counts[3] + counts[4] == 0) {
            $('#none-search').show();
        }
        else $('#none-search').hide();
    }
    //多重搜尋
    function multiSearch(str) {
        for (var i = 0; i < inputs.length; i++)
            if (str.indexOf(inputs[i]) == -1)
                return false;
        return true;
    }

    //搜尋範圍選擇
    $('#search-type').change(function () {
        // if ($('#search').val().length != 0)
        //     search();
        $('#search').trigger('keyup');
    });

});
