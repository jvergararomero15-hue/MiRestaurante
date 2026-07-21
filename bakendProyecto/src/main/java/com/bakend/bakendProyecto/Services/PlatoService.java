package com.bakend.bakendProyecto.Services;

import com.bakend.bakendProyecto.Modelo.Plato;
import com.bakend.bakendProyecto.Repositorys.PlatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlatoService {

    @Autowired
    private PlatoRepository platoRepository;

    public List<Plato> listar() {
        return platoRepository.findAll();
    }

    public Optional<Plato> buscarPorId(Long id) {
        return platoRepository.findById(id);
    }

    public Plato guardar(Plato plato) {
        return platoRepository.save(plato);
    }

    public Plato actualizar(Long id, Plato plato) {

        plato.setIdPlato(id);

        return platoRepository.save(plato);
    }

    public void eliminar(Long id) {
        platoRepository.deleteById(id);
    }

}