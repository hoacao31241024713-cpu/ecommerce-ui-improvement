/* Exercise 10.10 — JQXHR HANDLING; remote source of original PDF: http://www.randyconnolly.com/funwebdev/services/travel/cities.php */
$(function() {
    $('.animLoading').hide();
    $("#consume").click(function() {
        $("#results ul").empty();
        $('.animLoading').show();
        var originalURL = "http://www.randyconnolly.com/funwebdev/services/travel/cities.php";
        var mode = $("#dataSource").val();
        var url = mode == "original" ? originalURL :
                  (mode == "error" ? "../data/khong-ton-tai.json" : "../data/cities-demo.json");

        $.get(url)
            // done will happen first
            .done(function(data) {
                $.each(data, function(index,value) {
                    var li = $('<li/>').text(value.name);
                    li.appendTo("div#results ul");
                });
            })
            // if error occurs will execute, but before always()
            .fail(function(xhr,status,error) {
                alert("failed loading data - status=" + status +
                      " error=" + error);
            })
            // always should be last
            .always(function(data) {
                $('.animLoading').fadeOut("slow");
            });
    });
});
