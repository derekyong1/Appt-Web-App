document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };
    console.log('Form data:', formData);

    try {
        const response = await fetch('http://localhost:3000/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        console.log('Response received:', response);
        const result = await response.json();
        console.log('Result:', result);
        document.getElementById('message').textContent = result.message;
    } catch (error) {
        document.getElementById('message').textContent = 'Error booking appointment.';
        console.error(error);
    }
});