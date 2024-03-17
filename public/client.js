document.addEventListener('DOMContentLoaded', () => {
    function $(e) { return document.querySelector(e) };

    const pass = $('.pass');
    pass.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(pass);

            const formDataJSON = {};
            formData.forEach((value, key) => {
                formDataJSON[key] = value;
            });

            const response = await fetch('/add-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataJSON) 
            });

            if (!response.ok) {
                throw new Error('Failed to add blog');
            }
            window.location.href ='/'
        } catch (err) {
            console.error(err);
        }
    });
});
