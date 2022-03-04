const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
	async index(req, res) {
		const jobs = await Job.get()
		const profile = await Profile.get()

		//contador de trabalhos no Dashboard
		let statusCount = {
			done: 0,
			progress: 0,
			total: jobs.length
		}
		//conta o total de horas por dia dos trabalhos em progress
		let jobTotalHoursPerDay = 0

		//ajustes no job
		const updatedJobs = jobs.map(job => {
			//ajustes no job
			const remaining = JobUtils.remainingDays(job)
			//vai passar o status do projeto
			const status = remaining <= 0 ? 'done' : 'progress'
			//Soma os status de cada job e coloca no statusCount
			statusCount[status] += 1

			//conta o total de horas por dia dos trabalhos em progress
			if (status == 'progress') {
				jobTotalHoursPerDay += Number(job['daily-hours'])
			}

			return {
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile['value-hour'])
			}
		})
		//contagem de horas livres no dia
		const freeHours = profile['hours-per-day'] - jobTotalHoursPerDay
		//Retorna a page
		return res.render('index', {
			jobs: updatedJobs,
			profile: profile,
			statusCount: statusCount,
			freeHours: freeHours
		})
	}
}
