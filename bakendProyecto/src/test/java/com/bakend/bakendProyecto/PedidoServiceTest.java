package com.bakend.bakendProyecto;

import com.bakend.bakendProyecto.Modelo.Pedido;
import com.bakend.bakendProyecto.Repositorys.PedidoRepository;
import com.bakend.bakendProyecto.Services.PedidoService;
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
public class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @InjectMocks
    private PedidoService pedidoService;

    @Test
    public void testListar() {
        Pedido pedido1 = new Pedido();
        pedido1.setIdPedido(1L);
        Pedido pedido2 = new Pedido();
        pedido2.setIdPedido(2L);
        List<Pedido> pedidos = Arrays.asList(pedido1, pedido2);

        when(pedidoRepository.findAll()).thenReturn(pedidos);

        List<Pedido> result = pedidoService.listar();

        assertEquals(2, result.size());
        verify(pedidoRepository, times(1)).findAll();
    }

    @Test
    public void testGuardar() {
        Pedido pedido = new Pedido();
        pedido.setTotal(50.0);
        Pedido savedPedido = new Pedido();
        savedPedido.setIdPedido(1L);
        savedPedido.setTotal(50.0);

        when(pedidoRepository.save(pedido)).thenReturn(savedPedido);

        Pedido result = pedidoService.guardar(pedido);

        assertEquals(1L, result.getIdPedido());
        assertEquals(50.0, result.getTotal());
        verify(pedidoRepository, times(1)).save(pedido);
    }

    @Test
    public void testBuscarPorId() {
        Pedido pedido = new Pedido();
        pedido.setIdPedido(1L);
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        Optional<Pedido> result = pedidoService.buscarPorId(1L);

        assertEquals(true, result.isPresent());
        assertEquals(1L, result.get().getIdPedido());
        verify(pedidoRepository, times(1)).findById(1L);
    }
}