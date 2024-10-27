document.addEventListener('DOMContentLoaded', function() {
    // Simulated data
    const avgCalories = 500;
    const totalCalories = 15000;
    const workouts = [
        { type: 'Strength Training', duration: 30, calories: 300 },
        { type: 'Cardio', duration: 45, calories: 400 },
    ];

    // Update average calories text
    document.getElementById('avg-calories-text').innerText = `${avgCalories} cal/week`;
    
    // Total calories counter
    document.getElementById('total-calories-counter').innerText = `${totalCalories} cal`;
    
    // Generate workouts list
    const workoutsList = document.getElementById('workouts-list');
    workouts.forEach(workout => {
        const li = document.createElement('li');
        li.innerText = `${workout.type} - ${workout.duration} min - ${workout.calories} cal`;
        workoutsList.appendChild(li);
    });

    // Chart setup
    const ctx = document.getElementById('avg-calories-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Average Calories Burned',
                data: [400, 500, 600, 550],
                borderColor: '#4caf50',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
