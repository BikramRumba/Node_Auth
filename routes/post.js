const router = require('express').Router();
const verify = require('./verifyToken');

// verify is a middleware

router.get('/',verify, (req, res) => {
/* res.json ({
    posts: {
        title: 'my first post',
        description:'random data you shouldnt access'
    }
}); */
res.send(req.user);
/* // user based on token
User.findOne({_id: req.user}) */
}) ;

module.exports = router;