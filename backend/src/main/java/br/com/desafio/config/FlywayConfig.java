package br.com.desafio.config;

import org.flywaydb.core.Flyway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

//@Configuration
public class FlywayConfig {
   /* @Bean
    public Flyway flyway(DataSource dataSource) {
        System.out.println(dataSource);
        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .locations("classpath:db/migrations")
                .baselineOnMigrate(true)
                .load();
        flyway.migrate();
        return flyway;
    }*/
}
