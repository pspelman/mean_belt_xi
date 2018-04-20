var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Replace_Me_With_An_Object = mongoose.model('Replace_Me_With_An_Object');
// var Replace_Me_With_An_Object = mongoose.model('Replace_Me_With_An_Object');

mongoose.Promise = global.Promise;


router.get('/', function (req, res) {
    console.log(`reached the router`,);
    res.sendFile(path.resolve("./public/dist/index.html"));
    // res.json({'message': 'You made it...congrats'});
});


//DONE: router.get('/', function(req, res){}
//get all Lower_case_rep_Me_With_An_Objects
router.get('/Lower_case_rep_Me_With_An_Objects', function (req, res) {
    console.log(`arrived at GET Lower_case_rep_Me_With_An_Objects...getting all Lower_case_rep_Me_With_An_Objects`,);
    Replace_Me_With_An_Object.find({}, function (err, Lower_case_rep_Me_With_An_Objects) {
        if(err){
            console.log(`there was an error looking up Lower_case_rep_Me_With_An_Objects`, err);
            res.json({'message':'there was an error', 'errors': err.message})
        } else {
            res.json({'message': 'successfully retrieved Lower_case_rep_Me_With_An_Objects', 'Lower_case_rep_Me_With_An_Objects': Lower_case_rep_Me_With_An_Objects});
        }
    });
});

//DONE: router.get('/Lower_case_rep_Me_With_An_Objects/:id', function(req, res){}
//get a SINGLE author by ID
router.get('/Lower_case_rep_Me_With_An_Objects/:id', function (req, res) {
    console.log(`req.body: `,req.body);
    let author_id = req.params.id;
    console.log(`reached single-author NAME UPDATER...getting the author`,);
    //get the author
    var authorPromise = new Promise(function (resolve, reject) {
        resolve(Replace_Me_With_An_Object.find({_id: req.params.id}));
    })
        .then(function (author) {
            res.json({'message': 'successfully retrieved the author', 'author': author});
        })
        .catch(function (err) {
            console.log(`caught err`, err);
            res.json({'message':'There was a problem with the request', 'err':err.message})
        });

});


//DONE: router.post('/', function(req, res){}
//FIXME: backside validation errors - standardize the way they are sent back to the front
//create an author
router.post('/Lower_case_rep_Me_With_An_Objects', function (req, res) {
    //new task data recieved
    console.log(`request.headers.title: `,req.body.title);
    console.log(`request.description: `,req.body.description);

    var authorPromise = new Promise(function(resolve, reject) {
        console.log(`making promise`,);
        console.log(`request.body: `,req.body);

        var author = new Replace_Me_With_An_Object(req.body);
        console.log(`data received:`,author);
        resolve(author.save());
    });
    authorPromise.then(function(author) {
        console.log("It worked!", author);
        // res.redirect('/');
        res.json({message: "Successfully saved the new author"});
    }).catch(function(err) {
        console.log("It failed!", err);
        res.json({message: "error saving author", errors: err});
    })
});


//DONE: router.put('/', function(req, res){}
//FIXME: standardize sending back errors
//update an author's name
router.put('/Lower_case_rep_Me_With_An_Objects/:id', function (req, res) {
    var validation_errors = [];
    console.log(`req.body: `,req.body);
    let author_id = req.params.id;
    console.log(`reached single-author NAME UPDATER...getting the author`,);
    //get the author
    var authorPromise = new Promise(function (resolve, reject) {
        resolve(Replace_Me_With_An_Object.find({_id: req.params.id}));
    });
    authorPromise.then(function (author) {
        console.log(`got the author...proceed to modification`,);

        var updateReplace_Me_With_An_ObjectPromise = new Promise(function (resolve, reject) {
            if (typeof (req.body.first_last_name) == 'undefined') {
                reject(validation_errors.push(new Error('Name cannot be empty')));
                res.json({'message': 'Error updating author', 'error': err})
            } else if (req.body.first_last_name.length < 3) {
                throw new Error('name must be at least 3');
            } else {
                var opts = {runValidators: true };
                resolve(Replace_Me_With_An_Object.update({_id: req.params.id},
                    {
                        first_last_name: req.body.first_last_name,
                    }, opts ));
            }
        });
        updateReplace_Me_With_An_ObjectPromise.then(function (author) {
            console.log(`updated author successfully`,);
            res.json({'message': 'successful update', 'author': author});
        }).catch(function (err) {
            console.log(`there were problems updating the author`,);
            validation_errors.push(err);
            res.json({'message': 'update failed', error: err.message, 'validation_array':validation_errors.toString()});
        });
    }).catch(function (errors) {
        console.log(`caught errors`,errors);
    });
});


