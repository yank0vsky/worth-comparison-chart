let sourceData;
let chart;

// Source data directly in the script
sourceData = [
      
    { "net_wealth": 10400, "age": 34, "compare_to": "Median USA Household", "currency": "USD" },
    { "net_wealth": 47000, "age": 44, "compare_to": "Median USA Household", "currency": "USD" },
    { "net_wealth": 105350, "age": 54, "compare_to": "Median USA Household", "currency": "USD" },
    { "net_wealth": 165720, "age": 64, "compare_to": "Median USA Household", "currency": "USD" },
    { "net_wealth": 232100, "age": 74, "compare_to": "Median USA Household", "currency": "USD" },
    { "net_wealth": 195000, "age": 80, "compare_to": "Median USA Household", "currency": "USD" },

    { "net_wealth": 75430, "age": 34, "compare_to": "Mean USA Household", "currency": "USD" },
    { "net_wealth": 347480, "age": 44, "compare_to": "Mean USA Household", "currency": "USD" },
    { "net_wealth": 526040, "age": 54, "compare_to": "Mean USA Household", "currency": "USD" },
    { "net_wealth": 795390, "age": 64, "compare_to": "Mean USA Household", "currency": "USD" },
    { "net_wealth": 1047310, "age": 74, "compare_to": "Mean USA Household", "currency": "USD" },
    { "net_wealth": 611430, "age": 80, "compare_to": "Mean USA Household", "currency": "USD" },

    // Portuguese Household (Median) in EUR
    { "net_wealth": 14100, "age": 25, "compare_to": "Portuguese Household (Median)", "currency": "EUR" },
    { "net_wealth": 62600, "age": 35, "compare_to": "Portuguese Household (Median)", "currency": "EUR" },
    { "net_wealth": 86300, "age": 45, "compare_to": "Portuguese Household (Median)", "currency": "EUR" },
    { "net_wealth": 94600, "age": 55, "compare_to": "Portuguese Household (Median)", "currency": "EUR" },
    { "net_wealth": 87800, "age": 65, "compare_to": "Portuguese Household (Median)", "currency": "EUR" },
    { "net_wealth": 79700, "age": 75, "compare_to": "Portuguese Household (Median)", "currency": "EUR" },

    // Portuguese Household (Mean) in EUR
    { "net_wealth": 70600, "age": 25, "compare_to": "Portuguese Household (Mean)", "currency": "EUR" },
    { "net_wealth": 125900, "age": 35, "compare_to": "Portuguese Household (Mean)", "currency": "EUR" },
    { "net_wealth": 199200, "age": 45, "compare_to": "Portuguese Household (Mean)", "currency": "EUR" },
    { "net_wealth": 206400, "age": 55, "compare_to": "Portuguese Household (Mean)", "currency": "EUR" },
    { "net_wealth": 173200, "age": 65, "compare_to": "Portuguese Household (Mean)", "currency": "EUR" },
    { "net_wealth": 154400, "age": 75, "compare_to": "Portuguese Household (Mean)", "currency": "EUR" },

    // Euro Area Household (Median) in EUR
    { "net_wealth": 14000, "age": 25, "compare_to": "Euro Area Household (Median)", "currency": "EUR" },
    { "net_wealth": 70000, "age": 35, "compare_to": "Euro Area Household (Median)", "currency": "EUR" },
    { "net_wealth": 130000, "age": 45, "compare_to": "Euro Area Household (Median)", "currency": "EUR" },
    { "net_wealth": 168800, "age": 55, "compare_to": "Euro Area Household (Median)", "currency": "EUR" },
    { "net_wealth": 169500, "age": 65, "compare_to": "Euro Area Household (Median)", "currency": "EUR" },
    { "net_wealth": 114700, "age": 75, "compare_to": "Euro Area Household (Median)", "currency": "EUR" },

    // Euro Area Household (Mean) in EUR
    { "net_wealth": 64500, "age": 25, "compare_to": "Euro Area Household (Mean)", "currency": "EUR" },
    { "net_wealth": 157800, "age": 35, "compare_to": "Euro Area Household (Mean)", "currency": "EUR" },
    { "net_wealth": 272000, "age": 45, "compare_to": "Euro Area Household (Mean)", "currency": "EUR" },
    { "net_wealth": 306100, "age": 55, "compare_to": "Euro Area Household (Mean)", "currency": "EUR" },
    { "net_wealth": 299600, "age": 65, "compare_to": "Euro Area Household (Mean)", "currency": "EUR" },
    { "net_wealth": 242500, "age": 75, "compare_to": "Euro Area Household (Mean)", "currency": "EUR" },
    
    // Elon Musk (sure wanna see it?)'s wealth progression (approximated and based on available data)
    { "net_wealth": 2000000, "age": 30, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  },
    { "net_wealth": 2000000000, "age": 40, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  }, // Around 2011
    { "net_wealth": 5000000000, "age": 42, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  }, // Around 2013
    { "net_wealth": 10000000000, "age": 44, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  }, // Around 2015
    { "net_wealth": 20000000000, "age": 46, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  }, // Around 2017
    { "net_wealth": 40000000000, "age": 48, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  }, // Around 2019
    { "net_wealth": 150000000000, "age": 49, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  }, // Around 2020
    { "net_wealth": 200000000000, "age": 50, "compare_to": "Elon Musk (sure wanna see it?)", "currency": "USD"  } ,// Around 2021

];
// Fetch exchange rates from ExchangeRate-API
async function fetchExchangeRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    const data = await response.json();
    return data.rates;
}

