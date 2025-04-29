const tasksModel = require('../models/tasksModel');

const query = async (_request, response) => {
  console.log('Executando a função query do controller');
  console.log('Recebendo a query:', _request.body.query);
  const { query } = _request.body;
  console.log('Executando a query:', query);
  //chama a função query do model passando a query
  const tasks = await tasksModel.query(query);
  console.log('Consulta executada com sucesso!');
  console.log('Retornando os resultados:', tasks);
  //retorna as tasks
  return response.status(200).json(tasks);
};

module.exports = {
  query,
};
