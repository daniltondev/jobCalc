const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
	async create(req, res) {
		return res.render('job')
	},
	async save(req, res) {
		// ANTES DO DB const jobs = await Job.get()
		//name: 'teste', 'daily-hours': '10', 'total-hours': '30' }
		// ANTES DO DB const lastId = jobs[jobs.length - 1]?.id || 0

		await Job.create({
			name: req.body.name,
			'daily-hours': req.body['daily-hours'],
			'total-hours': req.body['total-hours'],
			created_at: Date.now() //att a data da criacao
		})
		
		return res.redirect('/')
	},
	async show(req, res) {
		const jobs = await Job.get()
		const profile = await Profile.get()
		//Pega o id passado no link
		const jobId = req.params.id
		//Comparo o passado no link e acho dentro do array
		const job = jobs.find(job => Number(job.id) === Number(jobId))
		//Verificado se o job passado no link existent
		if (!job) {
			return res.send('JOB NOT FOUND!')
		}
		//Chamo a funcao que ira calcular o valor do projeto
		job.budget = JobUtils.calculateBudget(job, profile['value-hour'])

		//retorno para pagina de edit e o job respectivo
		return res.render('job-edit', { job })
	},
	async update(req, res) {
		const jobId = req.params.id
		//Comparo o passado no link e acho dentro do array

		const updatedJob = {
			name: req.body.name,
			'total-hours': req.body['total-hours'],
			'daily-hours': req.body['daily-hours']
		}

		await Job.update(updatedJob, jobId)

		return res.redirect('/job/' + jobId)
	},
	async delete(req, res) {
		//Pega o id passado no link
		const jobId = req.params.id

		await Job.delete(jobId)

		return res.redirect('/')
	}
}
