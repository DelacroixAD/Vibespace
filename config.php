<?php
$host = "localhost";
$username = "root"; // Default XAMPP username
$password = "root"; // Default XAMPP password
$dbname = "productivity_db";

// Create connection
$conn = new mysqli($host, $username, $password, $dbname, 3307);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
