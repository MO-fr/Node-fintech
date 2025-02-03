document.addEventListener('DOMContentLoaded', function() {
    // Calculator Type Selector
    const calculatorType = document.getElementById('calculatorType');
    const calculatorSections = {
        loan: document.getElementById('loanCalc'),
        investment: document.getElementById('investmentCalc'),
        savings: document.getElementById('savingsCalc')
    };

    // Toggle calculator sections based on selection
    calculatorType.addEventListener('change', function() {
        // Hide all calculator sections
        Object.values(calculatorSections).forEach(section => {
            section.classList.add('d-none');
        });

        // Show selected calculator section
        calculatorSections[this.value].classList.remove('d-none');
    });

    // Loan Calculator
    const loanForm = document.getElementById('loanForm');
    const loanResult = document.getElementById('loanResult');

    loanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const amount = parseFloat(this.amount.value);
        const rate = parseFloat(this.rate.value);
        const years = parseFloat(this.years.value);

        // Calculate monthly interest rate and number of payments
        const monthlyRate = rate / 100 / 12;
        const numberOfPayments = years * 12;

        // Calculate monthly payment using the amortization formula
        const monthlyPayment = amount * 
            (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Calculate total payment and total interest
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - amount;

        // Display results
        loanResult.innerHTML = `
            <h4>Loan Calculation Results</h4>
            <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
            <p>Total Payment: $${totalPayment.toFixed(2)}</p>
            <p>Total Interest: $${totalInterest.toFixed(2)}</p>
        `;
        loanResult.classList.remove('d-none');
    });

    // Investment Calculator
    const investmentForm = document.getElementById('investmentForm');
    const investmentResult = document.getElementById('investmentResult');

    investmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const initial = parseFloat(this.initial.value);
        const monthly = parseFloat(this.monthly.value);
        const annualReturn = parseFloat(this.return.value);
        const period = parseFloat(this.period.value);

        // Calculate monthly return rate
        const monthlyRate = annualReturn / 100 / 12;

        // Calculate future value using compound interest formula
        let futureValue = initial;
        for (let month = 1; month <= period * 12; month++) {
            futureValue += monthly;
            futureValue *= (1 + monthlyRate);
        }

        // Calculate total contributions
        const totalContributions = initial + (monthly * period * 12);
        const totalInterest = futureValue - totalContributions;

        // Display results
        investmentResult.innerHTML = `
            <h4>Investment Calculation Results</h4>
            <p>Future Value: $${futureValue.toFixed(2)}</p>
            <p>Total Contributions: $${totalContributions.toFixed(2)}</p>
            <p>Total Interest Earned: $${totalInterest.toFixed(2)}</p>
        `;
        investmentResult.classList.remove('d-none');
    });

    // Savings Calculator
    const savingsForm = document.getElementById('savingsForm');
    const savingsResult = document.getElementById('savingsResult');

    savingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const target = parseFloat(this.target.value);
        const period = parseFloat(this.period.value);

        // Calculate monthly savings required
        const monthlySavings = target / (period * 12);

        // Display results
        savingsResult.innerHTML = `
            <h4>Savings Calculation Results</h4>
            <p>Target Amount: $${target.toFixed(2)}</p>
            <p>Monthly Savings Required: $${monthlySavings.toFixed(2)}</p>
            <p>Total Savings Period: ${period} years</p>
        `;
        savingsResult.classList.remove('d-none');
    });
});