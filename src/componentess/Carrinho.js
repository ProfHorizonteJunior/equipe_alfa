import { useState, useEffect } from "react";

export default function Carrinho(){
const [carrinho, setCarrinho] = useState([]);

const carrinhoSalvo = LocalStorage.getIten("carrinho");
return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

}