// Convert EUR values to USD using fetched exchange rate
async function convertEURToUSD(sourceData) {
    const rates = await fetchExchangeRates();
    const euroToUsdRate = rates.USD;

    return sourceData.map(item => {
        if (item.currency === 'EUR') {
            return {
                ...item,
                net_wealth: item.net_wealth * euroToUsdRate,
                currency: 'USD'  // Mark as converted to USD
            };
        }
        return item; // No conversion needed if already in USD
    });
}

// Populate the dropdown immediately
populateDropdown();

function populateDropdown() {
    console.log('populateDropdown called');
    const compareToSelect = document.getElementById('compareTo');
    const uniqueCompareTo = [...new Set(sourceData.map(item => item.compare_to))];
    
    // Clear existing options
    compareToSelect.innerHTML = '';
    
    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a comparison';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    compareToSelect.appendChild(defaultOption);
    
    // Add options from the data
    uniqueCompareTo.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        compareToSelect.appendChild(option);
    });
}

// Add event listener to compareTo dropdown to update conversion rate note
document.getElementById('compareTo').addEventListener('change', async function() {
    const compareTo = this.value;
    const selectedData = sourceData.find(item => item.compare_to === compareTo);
    if (selectedData && selectedData.currency === 'EUR') {
        const rates = await fetchExchangeRates();
        const euroToUsdRate = rates.USD;
        const note = document.getElementById('conversionRateNote');
        if (note) {
            note.textContent = `EUR/USD conversion rate: ${euroToUsdRate}`;
        } else {
            const newNote = document.createElement('div');
            newNote.id = 'conversionRateNote';
            newNote.textContent = `EUR/USD conversion rate: ${euroToUsdRate}`;
            document.getElementById('userDataForm').appendChild(newNote);
        }
    } else {
        const note = document.getElementById('conversionRateNote');
        if (note) {
            note.textContent = '';
        }
    }
});

// Handle form submission
document.getElementById('userDataForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log('Form submitted');
    const convertedSourceData = await convertEURToUSD(sourceData);
    console.log('Converted Source Data:', convertedSourceData); // Debugging log

    const userData = {
        name: document.getElementById('name').value,
        currentWealth: parseFloat(document.getElementById('currentWealth').value),
        savingsPerYear: parseFloat(document.getElementById('savingsPerYear').value),
        age: parseInt(document.getElementById('age').value),
        investmentRate: parseFloat(document.getElementById('investmentRate').value) / 100,
        compareTo: document.getElementById('compareTo').value,
        fireMonthlySpend: parseFloat(document.getElementById('fireMonthlySpend').value) || 0,
        inflationRate: parseFloat(document.getElementById('inflationRate').value) / 100 || 0.04,
    };
    console.log('User Data:', userData); // Debugging log
    generateChart(userData, convertedSourceData);
});

function generateChart(userData, convertedSourceData) {
    console.log('generateChart called');
    const comparisonData = convertedSourceData.filter(item => item.compare_to === userData.compareTo && item.age >= userData.age);
    console.log('Comparison Data:', comparisonData); // Debugging log
    const userProjection = calculateUserProjection(userData, comparisonData);

    // Ensure we have data points for all ages from user's current age to 80
    const allAges = Array.from({length: 81 - userData.age}, (_, i) => userData.age + i);
    
    const labels = allAges;
    const comparisonValues = allAges.map(age => {
        const dataPoint = comparisonData.find(item => item.age === age);
        return dataPoint ? dataPoint.net_wealth : null;
    });
    const userValues = userProjection.map(item => item.netWealth);

    // Calculate FIRE target net worth
    const targetYearlySpend = userData.fireMonthlySpend * 12;
    const fireTargetNetWorth = targetYearlySpend / 0.04;
    console.log('FIRE Target Net Worth:', fireTargetNetWorth); // Debugging log

    // Find the age when user reaches FIRE target net worth
    const fireAgeIndex = userValues.findIndex(value => value >= fireTargetNetWorth);
    const fireAge = fireAgeIndex !== -1 ? allAges[fireAgeIndex] : null;
    console.log('FIRE Age:', fireAge); // Debugging log

    const chartContainer = document.getElementById('chartContainer');
    chartContainer.style.display = 'block';

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(document.getElementById('wealthChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: userData.compareTo,
                    data: comparisonValues,
                    borderColor: 'blue',
                    fill: false,
                    spanGaps: true // This will connect the line across null values
                },
                {
                    label: userData.name,
                    data: userValues,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'FIRE Target',
                    data: userValues.map((value, index) => (allAges[index] === fireAge ? fireTargetNetWorth : null)),
                    borderColor: 'orange',
                    pointBackgroundColor: 'orange',
                    pointRadius: 10,
                    showLine: false // Only show points
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Net Wealth Comparison'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Age'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Net Wealth (USD)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    console.log('Chart data:', {labels, comparisonValues, userValues, fireAge, fireTargetNetWorth}); // Debugging log
}

function calculateUserProjection(userData, comparisonData) {
    console.log('calculateUserProjection called');
    const projection = [];
    let currentWealth = userData.currentWealth;
    const expectedInvestmentRate = userData.investmentRate;
    const inflation = userData.inflationRate;

    for (let age = userData.age; age <= 80; age++) {
        const realGrowthRate = (1 + expectedInvestmentRate) / (1 + inflation) - 1;
        currentWealth = currentWealth * (1 + realGrowthRate) + userData.savingsPerYear;
        projection.push({ age, netWealth: currentWealth });
    }

    return projection;
}