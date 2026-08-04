const fs = require('fs');
const http = require('http');

const DIR = 'C:/Users/joseb/Documents/ProyectosVSC/Restaurante-Full/migracion';

function post(path, data) {
    return new Promise((resolve, reject) => {
        const body = JSON.stringify(data);
        const req = http.request({
            hostname: 'localhost',
            port: 8080,
            path: path,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
        }, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

function get(path) {
    return new Promise((resolve, reject) => {
        http.get(`http://localhost:8080${path}`, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });
}

async function main() {
    const usuarios = JSON.parse(fs.readFileSync(`${DIR}/usuarios.json`, 'utf8'));
    const mesas = JSON.parse(fs.readFileSync(`${DIR}/mesas.json`, 'utf8'));
    const platos = JSON.parse(fs.readFileSync(`${DIR}/platos.json`, 'utf8'));
    const clientes = JSON.parse(fs.readFileSync(`${DIR}/clientes.json`, 'utf8'));
    const reservas = JSON.parse(fs.readFileSync(`${DIR}/reservas.json`, 'utf8'));
    const pedidos = JSON.parse(fs.readFileSync(`${DIR}/pedidos.json`, 'utf8'));

    console.log(`Exportado: ${usuarios.length} usuarios, ${mesas.length} mesas, ${platos.length} platos, ${clientes.length} clientes, ${reservas.length} reservas, ${pedidos.length} pedidos`);

    // Importar usuarios
    console.log('\n=== Importando Usuarios ===');
    for (const u of usuarios) {
        const body = { nombre: u.nombre, apellido: u.apellido || '', correo: u.correo, password: 'Restaurante2026', rol: u.rol || 'USER' };
        const r = await post('/auth/registro', body);
        const p = JSON.parse(r);
        console.log(`  ${p.error || u.correo + ' (' + u.rol + ')'}`);
    }

    // Importar mesas
    console.log('\n=== Importando Mesas ===');
    for (const m of mesas) {
        const body = { numero: m.numero, capacidad: m.capacidad, estado: m.estado || 'Libre' };
        if (m.reservadoPor) body.reservadoPor = m.reservadoPor;
        const r = await post('/mesas', body);
        console.log(`  Mesa ${m.numero} - ${m.estado}`);
    }

    // Importar platos
    console.log('\n=== Importando Platos ===');
    for (const p of platos) {
        const body = { nombre: p.nombre, descripcion: p.descripcion, precio: p.precio, imagen: p.imagen, categoria: p.categoria };
        const r = await post('/platos', body);
        console.log(`  ${p.nombre} - $${p.precio}`);
    }

    // Importar clientes
    console.log('\n=== Importando Clientes ===');
    for (const c of clientes) {
        const body = { nombre: c.nombre, apellido: c.apellido, cedula: c.cedula, telefono: c.telefono, correo: c.correo, direccion: c.direccion };
        const r = await post('/clientes', body);
        console.log(`  ${c.nombre} ${c.apellido}`);
    }

    // Importar reservas
    console.log('\n=== Importando Reservas ===');
    for (const r of reservas) {
        const body = { fecha: r.fecha, hora: r.hora, cantidadPersonas: r.cantidadPersonas, estado: r.estado || 'Activa' };
        if (r.mesa) body.mesaId = r.mesa.idMesa;
        if (r.cliente) body.clienteId = r.cliente.idCliente;
        const res = await post('/reservas', body);
        const p = JSON.parse(res);
        console.log(`  Reserva #${p.idReserva || 'error'} - ${r.fecha} ${r.hora}`);
    }

    // Importar pedidos
    console.log('\n=== Importando Pedidos ===');
    for (const p of pedidos) {
        const body = { fecha: p.fecha, total: p.total, estado: p.estado || 'Cobrado' };
        if (p.mesa) body.mesaId = p.mesa.idMesa;
        if (p.cliente) body.clienteId = p.cliente.idCliente;
        const res = await post('/pedidos', body);
        const pr = JSON.parse(res);
        console.log(`  Pedido #${pr.idPedido || 'error'} - $${p.total} (${p.estado})`);
    }

    // Verificar
    console.log('\n=== VERIFICACIÓN FINAL ===');
    const d = await get('/admin/dashboard');
    console.log(`Mesas: ${d.totalMesas} (Libres: ${d.mesasLibres}, Ocupadas: ${d.mesasOcupadas}, Reservadas: ${d.mesasReservadas})`);
    console.log(`Reservas totales: ${d.reservasTotal}`);
    console.log(`Pedidos totales: ${d.pedidosTotal}`);
    console.log(`Ventas totales: $${d.ventasTotal}`);
}

main().catch(console.error);
