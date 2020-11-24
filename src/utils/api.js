import axios from "axios";

export default {
  generateList: function() {
    return axios.get("https://randomuser.me/api/?results=10");
  }
};