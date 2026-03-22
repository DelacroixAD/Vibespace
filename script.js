function openFeatures() {
    var allElems = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var fullElemPageBackBtn = document.querySelectorAll('.fullElem .back')

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none'
        })
    })
}

openFeatures()


function todoList() {

    var currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is Empty');
    }



    function renderTask() {

        var allTask = document.querySelector('.allTask')

        var sum = ''

        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`
        })

        allTask.innerHTML = sum

        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()
            })
        })
    }
    renderTask()

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                details: taskDetailsInput.value,
                imp: taskCheckbox.checked
            }
        )
        renderTask()

        taskCheckbox.checked = false
        taskInput.value = ''
        taskDetailsInput.value = ''
    })



}

// todoList() // Commented since PHP Backend handles the ToDo logic now.


function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('hello');
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()


function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    var fallbackQuotes = [
        {
            content: 'Discipline is choosing between what you want now and what you want most.',
            author: 'Abraham Lincoln'
        },
        {
            content: 'Small progress each day adds up to big results.',
            author: 'Unknown'
        },
        {
            content: 'Do not wait for motivation. Start, and motivation will follow.',
            author: 'Unknown'
        },
        {
            content: 'Success is the sum of small efforts, repeated day in and day out.',
            author: 'Robert Collier'
        }
    ]

    function renderQuote(content, author) {
        motivationQuoteContent.innerHTML = content
        motivationAuthor.innerHTML = author
    }

    async function fetchQuote() {
        try {
            let response = await fetch('https://api.quotable.io/random')

            if (!response.ok) {
                throw new Error('Quote API request failed')
            }

            let data = await response.json()
            renderQuote(data.content, data.author)
        } catch (error) {
            var randomIndex = Math.floor(Math.random() * fallbackQuotes.length)
            var fallback = fallbackQuotes[randomIndex]
            renderQuote(fallback.content, fallback.author)
        }
    }

    fetchQuote()
}

motivationalQuote()


function pomodoroTimer() {

    let timer = document.querySelector('.pomo-timer h1')
    let startBtn = document.querySelector('.start-timer')
    let pauseBtn = document.querySelector('.pause-timer')
    let resetBtn = document.querySelector('.reset-timer')
    let session = document.querySelector('.session')

    const POMODORO_DURATION_SECONDS = 25 * 60
    let totalSeconds = POMODORO_DURATION_SECONDS
    let timerInterval = null
    let endTime = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML =
            String(minutes).padStart(2, '0') + ":" +
            String(seconds).padStart(2, '0')
    }

    function startTimer() {
        if (timerInterval !== null) return // prevent multiple intervals

        session.innerHTML = 'Work Session'

        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--
                updateTimer()
            } else {
                clearInterval(timerInterval)
                timerInterval = null
                totalSeconds = 0
                updateTimer()
                session.innerHTML = 'Session Complete'
            }
        }, 1000)
    }

    function pauseTimer() {
        clearInterval(timerInterval)
        timerInterval = null
    }

    function resetTimer() {
        clearInterval(timerInterval)
        timerInterval = null
        totalSeconds = POMODORO_DURATION_SECONDS
        session.innerHTML = 'Work Session'
        updateTimer()
    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)

    updateTimer() // show 25:00 initially
}

pomodoroTimer()



function weatherFunctionality() {


    var apiKey = 'd8a9eb0c732e41f6b14213041262203'
    var city = 'Jaipur'



    var header1Time = document.querySelector('.header1 h1')
    var header1Date = document.querySelector('.header1 h2')
    var header1City = document.querySelector('.header1 h4')
    var header2Temp = document.querySelector('.header2 h2')
    var header2Condition = document.querySelector('.header2 h4')
    var precipitation = document.querySelector('.header2 .precipitation')
    var humidity = document.querySelector('.header2 .humidity')
    var wind = document.querySelector('.header2 .wind')

    var data = null

    async function weatherAPICall() {
        var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`)
        data = await response.json()

        header1City.innerHTML = city
        header2Temp.innerHTML = `${data.current.temp_c}°C`
        header2Condition.innerHTML = `${data.current.condition.text}`
        wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
        humidity.innerHTML = `Humidity: ${data.current.humidity}%`
        precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`
    }

    weatherAPICall()


    function timeDate() {
        const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var date = new Date()
        var dayOfWeek = totalDaysOfWeek[date.getDay()]
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        var tarik = date.getDate()
        var month = monthNames[date.getMonth()]
        var year = date.getFullYear()

        header1Date.innerHTML = `${tarik} ${month}, ${year}`

        if (hours > 12) {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`

        } else {
            header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2', '0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }

    setInterval(() => {
        timeDate()
    }, 1000);

}

