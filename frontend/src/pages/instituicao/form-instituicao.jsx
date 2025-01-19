import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from "../../services/api.jsx";
import Instituicao from "../../models/instituicao.js";
import {Stack, Snackbar, InputLabel, Select, MenuItem, FormControl} from "@mui/material";
import TipoInstituicaoEnum from "../../enum/TipoInstituicaoEnum.js";

export default function FormInstituicao() {
    const { id } = useParams();

    const [instituicao, setInstituicao] = useState(new Instituicao(id || '', '', ''));
    const [texto, setTexto] = useState('Nova');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const fetchData = async () => {
        if (id > 0) {
            api.get(`/instituicao/${id}`)
                .then(response => {
                    setTexto('Editar');
                    setInstituicao(new Instituicao(response.data.id, response.data.nome, response.data.tipo));
                })
                .catch(error => {
                    setSnackbarMessage("Erro ao buscar a instituição.");
                    setOpenSnackbar(true);
                });
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    const ajustarValor = (campo, valor) => {
        setInstituicao(prevState => ({
            ...prevState,
            [campo]: valor
        }));
    };

    const cancelar = () => {
        navigate('/instituicao');
    }

    const salvar = () => {
        if (id > 0) {
            api.put(`/instituicao/${id}`, instituicao)
                .then(response => {
                    navigate('/instituicao');
                })
                .catch(error => {
                    let errorMessage = "Erro ao salvar a instituição.";

                    if (error.response?.data?.errors) {
                        errorMessage = error.response.data.errors.join("; ");
                    }
                    setSnackbarMessage(errorMessage);
                    setOpenSnackbar(true);
                });
        } else {
            api.post('/instituicao', instituicao)
                .then(response => {
                    navigate('/instituicao');
                })
                .catch(error => {
                    let errorMessage = "Erro ao salvar a instituição.";
                    if (error.response?.data?.errors) {
                        errorMessage = error.response.data.errors.join("; ");
                    }
                    setSnackbarMessage(errorMessage);
                    setOpenSnackbar(true);
                });
        }
    }

    return (
        <div>
            <header>
                <Typography variant="h1" gutterBottom>
                    {texto} Instituição
                </Typography>
            </header>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': { m: 1, width: '50ch' },
                    '& .MuiFormControl-root': { m: 1, width: '50ch' } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="outlined-required"
                    label="Nome"
                    value={instituicao.nome}
                    onChange={(e) => ajustarValor('nome', e.target.value)}
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={instituicao.tipo}
                        label="Tipo"
                        onChange={(e) => ajustarValor('tipo', e.target.value)}
                        sx={{ textAlign: 'left' }}
                    >
                        {Object.values(TipoInstituicaoEnum).map((tipo) => (
                            <MenuItem key={tipo} value={tipo}
                                      sx={{ textAlign: 'left' }}>
                                {tipo}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={cancelar}>
                    Cancelar
                </Button>
                <Button variant="contained" onClick={salvar}>
                    Salvar
                </Button>
            </Stack>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </div>
    );
}