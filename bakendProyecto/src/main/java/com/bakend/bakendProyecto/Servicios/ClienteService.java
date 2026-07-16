package com.bakend.bakendProyecto.Servicios;

import com.bakend.bakendProyecto.Modelo.Cliente;
import com.bakend.bakendProyecto.Repositorys.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepositorio;

    public ClienteService(ClienteRepository clienteRepositorio) {
        this.clienteRepositorio = clienteRepositorio;
    }

    public List<Cliente> getAllClientes() {
        return clienteRepositorio.findAll();
    }

    public Cliente saveCliente(Cliente cliente) {
        return clienteRepositorio.save(cliente);
    }
}