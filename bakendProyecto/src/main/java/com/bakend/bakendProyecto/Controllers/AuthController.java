package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.DTO.LoginRequest;
import com.bakend.bakendProyecto.DTO.LoginResponse;
import com.bakend.bakendProyecto.DTO.RegistroRequest;
import com.bakend.bakendProyecto.Modelo.Usuario;
import com.bakend.bakendProyecto.Security.JwtService;
import com.bakend.bakendProyecto.Services.UsuarioService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Slf4j
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.debug("Intento de login para: {}", request.getEmail());

        return usuarioService.buscarPorCorreo(request.getEmail())
                .filter(usuario -> passwordEncoder.matches(
                        request.getPassword(), usuario.getPassword()))
                .map(usuario -> {
                    String token = jwtService.generarToken(usuario.getCorreo());
                    log.info("Login exitoso para: {}", request.getEmail());
                    return ResponseEntity.ok((Object)
                            new LoginResponse(token, usuario.getRol(), usuario.getNombre()));
                })
                .orElseGet(() -> {
                    log.warn("Login fallido para: {}", request.getEmail());
                    return ResponseEntity.status(401)
                            .body(Map.of("error", "Correo o contraseña incorrectos"));
                });
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@Valid @RequestBody RegistroRequest request) {

        if (usuarioService.buscarPorCorreo(request.getCorreo()).isPresent()) {
            log.warn("Intento de registro con correo ya existente: {}", request.getCorreo());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El correo ya está registrado"));
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setPassword(request.getPassword());
        usuario.setTelefono(request.getTelefono());
        usuario.setRol(request.getRol() != null ? request.getRol() : "USER");
        usuario.setEstado("Activo");
        usuario.setFechaRegistro(LocalDate.now());

        Usuario guardado = usuarioService.guardar(usuario);

        String token = jwtService.generarToken(guardado.getCorreo());
        log.info("Registro exitoso para: {}", request.getCorreo());

        return ResponseEntity.ok(new LoginResponse(token, guardado.getRol(), guardado.getNombre()));
    }
}
