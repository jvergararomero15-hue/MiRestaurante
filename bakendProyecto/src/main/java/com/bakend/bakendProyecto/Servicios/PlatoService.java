package com.bakend.bakendProyecto.Servicios;

import com.bakend.bakendProyecto.Modelo.Plato;
import com.bakend.bakendProyecto.Repositorys.PlatoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PlatoService {


    private final PlatoRepository platoRepositorio;

    public PlatoService(PlatoRepository platoRepositorio) {
        this.platoRepositorio = platoRepositorio;
    }

    public List<Plato> getAllPlatos() {
        return platoRepositorio.findAll();
    }
    
    public Plato getPlatoById(Long id) {
        return platoRepositorio.findById(id).orElse(null);
    }
    
    public Plato savePlato(Plato plato) {
        return platoRepositorio.save(plato);
    }
    
    public void deletePlato(Long id) {
        platoRepositorio.deleteById(id);
    }
}