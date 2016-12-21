/**
 * Created by Raphson on 12/20/16.
 */
const Hash = use('Hash');
const Exceptions = use('App/Exceptions');

class UserRepository{
    /**
     * injecting required dependencies auto fulfilled
     * by IoC container
     *
     * @return {Array}
     */
    static get inject () {
        return ['App/Model/User'];
    }

    constructor (User) {
        this.User = User;
    }

    * register(userInfo) {
        const user = new this.User;
        user.email      = userInfo.email;
        user.name       = userInfo.name;
        user.password   = yield Hash.make(userInfo.password);
        yield user.save();

        if (user.isNew()) {
            throw new Exceptions.ApplicationException('Unable to create your account, please try after some time', 400)
        }

        const freshInstance = yield this.User.find(user.id);
        return freshInstance;
    }

    * login(loginCredentials){
        const user = yield this.User.findByOrFail('email', loginCredentials.email, function () {
            throw new Exceptions.ApplicationException('Unable to find any account with this email address', 400)
        });

        const isMatchedPassword = yield Hash.verify(loginCredentials.password, user.password);
        if (!isMatchedPassword) {
            throw new Exceptions.ApplicationException('Password mis-match', 400)
        }
        return user
    }



}

module.exports = UserRepository;