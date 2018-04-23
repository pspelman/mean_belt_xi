var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Pet = mongoose.model('Pet');
var Pets = mongoose.model('Pet');

mongoose.Promise = global.Promise;

class errorObject {
    constructor(){
        this.has_errors = false;
        this.err_list = [];
    }
}

router.get('/', function (req, res) {
    console.log(`reached the router`,);
    res.sendFile(path.resolve("./public/dist/index.html"));
    // res.json({'message': 'You made it...congrats'});
});


//DONE: router.get('/', function(req, res){}
//get all pets
router.get('/pets', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`arrived at GET pets...getting all pets`,);
    Pets.find({}, function (err, pets) {
        if(err){
            err_holder.push(err.message);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            console.log(`there was an error looking up pets`, err);
            res.json({'message':'there was an error', 'errors': err.message, 'err_holder':err_holder, 'errs':errs})
        } else {
            res.json({'message': 'successfully retrieved pets', 'pets': pets, 'errs':errs});
        }
    });
});






//DONE: router.get('/pets/:id', function(req, res){}
//get a SINGLE author by ID
router.get('/pets/:id', function (req, res) {
    let errs = new errorObject();
    console.log(`req.body: `,req.body);
    let pet_id = req.params.id;
    console.log(`reached individual pet lookup`,);
    // res.json({'message':'working on it!'});
    //get the pet
    var petPromise = new Promise(function (resolve, reject) {
        resolve(Pets.find({_id: req.params.id}));
    })
        .then(function (pet) {
            res.json({'message': 'successfully retrieved the pet', 'pet': pet});
        })
        .catch(function (err) {
            console.log(`caught err`, err);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            res.json({'message':'There was a problem with the request', 'err':err.message, 'errs':errs})
        });

});






//DONE: router.post('/pets', function(req, res){}
//FIXME: backside validation errors - standardize the way they are sent back to the front
//create a pet
router.post('/pets', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    //new PET data recieved
    console.log(`request.body: `,req.body);

    console.log(`   recieved request to make new pet`,);
    let new_pet = new Pet();

    if (req.body.pet_name.length < 3) {
        errs.has_errors = true;
        errs.err_list.push("name must be at least 3 characters");
    }
    if (req.body.type.length < 3){
        errs.has_errors = true;
        errs.err_list.push("type must be at least 3 characters");
    }
    if (req.body.description.length < 3){
        errs.has_errors = true;
        errs.err_list.push("description must be at least 3 characters");
    }

    new_pet.pet_name = req.body.pet_name;;
    new_pet.type = req.body.type;
    new_pet.description = req.body.description;

    let new_skills = req.body.skills;
    console.log(`New skills`,new_skills);
    console.log(`New skills length: `,new_skills.length);
    // res.json({'message': 'Working on it'})

    console.log(`Pet new_skills recieved:`,new_skills);
    for(let i = 0; i < new_skills.length; i++){
        if(new_skills[i] === null){
            continue;
        }
        if (new_skills[i] && new_skills[i].length < 3) {
            errs.has_errors = true;
            errs.err_list.push('new_skills must be at least 3 characters');
            break;
        }
        new_pet.skills.push({skill: new_skills[i]});
        var subdoc = new_pet.skills[i];
        console.log(`SKILL SUBDOC: `,subdoc);

    }

    new_pet.save(function (err) {
        if (err) {
            // console.log(`there was an error saving to db`, err);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            console.log(`there were errors saving to db`, err.message );
            res.json({'message': 'unable to save new pet', 'errs': errs})

        } else {
            console.log(`successfully saved!`);
            res.json({'message': 'Saved new pet!', 'errs': errs})
        }
    });

});


//TODO : function for liking pet

router.put('/pets/like/:id', function (req, res) {
    console.log(`like request: `, req.params._id);


    Pets.findOneAndUpdate(
        { _id: req.params.id },
        {$inc: {likes: 1}}).exec(function(err, pet_data) {
            if (err) {
                throw err;
            }
            else {
                console.log(pet_data);
                res.json({'message': 'did the likes', 'pet':pet_data})
            }
        })
});



