/* Exercise 10.9 — GET REQUESTS; remote source of original PDF: http://www.randyconnolly.com/funwebdev/services/travel/cities.php */
$(function() {
    $("#consume").click(function() {
        var originalURL = "http://www.randyconnolly.com/funwebdev/services/travel/cities.php";
        var mode = $("#dataSource").val();
        var url = mode == "original" ? originalURL :
                  (mode == "error" ? "../data/khong-ton-tai.json" : "../data/cities-demo.json");
        $("#results").html("<ul></ul>");
        $.get(url, function (data, status) {
            if (status == "success") {
                $.each(data, function(index,value) {
                    var li = $('<li/>').text(value.name);
                    li.appendTo("div#results ul");
                });
            }
        }).fail(function(xhr,status,error) {
            $("#results").text("Không tải được dữ liệu: " + status + ". Hãy chọn JSON mẫu để thử lại.");
        });
    });
});
