<?php
session_start();
require 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect specific user ID if user is logged in
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : "NULL";
    
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $service = $conn->real_escape_string($_POST['service']);
    $date = $conn->real_escape_string($_POST['date']);
    $time = $conn->real_escape_string($_POST['time']);
    $notes = $conn->real_escape_string($_POST['notes']);

    $sql = "INSERT INTO bookings (user_id, name, email, phone, service, booking_date, booking_time, notes) 
            VALUES ($user_id, '$name', '$email', '$phone', '$service', '$date', '$time', '$notes')";

    if ($conn->query($sql) === TRUE) {
        header("Location: booking.html?success=Booking confirmed! We will contact you soon.");
        exit();
    } else {
        header("Location: booking.html?error=Booking Failed: " . $conn->error);
        exit();
    }
}
$conn->close();
?>