weatherFunctionality()


function dailyGoals() {
    var GOALS_KEY = 'dailyGoalsV3'
    var LEGACY_GOALS_KEY = 'dailyGoalsV2'

    var form = document.getElementById('dg-form')
    var titleInput = document.getElementById('dg-input')
    var targetInput = document.getElementById('dg-target')
    var categoryInput = document.getElementById('dg-category')
    var priorityInput = document.getElementById('dg-priority')
    var searchInput = document.getElementById('dg-search')
    var filterStatus = document.getElementById('dg-filter-status')
    var sortSelect = document.getElementById('dg-sort')
    var clearCompletedBtn = document.getElementById('dg-clear-completed')
    var resetAllBtn = document.getElementById('dg-reset-all')

    var totalEl = document.getElementById('dg-total')
    var completedEl = document.getElementById('dg-completed')
    var progressEl = document.getElementById('dg-progress')
    var listEl = document.getElementById('dg-list')
    var emptyEl = document.getElementById('dg-empty-state')

    if (!form || !listEl || !emptyEl) {
        return
    }

    var storedGoals = JSON.parse(localStorage.getItem(GOALS_KEY) || 'null')
    if (!storedGoals) {
        storedGoals = JSON.parse(localStorage.getItem(LEGACY_GOALS_KEY) || '[]')
    }

    var goals = normalizeGoals(storedGoals)

    function normalizeGoals(rawGoals) {
        if (!Array.isArray(rawGoals)) {
            return []
        }

        return rawGoals.map(function (goal, index) {
            var progress = Number(goal.progress)
            progress = Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0

            return {
                id: Number(goal.id) || Date.now() + index,
                title: String(goal.title || '').trim(),
                target: String(goal.target || '').trim(),
                category: String(goal.category || 'Work'),
                priority: String(goal.priority || 'medium'),
                progress: progress,
                completed: Boolean(goal.completed) || progress === 100,
                createdAt: Number(goal.createdAt) || Date.now()
            }
        }).filter(function (goal) {
            return goal.title.length > 0
        })
    }

    function saveGoals() {
        localStorage.setItem(GOALS_KEY, JSON.stringify(goals))
    }

    function priorityWeight(priority) {
        if (priority === 'high') return 3
        if (priority === 'medium') return 2
        return 1
    }

    function sanitizeGoalText(text) {
        return text.trim().replace(/\s+/g, ' ')
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
    }

    function getVisibleGoals() {
        var searchTerm = (searchInput.value || '').toLowerCase().trim()
        var status = filterStatus.value
        var sortBy = sortSelect.value

        var visible = goals.filter(function (goal) {
            var searchMatches = !searchTerm || goal.title.toLowerCase().includes(searchTerm) || goal.category.toLowerCase().includes(searchTerm)
            var statusMatches = status === 'all' || (status === 'active' && !goal.completed) || (status === 'completed' && goal.completed)
            return searchMatches && statusMatches
        })

        visible.sort(function (a, b) {
            if (sortBy === 'latest') {
                return b.createdAt - a.createdAt
            }

            if (sortBy === 'priority') {
                return priorityWeight(b.priority) - priorityWeight(a.priority) || b.createdAt - a.createdAt
            }

            return b.progress - a.progress
        })

        return visible
    }

    function updateSummary() {
        var totalGoals = goals.length
        var completedGoals = goals.filter(function (goal) {
            return goal.completed
        }).length

        var completionRate = totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100)

        totalEl.textContent = String(totalGoals)
        completedEl.textContent = String(completedGoals)
        progressEl.textContent = completionRate + '%'
    }

    function renderGoals() {
        var visibleGoals = getVisibleGoals()

        if (visibleGoals.length === 0) {
            listEl.innerHTML = ''
            emptyEl.style.display = 'block'
            updateSummary()
            return
        }

        emptyEl.style.display = 'none'

        var markup = visibleGoals.map(function (goal) {
            var doneText = goal.completed ? 'Undo' : 'Complete'
            var targetText = goal.target ? 'Target: ' + goal.target : 'Target: Not set'

            return '<article class="dg-goal-card ' + (goal.completed ? 'completed' : '') + '" data-id="' + goal.id + '">' +
                '<div class="dg-goal-head">' +
                '<h3 class="dg-goal-title">' + escapeHTML(goal.title) + '</h3>' +
                '<span class="dg-chip ' + escapeHTML(goal.priority) + '">' + escapeHTML(goal.priority.toUpperCase()) + '</span>' +
                '</div>' +
                '<p class="dg-goal-target">' + escapeHTML(targetText) + '</p>' +
                '<p class="dg-goal-target">Category: ' + escapeHTML(goal.category) + '</p>' +
                '<div class="dg-progress-row">' +
                '<span>Progress</span>' +
                '<span>' + goal.progress + '%</span>' +
                '</div>' +
                '<div class="dg-progress-track">' +
                '<div class="dg-progress-fill" data-width="' + goal.progress + '"></div>' +
                '</div>' +
                '<div class="dg-actions">' +
                '<button class="dg-card-btn progress" data-action="progress" data-id="' + goal.id + '">Progress +10</button>' +
                '<button class="dg-card-btn complete" data-action="toggle" data-id="' + goal.id + '">' + doneText + '</button>' +
                '<button class="dg-card-btn delete" data-action="delete" data-id="' + goal.id + '">Delete</button>' +
                '</div>' +
                '</article>'
        }).join('')

        listEl.innerHTML = markup

        requestAnimationFrame(function () {
            document.querySelectorAll('.dg-progress-fill').forEach(function (fill) {
                fill.style.width = fill.dataset.width + '%'
            })
        })

        updateSummary()
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        var title = sanitizeGoalText(titleInput.value)
        var target = sanitizeGoalText(targetInput.value)

        if (!title) {
            return
        }

        goals.push({
            id: Date.now() + Math.floor(Math.random() * 1000),
            title: title,
            target: target,
            category: categoryInput.value,
            priority: priorityInput.value,
            progress: 0,
            completed: false,
            createdAt: Date.now()
        })

        saveGoals()
        form.reset()
        categoryInput.value = 'Work'
        priorityInput.value = 'medium'
        renderGoals()
    })

    listEl.addEventListener('click', function (event) {
        var action = event.target.dataset.action
        var id = Number(event.target.dataset.id)

        if (!action || !id) {
            return
        }

        var goalIndex = goals.findIndex(function (goal) {
            return goal.id === id
        })

        if (goalIndex === -1) {
            return
        }

        if (action === 'delete') {
            goals.splice(goalIndex, 1)
        }

        if (action === 'toggle') {
            goals[goalIndex].completed = !goals[goalIndex].completed
            goals[goalIndex].progress = goals[goalIndex].completed ? 100 : Math.min(goals[goalIndex].progress, 90)
        }

        if (action === 'progress') {
            goals[goalIndex].progress = Math.min(100, goals[goalIndex].progress + 10)
            goals[goalIndex].completed = goals[goalIndex].progress === 100
        }

        saveGoals()
        renderGoals()
    })

    clearCompletedBtn.addEventListener('click', function () {
        goals = goals.filter(function (goal) {
            return !goal.completed
        })
        saveGoals()
        renderGoals()
    })

    resetAllBtn.addEventListener('click', function () {
        goals = goals.map(function (goal) {
            return {
                id: goal.id,
                title: goal.title,
                target: goal.target,
                category: goal.category,
                priority: goal.priority,
                progress: 0,
                completed: false,
                createdAt: goal.createdAt
            }
        })
        saveGoals()
        renderGoals()
    })

    searchInput.addEventListener('input', renderGoals)
    filterStatus.addEventListener('change', renderGoals)
    sortSelect.addEventListener('change', renderGoals)

    saveGoals()
    renderGoals()
}

dailyGoals()


function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }

    })


}

changeTheme()
