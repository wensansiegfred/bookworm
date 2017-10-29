import axios from "axios";

export default {
	user: {
		login: function(credentials) {					
			return axios.post("/api/auth", { credentials }).then(function(res) {
				return res.data.user;
			})
		},
		signup: function(user) {
			axios.post("/api/users", { user }).then(function(res) {
				return res.data.user;	
			})
		}
	}
}