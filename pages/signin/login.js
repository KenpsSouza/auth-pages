document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        console.log('Enviando requisição para API:', email, password);
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        console.log('Status da resposta:', response.status);
        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            data = text;
        }
        console.log('Resposta da API:', data);
        // Verifica se a resposta indica erro, mesmo com status 200
        if (typeof data === 'string' && data.toLowerCase().includes('incorreta')) {
            alert('Senha incorreta.');
        } else if (response.ok) {
            alert('Login realizado com sucesso!');
            // Redirecionar ou salvar token, se necessário
        } else {
            alert((data && data.message) || 'Falha no login. Veja o console para detalhes.');
        }
    } catch (error) {
        console.error('Erro ao conectar com o servidor:', error);
        alert('Erro ao conectar com o servidor. Veja o console para detalhes.');
    }
});
