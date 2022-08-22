import mongoose from 'mongoose';    

await mongoose.connect('mongodb+srv://admSteticCli:256314Edf@cluster0.aouojwo.mongodb.net/stetic-cli')
.then(() => {
    console.log("***Conexão efetuada com sucesso!***");
 })
    .catch(err => {
       console.error("***Erro ao tentar conexão com o MongoDB!***", err);
       process.exit();
    });

let db = mongoose.connection;

export default db;