package com.rustik.rustik.controller;

import com.rustik.rustik.model.StatsView;
import com.rustik.rustik.service.StatsViewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stats")
public class StatsController {

    @Autowired
    private StatsViewService statsViewService;

    public static final Logger logger = Logger.getLogger(StatsController.class);


    @Operation(summary = "List all stats for Admin dashboard (Admin only)", description = "Lista todas las estadísticas para el dashboard de admin")
    @ApiResponses(value ={
            @ApiResponse(responseCode = "200", description = "Lista de estadísticas obtenida exitosamente."),
            @ApiResponse(responseCode = "403", description = "Usuario no autorizado."),
    }    )
    @SecurityRequirement(name = "bearer")
    @GetMapping
    public List<StatsView> getStats() {
        try{
            return statsViewService.getStats();
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}
