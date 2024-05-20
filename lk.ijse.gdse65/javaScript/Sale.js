//
// const loadAllInventoryCode = () => {
//     $('#sale_item_id').empty();
//     $('#sale_item_id').append("<option selected>Select item code</option>");
//
//     $.ajax({
//         url: "http://localhost:8080/shop/api/v1/inventory",
//         method: "GET",
//         processData: false,
//         contentType: false,
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("accessToken")
//         },
//         success: function (resp) {
//             console.log(resp);
//             for (const inventory of resp) {
//                 let option = `<option data-description="${inventory.item_desc}" data-unitPrice="${inventory.unit_price_sale}" data-qty="${inventory.item_qty}">${inventory.item_code}</option>;`
//
//                 $("#sale_item_id").append(option);
//             }
//         },
//         error: function (xhr, exception) {
//             console.log("Error loading item codes:", exception);
//         }
//     });
// }
//
// $('#sale_item_id').change((e) => {
//     const item_id_sale = e.target.value;
//     if ('Select item code' !== item_id_sale) {
//         const description = e.target.options[e.target.selectedIndex].getAttribute('data-description');
//         $('#description').val(description);
//
//         const unitPrice = e.target.options[e.target.selectedIndex].getAttribute('data-unitPrice');
//         $('#unit_price').val(unitPrice);
//
//         const qty = e.target.options[e.target.selectedIndex].getAttribute('data-qty');
//         $('#qty_on_hand').val(qty);
//     }
// })
// const loadAllCustomerName = () => {
//     $('#customer-id').empty();
//     $('#customer-id').append("<option selected>Select customer id</option>");
//
//     $.ajax({
//         url: "http://localhost:8080/shop/api/v1/customer",
//         method: "GET",
//         processData: false,
//         contentType: false,
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("accessToken")
//         },
//         success: function (resp) {
//             console.log(resp);
//             for (const customer of resp) {
//                 let option = `<option data-name="${customer.customer_name}">${customer.customer_code}</option>;`
//
//                 $("#customer-id").append(option);
//             }
//         },
//         error: function (xhr, exception) {
//             console.log("Error loading customer codes:", exception);
//         }
//     });
// };
//
// $('#customer-id').change((e) => {
//     const cust_code = e.target.value;
//     if ('Select customer code' !== cust_code) {
//         const name = e.target.options[e.target.selectedIndex].dataset.name;
//         $('#customer_name').val(name);
//     }
// });
// loadAllInventoryCode();
// loadAllCustomerName();
//
//
// $("#add_cart").click(function () {
//     updateTotal();
// });
// $("#unit_price, #qty_on_hand").on("input", updateTotal);
//
//
// let itemsArray = [
//     { item_id: '1', description: 'Item 1', qty: 10, item_price: 5.00 },
// ];
//
// function loadItemData() {
//
// }
//
// function updateTotal() {
//     const unitPrice = parseFloat($("#unit_price").val()) || 0;
//     const quantity = parseInt($("#order_qty").val()) || 0;
//     const total = (unitPrice * quantity);
//     $("#final_total").val(total.toFixed(2));
//     return total;
// }
//
// function addToCart() {
//     let item_id = $('#sale_item_id option:selected').text();
//     let itemExists = false;
//
//     $('#order_table_body .item_id').each(function () {
//         if ($(this).text() === item_id) {
//             itemExists = true;
//             let existingQty = parseInt($(this).closest('tr').find('.qty').text());
//             let qty = parseInt($('#order_qty').val());
//             let newQty = existingQty + qty;
//
//             let existingTotal = parseFloat($(this).closest('tr').find('.total').text());
//             let add_total = updateTotal(); // Update the total and return it
//             let newTotal = existingTotal + add_total;
//
//             let selectedItem = itemsArray.find(item => item.item_id === item_id);
//
//             if (selectedItem) {
//                 if (selectedItem.qty < qty) {
//                     toastr.error('Error: Not enough items in stock.');
//                     return;
//                 } else {
//                     selectedItem.qty -= qty;
//                     $(this).closest('tr').find('.qty').text(newQty);
//                     $(this).closest('tr').find('.total').text(newTotal.toFixed(2));
//                     loadItemData();
//                 }
//             }
//
//             return false;
//         }
//     });
//
//     if (!itemExists) {
//         console.log('Item with ID ' + item_id + ' is not in the table.');
//
//         let desc = $('#description').val();
//         let total = updateTotal();
//         let qty = $('#order_qty').val();
//
//         let selectedItem = itemsArray.find(item => item.item_id === item_id);
//
//         if (selectedItem) {
//             if (selectedItem.qty < qty) {
//                 toastr.error('Error: Not enough items in stock.');
//                 return;
//             } else {
//                 selectedItem.qty -= parseInt(qty);
//                 loadItemData();
//             }
//         }
//
//         let record = `<tr><td class="item_id">${item_id}</td><td class="desc">${desc}</td><td class="qty">${qty}</td><td class="total">${total.toFixed(2)}</td></tr>;`
//         $("#order_table_body").append(record);
//
//         toastr.success("Add to cart...🛒");
//     } else {
//         console.log('Item not found in itemsArray.');
//     }
//     callMethod();
//
//     $('#description').val('');
//     $('#unit_price').val('');
//     $('#qty_on_hand').val('');
//     $('#order_qty').val('');
//
//     function updateTotal() {
//         const unitPrice = parseFloat($("#unit_price").val()) || 0;
//         const quantity = parseInt($("#order_qty").val()) || 0;
//         const total = (unitPrice * quantity);
//         $("#final_total").val(total.toFixed(2));
//         return total;
//     }
// }
// $('#add_cart').on('click', addToCart);
//
// function callMethod() {
//     $("#order_table_body > tr").click(function () {
//         let item_id = $(this).find('.item_id').text();
//         let desc = $(this).find('.desc').text();
//         let qty = $(this).find('.qty').text();
//         let total = $(this).find('.total').text();
//
//         $("#order_item_id").val(item_id);
//         $("#description").val(desc);
//         $("#order_qty").val(qty);
//         $("#unit_price").val(total/qty);
//
//     });
// }
// $("#remove").click(function () {
//     let selectedItemId = $('#order_item_id').val();
//
//     $('#order_item_id').val('');
//     $('#description').val('');
//     $('#unit_price').val('');
//     $('#qty_on_hand').val('');
//     $('#order_qty').val('');
//     $('#final_total').val('');
//
//     $("#order_table_body tr").each(function () {
//         if ($(this).find('.item_id').text() === selectedItemId) {
//             $(this).remove();
//             return false;
//         }
//     });
// });
//
// $("#place_ord").click(function () {
//
//     let formData = new FormData();
//     formData.append("order_id", $("#order_id").val());
//     formData.append("customer_id", $("#customer_id").val());
//     formData.append("customer_name", $("#customer_name").val());
//     formData.append("order_item_id", $("#order_item_id").val());
//     formData.append("description", $("#description").val());
//     formData.append("total", $("#final_total").val());
//
//     $.ajax({
//         method: "POST",
//         url: "http://localhost:8080/POS_system_spring_war_exploded/api/v1/order",
//         async: true,
//         processData: false,
//         contentType: false,
//         data: formData,
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("accessToken")
//         },
//         success: function (data) {
//             reset();
//             alert("Order saved successfully.");
//         },
//         error: function (xhr, status, error) {
//             alert("Error: " + error);
//         }
//     });
// });
//
// const loadAllOrders = () => {
//     $("#place-tbl-body").empty();
//     $.ajax({
//         url: "http://localhost:8080/POS_system_spring_war_exploded/api/v1/order",
//         method: "GET",
//         dataType: "json",
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("accessToken")
//         },
//         success: function (resp) {
//             console.log(resp);
//             for (const order of resp) {
//                 let row = `<tr><td>${order.order_id}</td><td>${order.customer_id}</td><td>${order.customer_name}</td><td>${order.order_item_id}</td><td>${order.description}</td><td>${order.total}</td></tr>;`
//                 $("#place-tbl-body").append(row);
//             }
//             callMethod()
//         }
//     });
// }
// $("#detail_nav").click(function () {
//     loadAllOrders();
// });







