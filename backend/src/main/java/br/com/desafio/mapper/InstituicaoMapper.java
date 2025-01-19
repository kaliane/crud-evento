package br.com.desafio.mapper;

import br.com.desafio.DTO.InstituicaoDTO;
import br.com.desafio.domain.Instituicao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InstituicaoMapper {

    InstituicaoDTO toDTO(Instituicao instituicao);

    Instituicao toEntity(InstituicaoDTO instituicaoDTO);
}
