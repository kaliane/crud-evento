import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/home/home.jsx";
import ListagemInstituicao from "./pages/instituicao/listagem-instituicao.jsx";
import ListagemEvento from "./pages/evento/listagem-evento.jsx";

export default function RoutesComponent(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path={'/institution'} element={<ListagemInstituicao/>} />
                <Route path={'/institution/new'} element={<ListagemInstituicao/>} />
                <Route path={'/event'} element={<ListagemEvento/>} />
            </Routes>
        </BrowserRouter>
    );
}