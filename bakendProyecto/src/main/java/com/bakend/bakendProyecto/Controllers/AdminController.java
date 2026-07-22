package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Repositorys.DetallePedidoRepository;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Repositorys.PedidoRepository;
import com.bakend.bakendProyecto.Repositorys.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        Map<String, Object> data = new HashMap<>();

        data.put("mesasLibres", mesaRepository.contarPorEstado("Libre"));
        data.put("mesasOcupadas", mesaRepository.contarPorEstado("Ocupada"));
        data.put("mesasReservadas", mesaRepository.contarPorEstado("Reservada"));
        data.put("totalMesas", mesaRepository.count());

        LocalDate hoy = LocalDate.now();

        data.put("reservasHoy", reservaRepository.contarPorFechaYEstado(hoy, "Activa"));
        data.put("reservasTotal", reservaRepository.count());

        long pedidosHoy = pedidoRepository.contarPedidosPorFecha(hoy);
        long pedidosTotal = pedidoRepository.count();
        data.put("pedidosHoy", pedidosHoy);
        data.put("pedidosTotal", pedidosTotal);

        Double ventasHoy = pedidoRepository.totalVentasPorFecha(hoy);
        Double ventasTotal = pedidoRepository.totalVentasGeneral();
        data.put("ventasHoy", ventasHoy != null ? ventasHoy : 0.0);
        data.put("ventasTotal", ventasTotal != null ? ventasTotal : 0.0);

        return data;
    }

    @GetMapping("/ventas")
    public Object[] ventas(@RequestParam(required = false) String fecha) {

        LocalDate fechaConsulta = (fecha != null)
                ? LocalDate.parse(fecha)
                : LocalDate.now();

        return pedidoRepository.findByFecha(fechaConsulta).toArray();
    }

}
