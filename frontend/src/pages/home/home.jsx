import React from 'react';
import {useNavigate} from "react-router-dom";
import {Stack, Typography} from "@mui/material";
import Button from "@mui/material/Button";
export default function Home() {

    const navigate = useNavigate();

    const pageInstituicao = () => {
        navigate(`/instituicao`);
    }

    const pageEvento = () => {
        navigate(`/evento`);
    }

    return (
        <div className = "profile-container">
            <header>
                <Typography variant="h1" gutterBottom>
                    CRUD Eventos
                </Typography>
            </header>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={pageInstituicao}>
                    Instituição
                </Button>
                <Button variant="contained" onClick={pageEvento}>
                    Evento
                </Button>
            </Stack>
        </div>
    );
}