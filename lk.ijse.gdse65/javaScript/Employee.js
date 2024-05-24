$(document).ready(function () {
    function loadAllEmployee() {
        $("#employee-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8081/shop/api/v1/employee",
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function (resp) {
                for (const employee of resp) {
                    let row = `<tr><td>${employee.employeeId}</td><td>${employee.employeeName}</td><td>${employee.gender}</td><td>${employee.role}</td>
                                    <td>${employee.dob}</td><td>${employee.joinDate}</td><td>${employee.attachedBranch}</td><td>${employee.contactNo}</td><td>${employee.email}</td></tr>`;
                    $("#employee-tbl-body").append(row);
                }
                callMethod();
            },
            error: function () {
                alert("Error loading employees. Please try again later.");
            }
        });
    }

    function callMethod() {
        $("#employee-tbl-body>tr").click(function () {
            let employeeId = $(this).children().eq(0).text();
            let employeeName = $(this).children().eq(1).text();
            let gender = $(this).children().eq(2).text();
            let role = $(this).children().eq(3).text();
            let dob = $(this).children().eq(5).text();
            let joinDate = $(this).children().eq(4).text();
            let branch = $(this).children().eq(6).text();
            let contact = $(this).children().eq(7).text();
            let email = $(this).children().eq(8).text();

            $("#emp_id").val(employeeId);
            $("#emp_name").val(employeeName);
            $("#emp_gender").val(gender);
            $("#emp_role").val(role);
            $("#emp_dob").val(dob);
            $("#emp_joindate").val(joinDate);
            $("#attachedBranch").val(branch);
            $("#contact").val(contact);
            $("#emp_email").val(email);
        });
    }

    $("#save_employee").click(function () {
        let formData = new FormData();
        formData.append("employeeId", $("#emp_id").val());
        formData.append("employeeName", $("#emp_name").val());
        formData.append("gender", $("#emp_gender").val());
        formData.append("status", $("#status").val());
        formData.append("designation", $("#designation").val());
        formData.append("role", $("#emp_role").val());
        formData.append("dob", $("#emp_dob").val());
        formData.append("joinDate", $("#emp_joindate").val());
        formData.append("attachedBranch", $("#attachedBranch").val());
        formData.append("employeeAddress1", $("#employeeAddress1").val());
        formData.append("employeeAddress2", $("#employeeAddress2").val());
        formData.append("employeeAddress3", $("#employeeAddress3").val());
        formData.append("employeeAddress4", $("#employeeAddress4").val());
        formData.append("employeeAddress5", $("#employeeAddress5").val());
        formData.append("contactNo", $("#contact").val());
        formData.append("email", $("#emp_email").val());
        formData.append("informInCaseOfEmergency", $("#informInCaseOfEmergency").val());
        formData.append("emergencyContactNo", $("#emergencyContactNo").val());


        let fileInput = document.getElementById('emp_pic');
        formData.append("employeeProfilePic", fileInput.files[0]);

        $.ajax({
            method: "POST",
            url: "http://localhost:8081/shop/api/v1/employee",
            processData: false,
            contentType: false,
            data: formData,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function () {
                reset();
                alert("Employee saved successfully.");
            },
            error: function () {
                alert("Error saving employee. Please try again later.");
            }
        });
    });

    $("#update_employee").click(function () {
        let employeeId = $("#emp_id").val();
        let formData = new FormData();

        // Append form data
        formData.append("employeeId", employeeId);
        formData.append("employeeName", $("#emp_name").val());
        formData.append("gender", $("#emp_gender").val());
        formData.append("status", $("#status").val());
        formData.append("designation", $("#designation").val());
        formData.append("role", $("#emp_role").val());
        formData.append("dob", $("#emp_dob").val());
        formData.append("joinDate", $("#emp_joindate").val());
        formData.append("attachedBranch", $("#attachedBranch").val());
        formData.append("employeeAddress1", $("#employeeAddress1").val());
        formData.append("employeeAddress2", $("#employeeAddress2").val());
        formData.append("employeeAddress3", $("#employeeAddress3").val());
        formData.append("employeeAddress4", $("#employeeAddress4").val());
        formData.append("employeeAddress5", $("#employeeAddress5").val());
        formData.append("contactNo", $("#contact").val());
        formData.append("email", $("#emp_email").val());
        formData.append("informInCaseOfEmergency", $("#informInCaseOfEmergency").val());
        formData.append("emergencyContactNo", $("#emergencyContactNo").val());

        // Append file data if updated
        let fileInput = document.getElementById('emp_pic');
        if (fileInput.files.length > 0) {
            formData.append("employeeProfilePic", fileInput.files[0]);
        }

        $.ajax({
            method: "PATCH",
            url: "http://localhost:8081/shop/api/v1/employee", // Include employee ID in URL
            processData: false,
            contentType: false,
            data: formData,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function () {
                reset(); // Assuming reset() function is defined elsewhere
                alert("Employee updated successfully.");
            },
            error: function () {
                alert("Error updating employee. Please try again later.");
            }
        });
    });
    $("#delete_employee").click(function () {
        let empID = $("#emp_id").val();

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8081/shop/api/v1/employee/" + empID,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function () {
                reset();
                alert("Employee deleted successfully.");
            },
            error: function () {
                alert("Error deleting employee. Please try again later.");
            }
        });
    });

    $("#customer_reset").click(function () {
        reset();
    });

    function reset() {
        $("#emp_id").val("");
        $("#emp_name").val("");
        $("#emp_pic").val("");
        $("#emp_gender").val("");
        $("#status").val("");
        $("#designation").val("");
        $("#emp_role").val("");
        $("#emp_dob").val("");
        $("#emp_joindate").val("");
        $("#attachedBranch").val("");
        $("#employeeAddress1").val("");
        $("#employeeAddress2").val("");
        $("#employeeAddress3").val("");
        $("#employeeAddress4").val("");
        $("#employeeAddress5").val("");
        $("#contact").val("");
        $("#emp_email").val("");
        $("#informInCaseOfEmergency").val("");
        $("#emergencyContactNo").val("");
        loadAllEmployee();
    }

    loadAllEmployee();
});