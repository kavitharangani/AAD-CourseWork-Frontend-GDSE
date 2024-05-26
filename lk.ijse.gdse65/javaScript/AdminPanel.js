$(document).ready(function() {
    // Function to fetch the total number of customers and update the label
    function updateCustomerCount() {
        $.ajax({
            url: "http://localhost:8081/shop/api/v1/customer/count",
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function(data) {
                $('#totalCustomersLabel').text(data);
            },
            error: function(xhr, status, error) {
                console.error("Failed to fetch customer count:", error);
            }
        });
    }

    // Call the function when the page is loaded
    updateCustomerCount();
});
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '8a06f4dc660ba18f71e14f9f327bd561'; // Replace with your OpenWeatherMap API key
    const city = 'Panadura'; // You can replace this with any city you want
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const location = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;

            document.getElementById('location').textContent = `Location: ${location}`;
            document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
            document.getElementById('weatherDesc').textContent = `WeatherDesc: ${description}`;
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('location').textContent = 'Error fetching weather data';
        });
});
$(document).ready(function() {
    // Function to fetch the total number of customers and update the label
    function updateEmployeeCount() {
        $.ajax({
            url: "http://localhost:8081/shop/api/v1/employee/count",
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
            success: function(data) {
                $('#totalEmployeesLabel').text(data);
            },
            error: function(xhr, status, error) {
                console.error("Failed to fetch employee count:", error);
            }
        });
    }

    // Call the function when the page is loaded
    updateEmployeeCount();
});