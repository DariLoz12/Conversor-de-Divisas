const boton = document.getElementById('botonconvertir');
const displayResultado = document.getElementById('resultado');

boton.addEventListener('click', () => {
    const from = document.getElementById('desdedivisa').value;
    const to = document.getElementById('hastadivisa').value;
    const amount = document.getElementById('cantidad').value;

    if (amount === "" || amount <= 0) {
        displayResultado.innerText = "Ingresá un monto válido";
        return;
    }

    displayResultado.innerText = "Cargando...";

    // Tu función fetch implementada
    fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
        .then((resp) => resp.json())
        .then((data) => {
            // Accedemos a la tasa de cambio dentro del objeto 'rates'
            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Cambiamos el H2
            displayResultado.innerText = `${convertedAmount} ${to}`;
        })
        .catch((err) => {
            displayResultado.innerText = "Error en la conversión";
            console.error(err);
        });
});