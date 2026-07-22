package com.bakend.bakendProyecto.Services;

import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MesaService {

    @Autowired
    private MesaRepository mesaRepository;

    public List<Mesa> listar() {
        return mesaRepository.findAll();
    }

    public Optional<Mesa> buscarPorId(Long id) {
        return mesaRepository.findById(id);
    }

    public Mesa guardar(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    public Mesa actualizar(Long id, Mesa mesa) {

        Mesa existente = mesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));

        if (mesa.getNumero() != null) existente.setNumero(mesa.getNumero());
        if (mesa.getCapacidad() != null) existente.setCapacidad(mesa.getCapacidad());
        if (mesa.getEstado() != null) existente.setEstado(mesa.getEstado());
        if (mesa.getReservadoPor() != null) existente.setReservadoPor(mesa.getReservadoPor());
        if (mesa.getEstado() != null && mesa.getEstado().equals("Libre")) existente.setReservadoPor(null);

        return mesaRepository.save(existente);
    }

    public void eliminar(Long id) {
        mesaRepository.deleteById(id);
    }

}
