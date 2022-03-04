module.exports = {
  //Funcao para contar dias restantes do projeto
  remainingDays(job){
      //dias que o projeto vai durar o total de hrs + as hrs que pretendo trabalhar por dia
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
      //Uma const que recebe o dia que criei o projeto
      const createdDay = new Date(job.created_at)
      //uma const que recebe o dia que criei + numeros de dias que o projeto deve durar é o dia do vencimento
      const dueDay = createdDay.getDate() + Number(remainingDays)
      //Aqui crio um const para guardar a Data exata do vencimento
      const dueDateInMs = createdDay.setDate(dueDay)
      //dif. entre a da data vencimento e a de hoje em milisegundos
      const timeDiffInMs = dueDateInMs - Date.now()
      //const com o numero de milisegundo de 1 dia
      const dayInMs = 1000 * 60 * 60 * 24
      //diferenca em dias de hoje ate o vencimetodo
      const dayDiff = Math.ceil(timeDiffInMs / dayInMs)

      return dayDiff
  },
  calculateBudget: (job, valueHour) => valueHour * job['total-hours']
}