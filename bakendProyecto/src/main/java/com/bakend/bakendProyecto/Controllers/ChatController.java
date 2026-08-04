package com.bakend.bakendProyecto.Controllers;

import com.bakend.bakendProyecto.Repositorys.MesaRepository;
import com.bakend.bakendProyecto.Repositorys.PlatoRepository;
import com.bakend.bakendProyecto.Repositorys.ReservaRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Value("${gemini.api.key:}")
    private String apiKey;

    @Value("${gemini.api.model:gemini-2.0-flash}")
    private String model;

    private final PlatoRepository platoRepository;
    private final MesaRepository mesaRepository;
    private final ReservaRepository reservaRepository;

    public ChatController(PlatoRepository platoRepository,
                          MesaRepository mesaRepository,
                          ReservaRepository reservaRepository) {
        this.platoRepository = platoRepository;
        this.mesaRepository = mesaRepository;
        this.reservaRepository = reservaRepository;
    }

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> body) {

        String mensajeUsuario = body.getOrDefault("mensaje", "").trim();

        if (mensajeUsuario.isEmpty()) {
            return Map.of("respuesta", "Escribe un mensaje para poder ayudarte.");
        }

        if (apiKey.isEmpty()) {
            return Map.of(
                    "respuesta",
                    "⚠️ El chatbot aún no está configurado. " +
                    "Pide al administrador que agregue GEMINI_API_KEY en el servidor."
            );
        }

        String contexto = construirContexto();
        String prompt = "Eres el asistente virtual del restaurante \"Delicias\". " +
                "Responde en español, de forma amable y breve (máx 4 frases).\n\n" +
                "CONTEXTO DEL RESTAURANTE:\n" + contexto + "\n\n" +
                "Usuario pregunta: " + mensajeUsuario;

        try {
            String respuesta = llamarGemini(prompt);
            return Map.of("respuesta", respuesta);
        } catch (Exception e) {
            return Map.of("respuesta",
                    "Lo siento, hubo un problema al conectarme. Intenta de nuevo en un momento.");
        }
    }

    private String llamarGemini(String prompt) {

        RestTemplate rest = new RestTemplate();
        String url = "https://generativelanguage.googleapis.com/v1beta/models/"
                + model + ":generateContent?key=" + apiKey;

        Map<String, Object> content = Map.of(
                "role", "user",
                "parts", List.of(Map.of("text", prompt))
        );
        Map<String, Object> requestBody = Map.of("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = rest.exchange(url, HttpMethod.POST, entity, Map.class);

        if (response.getBody() != null) {
            List<Map> candidates = (List<Map>) response.getBody().get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map contentObj = (Map) candidates.get(0).get("content");
                List<Map> parts = (List<Map>) contentObj.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    return (String) parts.get(0).get("text");
                }
            }
        }
        return "No pude generar una respuesta en este momento.";
    }

    private String construirContexto() {

        StringBuilder ctx = new StringBuilder();

        ctx.append("- Horario: Lunes a Domingo, 12:00 - 22:00.\n");
        ctx.append("- Fecha de hoy: ").append(LocalDate.now()).append(".\n");
        ctx.append("- Hora actual: ").append(LocalTime.now().withSecond(0).withNano(0)).append(".\n");

        platoRepository.findAll().forEach(p ->
                ctx.append("- Plato: ").append(p.getNombre())
                   .append(", precio $").append(String.format("%.0f", p.getPrecio()))
                   .append(", categoria: ").append(p.getCategoria())
                   .append(", descripcion: ").append(p.getDescripcion())
                   .append(".\n"));

        ctx.append("- Mesas libres ahora: ")
           .append(mesaRepository.contarPorEstado("Libre")).append(".\n");
        ctx.append("- Mesas ocupadas ahora: ")
           .append(mesaRepository.contarPorEstado("Ocupada")).append(".\n");
        ctx.append("- Mesas reservadas ahora: ")
           .append(mesaRepository.contarPorEstado("Reservada")).append(".\n");

        ctx.append("- Reservas activas para hoy: ")
           .append(reservaRepository.contarPorFechaYEstado(LocalDate.now(), "Activa"))
           .append(".\n");

        ctx.append("- Para reservar: se puede hacer desde la sección Reservar eligiendo mesa, fecha, hora y personas.\n");
        ctx.append("- Para hacer pedidos a domicilio: llamar al teléfono del restaurante.\n");

        return ctx.toString();
    }
}