const loadAllInventoryCode = () => {
    $('#sale_item_id').empty();
    $('#sale_item_id').append("<option selected>Select item code</option>");

    $.ajax({
        url: "http://localhost:8081/shop/api/v1/inventory",
        method: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function (resp) {
            console.log(resp);
            for (const inventory of resp) {
                let option = `<option data-description="${inventory.item_desc}" data-unitPrice="${inventory.unit_price_sale}" data-qty="${inventory.item_qty}">${inventory.item_code}</option>;`
                $("#sale_item_id").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading item codes:", exception);
        }
    });
}

$('#sale_item_id').change((e) => {
    const item_id_sale = e.target.value;
    if ('Select item code' !== item_id_sale) {
        const description = e.target.options[e.target.selectedIndex].getAttribute('data-description');
        $('#description').val(description);

        const unitPrice = e.target.options[e.target.selectedIndex].getAttribute('data-unitPrice');
        $('#unit_price').val(unitPrice);

        const qty = e.target.options[e.target.selectedIndex].getAttribute('data-qty');
        $('#qty_on_hand').val(qty);
    }
});

const loadAllCustomerName = () => {
    $('#sale_cust_name').empty();
    $('#sale_cust_name').append("<option selected>Select customer name</option>");

    $.ajax({
        url: "http://localhost:8081/shop/api/v1/customer",
        method: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function (resp) {
            console.log(resp);
            for (const customer of resp) {
                let option = `<option >${customer.customer_name}</option>;`
                $("#sale_cust_name").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading customer names:", exception);
        }
    });
};

const loadAllEmployeeName = () => {
    $('#cashier_name').empty();
    $('#cashier_name').append("<option selected>Select employee name</option>");

    $.ajax({
        url: "http://localhost:8081/shop/api/v1/employee",
        method: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function (resp) {
            console.log(resp);
            for (const employee of resp) {
                let option = `<option >${employee.employeeName}</option>;`
                $("#cashier_name").append(option);
            }
        },
        error: function (xhr, exception) {
            console.log("Error loading employee names:", exception);
        }
    });
};


loadAllInventoryCode();
loadAllCustomerName();
loadAllEmployeeName();

$("#add_cart").click(function () {
    addToCart();
    updateCartTotal();
});

$("#unit_price, #qty_on_hand, #order_qty").on("input", updateTotal);

let itemsArray = [
    { item_id: '1', description: 'Item 1', qty: 10, item_price: 5.00 },
];

function updateTotal() {
    const unitPrice = parseFloat($("#unit_price").val()) || 0;
    const quantity = parseInt($("#order_qty").val()) || 0;
    const total = (unitPrice * quantity);
    $("#final_total").val(total.toFixed(2));
    return total;
}

function addToCart() {
    let item_id = $('#sale_item_id option:selected').text();
    let itemExists = false;

    $('#order_table_body .item_id').each(function () {
        if ($(this).text() === item_id) {
            itemExists = true;
            let existingQty = parseInt($(this).closest('tr').find('.qty').text());
            let qty = parseInt($('#order_qty').val());
            let newQty = existingQty + qty;

            let existingTotal = parseFloat($(this).closest('tr').find('.total').text());
            let add_total = updateTotal(); // Update the total and return it
            let newTotal = existingTotal + add_total;

            let selectedItem = itemsArray.find(item => item.item_id === item_id);

            if (selectedItem) {
                if (selectedItem.qty < qty) {
                    toastr.error('Error: Not enough items in stock.');
                    return;
                } else {
                    selectedItem.qty -= qty;
                    $(this).closest('tr').find('.qty').text(newQty);
                    $(this).closest('tr').find('.total').text(newTotal.toFixed(2));
                    loadItemData();
                }
            }

            updateCartTotal();
            return false;
        }
    });

    if (!itemExists) {
        console.log('Item with ID ' + item_id + ' is not in the table.');

        let desc = $('#description').val();
        let total = updateTotal();
        let qty = $('#order_qty').val();

        let selectedItem = itemsArray.find(item => item.item_id === item_id);

        if (selectedItem) {
            if (selectedItem.qty < qty) {
                toastr.error('Error: Not enough items in stock.');
                return;
            } else {
                selectedItem.qty -= parseInt(qty);
                loadItemData();
            }
        }

        let record = `<tr><td class="item_id">${item_id}</td><td class="desc">${desc}</td><td class="qty">${qty}</td><td class="total">${total.toFixed(2)}</td></tr>;`
        $("#order_table_body").append(record);

        toastr.success("Add to cart...🛒");
    } else {
        console.log('Item not found in itemsArray.');
    }
    callMethod();

    $('#description').val('');
    $('#unit_price').val('');
    $('#qty_on_hand').val('');
    $('#order_qty').val('');

    updateCartTotal();
}

function updateCartTotal() {
    let total = 0;
    $('#order_table_body .total').each(function () {
        total += parseFloat($(this).text());
    });
    $("#final_total").val(total.toFixed(2));
}

$('#add_cart').on('click', addToCart);

function callMethod() {
    $("#order_table_body > tr").click(function () {
        let item_id = $(this).find('.item_id').text();
        let desc = $(this).find('.desc').text();
        let qty = $(this).find('.qty').text();
        let total = $(this).find('.total').text();

        $("#order_item_id").val(item_id);
        $("#description").val(desc);
        $("#order_qty").val(qty);
        $("#unit_price").val((parseFloat(total) / parseInt(qty)).toFixed(2));
    });
}

$("#remove").click(function () {
    let selectedItemId = $('#order_item_id').val();

    $('#order_item_id').val('');
    $('#description').val('');
    $('#unit_price').val('');
    $('#qty_on_hand').val('');
    $('#order_qty').val('');
    $('#final_total').val('');

    $("#order_table_body tr").each(function () {
        if ($(this).find('.item_id').text() === selectedItemId) {
            $(this).remove();
            return false;
        }
    });

    updateCartTotal();
});

$("#place_ord").click(function () {
    let formData = {
        order_no: $("#order_id").val(),
        item_code: $(".item_id").val(),
        customer_name: $("#sale_cust_name").val(),
        item_desc: $(".desc").val(),
        size: $("#sale_size").val(),
        unit_price: $(".total").val(),
        item_qty: $(".qty").val(),
        total_price: $("#order_qty").val(),
        purchase_date: $("#purch_date").val(),
        payment_method: $("#payment").val(),
        added_points: $("#add_point").val(),
        cashier_name: $("#cashier_name").val()
    };

    $.ajax({
        method: "POST",
        url: "http://localhost:8081/shop/api/v1/sale",
        contentType: "application/json",
        data: JSON.stringify(formData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function (data) {
            alert("Order saved successfully.");
        },
        error: function (xhr, status, error) {
            alert("Error: " + error);
        }
    });
});



const loadAllOrders = () => {
    $("#place-tbl-body").empty();
    $.ajax({
        url: "http://localhost:8081/shop/api/v1/order",
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
        success: function (resp) {
            console.log(resp);
            for (const order of resp) {
                let row = `<tr><td>${order.order_id}</td><td>${order.customer_id}</td><td>${order.customer_name}</td><td>${order.order_item_id}</td><td>${order.description}</td><td>${order.total}</td></tr>;`
                $("#place-tbl-body").append(row);
            }
            callMethod();
        }
    });
}

$("#detail_nav").click(function () {
    loadAllOrders();
});
