require('dotenv').config();
const { outFormat } = require('oracledb');
const OracleDB = require('oracledb');

try {
  OracleDB.initOracleClient();
} catch (err) {
  console.error("Erro ao inicializar cliente Oracle:", err);
}

const dbConfig = {
  user: "NEOCRED",
  password: "N30CR3D",
  connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.1.8)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=WINT)))`
};

const query = async (sql, params = []) => {
  let connection;
  try {
    console.log("Configuração de conexão:", dbConfig);

    connection = await OracleDB.getConnection(dbConfig);
    console.log('Conexão obtida com sucesso!');

    const result = await connection.execute(sql, params, { outFormat: OracleDB.OUT_FORMAT_OBJECT });
    console.log('Consulta executada com sucesso!', result);

    const sqlUpper = sql.trim().toUpperCase();
    
    // Se a query for INSERT, UPDATE ou DELETE, precisa de commit
    if (sqlUpper.startsWith("INSERT") || sqlUpper.startsWith("UPDATE") || sqlUpper.startsWith("DELETE")) {
      await connection.commit();
      console.log("Commit realizado com sucesso!");
    }

    if (sqlUpper.startsWith("SELECT")) {
      if (!result.rows || result.rows.length === 0) {
        console.warn('Nenhum dado encontrado.');
        return { success: true, message: "Nenhum dado encontrado." };
      }
      return { success: true, data: result.rows };
    } else if (sqlUpper.startsWith("INSERT")) {
      return { success: true, message: `${result.rowsAffected || 0} registro(s) inserido(s).` };
    } else if (sqlUpper.startsWith("UPDATE")) {
      return { success: true, message: `${result.rowsAffected || 0} registro(s) atualizado(s).` };
    } else if (sqlUpper.startsWith("DELETE")) {
      return { success: true, message: `${result.rowsAffected || 0} registro(s) excluído(s).` };
    } else {
      return { success: true, message: "Operação executada com sucesso." };
    }
  } catch (err) {
    console.error('Erro ao executar consulta:', err.message);
    return { success: false, error: err.message };
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Conexão fechada com sucesso.');
      } catch (closeErr) {
        console.error('Erro ao fechar conexão:', closeErr.message);
      }
    }
  }
};



module.exports = {
  query,
};
