<?php
$host = "localhost";
$username = "root"; 
$password = "root"; 
$dbname = "productivity_db";

$conn = new mysqli($host, $username, $password, $dbname, 3307);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
