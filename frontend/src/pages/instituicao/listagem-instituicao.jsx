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
import Instituicao from "../../models/instituicao.js";
import {Button, IconButton, Snackbar, Stack, Typography} from "@mui/material";

export default function ListagemInstituicao(){

    const [instituicoes, setInstituicoes] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    const fetchData = async () => {
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
    };

    const editar = (id) => {
        navigate(`/instituicao/${id}`);
    };

    const excluir = (id) => {
        api.delete(`/instituicao/${id}`)
            .then(response => {
                fetchData();
            })
            .catch(error => {
                let errorMessage = "Erro ao excluir a instituição.";

                if (error.response?.data?.errors) {
                    errorMessage = error.response.data.errors.join("; ");
                }
                setSnackbarMessage(errorMessage);
                setOpenSnackbar(true);
            });
    }

    const novo = () => {
        navigate('/instituicao-nova');
    }

    const voltar = () => {
        navigate('/');
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className = "instituicao-container">
            <header>
                <Typography variant="h1" gutterBottom>
                   Instituições
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
                    Adicionar nova instituição
                </Button>
            </Stack>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Alterar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {instituicoes.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.nome}</TableCell>
                                <TableCell>{row.tipo}</TableCell>
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