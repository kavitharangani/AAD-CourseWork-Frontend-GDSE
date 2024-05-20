$(document).ready(function () {
    function loadAllItems() {
        $("#item-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8081/shop/api/v1/item",
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (resp) {
                for (const item of resp) {
                    let row = `<tr><td>${item.item_code}</td>
                                        <td>${item.item_name}</td>
                                        <td>${item.item_description}</td>
                                        
                                    </tr>`;
                    $("#item-tbl-body").append(row);
                }
                callMethod();
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }

    function callMethod() {
        $("#item-tbl-body").on("click", "tr", function () {
            let item_id = $(this).children().eq(0).text();
            let item_name = $(this).children().eq(1).text();
            let item_description = $(this).children().eq(2).text();
            // let item_price = $(this).children().eq(3).text();
            // let item_qty = $(this).children().eq(4).text();

            $("#item_id").val(item_id);
            $("#item_name").val(item_name);
            $("#item_description").val(item_description);
            // $("#item_price").val(item_price);
            // $("#item_qty").val(item_qty);
        });
    }

    $("#save_item").click(function () {
        let formData = {
            item_code: $("#item_id").val(),
            item_name: $("#item_name").val(),
            item_description: $("#item_description").val(),
            // item_price: $("#item_price").val(),
            // item_qty: $("#item_qty").val(),
        };

        $.ajax({
            method: "POST",
            url: "http://localhost:8081/shop/api/v1/item",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Item saved successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    $("#update_item").click(function () {
        let formData = {
            item_code: $("#item_id").val(),
            item_name: $("#item_name").val(),
            item_description: $("#item_description").val(),
            // item_price: $("#item_price").val(),
            // item_qty: $("#item_qty").val()
        };

        $.ajax({
            method: "PATCH",
            url: "http://localhost:8081/shop/api/v1/item/" + formData.item_code,
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Item updated successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });


    $("#delete_item").click(function () {
        let item_id = $("#item_id").val();

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8081/shop/api/v1/item/" + item_id,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Item deleted successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    $("#item_reset").click(function () {
        reset();
    });


    function reset() {
        $("#item_id").val("");
        $("#item_name").val("");
        $("#item_description").val("");
        // $("#item_price").val("");
        // $("#item_qty").val("");
        loadAllItems(); // Call loadAllItems after resetting form
    }

    loadAllItems();
});
