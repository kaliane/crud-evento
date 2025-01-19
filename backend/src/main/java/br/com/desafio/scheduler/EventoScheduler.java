package br.com.desafio.scheduler;

import br.com.desafio.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@EnableScheduling
public class EventoScheduler {

    @Autowired
    private EventoService eventoService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void taskDiaria() {
        System.out.println("Executando tarefa diária de ativar e desativar eventos");
        eventoService.ativarEvento();
        eventoService.desativarEvento();
    }
}
