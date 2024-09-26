const db = require('../data/dbConfig'); //import database

const router = express.Router() //import the router from express method

router.get('/', (req, res) => {
    //get data from the DataBase
    //select * from accounts
    db.select('*').from('accounts')
        .then(rows => {
            res.status(200).json({ data: rows });
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, something went wrong retrieving the data." });
        })
})

router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(accounts => {
            if (accounts) {
                res.status(200).json({ data: accounts });
            } else {
                res.status(404).json({ message: "Account could not be found" });
            }
        })
        .catch(error => {
            console.log("There is an error in your get ID request.", error);
            res.status(500).json({ message: "sorry, there was an error returning the data." });
        })
});

router.post('/', (req, res) => {
    db('accounts').insert(req.body, "id")
        .then(ids => {
            res.status(201).json({ results: ids })
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, There was an error somewhere in the code" });
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    db('accounts').where({ id: req.params.id })
        .update(changes) //updates the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ Message: "record updated successfully" })
            } else {
                res.status(404).json({ message: " There was a glitch in the matrix." })
            }
        })
});

router.delete('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
        .del() //deletes the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ Message: "record deleted successfully" })
            } else {
                res.status(404).json({ message: " sorry, you took the blue pill." })
            }
        })
});

module.exports = router;