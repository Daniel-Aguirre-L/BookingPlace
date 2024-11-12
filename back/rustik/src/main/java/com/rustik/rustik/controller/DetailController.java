package com.rustik.rustik.controller;


import com.rustik.rustik.dto.DetailDTO;
import com.rustik.rustik.service.DetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.vavr.control.Either;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/details")
public class DetailController {

    private final DetailService detailService;

    @Autowired
    public DetailController(DetailService detailService) {
        this.detailService = detailService;
    }


    @Operation(summary = "Obtener todos los detalles", description = "Devuelve una lista de todos los detalles disponibles.")
    @ApiResponse(responseCode = "200", description = "Lista de detalles obtenida exitosamente.")
    @GetMapping
    public List<DetailDTO> getAllDetails() {
        // Convertir la lista de detalles a DTOs
        return detailService.findAll();
    }

    @Operation(summary = "Obtener detalle por ID", description = "Devuelve un detalle especifico.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Detalle encontrado."),
            @ApiResponse(responseCode = "404", description = "Detalle no encontrado.")
    })
    @GetMapping("/{id}")
    public ResponseEntity<DetailDTO> getDetailById(@PathVariable Long id) {
        DetailDTO detail = detailService.findById(id);
        return detail != null ? ResponseEntity.ok(detail) : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Crear nuevo detalle", description = "Permite crear un nuevo detalle.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Detalle creado exitosamente."),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos.")
    })
    @SecurityRequirement(name = "bearer")
    @PostMapping
    public ResponseEntity<?> createDetail(@RequestBody DetailDTO detailDto) {

        Either<List<String>, DetailDTO> result = detailService.save(detailDto);

        return result.fold(
                errors -> {
                    return ResponseEntity.badRequest().body(errors);
                },
                detail -> {
                    return ResponseEntity.status(HttpStatus.CREATED).body(detail);
                }
        );
    }


    @Operation(summary = "Actualizar detalle", description = "Permite actualizar un detalle existente proporcionando.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Detalle actualizado exitosamente."),
            @ApiResponse(responseCode = "400", description = "Solicitud inválida o datos incorrectos."),
            @ApiResponse(responseCode = "404", description = "Detalle no encontrado.")
    })
    @SecurityRequirement(name = "bearer")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDetail(@PathVariable Long id, @RequestBody DetailDTO detailDto) {

        detailDto.setId(id);

        Either<List<String>, DetailDTO> result = detailService.save(detailDto);

        return result.fold(
                errors -> {
                    return ResponseEntity.badRequest().body(errors);
                },
                ResponseEntity::ok
        );
    }


    @Operation(summary = "Eliminar detalle", description = "Permite eliminar un detalle proporcionando su ID.")
    @ApiResponse(responseCode = "204", description = "Detalle eliminado exitosamente.")
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearer")
    public ResponseEntity<Void> deleteDetail(@PathVariable Long id) {
        detailService.delete(id);
        return ResponseEntity.noContent().build();
    }

}