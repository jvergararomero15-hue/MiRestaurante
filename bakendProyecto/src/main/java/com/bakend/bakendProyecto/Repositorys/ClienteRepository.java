package com.bakend.bakendProyecto.Repositorys;


import com.bakend.bakendProyecto.Modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email);
}

