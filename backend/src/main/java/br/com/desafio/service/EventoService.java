package br.com.desafio.service;

import br.com.desafio.DTO.EventoDTO;
import br.com.desafio.domain.Evento;
import br.com.desafio.domain.Instituicao;
import br.com.desafio.mapper.EventoMapper;
import br.com.desafio.mapper.InstituicaoMapper;
import br.com.desafio.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private EventoMapper mapper;

    @Autowired
    private InstituicaoMapper instituicaoMapper;

    public EventoDTO createEvento(EventoDTO eventoDTO) {
        validacoes(eventoDTO);
        Evento evento = Evento.builder()
                .nome(eventoDTO.getNome())
                .dataInicial(eventoDTO.getDataInicial())
                .dataFinal(eventoDTO.getDataFinal())
                .instituicao(instituicaoMapper.toEntity(eventoDTO.getInstituicao()))
                .ativo(false)
                .build();

        evento = eventoRepository.save(evento);
        return mapper.toDTO(evento);
    }

    public List<EventoDTO> getListEvento() {
        List<Evento> eventoList = eventoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return eventoList.stream().map(evento -> mapper.toDTO(evento)).toList();
    }

    public List<EventoDTO> getListEventoByInstituicao(Integer instituicaoId) {
        List<Evento> eventoList = eventoRepository.findByInstituicaoId(instituicaoId, Sort.by(Sort.Direction.ASC, "id"));
        return eventoList.stream().map(evento -> mapper.toDTO(evento)).toList();
    }

    public EventoDTO getEvento(Integer eventoId) {
        return eventoRepository.findById(eventoId).map(evento -> mapper.toDTO(evento)).orElse(null);
    }

    public EventoDTO updateEvento(Integer eventoId, EventoDTO eventoDTO) {
        validacoes(eventoDTO);

        Evento evento = eventoRepository.findById(eventoId).orElseThrow(() -> new RuntimeException("Evento não encontrado"));

        if (Objects.nonNull(eventoDTO.getNome())) {
            evento.setNome(eventoDTO.getNome());
        }
        if (Objects.nonNull(eventoDTO.getDataInicial())) {
            evento.setDataInicial(eventoDTO.getDataInicial());
        }
        if (Objects.nonNull(eventoDTO.getDataFinal())) {
            evento.setDataFinal(eventoDTO.getDataFinal());
        }
        if (Objects.nonNull(eventoDTO.getInstituicao())) {
            evento.setInstituicao(instituicaoMapper.toEntity(eventoDTO.getInstituicao()));
        }

        eventoRepository.save(evento);

        return mapper.toDTO(evento);
    }

    public void deleteEvento(Integer eventoId) {
        eventoRepository.deleteById(eventoId);
    }

    public void validacoes(EventoDTO eventoDTO) {
        if (eventoDTO.getDataInicial().isAfter(eventoDTO.getDataFinal())) {
            throw new RuntimeException("Data inicial não pode ser maior que a data final");
        }
        if (eventoDTO.getDataInicial().isBefore(LocalDate.now())) {
            throw new RuntimeException("Data inicial não pode ser menor que a data atual");
        }
        if (eventoDTO.getDataFinal().isBefore(LocalDate.now())) {
            throw new RuntimeException("Data final não pode ser menor que a data atual");
        }
        if (Objects.isNull(eventoDTO.getInstituicao().getId())) {
            throw new RuntimeException("Instituição é obrigatória");
        }
    }

}
