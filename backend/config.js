var config ={
    email:{}
}

config.urlReal = "http://localhost:4200"

config.puerto = 3000
config.bd = "PruebaNode"
config.secret="dsfasfsdwr43554353&%#$/&"

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "brandoncarohe@gmail.com"
config.email.pass = "odhhyiekhonuevjq"

config.expiracion = 3000000

config.blacklist = [
    "http://localhost:4200",
    "http://localhost:9876"
]

module.exports.config = config