//FIXME: ADD quote to selected author
router.put('/add_quote/:author_id', function (req, res) {
    console.log(`got request to update author's quotes auth: `,req.params.author_id);
    let errors = [];
    let author_id = req.params.author_id;
    let text_to_add_as_quote = req.body.quote_text;

    //validate quote length
    if(text_to_add_as_quote.length < 3){
        console.log(`you done messed up`,);
        let err = new Error("quote is not long enough");
        errors.push(err.message);
        res.json({'message':'done with the thing', 'author':author_id, 'errors': errors});

    } else {
        Replace_Me_With_An_Object.find({_id: author_id}, function (err, author) {
            if (err) {
                errors.push(err.message);
                res.json({"message":"error adding quote", "errors":errors})
            } else {
                let author_to_update = author[0];
                console.log(`got the author, continue to ADD a quote:`,author);
                author[0].quotes.push({ quote_text: text_to_add_as_quote });
                author[0].save();
                res.json({'message':'Successfully saved', 'author':author_id});
            }
        });
    }
});

//TODO: router.delete('/', function(req, res){}
router.delete('/Lower_case_rep_Me_With_An_Objects/:id/:quote_id', function (req, res) {
    console.log(`trying to delete author's quote`,);
    let author_id = req.params.id;
    let quote_id = req.params.quote_id;


    console.log(`author: ${author_id} | quote: ${quote_id}`,);

    res.json({'message': 'trying to delete quote', 'quote_id': quote_id, 'author_id': author_id});


    //find the author
    // var authorPromise = new Promise(function (resolve, reject) {
    //     resolve(Replace_Me_With_An_Object.find({_id: req.params.id}));
    // });
    // authorPromise.then(function (author) {
    //     console.log(`got the author...proceed to modification`,);
    // }).then(function (author) {
    //         //return success message
    //
    // }).catch(function (err) {
    //         console.log(`there were problems updating the author`,);
    //         res.json({'message': 'update failed', error: err.message});
    //     });

});
router.all("*", (req,res,next) => {
    console.log(`reached wildcard route...need to redirect to Angular templates`,);
    res.sendFile(path.resolve("./public/dist/index.html"));
});




//todo: Add a VOTES function to add or subtract votes from a quote
//todo: get the selected author
//todo: get the quote from the selected author
//todo: update that quote's votes

// If you only pass the id of the quote sub-doc, then you can do it like this:

function update_by_quote_sub_id(){
    Replace_Me_With_An_Object.findOne({'quote._id': quoteId}).then(author => {
        let quote = author.quote.id(quoteId);
        quote.votes = 'something';
        return author.save();
    });
}

// Note that sub document array return from mongoose are mongoose
// array instead of the native array data type. So you can manipulate them using .id .push .pop .remove method
// http://mongoosejs.com/docs/subdocs.html



//create one sample thing on load
var createSampleReplace_Me_With_An_Object = function () {
    console.log(`trying to make a sample Replace_Me_With_An_Object`,);
    var Replace_Me_With_An_ObjectInstance = new Replace_Me_With_An_Object();
    Replace_Me_With_An_ObjectInstance.first_last_name = 'Bilbo Baggins';

    Replace_Me_With_An_ObjectInstance.save(function (err) {
        if (err) {
            // console.log(`there was an error saving to db`, err);
            console.log(`there was an error saving to db`, err );
        } else {
            console.log(`successfully saved!`);
        }
    });
};
// createSampleReplace_Me_With_An_Object();


module.exports = router;
