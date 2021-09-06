let Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  let name = req.body.name
  let budget = req.body.budget
  if( name === undefined || budget === undefined){
    next({message: "name and budget are required",status: 400})
  }
  if(typeof budget !== 'number' || isNaN(budget) ){
    next({ message: "budget of account must be a number", status:400 })
  }

  if(typeof name !== 'string'){
    next({ message: "name of account must be a string",status: 400 })
  }
  if(name.trim().length < 3 || name.trim().length > 100){
    next({ message: "name of account must be between 3 and 100" ,status: 400})
  }
 
  if( budget < 0 || budget > 1000000 ){
    next({status: 400, message: "budget of account is too large or too small"})
  }
  next()
}

exports.checkAccountNameUnique = async(req, res, next) => {
  // DO YOUR MAGIC
  let name = req.body.name
  let myAccounts = await Account.getAll()
  myAccounts.forEach(element => {
    if(name.trim() === element.name.trim()){
      next({ message: "that name is taken" , status: 400})
    }
  });
  next()
}

exports.checkAccountId = async(req, res, next) => {
  // DO YOUR MAGIC
  let myaccount = await Account.getById(req.params.id)
  if(!myaccount){
    next({ message: "account not found", status: 404 })
  }
  next()

}
