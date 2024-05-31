const loadAllEmployeeCode = () => {
    $('#employeeRef').empty();
    $('#employeeRef').append("<option selected>Select Employee code</option>");

    // validateAndRefreshToken();
    $.ajax({
        url: "http://localhost:8081/shop/api/v1/employee",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function (resp) {
            for (const employee of resp) {
                let option = `<option data-name="${employee.employeeName}">${employee.employeeId}</option>`;
                $("#employeeRef").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading employee codes:", exception);
        }
    });
};

$('#employeeRef').change((e) => {
    const employee_code = e.target.value;
    if (employee_code !== 'Select Employee code') {
        const name = e.target.options[e.target.selectedIndex].dataset.name;
        $('#employeename').val(name);
    } else {
        $('#employeename').val('');
    }
});

$(document).ready(function() {
    loadAllEmployeeCode();

    $("#process_refund").click(function () {
        let formData = {
            description: $("#refund_desc").val(),
            refundDate: $("#refund_date").val(),
            employee: {
                employeeId: $("#employeeRef").val(),
                employeeName: $("#employeename").val()
            },
            sale: {
                order_no: $("#re_order_no").val(),
                customer: {
                    customer_code: $("#cusId").val(),
                    customer_name: $("#cusName").val()
                }
            },
            refundedItems: [
                {
                    inventoryId: $("#inventoryId").val(),
                    refundedQuantity: parseInt($("#refundedQuantity").val())
                }
            ]
        };

        // validateAndRefreshToken();
        $.ajax({
            url: "http://localhost:8081/shop/api/v1/refund/refunds",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (data) {
                console.log('Success:', data);
                alert("Refund request submitted successfully!");
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
                alert("Error submitting refund request.");
            }
        });
        // $("#process_refund").click(function () {
        //     reset();
        // });
    });
    // function reset() {
    //     $("#refund_desc").val("");
    //     $("#refund_date").val("");
    //     $("#employeeRef").val("");
    //     $("#employeename").val("");
    //     $("#re_order_no").val("");
    //     $("#cusId").val("");
    //     $("#cusName").val("");
    //     $("#inventoryId").val("");
    //     $("#refundedQuantity").val("");
    // }
});
