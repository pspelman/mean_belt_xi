var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var skillLength = function (skill) {
    return !(skill.length === 0 || skill.length > 2);
    // if(skill.length === 0 || skill.length > 2){
    //     return false;
    // } else {
    //     return true;
    // }
};


var SkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        minlength: 3
    }
});

//VALIDATION
SkillSchema.pre('save', function (next) {
    if ('invalid' === this.skill) {
        return next(new Error('#sadpanda'));
    }
    next();
});



var skillSchema = new mongoose.Schema({ skill: 'string' });
skillSchema.pre('save', function (next) {
    if (this.skill.length > 0 && this.skill.length < 3) {
        return next(new Error('#sadpanda, your skills must be at least 3 characters long!'));
    }
    next();
});


//Instruction says use only ONE schema
var PetSchema = new mongoose.Schema({
    pet_name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    type: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    skills: [skillSchema],
    likes: {
        type: Number,
        default: 0
    }
},{timestamps: true});
PetSchema.plugin(uniqueValidator);
PetSchema.pre('save', function (next) {
    if (this.skills.length > 3){
        return next(new Error('you can only have 3 pet skills'));
    }
    next();
});



// PetSchema.path('skills').validate(function(skills){
//     if(!skills){return false}
//     else if(skills.length === 0){return false}
//     return true;
// }, 'Pet needs to have at least one skill');


mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet');





// skills: {
//     type: [
//         {
//             name: {
//                 type: String,
//                 required: true,
//                 minlength: 3,
//                 validate: [skillLength, 'Skill needs to be at least 3 characters long']
//             },
//             // default: ''
//         },
//
//     ],
//     maxitems: 3,
// },
// skills:
// [
//     {
//         type: String,
//         required: false,
//         default: ""
//     },
//     {
//         type: String,
//         required: false,
//         default: ""
//     },
//     {
//         type: String,
//         required: false,
//         default: ""
//     },
//
// ],




// var parentSchema = new Schema({
//     // Array of subdocuments
//     children: [skillSchema],
//     // Single nested subdocuments. Caveat: single nested subdocs only work
//     // in mongoose >= 4.2.0
//     child: skillSchema
// });
//
//
// var Parent = mongoose.model('Parent', parentSchema);
// var parent = new Parent({ children: [{ name: 'Matt' }, { name: 'Sarah' }] })
// parent.children[0].name = 'Matthew';

// `parent.children[0].save()` is a no-op, it triggers middleware but
// does **not** actually save the subdocument. You need to save the parent
// doc.
// parent.save(callback);

//
// childSchema.pre('save', function (next) {
//     if ('invalid' == this.name) {
//         return next(new Error('#sadpanda'));
//     }
//     next();
// });
//
// var parent = new Parent({ children: [{ name: 'invalid' }] });
// parent.save(function (err) {
//     console.log(err.message) // #sadpanda
// });
//
//
// //finding subdoc
// var doc = parent.children.id(_id);
//
//
//
//
//
//
// var Parent = mongoose.model('Parent');
// var parent = new Parent;
//
// // create a comment
// parent.children.push({ name: 'Liesl' });
// var subdoc = parent.children[0];
// console.log(subdoc) // { _id: '501d86090d371bab2c0341c5', name: 'Liesl' }
// subdoc.isNew; // true
//
// parent.save(function (err) {
//     if (err) return handleError(err)
//     console.log('Success!');
// });
//




