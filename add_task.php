<?php
<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $task = $_POST['task'];
    $details = $_POST['details'];
    $is_important = $_POST['is_important'];
    
    $sql = "INSERT INTO tasks (task, details, is_important) VALUES ('$task', '$details', '$is_important')";
    
    if ($conn->query($sql)) {
        echo "Task added successfully!";
    }
}
?>