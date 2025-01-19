package br.com.desafio.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventoDTO {
    private Integer id;
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    @NotNull(message = "Data inicial é obrigatória")
    private LocalDate dataInicial;
    @NotNull(message = "Data final é obrigatória")
    private LocalDate dataFinal;
    private boolean ativo;
    @NotNull(message = "Instituição é obrigatória")
    private InstituicaoDTO instituicao;
}
