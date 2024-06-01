
const loadAllItemCode = () => {
    $('#item_code').empty();
    $('#item_code').append("<option selected>Select item code</option>");

    // validateAndRefreshToken();
    $.ajax({
        url: "http://localhost:8081/shop/api/v1/item",
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function (resp) {
            for (const item of resp) {
                let option = `<option data-name="${item.item_name}">${item.item_code}</option>`;
                $("#item_code").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading item codes:", exception);
        }
    });
};

$('#item_code').change((e) => {
    const item_code = e.target.value;
    if ('Select item code' !== item_code) {
        const name = e.target.options[e.target.selectedIndex].dataset.name;
        $('#item_desc').val(name);
    }
});

$(document).ready(function () {
    loadAllItemCode();

    function loadAllInventory() {
        $("#inventory-tbl-body").empty();
        // validateAndRefreshToken();
        $.ajax({
            url: "http://localhost:8081/shop/api/v1/inventory",
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (resp) {
                for (const item of resp) {
                    let row = `<tr>
                                    <td>${item.item_code}</td>
                                    <td>${item.item_desc}</td>
                                    <td>${item.item_qty}</td>
                                    <td>${item.category}</td>
                                    <td>${item.size}</td>
                                    <td>${item.unit_price_sale}</td>
                                    <td>${item.unit_price_buy}</td>
                                    <td>${item.expected_profit}</td>
                                    <td>${item.profit_margin}</td>
                                    <td>${item.status}</td>
                                </tr>`;
                    $("#inventory-tbl-body").append(row);
                }
                callMethod();
            },
            error: function (xhr, status, error) {
                alert("Error loading inventory: " + error);
            }
        });
    }

    function callMethod() {
        $("#inventory-tbl-body").on("click", "tr", function () {
            let item_code = $(this).children().eq(0).text();
            let item_desc = $(this).children().eq(1).text();
            let item_qty = $(this).children().eq(2).text();
            let category = $(this).children().eq(3).text();
            let size = $(this).children().eq(4).text();
            let unit_price_sale = $(this).children().eq(5).text();
            let unit_price_buy = $(this).children().eq(6).text();
            let expected_profit = $(this).children().eq(7).text();
            let profit_margin = $(this).children().eq(8).text();
            let status = $(this).children().eq(9).text();



            $("#item_code").val(item_code);
            $("#item_desc").val(item_desc);
            $("#item_qty").val(item_qty);
            $("#categorys").val(category);
            $("#size").val(size);
            $("#unit_price_sale").val(unit_price_sale);
            $("#unit_price_buy").val(unit_price_buy);
            $("#expected_profit").val(expected_profit);
            $("#profit_margin").val(profit_margin);
            $("#statuss").val(status)
        });
    }

    $("#order_qty").on("input", function () {
        updateItemQty();
    });

    $("#save_inventory").click(function () {
        let formData = new FormData();
        formData.append("item_code", $("#item_code").val());
        formData.append("item_desc", $("#item_desc").val());
        formData.append("item_qty", $("#item_qty").val());
        formData.append("category", $("#categorys").val());
        formData.append("size", $("#size").val());
        formData.append("unit_price_sale", $("#unit_price_sale").val());
        formData.append("unit_price_buy", $("#unit_price_buy").val());
        formData.append("expected_profit", $("#expected_profit").val());
        formData.append("profit_margin", $("#profit_margin").val());
        formData.append("status", $("#statuss").val());

        let fileInput = document.getElementById('item_pic');
        if (fileInput.files.length > 0) {
            formData.append("item_pic", fileInput.files[0]);
        }

        // validateAndRefreshToken();
        $.ajax({
            method: "POST",
            url: "http://localhost:8081/shop/api/v1/inventory",
            processData: false,
            contentType: false,
            data: formData,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Item saved successfully.");
            },
            error: function (xhr, status, error) {
                if (xhr.status === 400) {
                    alert("Bad request: " + xhr.responseText);
                } else {
                    alert("Error saving item: " + error);
                }
            }
        });
    });

    $("#update_inventory").click(function () {
        let formData = new FormData();
        formData.append("item_code", $("#item_code").val());
        formData.append("item_desc", $("#item_desc").val());
        formData.append("item_qty", $("#item_qty").val());
        formData.append("category", $("#categorys").val());
        formData.append("size", $("#size").val());
        formData.append("unit_price_sale", $("#unit_price_sale").val());
        formData.append("unit_price_buy", $("#unit_price_buy").val());
        formData.append("expected_profit", $("#expected_profit").val());
        formData.append("profit_margin", $("#profit_margin").val());
        formData.append("status", $("#statuss").val());

        let fileInput = document.getElementById('item_pic');
        if (fileInput.files.length > 0) {
            formData.append("item_pic", fileInput.files[0]);
        }
        // validateAndRefreshToken();
        $.ajax({
            method: "PATCH",
            url: "http://localhost:8081/shop/api/v1/inventory",
            contentType: false, // Don't set contentType to JSON when using FormData
            processData: false, // Prevent jQuery from automatically transforming the data into a query string
            data: formData, // Directly send the FormData object
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Item updated successfully.");
            },
            error: function (xhr, status, error) {
                if (xhr.status === 400) {
                    alert("Bad request: " + xhr.responseText);
                } else {
                    alert("Error updating item: " + error);
                }
            }
        });
    });


    $("#reset_inventory").click(function () {
        reset();
    });

    function reset() {
        $("#item_code").val("");
        $("#item_desc").val("");
        $("#item_qty").val("");
        $("#item_pic").val("");
        $("#categorys").val("");
        $("#size").val("");
        $("#unit_price_sale").val("");
        $("#unit_price_buy").val("");
        $("#expected_profit").val("");
        $("#profit_margin").val("");
        $("#statuss").val("");
        loadAllInventory(); // Call loadAllInventory after resetting form
    }

    loadAllInventory();
});


function calculateExpectedProfit() {
    var unitPriceSale = parseFloat(document.getElementById('unit_price_sale').value) || 0;
    var unitPriceBuy = parseFloat(document.getElementById('unit_price_buy').value) || 0;
    var expectedProfit = unitPriceSale - unitPriceBuy;
    document.getElementById('expected_profit').value = expectedProfit;
}





