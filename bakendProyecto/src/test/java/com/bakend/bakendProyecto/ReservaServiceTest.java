package com.bakend.bakendProyecto;

import com.bakend.bakendProyecto.Modelo.Reserva;
import com.bakend.bakendProyecto.Repositorys.ReservaRepository;
import com.bakend.bakendProyecto.Services.ReservaService;
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
public class ReservaServiceTest {

    @Mock
    private ReservaRepository reservaRepository;

    @InjectMocks
    private ReservaService reservaService;

    @Test
    public void testListar() {
        Reserva reserva1 = new Reserva();
        reserva1.setIdReserva(1L);
        Reserva reserva2 = new Reserva();
        reserva2.setIdReserva(2L);
        List<Reserva> reservas = Arrays.asList(reserva1, reserva2);

        when(reservaRepository.findAll()).thenReturn(reservas);

        List<Reserva> result = reservaService.listar();

        assertEquals(2, result.size());
        verify(reservaRepository, times(1)).findAll();
    }

    @Test
    public void testGuardar() {
        Reserva reserva = new Reserva();
        reserva.setCantidadPersonas(4);
        Reserva savedReserva = new Reserva();
        savedReserva.setIdReserva(1L);
        savedReserva.setCantidadPersonas(4);

        when(reservaRepository.save(reserva)).thenReturn(savedReserva);

        Reserva result = reservaService.guardar(reserva);

        assertEquals(1L, result.getIdReserva());
        assertEquals(4, result.getCantidadPersonas());
        verify(reservaRepository, times(1)).save(reserva);
    }
}