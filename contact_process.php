<?php
require 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $conn->real_escape_string($_POST['first_name']);
    $last_name = $conn->real_escape_string($_POST['last_name']);
    $email = $conn->real_escape_string($_POST['email']);
    $message = $conn->real_escape_string($_POST['message']);

    $sql = "INSERT INTO messages (first_name, last_name, email, message) VALUES ('$first_name', '$last_name', '$email', '$message')";

    if ($conn->query($sql) === TRUE) {
        header("Location: contact.html?success=Message sent successfully! We will get back to you soon.");
        exit();
    } else {
        header("Location: contact.html?error=Failed to send message: " . $conn->error);
        exit();
    }
}
$conn->close();
?>
