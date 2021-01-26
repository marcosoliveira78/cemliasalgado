import React from 'react';
import { Outdoor, ContainerCentered } from '../styles';

export default function PaginaNaoEncontrada() {
  return (
    <>
      <div className="root">
        <ContainerCentered>
          <Outdoor>
            Ooooppppssss.....
            <br />
            (Erro 404) Página não encontrada!
          </Outdoor>
        </ContainerCentered>
      </div>
    </>
  );
}
