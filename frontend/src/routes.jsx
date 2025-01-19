import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/home/home.jsx";
import ListagemInstituicao from "./pages/instituicao/listagem-instituicao.jsx";
import ListagemEvento from "./pages/evento/listagem-evento.jsx";
import FormInstituicao from "./pages/instituicao/form-instituicao.jsx";
import FormEvento from "./pages/evento/form-evento.jsx";

export default function RoutesComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path={'/instituicao'} element={<ListagemInstituicao/>} />
                <Route path={'/instituicao/:id'} element={<FormInstituicao/>} />
                <Route path={'/instituicao-nova'} element={<FormInstituicao/>} />
                <Route path={'/evento'} element={<ListagemEvento/>} />
                <Route path={'/evento/:id'} element={<FormEvento/>} />
                <Route path={'/evento-novo'} element={<FormEvento/>} />
            </Routes>
        </BrowserRouter>
    );
}