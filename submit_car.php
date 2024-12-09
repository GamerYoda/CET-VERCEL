<?php
// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Database connection
    $conn = new mysqli('localhost', 'root', 'CET@5129x', 'car_database');

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get user input and sanitize
    $make = trim($_POST['make']);
    $model = trim($_POST['model']);
    $year = intval($_POST['year']);
    $color = $_POST['color'];
    $price = floatval($_POST['price']);

    // Validate input
    if (empty($make) || empty($model) || empty($year) || empty($color) || empty($price)) {
        die("Please fill in all fields.");
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO cars (make, model, year, color, price) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssiss", $make, $model, $year, $color, $price);
    
    // Execute the statement
    if ($stmt->execute()) {
        echo "Car data submitted successfully.";
    } else {
        error_log("Database error: " . $stmt->error);
        die("An error occurred. Please try again later.");
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>