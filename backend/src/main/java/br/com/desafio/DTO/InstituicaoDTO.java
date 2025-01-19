package br.com.desafio.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstituicaoDTO {
    private Integer id;
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    @NotBlank(message = "Tipo é obrigatório")
    private String tipo;
}
