$(document).ready(function (){
    const loadAllSuppliers = () => {
        $("#supplier-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8081/shop/api/v1/suppliers",
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (resp) {
                for (const supplier of resp) {
                    let row = `<tr><td>${supplier.supplier_id}</td><td>${supplier.supplier_name}</td><td>${supplier.category}</td><td>${supplier.address_line_01}</td><td>${supplier.address_line_02}</td><td>${supplier.address_line_03}</td><td>${supplier.address_line_04}</td><td>${supplier.address_line_05}</td><td>${supplier.address_line_06}</td>
                                    <td>${supplier.contact_no_1}</td><td>${supplier.contact_no_2}</td><td>${supplier.email}</td></tr>`;
                    $("#supplier-tbl-body").append(row);
                }
                callMethod();
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }

    function callMethod() {
        $("#supplier-tbl-body>tr").click(function (){
            let supplier_id = $(this).children().eq(0).text();
            let supplier_name = $(this).children().eq(1).text();
            let category = $(this).children().eq(2).text();
            let address1 = $(this).children().eq(3).text();
            let address2 = $(this).children().eq(4).text();
            let address3 = $(this).children().eq(5).text();
            let address4 = $(this).children().eq(6).text();
            let address5 = $(this).children().eq(7).text();
            let address6 = $(this).children().eq(8).text();
            let contact1 = $(this).children().eq(9).text();
            let contact2 = $(this).children().eq(10).text();
            let email = $(this).children().eq(11).text();

            $("#suppl_id").val(supplier_id);
            $("#suppl_name").val(supplier_name);
            $("#category").val(category);
            $("#sad1").val(address1);
            $("#sad2").val(address2);
            $("#sad3").val(address3);
            $("#sad4").val(address4);
            $("#sad5").val(address5);
            $("#sad6").val(address6);
            $("#contact1").val(contact1);
            $("#contact2").val(contact2);
            $("#email").val(email);
        });
    }

    $("#save_supplier").click(function () {
        let formData = {
            supplier_id: $("#suppl_id").val(),
            supplier_name: $("#suppl_name").val(),
            category: $("#category").val(),
            address_line_01: $("#sad1").val(),
            address_line_02: $("#sad2").val(),
            address_line_03: $("#sad3").val(),
            address_line_04: $("#sad4").val(),
            address_line_05: $("#sad5").val(),
            address_line_06: $("#sad6").val(),
            contact_no_01: $("#contact1").val(),
            contact_no_02: $("#contact2").val(),
            email: $("#email").val()
        };

        $.ajax({
            method: "POST",
            url: "http://localhost:8081/shop/api/v1/suppliers",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Supplier saved successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    $("#update_supplier").click(function (){
        let formData = {
            supplier_id: $("#suppl_id").val(),
            supplier_name: $("#suppl_name").val(),
            category: $("#category").val(),
            address_line_01: $("#sad1").val(),
            address_line_02: $("#sad2").val(),
            address_line_03: $("#sad3").val(),
            address_line_04: $("#sad4").val(),
            address_line_05: $("#sad5").val(),
            address_line_06: $("#sad6").val(),
            contact_no_01: $("#contact1").val(),
            contact_no_02: $("#contact2").val(),
            email: $("#email").val()
        };

        $.ajax({
            method: "PATCH",
            url: "http://localhost:8081/shop/api/v1/suppliers",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Supplier updated successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    $("#delete_supplier").click(function () {
        let supplier_id = $("#suppl_id").val();

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8081/shop/api/v1/suppliers/" + supplier_id,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                reset();
                alert("Supplier deleted successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    // Reset form
    $("#supplier_reset").click(function () {
        reset();
    });

    // Reset function
    function reset() {
        $("#suppl_id").val("");
        $("#suppl_name").val("");
        $("#category").val("");
        $("#sad1").val("");
        $("#sad2").val("");
        $("#sad3").val("");
        $("#sad4").val("");
        $("#sad5").val("");
        $("#sad6").val("");
        $("#contact1").val("");
        $("#contact2").val("");
        $("#email").val("");
        loadAllSuppliers(); // Call loadAllSuppliers after resetting form
    }

    // Load suppliers on page load
    loadAllSuppliers();
});

