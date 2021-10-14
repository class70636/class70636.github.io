$(document).ready(function () {

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

            var qId = 1;

            var icon = '<i class="material-icons copyBtn" title="複製答案">content_copy</i>';
            //讀取答題
            let text = '<tr><th class="tg co1">題目</th><th class="tg co2">答案</th></tr>';
            // let qqId = '<span class="qqid">' + qId + '</span>';
            for (var i = 1; i < ques.length; i++)
                text += '<tr class="qq"><td class="tg-1">' + ques[i][0] + '</td><td class="tg-2">' + ques[i][1] + icon + "</td></tr>";
            for (var i = 1; i < koi.length; i++)
                text += '<tr class="ko"><td class="tg-1">' + koi[i][0] + '</td><td class="tg-2">' + koi[i][1] + "</td></tr>";
            for (var i = 1; i < tp.length; i++)
                text += '<tr class="tp"><td class="tg-1">' + tp[i][0] + '</td><td class="tg-2">' + tp[i][1] + "</td></tr>";
            document.getElementsByClassName('ques')[0].innerHTML = text;

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

            $('.loading').css("display", "none");

            $('.table').on('click', '.copyBtn', function () {
                var parent = $(this).parent();
                var str = parent.html().replace(icon, '');
                navigator.clipboard.writeText(str);

                var copied = $('.copied');
                copied.css("opacity", 1);
                copied.animate({ opacity: 1 }, 1000).animate({ opacity: 0 }, 300);
            });
        }
    });

    var input;
    var inputs;

    var tempTrs = [];
    var counts = [0, 0, 0, 0, 0];

    var stb = $('#serType');
    var type = parseInt(stb.val());

    function searchAll() {
        counts[0] = search('.qq');
        counts[1] = search('.tp');
        counts[2] = search('.ko');
        counts[3] = search('.gu');
        counts[4] = search('.bu');
    }

    function search(str) {
        var count = 0;
        var tr = $(str);

        for (i = 0; i < tr.length; i++) {
            //只搜尋標題
            var td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                txtValue = txtValue.replace("“", "").replace("”", "").replace("「", "").replace("」", "").replace("《", "").replace("》", "");
                if (multiSearch(txtValue)) {
                    tr[i].style.display = "";
                    count++;
                }
                else
                    tr[i].style.display = "none";
            }
        }

        return count;
    }

    function multiSearch(str) {
        for (var i = 0; i < inputs.length; i++)
            if (str.indexOf(inputs[i]) == -1)
                return false;
        return true;
    }

    $('#filterName').keyup(function () {
        sear();
    });

    function sear() {
        counts = [0, 0, 0, 0, 0];
        input = $('.light-table-filter').val().replace("“", "").replace("”", "").replace("「", "").replace("」", "").replace("《", "").replace("》", "");
        var table = $('.table');
        var tr = $('tr');

        if (input.length == 0)
            table.css("display", "none");
        else {
            table.css("display", "");
            inputs = input.split(' ');
        }

        switch (type) {
            case 1:
                counts[0] = search('.qq');
                break;
            case 2:
                counts[1] = search('.tp');
                break;
            case 3:
                counts[2] = search('.ko');
                break;
            case 4:
                counts[3] = search('.gu');
                break;
            case 5:
                counts[4] = search('.bu');
                break;
            default:
                searchAll();

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
            table.css("display", "none");
            $('.none-search').css("display", "");
        }
        else $('.none-search').css("display", "none");
    }

    // var types = ['全部', '答題（雅士、飲聚）', '答題（茶話會）', '答題（錦鯉）', '古玩', '捕快斷案'];
    var typeAttr = ['輸入關鍵字', '輸入題目關鍵字', '輸入題目關鍵字', '輸入題目關鍵字', '輸入古玩關鍵字', '輸入捕快案名關鍵字'];

    $('#serType').change(function () {
        type = parseInt($(this).val());
        $('.search').attr('placeholder', typeAttr[type]);

        if ($(this).val().length != 0)
            sear();
    });

    $('.rpBtn').click(function () {
        // $('#reportBg').css("display", "block");
        window.open('report.html');
    });

    $('.table > .copy-btn').click(function () {
        console.log($(this));
    });

    $(window).scroll(function () {
        var input = document.getElementById('filterName');
        var bot = input.getBoundingClientRect().bottom;

        if (bot < 0)
            $('.gotop').fadeIn();
        else $('.gotop').fadeOut();
    });

    $('.gotop').click(function () {
        $('html,body').animate({ scrollTop: 0 }, 'fast');
    });
});

