<?php
session_start();
require 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['username']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    if ($password !== $confirm_password) {
        header("Location: register.html?error=Passwords do not match");
        exit();
    }

    // Check if user already exists
    $check_query = "SELECT id FROM users WHERE email='$email' OR username='$username'";
    $result = $conn->query($check_query);
    if ($result->num_rows > 0) {
        header("Location: register.html?error=Username or Email already exists");
        exit();
    }

    $hashed_pwd = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashed_pwd')";
    
    if ($conn->query($sql) === TRUE) {
        header("Location: login.html?success=Registration successful! Please log in.");
        exit();
    } else {
        header("Location: register.html?error=Error: " . $conn->error);
        exit();
    }
}
$conn->close();
?>
