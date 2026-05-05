import { useState} from "react";

export default function Carrinho(){


const carrinhoSalvo = LocalStorage.getIten("carrinho");
return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];

}