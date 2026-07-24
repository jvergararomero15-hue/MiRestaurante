package com.bakend.bakendProyecto;

import com.bakend.bakendProyecto.Modelo.Plato;
import com.bakend.bakendProyecto.Repositorys.PlatoRepository;
import com.bakend.bakendProyecto.Services.PlatoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PlatoServiceTest {

    @Mock
    private PlatoRepository platoRepository;

    @InjectMocks
    private PlatoService platoService;

    @Test
    public void testListar() {
        Plato plato1 = new Plato();
        plato1.setIdPlato(1L);
        Plato plato2 = new Plato();
        plato2.setIdPlato(2L);
        List<Plato> platos = Arrays.asList(plato1, plato2);

        when(platoRepository.findAll()).thenReturn(platos);

        List<Plato> result = platoService.listar();

        assertEquals(2, result.size());
        verify(platoRepository, times(1)).findAll();
    }

    @Test
    public void testGuardar() {
        Plato plato = new Plato();
        plato.setNombre("Pasta");
        Plato savedPlato = new Plato();
        savedPlato.setIdPlato(1L);
        savedPlato.setNombre("Pasta");

        when(platoRepository.save(plato)).thenReturn(savedPlato);

        Plato result = platoService.guardar(plato);

        assertEquals(1L, result.getIdPlato());
        assertEquals("Pasta", result.getNombre());
        verify(platoRepository, times(1)).save(plato);
    }

    @Test
    public void testEliminar() {
        Long id = 1L;
        doNothing().when(platoRepository).deleteById(id);

        platoService.eliminar(id);

        verify(platoRepository, times(1)).deleteById(id);
    }
}