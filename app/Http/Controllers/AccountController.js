/**
 * Created by Raphson on 12/23/16.
 */
'use strict';

const Validator = use('Validator');
const fs = require('fs');
const Helpers = use('Helpers');
const UserRepository = make('App/Repositories/UserRepository');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const thunkify = require('thunkify');

class AccountController {

    constructor () {
        const file = Helpers.resourcesPath('locales/en/validation.json');
        this.messages = JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    * edit(request, response) {
        this.loginID = yield request.auth.getUser();
        const loggedinUser =  yield UserRepository.findUserById(this.loginID.id);
        yield  response.sendView('account.profile', {account: loggedinUser});
    }

    * update(request, response) {
        const userData = request.only('email', 'name', 'username',
            'gender', 'location', 'website');
        const rules = {
            name    : 'required|max:255',
            email   : 'required|email|max:255'
        };

        const validation = yield Validator.validate(userData, rules, this.messages);

        if (validation.fails()) {
            yield request.with({ errors: validation.messages() }).flash();
            response.redirect('back');
            return;
        }

        this.loginID = yield request.auth.getUser();
        yield UserRepository.updateUserProfile(this.loginID, userData);
        yield request.with({ status: 'Your Profile has been updated successfully' }).flash();
        response.redirect('back');
    }

    * changePassword(request, response){
        const userPasswords = request.only('password', 'password_confirmation');
        const rules = {
            password : 'required|min:6|max:30|confirmed'
        };

        const validation = yield Validator.validate(userPasswords, rules, this.messages);

        if (validation.fails()) {
            yield request.with({ errors: validation.messages() }).flash();
            response.redirect('back');
            return;
        }

        this.loginID = yield request.auth.getUser();
        yield UserRepository.changeUserPassword(this.loginID, userPasswords);
        yield request.with({ status: 'Password has been changed successfully' }).flash();
        response.redirect('back');
    }

    /*
     * Avatar upload using cloudinary(https://www.cloudinary.com)
     */

    * uploadAvatar(request, response){
        var imageFile = request.file('avatar').tmpPath();
        // Upload file to Cloudinary
        const upload = thunkify(cloudinary.uploader.upload);
        try {
            const image = yield upload(imageFile);
            const loginID =  yield request.auth.getUser();
            yield UserRepository.saveAvatar(loginID, image.url);
            yield request.with({ status: 'Avatar has been updated successfully' }).flash();
            response.redirect('back');
        } catch (e) {
            console.log(e);
            yield request.with({ status: 'Error in updating your avatar ' }).flash();
            response.redirect('back');
        }
        /*cloudinary.uploader.upload(imageFile)
            .then(function (image) {
                console.log('** file uploaded to Cloudinary service');
                console.dir(image.url);
                const loginID =  yield request.auth.getUser();
                console.log(loginID);
                //yield UserRepository.saveAvatar(loginID, image.url);
            })
            .then(function (photo) {
                console.log('** photo saved');
            })
            .finally(function () {
                this.request.with({ status: 'Avatar has been updated successfully' }).flash();
                response.redirect('back');
            });*/
        /*const imageUploaded = request.file('file_name');
        console.log(imageUploaded);
        yield imageUploaded.move(path.join(__dirname, './public'));
        console.log(imageUploaded.moved());*/
        //imageUploaded.move(Helpers.resourcesPath('tryingit/', 'cools'));
    }
    /*public function uploadAvatar(Request $request){
    $this->validate($request, [
    'file_name'     => 'required|mimes:jpg,jpeg,bmp,png|between:1,7000',
    ]);*/

    /*
     * API implementation for Cloudder..
     */
    /*
     $file = $request->file('file_name')->getRealPath();
     Cloudder::upload($file, null);
     list($width, $height) = getimagesize($file);
     $fileUrl = Cloudder::show(Cloudder::getPublicId(), ["width" => $width, "height" => $height]);
     */
    /*
     * End of cloudder api implementation.
     */



    /*
     * Local Storage imeplementation
     */

    /*$file = $request->file('file_name');

    $fileName =  time() . rand(0, 99999) . "/" . $request->file('file_name')->getClientOriginalName();

    Storage::put($fileName,  File::get($file));//store image in local storage

    $fileUrl = url('img/' . $fileName);//generate image url*/


    /*
     * End of local storage implementation.
     */


    /*  //store File URL to DB
        $this->saveUpload($fileUrl);

        return redirect()->back()->with('info', 'Photo has been updated successfully');
    }*/
    * destroy(request, response) {
        //
    }
}

module.exports = AccountController;