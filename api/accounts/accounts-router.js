const router = require('express').Router()
const Account = require('./accounts-model')
const {checkAccountId, checkAccountNameUnique, checkAccountPayload} = require('./accounts-middleware')

router.get('/', async(req, res, next) => {
  // DO YOUR MAGIC
  let accounts = await Account.getAll();
  res.json(accounts)
})

router.get('/:id',checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  let account = await Account.getById(req.params.id)
  res.json(account)

})

router.post('/',checkAccountPayload,checkAccountNameUnique, async(req, res, next) => {
  // DO YOUR MAGIC
  let myid = await Account.create(req.body)
  let myacc = await Account.getById(myid[0])
  myacc.name = myacc.name.trim()

  res.status(201).json(myacc)
})

router.put('/:id',checkAccountId,checkAccountPayload,checkAccountNameUnique, async(req, res, next) => {
  // DO YOUR MAGIC
  await Account.updateById(req.params.id, req.body)
  let myacount = await Account.getById(req.params.id)
  res.status(200).json(myacount)
  
});

router.delete('/:id',checkAccountId, async(req, res, next) => {
  // DO YOUR MAGIC
  await Account.deleteById(req.params.id)
  res.json({message: 'Delete is done'})
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({message: err.message})
})

module.exports = router;
