$(document).ready(function () {

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
    var typeAttr = ['輸入關鍵字','輸入題目關鍵字','輸入古玩關鍵字','輸入捕快案名關鍵字'];

    $('.searchType').click(function () {
        type = parseInt($(this).data("search"));

        stb.data('search', type = (type + 1) % 4);
        document.getElementById('searchButton').textContent = "搜尋範圍：" + types[type];

        $('.search').attr('placeholder',typeAttr[type]);

        sear();
    });
});

