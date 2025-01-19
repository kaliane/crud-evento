package br.com.desafio.controller;

import br.com.desafio.DTO.InstituicaoDTO;
import br.com.desafio.service.InstituicaoService;
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
@RequestMapping("/instituicao")
public class InstituicaoController {

    @Autowired
    private InstituicaoService instituicaoService;

    @PostMapping
    public ResponseEntity<InstituicaoDTO> save(@RequestBody @Valid InstituicaoDTO instituicao) {
        return new ResponseEntity<>(instituicaoService.createInstituicao(instituicao), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InstituicaoDTO>> getListInstituicao() {
        return new ResponseEntity<>(instituicaoService.getListInstituicao(), HttpStatus.OK);
    }

    @GetMapping("/{instituicaoId}")
    public ResponseEntity<InstituicaoDTO> get(@PathVariable Integer instituicaoId) {
        return new ResponseEntity<>(instituicaoService.getInstituicao(instituicaoId), HttpStatus.OK);
    }

    @PutMapping("/{instituicaoId}")
    public ResponseEntity<InstituicaoDTO> update(@PathVariable Integer instituicaoId,@Valid  @RequestBody InstituicaoDTO instituicao) {
        return new ResponseEntity<>(instituicaoService.updateInstituicao(instituicaoId, instituicao), HttpStatus.OK);
    }

    @DeleteMapping("/{instituicaoId}")
    public ResponseEntity<InstituicaoDTO> delete(@PathVariable Integer instituicaoId) {
        instituicaoService.deleteInstituicao(instituicaoId);
        return ResponseEntity.noContent().build();
    }

}
