import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from "../../services/api.jsx";
import Evento from "../../models/evento.js";
import {Stack, Snackbar, InputLabel, Select, FormControl, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import Instituicao from "../../models/instituicao.js";
export default function FormEvento() {
    const { id } = useParams();

    const [evento, setEvento] = useState(new Evento(id || '', '', '', '', false, new Instituicao()));
    const [instituicoes, setInstituicoes] = useState([]);
    const [texto, setTexto] = useState('Novo');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        if (id > 0) {
            api.get(`/evento/${id}`)
                .then(response => {
                    setTexto('Editar');
                    setEvento(new Evento(response.data.id, response.data.nome, response.data.dataInicial, response.data.dataFinal, response.data.ativo, response.data.instituicao));
                })
                .catch(error => {
                    setSnackbarMessage("Erro ao buscar o evento.");
                    setOpenSnackbar(true);
                });
        }
    };

    const fetchInstituicoes = async () => {
        api.get('/instituicao')
            .then(response => {
                const mappedData = response.data.map(item => {
                    const id = item.id !== undefined ? item.id : null;
                    const nome = item.nome !== undefined ? item.nome : '';
                    const tipo = item.tipo !== undefined ? item.tipo : '';
                    return new Instituicao(id, nome, tipo);
                });
                setInstituicoes(mappedData);
            })
            .catch(error => {
                setSnackbarMessage("Erro ao buscar as instituições.");
                setOpenSnackbar(true);
            });
    }

    useEffect(() => {
        fetchData();
        fetchInstituicoes();
    }, []);

    const ajustarValor = (campo, valor) => {
        setEvento(prevState => ({
            ...prevState,
            [campo]: valor
        }));
    };

    const cancelar = () => {
        navigate('/evento');
    }

    const salvar = () => {
        if (id > 0) {
            api.put(`/evento/${id}`, evento)
                .then(response => {
                    navigate('/evento');
                })
                .catch(error => {
                    let errorMessage = "Erro ao salvar o evento.";

                    if (error.response?.data?.errors) {
                        errorMessage = error.response.data.errors.join("; ");
                    }
                    setSnackbarMessage(errorMessage);
                    setOpenSnackbar(true);
                });
        } else {
            api.post('/evento', evento)
                .then(response => {
                    navigate('/evento');
                })
                .catch(error => {
                    let errorMessage = "Erro ao salvar o evento.";
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
                    {texto} Evento
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
                    value={evento.nome}
                    onChange={(e) => ajustarValor('nome', e.target.value)}
                />
                <TextField
                    id="outlined-required"
                    label="Data Inicial"
                    type="date"
                    value={evento.dataInicial}
                    onChange={(e) => ajustarValor('dataInicial', e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="outlined-required"
                    label="Data Final"
                    type="date"
                    value={evento.dataFinal}
                    onChange={(e) => ajustarValor('dataFinal', e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Instituição</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={evento.instituicao?.id || ''}
                        label="Instituição"
                        onChange={(e) => {
                            const instituicaoSelecionada = instituicoes.find(inst => inst.id === e.target.value);
                            ajustarValor('instituicao', instituicaoSelecionada);
                        }}
                        sx={{ textAlign: 'left' }}
                    >
                        {instituicoes.map((inst) => (
                            <MenuItem key={inst.id} value={inst.id}
                                      sx={{ textAlign: 'left' }}>
                                {inst.nome}
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