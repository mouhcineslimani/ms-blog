class UserDao {
    constructor(){
        if(new.target === UserDao){
            console.log('u must implemented it');
        }
    }
        
    createUser(user) {}
    getUserById(userId) {}
    getUsers(){}
    updateUser(userId, updatedUserData) {}
    deleteUser(userId) {}
}

module.exports = UserDao;
