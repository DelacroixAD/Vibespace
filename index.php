<?php
include 'config.php';

// Handle Task Addition
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] == 'add_task') {
    $task = $_POST['task'];
    $details = $_POST['details'];
    $is_important = isset($_POST['important']) ? 'true' : 'false';

    $stmt = $conn->prepare("INSERT INTO tasks (task, details, is_important) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $task, $details, $is_important);
    $stmt->execute();
    $stmt->close();
    
    header("Location: index.php?open=todo");
    exit();
}

// Handle Task Deletion
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
    
    header("Location: index.php?open=todo");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productivity Dashboard</title>
    <link rel="shortcut icon" href="./fav/android-chrome-512x512.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="main">
        <nav>
            <div class="nav-in">
                <h2>Productivity DashBoard</h2>
            <div class="theme">
                <h4>Change theme</h4>
            </div>
            </div>
        </nav>
        <section class="allElems">
            <header>
                <div class="header1">
                    <h2>20 April 2025</h2>
                    <h1>Saturday, 1:00 pm</h1>
                    <h4>Jaipur (RJ)</h4>
                </div>

                <div class="header2">
                    <h2>31°C</h2>
                    <h4>Sunny</h4>
                    <h3 class="precipitation">Precipitation: 35%</h3>
                    <h3 class="humidity">Humidity: 49%</h3>
                    <h3 class="wind">Wind: 10 km/h</h3>
                    
                </div>
            </header>
            <div class="allFeatures">
                <div class="todo elem" id="0">
                    <img src="https://i.pinimg.com/736x/5e/59/c4/5e59c43bce967816d5ef4a53eaad2192.jpg"
                        alt="">
                    <h2>To Do List</h2>
                </div>
                <div class="daily elem" id="1">
                    <img src="https://i.pinimg.com/1200x/71/37/45/7137458adc32d8d1e041bd78a157ece8.jpg"
                        alt="">
                    <h2>Daily Planner</h2>
                </div>
                <div class="moti elem" id="2">
                    <img src="https://i.pinimg.com/736x/b9/0f/f9/b90ff961515c0147052fa1f04429c7fd.jpg"
                        alt="">
                    <h2>Motivation</h2>
                </div>
                <div class="pomo elem" id="3">
                    <img src="https://i.pinimg.com/736x/9f/3a/67/9f3a671a64235833f003824cbb3c7e23.jpg"
                        alt="">
                    <h2>Pomodoro Timer</h2>
                </div>
                <div class="goals elem" id="4">
                    <img src="https://i.pinimg.com/736x/4d/a4/16/4da4161bbf057a2ad82ccfcd5f1140c3.jpg"
                        alt="">
                    <h2>Daily Goals</h2>
                </div>
            </div>
        </section>

        <section class="fullElem todo-list-fullpage" <?php if(isset($_GET['open']) && $_GET['open'] == 'todo') echo 'style="display: block;"'; ?>>
            <button class="back" id="0" onclick="window.location.href='index.php'">Close</button>
            <h2>Your Personalised Task List</h2>
            <div class="todo-container">
                <div class="addTask">
                    <form action="index.php" method="POST">
                        <input type="hidden" name="action" value="add_task">
                        <input id="task-input" type="text" placeholder="Enter Task" name="task" required>
                        <textarea placeholder="Enter Details" name="details" id="" cols="30" rows="10"></textarea>
                        <div class="mark-imp">
                            <input type="checkbox" name="important" id="check" value="yes">
                            <label for="check">Mark as Important!</label>
                        </div>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
                <div class="allTask">
                    <?php
                    $result = $conn->query("SELECT * FROM tasks ORDER BY created_at ASC");
                    if ($result && $result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $impClass = $row['is_important'] == 'true' ? 'true' : 'false';
                            echo '<div class="task">';
                            echo '<h5>' . htmlspecialchars($row['task']) . ' <span class="' . $impClass . '">imp</span></h5>';
                            echo '<button onclick="window.location.href=\'index.php?delete=' . $row['id'] . '\'">Mark as Completed</button>';
                            echo '</div>';
                        }
                    } else {
                        echo '<h4 style="color: var(--sec); font-size: 24px;">Task list is Empty</h4>';
                    }
                    ?>
                </div>
            </div>
        </section>
        <section class="fullElem daily-planner-fullpage">
            <button class="back" id="1">Close</button>
            <h2>Plan your Day to be more Productive</h2>

            <div class="day-planner">



            </div>

        </section>
        <section class="fullElem motivational-fullpage">
            <button class="back" id="2">Close</button>
            <div class="motivation-fullPage-container">
                <div class="motivation-container">
                    <div class="motivation-wrapper">
                        <img src="./icons8-quote-100.png" alt="">
                        <div class="motivation-1">
                            <h2>Quote of the Day</h2>
                        </div>
                        <div class="motivation-2">
                            <h1></h1>
                        </div>
                        <div class="motivation-3">
                            <h2></h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="fullElem pomodoro-fullpage">
            <button class="back" id="3">Close</button>
            <h2>Study with me!</h2>

            <h4 class="session">Work Session</h4>
            <div class="pomo-timer">
                <h1>25:00</h1>
                <button class="start-timer">Start</button>
                <button class="pause-timer">Pause</button>
                <button class="reset-timer">Reset</button>
            </div>
        </section>
        <section class="fullElem daily-goals-fullpage">
            <button class="back" id="4">Close</button>
            <h2>Daily Goals</h2>

            <div class="dg-page-shell">
                <div class="dg-container">
                    <div class="dg-summary">
                        <article class="dg-stat-card">
                            <h3>Total Goals</h3>
                            <h1 id="dg-total">0</h1>
                        </article>
                        <article class="dg-stat-card">
                            <h3>Completed</h3>
                            <h1 id="dg-completed">0</h1>
                        </article>
                        <article class="dg-stat-card">
                            <h3>Completion Rate</h3>
                            <h1 id="dg-progress">0%</h1>
                        </article>
                    </div>

                    <div class="dg-main-grid">
                        <aside class="dg-add-card">
                            <h3>Add New Goal</h3>
                            <form id="dg-form">
                                <input type="text" id="dg-input" placeholder="Goal title" required maxlength="70">
                                <input type="text" id="dg-target" placeholder="Target (example: 2 hours)" maxlength="50">
                                <select id="dg-category">
                                    <option value="Work">Work</option>
                                    <option value="Health">Health</option>
                                    <option value="Learning">Learning</option>
                                    <option value="Personal">Personal</option>
                                </select>
                                <select id="dg-priority">
                                    <option value="high">High Priority</option>
                                    <option value="medium" selected>Medium Priority</option>
                                    <option value="low">Low Priority</option>
                                </select>
                                <button type="submit" class="dg-btn-primary">Add Goal</button>
                            </form>
                            <div class="dg-quick-actions">
                                <button type="button" id="dg-clear-completed" class="dg-btn-secondary">Clear Completed</button>
                                <button type="button" id="dg-reset-all" class="dg-btn-secondary">Reset All</button>
                            </div>
                        </aside>

                        <section class="dg-goals-panel">
                            <div class="dg-toolbar">
                                <input type="text" id="dg-search" placeholder="Search goals">
                                <select id="dg-filter-status">
                                    <option value="all">All</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <select id="dg-sort">
                                    <option value="latest">Sort: Latest</option>
                                    <option value="priority">Sort: Priority</option>
                                    <option value="progress">Sort: Progress</option>
                                </select>
                            </div>

                            <div class="dg-list-grid" id="dg-list"></div>
                            <div id="dg-empty-state" class="dg-empty-state" style="display:none;">No goals yet</div>
                        </section>
                    </div>
                </div>
            </div>
        </section>

        
    </div>
    <script src="script.js"></script>
</body>

</html>
