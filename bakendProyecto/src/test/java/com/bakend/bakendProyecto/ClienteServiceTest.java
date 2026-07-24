package com.bakend.bakendProyecto;

import com.bakend.bakendProyecto.Modelo.Cliente;
import com.bakend.bakendProyecto.Repositorys.ClienteRepository;
import com.bakend.bakendProyecto.Services.ClienteService;
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
public class ClienteServiceTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteService clienteService;

    @Test
    public void testListar() {
        Cliente cliente1 = new Cliente();
        cliente1.setIdCliente(1L);
        Cliente cliente2 = new Cliente();
        cliente2.setIdCliente(2L);
        List<Cliente> clientes = Arrays.asList(cliente1, cliente2);

        when(clienteRepository.findAll()).thenReturn(clientes);

        List<Cliente> result = clienteService.listar();

        assertEquals(2, result.size());
        verify(clienteRepository, times(1)).findAll();
    }

    @Test
    public void testGuardar() {
        Cliente cliente = new Cliente();
        cliente.setNombre("Juan");
        Cliente savedCliente = new Cliente();
        savedCliente.setIdCliente(1L);
        savedCliente.setNombre("Juan");

        when(clienteRepository.save(cliente)).thenReturn(savedCliente);

        Cliente result = clienteService.guardar(cliente);

        assertEquals(1L, result.getIdCliente());
        assertEquals("Juan", result.getNombre());
        verify(clienteRepository, times(1)).save(cliente);
    }
}