<?php
<?php
include 'config.php';

$sql = "SELECT * FROM tasks";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
    echo $row['task'] . " - " . $row['details'] . "<br>";
}
?>