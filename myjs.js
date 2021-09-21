$(document).ready(function () {
    $('#filterName').keyup(function () {
        var input = $('.light-table-filter').val();
        var table = $('.table');
        var tr = $('tr');

        for (i = 0; i < tr.length; i++) {
            var td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                var txtValue = td.textContent || td.innerText;
                if (txtValue.indexOf(input) > -1)
                    tr[i].style.display = "";
                else
                    tr[i].style.display = "none";
            }
        }
    });
});

