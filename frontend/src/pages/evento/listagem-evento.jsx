import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../../services/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Evento from "../../models/evento.js";
import {Button, Checkbox, IconButton, Snackbar, Stack, Typography} from "@mui/material";
import Instituicao from "../../models/instituicao.js";
import { format } from 'date-fns';
export default function ListagemEvento(){

    const [eventos, setEventos] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    const fetchData = async () => {
        api.get('/evento')
            .then(response => {
                console.log(response.data);
                const mappedData = response.data.map(item => {
                    const id = item.id !== undefined ? item.id : null;
                    const nome = item.nome !== undefined ? item.nome : '';
                    const dataInicial = item.dataInicial !== undefined ? item.dataInicial : '';
                    const dataFinal = item.dataFinal !== undefined ? item.dataFinal : '';
                    const ativo = item.ativo !== undefined ? item.ativo : 'false';
                    const instituicao = item.instituicao !== undefined ? item.instituicao : new Instituicao();
                    return new Evento(id, nome, dataInicial, dataFinal, ativo, instituicao);
                });
                setEventos(mappedData);
            })
            .catch(error => {
                setSnackbarMessage("Erro ao buscar os eventos.");
                setOpenSnackbar(true);
            });
    };

    const editar = (id) => {
        navigate(`/evento/${id}`);
    };

    const excluir = (id) => {
        api.delete(`/evento/${id}`)
            .then(response => {
                fetchData();
            })
            .catch(error => {
                let errorMessage = "Erro ao excluir o evento.";

                if (error.response?.data?.errors) {
                    errorMessage = error.response.data.errors.join("; ");
                }
                setSnackbarMessage(errorMessage);
                setOpenSnackbar(true);
            });
    }

    const novo = () => {
        navigate('/evento-novo');
    }

    const voltar = () => {
        navigate('/');
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className = "evento-container">
            <header>
                <Typography variant="h1" gutterBottom>
                    Eventos
                </Typography>
            </header>

            <Stack spacing={2} direction="row">
                <Button
                    variant="contained"
                    color="neutral"
                    startIcon={<ArrowBackIcon fontSize="inherit" />}
                    onClick={voltar}
                >
                    Voltar
                </Button>
                <Button variant="contained" onClick={novo}>
                    Adicionar novo evento
                </Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Data Inicial</TableCell>
                            <TableCell>Data Final</TableCell>
                            <TableCell>Ativo</TableCell>
                            <TableCell>Instituicao</TableCell>
                            <TableCell>Alterar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {eventos.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{format(new Date(row.dataInicial), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>{format(new Date(row.dataFinal), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={row.ativo}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell>{row.instituicao.nome}</TableCell>
                                <TableCell>
                                    <IconButton aria-label="alterar" onClick={() => editar(row.id)}>
                                        <CreateIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" onClick={() => excluir(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
            />
        </div>
    );
}