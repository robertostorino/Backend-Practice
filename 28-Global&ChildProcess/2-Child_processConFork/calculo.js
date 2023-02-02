function calculo() {
    let sum = 0
    for (let i= 0; i < 5e9; i++) {
        sum += i
    }
    return sum
};

// proceso en escucha
// cuando escuche que se terminó el proceso de hacer un console.log que se terminó
process.on('exit', () => {
    console.log('hilo terminado: ' + process.pid)
});

// proceso que cuando recibe el mensaje del padre lo inicie
process.on('message', msg => {
    console.log(msg)
    console.log('hilo iniciado: ' + process.pid);

    const result = calculo()
    process.send(result)
    process.exit()
});

//cuando hago el fork de nuestro hilo, le aviso al proceso principal que ya está listo.
process.send('listo');