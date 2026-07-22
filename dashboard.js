// Theme Management
let isDarkMode = false;

function toggleTheme() {
isDarkMode = !isDarkMode;
document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
isDarkMode = true;
document.body.setAttribute('data-theme', 'dark');
}

// Navigation
function showPage(pageId) {
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-item');

pages.forEach(page => {
page.style.display = 'none';
page.classList.remove('active');
});

navItems.forEach(item => {
item.classList.remove('active');
});

const selectedPage = document.getElementById(pageId);
const selectedNav = document.querySelector(`[data-page="${pageId}"]`);

if (selectedPage) {
selectedPage.style.display = 'block';
selectedPage.classList.add('active');
}

if (selectedNav) {
selectedNav.classList.add('active');
}

// Initialize charts when showing attendance or leaves pages
if (pageId === 'attendance') {
initializeAttendanceChart();
} else if (pageId === 'leaves') {
initializeLeavesChart();
}
}

// Mock Data
const subjects = [
{ name: 'Computer Science', status: 'present', time: '09:00 AM' },
{ name: 'Mathematics', status: 'present', time: '11:00 AM' },
{ name: 'Physics', status: 'absent', time: '01:00 PM' },
{ name: 'English Literature', status: 'late', time: '03:00 PM' }
];

const subjectReports = [
{ name: 'Computer Science', attended: 45, total: 50 },
{ name: 'Mathematics', attended: 38, total: 45 },
{ name: 'Physics', attended: 40, total: 48 },
{ name: 'Chemistry', attended: 35, total: 42 },
{ name: 'English', attended: 30, total: 40 }
];

// Initialize Subject List
function initializeSubjects() {
const subjectsList = document.getElementById('subjectsList');
if (!subjectsList) return;
subjectsList.innerHTML = '';

subjects.forEach(subject => {
const statusIcon = {
present: '✓',
absent: '✕',
late: '⏰'
}[subject.status];

const statusClass = {
present: 'text-green-600',
absent: 'text-red-600',
late: 'text-yellow-600'
}[subject.status];

const subjectItem = document.createElement('div');
subjectItem.className = 'subject-item';
subjectItem.innerHTML = `
<div class="subject-info">
<div class="status-icon ${statusClass}">${statusIcon}</div>
<div>
    <div class="subject-name">${subject.name}</div>
    <div class="subject-time">${subject.time}</div>
</div>
</div>
<div class="status-badge ${subject.status}">
${subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
</div>
`;

subjectsList.appendChild(subjectItem);
});
}

// Initialize Reports
function initializeReports() {
const reportsContainer = document.querySelector('.subject-reports');
reportsContainer.innerHTML = '';

subjectReports.forEach(subject => {
const percentage = Math.round((subject.attended / subject.total) * 100);
const statusClass = percentage >= 85 ? 'good' : percentage >= 75 ? 'warning' : 'danger';

const reportCard = document.createElement('div');
reportCard.className = 'card';
reportCard.innerHTML = `
<h4>${subject.name}</h4>
<div class="attendance-bar">
<div class="attendance-progress" style="width: ${percentage}%"></div>
</div>
<div class="attendance-stats">
<span>Classes Attended: ${subject.attended}/${subject.total}</span>
<span>${percentage}%</span>
</div>
<p class="attendance-status ${statusClass}">
${percentage >= 85 ? 'Excellent attendance!' : 
    percentage >= 75 ? 'Attendance is satisfactory' : 
    'Need to improve attendance'}
</p>
`;

reportsContainer.appendChild(reportCard);
});
}

// Initialize Charts
function initializeAttendanceChart() {
const ctx = document.getElementById('attendanceChart').getContext('2d');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const attendanceData = [88, 92, 85, 94, 78, 82, 90, 85, 82];
const avgClassesData = [92, 90, 88, 89, 86, 87, 91, 88, 85];

new Chart(ctx, {
type: 'line',
data: {
labels: months,
datasets: [
{
    label: 'Your Attendance %',
    data: attendanceData,
    borderColor: '#10b981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    fill: true,
    tension: 0.4
},
{
    label: 'Class Average %',
    data: avgClassesData,
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    fill: true,
    tension: 0.4
}
]
},
options: {
responsive: true,
scales: {
y: {
    beginAtZero: false,
    min: 70,
    max: 100
}
}
}
});
}

