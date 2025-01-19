package br.com.desafio.controller;

import br.com.desafio.DTO.EventoDTO;
import br.com.desafio.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/evento")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @PostMapping
    public ResponseEntity<EventoDTO> save(@RequestBody @Valid EventoDTO eventoDTO) {
        return new ResponseEntity<>(eventoService.createEvento(eventoDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EventoDTO>> getListEvento() {
        return new ResponseEntity<>(eventoService.getListEvento(), HttpStatus.OK);
    }

    @GetMapping("/{eventoId}")
    public ResponseEntity<EventoDTO> get(@PathVariable Integer eventoId) {
        return new ResponseEntity<>(eventoService.getEvento(eventoId), HttpStatus.OK);
    }

    @GetMapping("/instituicao/{instituicaoId}")
    public ResponseEntity<List<EventoDTO>> getListEventoByInstituicao(@PathVariable Integer instituicaoId) {
        return new ResponseEntity<>(eventoService.getListEventoByInstituicao(instituicaoId), HttpStatus.OK);
    }

    @PutMapping("/{eventoId}")
    public ResponseEntity<EventoDTO> update(@PathVariable Integer eventoId, @Valid @RequestBody EventoDTO eventoDTO) {
        return new ResponseEntity<>(eventoService.updateEvento(eventoId, eventoDTO), HttpStatus.OK);
    }

    @DeleteMapping("/{eventoId}")
    public ResponseEntity<EventoDTO> delete(@PathVariable Integer eventoId) {
        eventoService.deleteEvento(eventoId);
        return ResponseEntity.noContent().build();
    }
}
