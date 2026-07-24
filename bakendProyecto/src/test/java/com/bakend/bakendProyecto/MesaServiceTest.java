package com.bakend.bakendProyecto;

import com.bakend.bakendProyecto.Modelo.Mesa;
import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Services.MesaService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MesaServiceTest {

    @Mock
    private MesaRepository mesaRepository;

    @InjectMocks
    private MesaService mesaService;

    @Test
    public void testListar() {
        Mesa mesa1 = new Mesa();
        mesa1.setIdMesa(1L);
        Mesa mesa2 = new Mesa();
        mesa2.setIdMesa(2L);
        List<Mesa> mesas = Arrays.asList(mesa1, mesa2);

        when(mesaRepository.findAll()).thenReturn(mesas);

        List<Mesa> result = mesaService.listar();

        assertEquals(2, result.size());
        verify(mesaRepository, times(1)).findAll();
    }

    @Test
    public void testBuscarPorId() {
        Mesa mesa = new Mesa();
        mesa.setIdMesa(1L);
        when(mesaRepository.findById(1L)).thenReturn(Optional.of(mesa));

        Optional<Mesa> result = mesaService.buscarPorId(1L);

        assertEquals(true, result.isPresent());
        assertEquals(1L, result.get().getIdMesa());
        verify(mesaRepository, times(1)).findById(1L);
    }

    @Test
    public void testGuardar() {
        Mesa mesa = new Mesa();
        mesa.setNumero(5);
        Mesa savedMesa = new Mesa();
        savedMesa.setIdMesa(1L);
        savedMesa.setNumero(5);

        when(mesaRepository.save(mesa)).thenReturn(savedMesa);

        Mesa result = mesaService.guardar(mesa);

        assertEquals(1L, result.getIdMesa());
        assertEquals(5, result.getNumero());
        verify(mesaRepository, times(1)).save(mesa);
    }

    @Test
    public void testEliminar() {
        Long id = 1L;
        doNothing().when(mesaRepository).deleteById(id);

        mesaService.eliminar(id);

        verify(mesaRepository, times(1)).deleteById(id);
    }
}