function initializeLeavesChart() {
const ctx = document.getElementById('leavesChart').getContext('2d');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
const sickLeaves = [2, 1, 3, 0, 2, 1, 0, 1, 2];
const personalLeaves = [1, 2, 0, 1, 0, 1, 2, 0, 1];
const emergencyLeaves = [0, 0, 1, 0, 0, 0, 0, 1, 0];

new Chart(ctx, {
type: 'bar',
data: {
labels: months,
datasets: [
{
    label: 'Sick Leaves',
    data: sickLeaves,
    backgroundColor: 'rgba(239, 68, 68, 0.7)',
    borderRadius: 4
},
{
    label: 'Personal Leaves',
    data: personalLeaves,
    backgroundColor: 'rgba(59, 130, 246, 0.7)',
    borderRadius: 4
},
{
    label: 'Emergency Leaves',
    data: emergencyLeaves,
    backgroundColor: 'rgba(245, 158, 11, 0.7)',
    borderRadius: 4
}
]
},
options: {
responsive: true,
scales: {
y: {
    beginAtZero: true,
    ticks: {
    stepSize: 1
    }
}
}
}
});
}

// Initialize Weekly Attendance Chart
function initializeWeeklyChart() {
const ctx = document.getElementById('weeklyAttendanceChart').getContext('2d');

// Sample weekly data
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const presentData = [8, 7, 9, 6, 8, 5];
const absentData = [2, 3, 1, 4, 2, 1];
const lateData = [1, 0, 2, 1, 1, 0];

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: days,
        datasets: [{
            label: 'Present',
            data: presentData,
            backgroundColor: '#10b981',
            borderColor: '#059669',
            borderWidth: 1
        }, {
            label: 'Absent',
            data: absentData,
            backgroundColor: '#ef4444',
            borderColor: '#dc2626',
            borderWidth: 1
        }, {
            label: 'Late',
            data: lateData,
            backgroundColor: '#f59e0b',
            borderColor: '#d97706',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weekly Attendance Distribution'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});
}

// Toggle profile dropdown
function toggleProfileDropdown() {
const dropdown = document.getElementById('logoutDropdown');
if (dropdown.style.display === 'block') {
dropdown.style.display = 'none';
} else {
dropdown.style.display = 'block';
}
}

// Logout function
function handleLogout() {
localStorage.removeItem('attendtrack_loggedin_user');
window.location.href = 'index.html';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const loggedInUser = JSON.parse(localStorage.getItem('attendtrack_loggedin_user'));
  if (!loggedInUser) {
    window.location.href = 'index.html';
  }
  // Display logged in user info
  if (loggedInUser) {
    document.querySelector('.student-name').textContent = `${loggedInUser.fullName || loggedInUser.username} - Student ID: ${loggedInUser.regNumber || 'N/A'}`;
    document.querySelector('.profile-name-small').textContent = loggedInUser.fullName ? loggedInUser.fullName.split(' ')[0] : loggedInUser.username;
    
    // Update profile page info
    if (document.querySelector('.profile-header h2')) {
      document.querySelector('.profile-header h2').textContent = loggedInUser.fullName || loggedInUser.username;
    }
    
    // Update registration number
    const regNumberElements = document.querySelectorAll('.detail-value');
    if (regNumberElements.length > 0) {
      regNumberElements[0].textContent = loggedInUser.regNumber || 'N/A';
    }
    
    // Update email
    const emailElements = document.querySelectorAll('.detail-value');
    if (emailElements.length > 4) {
      emailElements[4].textContent = loggedInUser.email || 'N/A';
    }
  }
// Theme toggle
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
item.addEventListener('click', () => {
const pageId = item.getAttribute('data-page');
showPage(pageId);
});
});

// Logout Button
const logoutButton = document.querySelector('.logout-button');
if (logoutButton) {
logoutButton.addEventListener('click', (e) => {
e.preventDefault();
handleLogout();
});
}

// Forms
document.getElementById('queryForm')?.addEventListener('submit', (e) => {
e.preventDefault();
alert('Query submitted successfully!');
e.target.reset();
});

document.getElementById('passwordForm')?.addEventListener('submit', (e) => {
e.preventDefault();
alert('Password changed successfully!');
e.target.reset();
});

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
e.preventDefault();
alert('Message sent successfully!');
e.target.reset();
});