//FIXME: standardize sending back errors
//update an author's name
router.put('/pets/:id', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`ID: `,req.params.id);
    console.log(`reached pet updater. Body: `, req.body);


    var opts = {runValidators: true , context: 'query'};
    Pets.findOneAndUpdate({_id: req.params.id}, {
        pet_name: req.body.pet_name,
        type: req.body.type,
        description: req.body.description,
        // "$set": {
        //     "skills.0": req.body.skills[0],
        // }
        // skills: [req.body.skills[0], req.body.skills[1], req.body.skills[2]],
            }, opts, function (err) {
        if (err) {
            console.log(`there was an error updating`, err.message);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            res.json({'message': 'problem updating pet', 'errs': errs});

        } else {
            res.json({'message': 'successfully updated pet', 'errs': errs});

        }
    });



    // var validation_errors = [];
    // var petPromise = new Promise(function (resolve, reject) {
    //     resolve(Pets.find({_id: req.params.id}, function (err, pet) {
    //         if (err) {
    //             console.log(`error finding pet`, err);
    //         } else {
    //             console.log(`found pet: `,pet);
    //             Pets.findOne({ _id: req.body.pet_id }, function (err, pet){
    //                 pet.pet_name = req.body.pet_name;
    //                 pet.type = req.body.type;
    //                 pet.description = req.body.description;
    //                 pet.skills[0] = req.body.skill_one;
    //                 pet.skills[1] = req.body.skill_two;
    //                 pet.skills[2] = req.body.skill_three;
    //                 // pet.visits.$inc();
    //                 pet.save();
    //             });
    //
    //
    //             Pets.update({_id: req.params.id}, {
    //                 //stuf to update
    //             }, function (err) {
    //                 if (err) {
    //                     console.log(`error`,err);
    //                 }
    //             });
    //         }
    //
    //     }).then());
    // });


            // } else {
            //     var opts = {runValidators: true };
            //     resolve(Pets.update({_id: req.params.id},
            //         {
            //             name_of_pet: req.body.name_of_pet,
            //         }, opts ));
            // }



    // petPromise.then(function (author) {
    //     console.log(`got the author...proceed to modification`,);
    //
    //     var updatePetsPromise = new Promise(function (resolve, reject) {
    //         if (typeof (req.body.name_of_pet) == 'undefined') {
    //             reject(validation_errors.push(new Error('Name cannot be empty')));
    //             res.json({'message': 'Error updating author', 'error': err})
    //         } else if (req.body.name_of_pet.length < 3) {
    //             throw new Error('name must be at least 3');
    //         } else {
    //             var opts = {runValidators: true };
    //             resolve(Pets.update({_id: req.params.id},
    //                 {
    //                     name_of_pet: req.body.name_of_pet,
    //                 }, opts ));
    //         }
    //     });
    //     updatePetsPromise.then(function (author) {
    //         console.log(`updated author successfully`,);
    //         res.json({'message': 'successful update', 'author': author});
    //     }).catch(function (err) {
    //         console.log(`there were problems updating the author`,);
    //         validation_errors.push(err);
    //         res.json({'message': 'update failed', error: err.message, 'validation_array':validation_errors.toString()});
    //     });
    // }).catch(function (errors) {
    //     console.log(`caught errors`,errors);
    // });
});










    //
    // Pet.update({_id: req.params.id}, function (err, pet_data) {
    //     likes:
    //
    // });

//
//
// Pet.update({_id: request.params.id}, {
//     Name: req.body.Name,
//     Descrip: req.body.Descrip,
//     type: req.body.type,
//     skll1: req.body.skill1,
//     skill2: req.body.skill2,
//     skill3: req.body.skill3
// }, function (err, data) {
//     if (err) {
//         console.log(`errors:`, err);
//     } else{
//         console.log(`success`,);
//         console.log(``, data);
//         response.json({'message': 'Successfully did thing'});
//     }
//
// });

//
//
// router.put('/pets/like/:id', function (req, res) {
//     console.log(`reached adding pet likes`,);
//     var pet_id = req.params.id;
//     console.log(`request to like ID: `,req.params.id);
//     let errs = new errorObject();
//     let err_holder = [];
//     var message = "";
//
//
//
//     console.log(`REQUEST BODY: `,req.body);
//
//
//     var petPromise = new Promise(function (resolve, reject) {
//         resolve(Pets.find({_id: req.params.id}));
//     })
//         .then(function (pet) {
//             res.json({'message': 'successfully retrieved the pet', 'pet': pet});
//             pet.likes = pet.likes + 1;
//             console.log(`adding to pet likes`,pet.likes);
//             pet.save(function (err) {
//                 if (err) {
//                     errs.has_errors = true;
//                     errs.err_list.push(err.message);
//                     message="There was a problem saving a like"
//
//                 } else {
//                     message="Successfuly saved like";
//                 }
//
//             });
//             res.json({'message': message, 'errs':errs})
//
//         })
//         .catch(function (err) {
//             console.log(`caught err`, err);
//             errs.has_errors = true;
//             errs.err_list.push(err.message);
//             res.json({'message':'There was a problem with the request', 'err':err.message, 'errs':errs})
//         });
//
//
//     //find the pet
//     // let selected_pet = Pets.find({_id: req.params.id});
//     // console.log(`selected pet found: `, selected_pet);
//     // console.log(`current likes: `,selected_pet.likes);
//     // console.log(`trying to add like`,);
//     // selected_pet.likes += 1;
//     // selected_pet.save(function (err) {
//     //     if (err) {
//     //         // console.log(`there was an error saving to db`, err);
//     //         errs.has_errors = true;
//     //         errs.err_list.push(err.message);
//     //         console.log(`there were errors saving to db`, err.message );
//     //         res.json({'message': 'unable to save new pet', 'errs': errs})
//     //     } else {
//     //         console.log(`successfully LIKED!`);
//     //         console.log(`NEW likes: `,selected_pet.likes);
//     //         res.json({'message': 'Added one like', 'errs': errs})
//     //     }
//     // });
//
// });




