package br.com.desafio.mapper;

import br.com.desafio.DTO.EventoDTO;
import br.com.desafio.domain.Evento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EventoMapper {

    EventoDTO toDTO(Evento evento);

    @Mapping(target = "ativo", ignore = true)
    Evento toEntity(EventoDTO eventoDTO);
}
