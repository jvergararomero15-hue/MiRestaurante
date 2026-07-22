package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.DTO.LoginRequest;
import com.bakend.bakendProyecto.DTO.LoginResponse;
import com.bakend.bakendProyecto.Modelo.Usuario;
import com.bakend.bakendProyecto.Security.JwtService;
import com.bakend.bakendProyecto.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        return usuarioService.buscarPorCorreo(request.getEmail())
                .filter(usuario -> passwordEncoder.matches(
                        request.getPassword(), usuario.getPassword()))
                .map(usuario -> {
                    String token = jwtService.generarToken(usuario.getCorreo());
                    return ResponseEntity.ok((Object)
                            new LoginResponse(token, usuario.getRol(), usuario.getNombre()));
                })
                .orElse(ResponseEntity.status(401)
                        .body(Map.of("error", "Correo o contraseña incorrectos")));
    }

    @PostMapping("/registro")
    public ResponseEntity<?> registro(@RequestBody Usuario usuario) {

        if (usuarioService.buscarPorCorreo(usuario.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "El correo ya está registrado"));
        }

        usuario.setRol(usuario.getRol() != null ? usuario.getRol() : "USER");
        usuario.setEstado(usuario.getEstado() != null ? usuario.getEstado() : "Activo");
        usuario.setFechaRegistro(LocalDate.now());

        Usuario guardado = usuarioService.guardar(usuario);

        String token = jwtService.generarToken(guardado.getCorreo());

        return ResponseEntity.ok(new LoginResponse(token, guardado.getRol(), guardado.getNombre()));
    }
}
