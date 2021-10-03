$(document).ready(function () {

    $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbyiZeCCuyKTXQJXL3QiRcc7h0Ph6DfwFK4RtCi06zhGJ420f51-yxv1_9pcV35kFY9t4w/exec',
        success: function (rp) {
            var response = JSON.parse(rp);

            var ques = response[0];
            var guwan = response[1];
            var buqhai = response[2];
            //讀取答題
            let text = '<tr><th class="tg co1">題目</th><th class="tg co2">答案</th></tr>';
            for (var i = 1; i < ques.length; i++) {
                text += '<tr><td class="tg-1">' + ques[i][0] + '</td><td class="tg-2">' + ques[i][1] + "</td></tr>";
            }
            document.getElementsByClassName('ques')[0].innerHTML = text;

            //讀取古玩
            let text2 = "";
            for (var i = 1; i < guwan.length; i++) {
                text2 += "<tr><td>" + guwan[i][0] + "</td><td>" + guwan[i][1] + "</td></tr>";
            }
            document.getElementsByClassName('guwan-body')[0].innerHTML = text2;

            //讀取捕快
            let text3 = ""
            for (var i = 1; i < buqhai.length; i++) {
                text3 += "<tr><td>" + buqhai[i][0] + "</td><td>" + buqhai[i][1] + "</td></tr>";
            }
            document.getElementsByClassName('buqhai-body')[0].innerHTML = text3;

            $('.loading').css("display","none");
        }
    });

    var input;

    var tempTrs = [];
    var counts = [0, 0, 0];

    var stb = $('.searchType');
    var type = parseInt(stb.data("search"));

    function searchAll() {
        searchQues();
        searchGuwan();
        searchBuqhai();
    }

    function searchQues() {
        var count = 0;
        var tr = $('.ques>tbody>tr');

        for (i = 0; i < tr.length; i++) {
            //只搜尋標題
            var td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                txtValue = txtValue.replace("“", "").replace("”", "").replace("「", "").replace("」", "").replace("《", "").replace("》", "");
                if (txtValue.indexOf(input) > -1) {
                    tr[i].style.display = "";
                    count++;
                }
                else
                    tr[i].style.display = "none";
            }
        }

        counts[0] = count;
    }

    function searchGuwan() {
        var count = 0;
        var tr = $('.guwan>tbody>tr');

        for (i = 0; i < tr.length; i++) {
            //只搜尋標題
            var td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                txtValue = txtValue.replace("“", "").replace("”", "").replace("「", "").replace("」", "").replace("《", "").replace("》", "");
                if (txtValue.indexOf(input) > -1) {
                    tr[i].style.display = "";
                    count++;
                }
                else
                    tr[i].style.display = "none";
            }
        }

        counts[1] = count;
    }

    function searchBuqhai() {
        var count = 0;
        var tr = $('.buqhai>tbody>tr');

        for (i = 0; i < tr.length; i++) {
            //只搜尋標題
            var td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                txtValue = txtValue.replace("“", "").replace("”", "").replace("「", "").replace("」", "").replace("《", "").replace("》", "");
                if (txtValue.indexOf(input) > -1) {
                    tr[i].style.display = "";
                    count++;
                }
                else
                    tr[i].style.display = "none";
            }
        }

        counts[2] = count;
    }



    $('#filterName').keyup(function () {
        sear();
    });

    function sear() {
        counts = [0, 0, 0];
        input = $('.light-table-filter').val().replace("“", "").replace("”", "").replace("「", "").replace("」", "").replace("《", "").replace("》", "");
        var table = $('.table');
        var tr = $('tr');

        if (input.length == 0)
            table.css("display", "none");
        else table.css("display", "");

        switch (type) {
            case 1:
                searchQues();
                break;
            case 2:
                searchGuwan();
                break;
            case 3:
                searchBuqhai();
                break;
            default:
                searchAll();
        }

        if (counts[0] == 0)
            $('.ques').css('display', 'none');
        if (counts[1] == 0)
            $('.guwan').css('display', 'none');
        if (counts[2] == 0)
            $('.buqhai').css('display', 'none');

        if (counts[0] + counts[1] + counts[2] == 0) {
            table.css("display", "none");
            $('.none-search').css("display", "");
        }
        else $('.none-search').css("display", "none");
    }

    //0:全部 1:古玩 2:捕快
    var types = ['全部', '答題', '古玩', '捕快斷案'];
    var typeAttr = ['輸入關鍵字', '輸入題目關鍵字', '輸入古玩關鍵字', '輸入捕快案名關鍵字'];

    $('.searchType').click(function () {
        type = parseInt($(this).data("search"));

        stb.data('search', type = (type + 1) % types.length);
        document.getElementById('searchButton').textContent = "搜尋範圍：" + types[type];

        $('.search').attr('placeholder', typeAttr[type]);

        sear();
    });

    $('.rpBtn').click(function () {
        // $('#reportBg').css("display", "block");
        window.open('report.html');
    });

    $(window).scroll(function () {
        $('#reportBg').css("marginTop", ($(window).scrollTop() + 30) + "px");
    });
});

