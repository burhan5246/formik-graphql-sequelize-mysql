const User = require("../models/User");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  fileUpload,
  fileUnlink
} = require("../config/helpers");

module.exports = {
  Mutation: {
    addUser: async (root, args) => {
      try {
        let profileObject = "";
        let documentObject = "";

        if (args.profile) {
          profileObject = await fileUpload(
            args.profile,
            "/assets/images/user/"
          );
        }

        if (args.document) {
          documentObject = await fileUpload(
            args.document,
            "/assets/images/user/"
          );
        }

        return User.create({
          name: args.name,
          email: args.email,
          phone: args.phone,
          address: args.address,
          zipcode: args.zipcode,
          profile: profileObject.filename ? profileObject : null,
          document: documentObject.filename ? documentObject : null
        }).then(function(users) {
          if (users) {
            //console.log(users);
            return users.dataValues;
          } else {
            console.log("something went wrong");
          }
        });
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
