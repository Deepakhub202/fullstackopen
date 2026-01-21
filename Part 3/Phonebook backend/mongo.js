const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)
 


const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('DB connected');
    } catch {
        console.log('error getting DB');
    }
}

const PhonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const terminal = async () => {
    try {
        await connectdb();

        const Persons = mongoose.model('persons',PhonebookSchema);

        if (process.argv.length === 4) {
            const name = process.argv[2]
            const number = process.argv[3]

            const persons = new Persons({
                name: name,
                number: number
            });

            await persons.save().then(console.log(`added ${name} number ${number} to phonebook`))
        }

            if (process.argv.length === 2) {
                const find = await Persons.find({});
                console.log('phonebook')
                find.forEach(p => {console.log(p.name,p.number)});
            }
        mongoose.connection.close();
    } catch {
        console.log('error in db')
        mongoose.connection.close();
    }
}

terminal();