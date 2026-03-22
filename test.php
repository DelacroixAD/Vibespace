<?php
$conn = new mysqli("127.0.0.1", "root", "root", "", 3307);

if ($conn->connect_error) {
    die("FAIL: " . $conn->connect_error);
} else {
    echo "SUCCESS ✅";
}
?>