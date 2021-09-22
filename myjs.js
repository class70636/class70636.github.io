$(document).ready(function () {

    $('#filterName').keyup(function () {
        var input = $('.light-table-filter').val();
        var table = $('.table');
        var tr = $('tr');

        if (input.length == 0)
            table.css("display", "none");
        else table.css("display", "");

        var count = 0;

        for (i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.indexOf(input) > -1) {
                    tr[i].style.display = "";
                    count++;
                }
                else
                    tr[i].style.display = "none";
            }
        }

        if (count == 0) {
            table.css("display", "none");
            $('.none-search').css("display", "");
        }
        else $('.none-search').css("display", "none");
    });
});

