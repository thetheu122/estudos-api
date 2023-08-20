import { con } from "./connection.js";



export async function inserirFilme(filme){

    const comando = 
    ` INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
         VALUES (?, ?, ?, ?, ?, ?) `

    const [resposta] = await con.query(comando, [filme.usuario, filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel])
    filme.id  = resposta.insertId

    return filme
}



export async function alterarimagem(imagem,id) {
    const comando = 
    `UPDATE tb_filme 
            SET img_filme     = ?
            WHERE id_filme = ?`

    const [resposta] =await con.query(comando, [imagem,id])
    return resposta.affectedRows
}



export async function listarTodosFilmes () {
    const comando = 
    `SELECT id_filme			id,
    nm_filme			nome,
     vl_avaliacao		avaliacao,
     dt_lancamento	lancamento,
     bt_disponivel	disponivel,
     id_usuario        usuario
     FROM tb_filme`

    const [linhas] = await con.query(comando)
    return linhas
}

export async function buscarPorId(id) {
    const comando =
        `SELECT id_filme		id,
                nm_filme		nome,
                ds_sinopse      sinopse,
                img_filme       imagem,
                vl_avaliacao	avaliacao,
                dt_lancamento	lancamento,
                bt_disponivel	disponivel,
                id_usuario      usuario
           FROM tb_filme
          WHERE id_filme = ? `;
    
    const [linhas] = await con.query(comando, [id]);
    return linhas[0];
}



export async function buscarPorNome(nome) {
    const comando =
        `SELECT id_filme		id,
                nm_filme		nome,
                vl_avaliacao	avaliacao,
                dt_lancamento	lancamento,
                bt_disponivel	disponivel,
                id_usuario      usuario
           FROM tb_filme
          WHERE nm_filme like ? `;
    
    const [linhas] = await con.query(comando, [ `%${nome}%` ]);
    return linhas;
}


export async function removerFilme(id) {
    const comando =
        `DELETE FROM tb_filme 
               WHERE id_filme = ? `;
    
    const [resposta] = await con.query(comando, [id]);
    return resposta.affectedRows;
}


export async function alterarFilme(id, filme) {
    const comando = 
        `UPDATE tb_filme 
            SET nm_filme      = ?,
                ds_sinopse    = ?,
                vl_avaliacao  = ?,
                dt_lancamento = ?,
                bt_disponivel = ?,
                id_usuario    = ?
          WHERE id_filme      = ?`
    
    const [resposta] = await con.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.disponivel, filme.usuario, id]);
    return resposta.affectedRows;
}