//FIXME: ADD quote to selected author
router.put('/add_pet/:pet_id', function (req, res) {
    console.log(`got request to update author's quotes auth: `,req.params.pet_id);
    let errors = [];
    let pet_id = req.params.pet_id;
    let text_to_add_as_quote = req.body.quote_text;

    //validate quote length
    if(text_to_add_as_quote.length < 3){
        console.log(`you done messed up`,);
        let err = new Error("quote is not long enough");
        errors.push(err.message);
        res.json({'message':'done with the thing', 'author':pet_id, 'errors': errors});

    } else {
        Pets.find({_id: pet_id}, function (err, author) {
            if (err) {
                errors.push(err.message);
                res.json({"message":"error adding quote", "errors":errors})
            } else {
                let author_to_update = author[0];
                console.log(`got the author, continue to ADD a quote:`,author);
                author[0].quotes.push({ quote_text: text_to_add_as_quote });
                author[0].save();
                res.json({'message':'Successfully saved', 'author':pet_id});
            }
        });
    }
});

//TODO: router.delete('/', function(req, res){}
router.delete('/pets/:id', function (req, res) {
    let errs = new errorObject();
    let err_holder = [];

    console.log(`trying to delete...or adopt...the pet`,);
    let pet_id = req.params.id;

    console.log(`pet: ${pet_id}`);
    Pets.remove({_id: req.params.id}, function (err) {
        if (err) {
            errs.has_errors = true;
            errs.err_list.push(err);
            res.json({'message': 'Error when deleting pet', 'errs': errs});

        } else {
            res.json({'message': 'successfully deleted pet', 'errs': errs});

        }

    });

    // res.json({'message': 'trying to remove pet', 'pet_id': pet_id});


});

router.all("/*", (req,res,next) => {
    console.log(`reached wildcard route...need to redirect to Angular templates`,);
    res.sendFile(path.resolve("./public/dist/index.html"));
});




//todo: Add a VOTES function to add or subtract votes from a quote
//todo: get the selected author
//todo: get the quote from the selected author
//todo: update that quote's votes

// If you only pass the id of the quote sub-doc, then you can do it like this:

function update_by_quote_sub_id(){
    Pets.findOne({'quote._id': quoteId}).then(author => {
        let quote = author.quote.id(quoteId);
        quote.votes = 'something';
        return author.save();
    });
}

// Note that sub document array return from mongoose are mongoose
// array instead of the native array data type. So you can manipulate them using .id .push .pop .remove method
// http://mongoosejs.com/docs/subdocs.html



//create one sample thing on load
var createSamplePet = function () {
    let errs = new errorObject();
    let err_holder = [];
    console.log(`trying to make a sample Pet`,);
    var PetInstance = new Pet();
    // PetInstance.pet_name = 'Barney';
    // PetInstance.type = 'cat';
    // PetInstance.description = 'fat cat in Washington';
    // PetInstance.skills = ['bird watching', 'killing','littering', 'something_else'];
    PetInstance.pet_name = 'Blake';
    PetInstance.type = 'Dog';
    PetInstance.description = 'Likes lasagna';
    PetInstance.skills.push({skill: 'pooping'});
    var subdoc = PetInstance.skills[0];
    console.log(`SKILL SUBDOC: `,subdoc);
    // PetInstance.skills.push({skill: 'p'});
    // var subdoc = PetInstance.skills[1];
    // console.log(`SKILL SUBDOC: `,subdoc);


    // var newSkill = PetInstance.skills.create({name: 'eating'});
    // newSkill.save()

    // PetInstance.skills = [{skill: 'bird watching'}, {skill:'killing'},{skill:'littering'}]; 'something_else'];

    //todo: validation for skills

    //todo: validation for duplicate pet names

    PetInstance.save(function (err) {
        if (err) {
            // console.log(`there was an error saving to db`, err);
            errs.has_errors = true;
            errs.err_list.push(err.message);
            console.log(`there were errors saving to db`, err.message );
        } else {
            console.log(`successfully saved!`);
        }
    });
};
// createSamplePet();


module.exports = router;
