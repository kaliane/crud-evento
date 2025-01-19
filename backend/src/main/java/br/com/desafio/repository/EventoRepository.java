package br.com.desafio.repository;

import br.com.desafio.domain.Evento;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByInstituicaoId(Integer instituicaoId, Sort sort);

    List<Evento> findByDataInicial(LocalDate data);

    List<Evento> findByDataFinal(LocalDate data);
}
