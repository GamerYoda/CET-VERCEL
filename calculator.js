document.getElementById('emissionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const transportMiles = parseFloat(document.getElementById('transport').value);
    const foodMeals = parseFloat(document.getElementById('food').value);
    const extraActivities = document.getElementById('extra').value;

    // Simple emission factors (in kg CO2)
    const transportEmissionFactor = 0.404; // kg CO2 per mile driven
    const foodEmissionFactor = 2.5; // kg CO2 per meal
    const activityEmissionFactors = {
        'Flight': 200, // kg CO2 per flight
        'Car': 0.25, // kg CO2 per mile driven
        'Bus': 0.1, // kg CO2 per mile
        'Train': 0.05, // kg CO2 per mile
        'Electricity': 0.5, // kg CO2 per kWh
        'Meat': 3.0, // kg CO2 per meal (meat-based)
        'Vegetarian': 1.5, // kg CO2 per meal (vegetarian)
        'Waste': 0.1, // kg CO2 per kg of waste
        'HomeHeating': 2.5, // kg CO2 per hour of heating (oil/gas)
        'Gasoline': 2.31, // kg CO2 per liter of gasoline
        'NaturalGas': 2.75, // kg CO2 per therm of natural gas
        'CoalElectricity': 0.9 // kg CO2 per kWh from coal
    };

    // Calculate emissions
    let totalEmissions = (transportMiles * transportEmissionFactor) + (foodMeals * foodEmissionFactor);

    // Add predefined activities to total emissions
    totalEmissions += (document.getElementById('homeHeating').value || 0) * activityEmissionFactors['HomeHeating'];
    totalEmissions += (document.getElementById('gasoline').value || 0) * activityEmissionFactors['Gasoline'];
    totalEmissions += (document.getElementById('naturalGas').value || 0) * activityEmissionFactors['NaturalGas'];
    totalEmissions += (document.getElementById('coalElectricity').value || 0) * activityEmissionFactors['CoalElectricity'];

    // Process extra activities
    if (extraActivities) {
        const activities = extraActivities.split(',').map(activity => activity.trim());
        activities.forEach(activity => {
            const [name, emissions] = activity.split(' ');
            const emissionValue = parseFloat(emissions);
            if (activityEmissionFactors[name]) {
                totalEmissions += emissionValue * activityEmissionFactors[name];
            } else {
                alert(`Unknown activity: ${name}. Please check your input.`);
            }
        });
    }

    // Display result
    document.getElementById('result').innerText = `Total Carbon Emissions: ${totalEmissions.toFixed(2)} kg CO2`;
});

// Add functionality to add extra activities
document.getElementById('addActivity').addEventListener('click', function() {
    const extraInput = document.getElementById('extra');
    const newActivity = prompt("Enter activity and emissions (e.g., 'Flight 200'):");
    if (newActivity) {
        extraInput.value += (extraInput.value ? ', ' : '') + newActivity;
    }
});