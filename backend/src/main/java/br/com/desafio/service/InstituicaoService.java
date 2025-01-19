package br.com.desafio.service;

import br.com.desafio.DTO.InstituicaoDTO;
import br.com.desafio.domain.Instituicao;
import br.com.desafio.mapper.InstituicaoMapper;
import br.com.desafio.repository.InstituicaoRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class InstituicaoService {

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private InstituicaoMapper mapper;

    public InstituicaoDTO createInstituicao(InstituicaoDTO instituicaoDTO) {
        Instituicao isntituicao = Instituicao.builder()
                .nome(instituicaoDTO.getNome())
                .tipo(instituicaoDTO.getTipo())
                .build();
        isntituicao = instituicaoRepository.save(isntituicao);
        return mapper.toDTO(isntituicao);
    }

    public List<InstituicaoDTO> getListInstituicao() {
        List<Instituicao> instituicaoList = instituicaoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return instituicaoList.stream().map(inst -> mapper.toDTO(inst)).toList();
    }

    public InstituicaoDTO getInstituicao(Integer instituicaoId) {
        Optional<Instituicao> instituicao = instituicaoRepository.findById(instituicaoId);
        return instituicao.map(inst -> mapper.toDTO(inst)).orElse(null);
    }

    public InstituicaoDTO updateInstituicao(Integer instituicaoId, InstituicaoDTO instituicaoDTO) {
        Instituicao instituicao = instituicaoRepository.findById(instituicaoId).orElseThrow(() -> new RuntimeException("Instituição não encontrada"));

        instituicao.setNome(instituicaoDTO.getNome());
        instituicao.setTipo(instituicaoDTO.getTipo());

        instituicaoRepository.save(instituicao);

        return mapper.toDTO(instituicao);
    }

    public void deleteInstituicao(Integer instituicaoId) {
        instituicaoRepository.deleteById(instituicaoId);
    }
}
