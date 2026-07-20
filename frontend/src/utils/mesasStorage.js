const CLAVE = "MESAS_RESTAURANTE";

export function obtenerMesas() {

  const datos = localStorage.getItem(CLAVE);

  if (datos) {
    return JSON.parse(datos);
  }

  const mesas = [];

  for (let i = 1; i <= 8; i++) {

    mesas.push({
      id: i,
      estado: "Libre",
      consumos: [],
      total: 0,
      cliente: "",
      reservada: false
    });

  }

  guardarMesas(mesas);

  return mesas;

}

export function guardarMesas(mesas) {
  localStorage.setItem(CLAVE, JSON.stringify(mesas));
}

export function obtenerMesa(id) {
  return obtenerMesas().find(m => m.id === Number(id));
}

export function actualizarMesa(mesaActualizada) {

  const mesas = obtenerMesas().map(m =>
    m.id === mesaActualizada.id ? mesaActualizada : m
  );

  guardarMesas(mesas);

}

export function cobrarMesa(id) {

  const mesas = obtenerMesas().map(m => {

    if (m.id === Number(id)) {

      return {
        id: m.id,
        estado: "Libre",
        consumos: [],
        total: 0,
        cliente: "",
        reservada: false
      };

    }

    return m;

  });

  guardarMesas(mesas);

}