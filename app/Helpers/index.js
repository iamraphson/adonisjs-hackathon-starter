/**
 * Created by Raphson on 3/5/17.
 */

class HelperUtils{

	 _generateUUID (){
			let d = new Date().getTime();
			let uuid = 'xxxx-xxxx-xxxx-4xxx-yxxx-xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
			let r = (d + Math.random() * 16) %  16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
}
module.exports = HelperUtils