// Export Daily Report
document.getElementById('exportDailyBtn')?.addEventListener('click', () => {
const selectedDate = document.getElementById('attendance-date').value;
const table = document.getElementById('attendance-table-body');

if (table.rows.length === 0 || (table.rows.length === 1 && table.rows[0].cells[0].colSpan > 1)) {
    alert('No attendance data to export for the selected date.');
    return;
}

let csvContent = "data:text/csv;charset=utf-8,";
csvContent += "Time,Subject,Status,Remarks\n";

Array.from(table.rows).forEach(row => {
    const rowData = [];
    Array.from(row.cells).forEach(cell => {
        rowData.push(cell.innerText);
    });
    csvContent += rowData.join(",") + "\n";
});

const encodedUri = encodeURI(csvContent);
const link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", `attendance_report_${selectedDate}.csv`);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
});

// Initialize components
initializeSubjects();
initializeReports();
initializeWeeklyChart();
showPage('dashboard');
});
// Example attendance data (replace with your real data source)
const attendanceData = {
"2025-12-10": [
    { time: "09:00 AM", subject: "Mathematics", status: "Present", remarks: "On time" },
    { time: "10:30 AM", subject: "Physics", status: "Late", remarks: "15 minutes late" },
    { time: "01:00 PM", subject: "Chemistry", status: "Present", remarks: "On time" },
    { time: "02:30 PM", subject: "English", status: "Present", remarks: "On time" }
],
"2025-12-09": [
    { time: "09:00 AM", subject: "Mathematics", status: "Absent", remarks: "Medical leave" },
    { time: "10:30 AM", subject: "Physics", status: "Present", remarks: "On time" },
    { time: "01:00 PM", subject: "Chemistry", status: "Present", remarks: "On time" }
],
"2025-12-08": [
    { time: "09:00 AM", subject: "Mathematics", status: "Present", remarks: "On time" },
    { time: "10:30 AM", subject: "Physics", status: "Absent", remarks: "Family emergency" },
    { time: "01:00 PM", subject: "Chemistry", status: "Late", remarks: "10 minutes late" },
    { time: "02:30 PM", subject: "English", status: "Present", remarks: "On time" }
],
"2025-12-07": [
    { time: "09:00 AM", subject: "Mathematics", status: "Present", remarks: "On time" },
    { time: "10:30 AM", subject: "Physics", status: "Present", remarks: "On time" },
    { time: "01:00 PM", subject: "Chemistry", status: "Present", remarks: "On time" }
],
"2025-12-06": [
    { time: "09:30 AM", subject: "Mathematics", status: "Late", remarks: "30 minutes late" },
    { time: "11:00 AM", subject: "Physics", status: "Present", remarks: "On time" },
    { time: "02:00 PM", subject: "Chemistry", status: "Absent", remarks: "Not feeling well" }
]
};

function renderAttendanceTable(date) {
const tableBody = document.getElementById('attendance-table-body');
tableBody.innerHTML = '';
const records = attendanceData[date] || [];

// Update attendance summary counts
let presentCount = 0;
let absentCount = 0;
let lateCount = 0;

records.forEach(record => {
    if (record.status === 'Present') presentCount++;
    else if (record.status === 'Absent') absentCount++;
    else if (record.status === 'Late') lateCount++;
});

// Update summary counts in the UI
document.getElementById('present-count').textContent = presentCount;
document.getElementById('absent-count').textContent = absentCount;
document.getElementById('late-count').textContent = lateCount;
document.getElementById('total-count').textContent = records.length;

if (records.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" class="py-4 px-4 text-center text-gray-500">No attendance records for this date.</td></tr>`;
    return;
}

records.forEach(record => {
    const row = document.createElement('tr');
    row.className = 'hover:bg-gray-50 dark:hover:bg-gray-800';
    row.innerHTML = `
    <td class="py-3 px-4 text-sm">${record.time}</td>
    <td class="py-3 px-4 text-sm font-medium">${record.subject}</td>
    <td class="py-3 px-4">
        <span class="status-badge ${record.status.toLowerCase()}">${record.status}</span>
    </td>
    <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">${record.remarks || '-'}</td>
    `;
    tableBody.appendChild(row);
});
}

// Set today's date as default and render
const dateInput = document.getElementById('attendance-date');
const today = new Date();
const todayStr = '2025-12-10'; // Using a date with data for demo purposes
dateInput.value = todayStr;
renderAttendanceTable(todayStr);

// Update table on date change
dateInput.addEventListener('change', (e) => {
renderAttendanceTable(e.target.value);
});