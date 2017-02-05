/**
 * Created by Raphson on 2/5/17.
 */
const Env = use('Env')
const clockwork = require('clockwork')({ key: Env.get('CLOCKWORK_ID') });
class ClockworkController{

	* index(request, response){
		yield response.sendView('')
	}

}

module.exports = ClockworkController