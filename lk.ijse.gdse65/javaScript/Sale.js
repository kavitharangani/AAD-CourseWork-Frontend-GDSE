$(document).ready(function() {
    loadAllInventoryCode();
    loadAllCustomerId();
    loadAllEmployeeName();

    $("#unit_price, #qty_on_hand, #order_qty").on("input", updateTotal);

    $("#add_cart").click(addToCart);
    $("#remove").click(removeSelectedItem);
    $("#place_ord").click(placeOrder);
});

const loadAllInventoryCode = () => {
    $('#order_item_id').empty().append("<option selected>Select item code</option>");

    $.ajax({
        url: "http://localhost:8081/shop/api/v1/inventory",
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") },
        success: function(resp) {
            resp.forEach(inventory => {
                let option = `<option data-description="${inventory.item_desc}" data-unitPrice="${inventory.unit_price_sale}" data-qty="${inventory.item_qty}" data-size="${inventory.size}">${inventory.item_code}</option>`;
                $("#order_item_id").append(option);
            });
        },
        error: function(xhr, exception) {
            console.log("Error loading item codes:", exception);
        }
    });
}

$('#order_item_id').change(function(e) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.value !== 'Select item code') {
        $('#description').val(selectedOption.getAttribute('data-description'));
        $('#unit_price').val(selectedOption.getAttribute('data-unitPrice'));
        $('#qty_on_hand').val(selectedOption.getAttribute('data-qty'));
        $('#orSize').val(selectedOption.getAttribute('data-size'));
    }
});

const loadAllCustomerId = () => {
    $('#customer_id').empty().append("<option selected>Select Customer Id</option>");

    $.ajax({
        url: "http://localhost:8081/shop/api/v1/customer",
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") },
        success: function(resp) {
            resp.forEach(customer => {
                let option = `<option data-customer_name="${customer.customer_name}">${customer.customer_code}</option>`;
                $("#customer_id").append(option);
            });
        },
        error: function(xhr, exception) {
            console.log("Error loading customer names:", exception);
        }
    });
}

$('#customer_id').change(function(e) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.value !== 'Select Customer Id') {
        $('#customer_name').val(selectedOption.getAttribute('data-customer_name'));
    }
});

const loadAllEmployeeName = () => {
    $('#employee_name').empty().append("<option selected>Select employee name</option>");

    $.ajax({
        url: "http://localhost:8081/shop/api/v1/employee",
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("accessToken") },
        success: function(resp) {
            resp.forEach(employee => {
                let option = `<option data-employeeID="${employee.employeeId}">${employee.employeeName}</option>`;
                $("#employee_name").append(option);
            });
        },
        error: function(xhr, exception) {
            console.log("Error loading employee names:", exception);
        }
    });
}

$('#employee_name').change(function(e) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    if (selectedOption.value !== 'Select employee name') {
        $('#employee_code').val(selectedOption.getAttribute('data-employeeID'));
    }
});

function updateTotal() {
    const unitPrice = parseFloat($("#unit_price").val()) || 0;
    const quantity = parseInt($("#order_qty").val()) || 0;
    const total = unitPrice * quantity;
    $("#final_total").val(total.toFixed(2));
    return total;
}

function addToCart() {
    let item_id = $('#order_item_id option:selected').text();
    let itemExists = false;

    $('#order_table_body .item_id').each(function() {
        if ($(this).text() === item_id) {
            itemExists = true;
            let existingQty = parseInt($(this).closest('tr').find('.qty').text());
            let qty = parseInt($('#order_qty').val());
            let newQty = existingQty + qty;

            let existingTotal = parseFloat($(this).closest('tr').find('.total').text());
            let add_total = updateTotal();
            let newTotal = existingTotal + add_total;

            $(this).closest('tr').find('.qty').text(newQty);
            $(this).closest('tr').find('.total').text(newTotal.toFixed(2));

            updateFinalTotal();
            return false;
        }
    });

    if (!itemExists) {
        let desc = $('#description').val();
        let qty = $('#order_qty').val();
        let total = updateTotal();
        let oSize = $('#orSize').val();

        let row = `<tr>
            <td class="item_id">${item_id}</td>
            <td class="desc">${desc}</td>
            <td class="qty">${qty}</td>
            <td class="total">${total.toFixed(2)}</td>
            <td class="oSize">${oSize}</td>
        </tr>`;

        $('#order_table_body').append(row);
        updateFinalTotal();
    }

    resetOrderDetails();
}

function removeSelectedItem() {
    $('#order_table_body tr').last().remove();
    updateFinalTotal();
}

function updateFinalTotal() {
    let finalTotal = 0;
    $('#order_table_body .total').each(function() {
        finalTotal += parseFloat($(this).text());
    });
    $('#final_total').val(finalTotal.toFixed(2));
}

function resetOrderDetails() {
    $('#order_item_id').val('Select item code');
    $('#description').val('');
    $('#unit_price').val('');
    $('#qty_on_hand').val('');
    $('#order_qty').val('');
    $('#orSize').val('');
}

document.getElementById("place_ord").onclick = function() {
    placeOrder();
};

function placeOrder() {
    let orderData = {
        order_no: $("#order_id").val(),
        employeeId: $("#employee_code").val(),
        customer_code: $("#customer_id").val(),
        purchase_date: new Date($("#purchDate").val()).toISOString(),
        payment_method: $("#payment").val(),
        added_points: parseFloat($("#point").val()) || 0,
        saleInventoryDetails: []
    };

    $('#order_table_body tr').each(function() {
        let item = {
            item_code: $(this).find('.item_id').text(),
            itemDesc: $(this).find('.desc').text(),
            size: parseInt($(this).find('.oSize').text()),
            unitPrice: parseFloat($(this).find('.unit_price').text()),
            itemQty: parseInt($(this).find('.qty').text()),
            totalPrice: parseFloat($(this).find('.total').text())
        };
        orderData.saleInventoryDetails.push(item);
    });

    $.ajax({
        url: "http://localhost:8081/shop/api/v1/sale",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(orderData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function(resp) {
            alert("Order placed successfully!");
            resetForm();
        },
        error: function(xhr, exception) {
            if (xhr.status === 403) {
                alert("You do not have permission to place this order.");
            } else {
                console.log("Error placing order:", exception);
            }
        }
    });
}

function resetForm() {
    $('#order_id').val('');
    $('#customer_id').val('');
    $('#customer_name').val('');
    $('#order_item_id').val('');
    $('#description').val('');
    $('#orSize').val('');
    $('#unit_price').val('');
    $('#qty_on_hand').val('');
    $('#order_qty').val('');
    $('#purchDate').val('');
    $('#final_total').val('');
    $('#payment').val('Choose...');
    $('#point').val('');
    $('#employee_name').val('');
    $('#employee_code').val('');
    $('#order_table_body').empty(); // Clear the order table
}
