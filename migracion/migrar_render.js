const fs = require('fs');

const BASE = 'https://restaurante-backend-98sk.onrender.com';
const DIR = __dirname;
const PASSWORD_USUARIOS = 'Restaurante2026';

const MODELO3D_PLATOS = {
    'poyo': '/models/pollo.glb',
    'Agua': '/models/bebida.glb'
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function post(path, body) {
    const res = await fetch(BASE + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }
    return { status: res.status, json };
}

async function get(path) {
    const res = await fetch(BASE + path);
    return res.json();
}

async function despertar() {
    console.log('Despertando backend de Render (puede tardar ~1 min)...');
    for (let i = 1; i <= 36; i++) {
        try {
            const r = await fetch(BASE + '/platos', { signal: AbortSignal.timeout(15000) });
            if (r.ok) { console.log(`  Backend despierto (intento ${i}).\n`); return true; }
        } catch (e) { /* aun dormido */ }
        process.stdout.write('.');
        await sleep(5000);
    }
    console.log('\nNo se pudo despertar el backend.');
    return false;
}

function cargar(nombre) {
    return JSON.parse(fs.readFileSync(`${DIR}/${nombre}.json`, 'utf8'));
}

async function main() {
    if (!(await despertar())) return;

    const usuarios = cargar('usuarios');
    const mesas = cargar('mesas');
    const platos = cargar('platos');
    const clientes = cargar('clientes');
    const reservas = cargar('reservas');
    const pedidos = cargar('pedidos');

    let ok = 0, err = 0;

    console.log('=== USUARIOS ===');
    for (const u of usuarios) {
        const body = { nombre: u.nombre, apellido: u.apellido || '', correo: u.correo, password: PASSWORD_USUARIOS, rol: u.rol || 'USER' };
        const r = await post('/auth/registro', body);
        if (r.status === 200) { ok++; console.log(`  [OK] ${u.correo} (${u.rol})`); }
        else { err++; console.log(`  [ERR ${r.status}] ${u.correo} -> ${r.json.error || JSON.stringify(r.json)}`); }
    }

    console.log('\n=== MESAS ===');
    for (const m of mesas) {
        const body = { numero: m.numero, capacidad: m.capacidad, estado: m.estado || 'Libre' };
        if (m.reservadoPor) body.reservadoPor = m.reservadoPor;
        const r = await post('/mesas', body);
        if (r.status === 200) { ok++; console.log(`  [OK] Mesa ${m.numero} (${m.estado})`); }
        else { err++; console.log(`  [ERR ${r.status}] Mesa ${m.numero} -> ${r.json.error || JSON.stringify(r.json)}`); }
    }

    console.log('\n=== PLATOS ===');
    for (const p of platos) {
        const body = {
            nombre: p.nombre, descripcion: p.descripcion, precio: p.precio,
            imagen: p.imagen, categoria: p.categoria, disponible: p.disponible,
            modelo3d: MODELO3D_PLATOS[p.nombre] || null
        };
        const r = await post('/platos', body);
        if (r.status === 200) { ok++; console.log(`  [OK] ${p.nombre} - $${p.precio} (3D: ${body.modelo3d})`); }
        else { err++; console.log(`  [ERR ${r.status}] ${p.nombre} -> ${r.json.error || JSON.stringify(r.json)}`); }
    }

    console.log('\n=== CLIENTES ===');
    for (const c of clientes) {
        const body = { nombre: c.nombre, apellido: c.apellido, cedula: c.cedula, telefono: c.telefono, correo: c.correo, direccion: c.direccion };
        const r = await post('/clientes', body);
        if (r.status === 200) { ok++; console.log(`  [OK] ${c.nombre} ${c.apellido}`); }
        else { err++; console.log(`  [ERR ${r.status}] ${c.correo} -> ${r.json.error || JSON.stringify(r.json)}`); }
    }

    console.log('\n=== RESERVAS ===');
    for (const r of reservas) {
        const body = { fecha: r.fecha, hora: r.hora, cantidadPersonas: r.cantidadPersonas, estado: r.estado || 'Activa' };
        if (r.mesa) body.mesaId = r.mesa.idMesa;
        if (r.cliente) body.clienteId = r.cliente.idCliente;
        const res = await post('/reservas', body);
        if (res.status === 200) { ok++; console.log(`  [OK] ${r.fecha} ${r.hora} (mesa ${body.mesaId})`); }
        else { err++; console.log(`  [ERR ${res.status}] ${r.fecha} ${r.hora} mesa ${body.mesaId} -> ${res.json.error || JSON.stringify(res.json)}`); }
    }

    console.log('\n=== PEDIDOS ===');
    for (const p of pedidos) {
        const body = { fecha: p.fecha, total: p.total, estado: p.estado || 'Cobrado' };
        if (p.mesa) body.mesaId = p.mesa.idMesa;
        if (p.cliente) body.clienteId = p.cliente.idCliente;
        const res = await post('/pedidos', body);
        if (res.status === 200) { ok++; console.log(`  [OK] Pedido $${p.total} (${p.estado})`); }
        else { err++; console.log(`  [ERR ${res.status}] Pedido $${p.total} -> ${res.json.error || JSON.stringify(res.json)}`); }
    }

    console.log(`\n=== RESUMEN: ${ok} OK, ${err} errores ===`);

    console.log('\n=== VERIFICACION FINAL ===');
    try {
        const platosFinal = await get('/platos');
        const mesasFinal = await get('/mesas');
        const clientesFinal = await get('/clientes');
        const reservasFinal = await get('/reservas');
        console.log(`  Platos: ${platosFinal.length}`);
        console.log(`  Mesas: ${mesasFinal.length}`);
        console.log(`  Clientes: ${clientesFinal.length}`);
        console.log(`  Reservas: ${reservasFinal.length}`);
    } catch (e) {
        console.log('  Error en verificacion:', e.message);
    }
}

main().catch(console.error);
